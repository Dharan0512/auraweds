import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  Interest,
  User,
  UserProfile,
  Religion,
  City,
  Education,
  Subscription,
  Plan,
  Match,
  UserPhoto,
} from "../models/sequelize";
import { Op } from "sequelize";
import { profileSerializer } from "../serializers/profileSerializer";
import { Notification } from "../models/sequelize/Notification";

/**
 * GET /api/interests?type=received|sent|accepted|declined
 * Paginated, sorted by premium first, match %, recently active
 */
export const getInterests = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const {
      type = "received",
      page = "1",
      limit = "10",
      sortBy = "newest",
    } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let whereClause: any = {};
    let includeModel: any = null;
    let includeAlias: string = "";

    switch (type) {
      case "received":
        whereClause = { receiverId: req.user.id, status: "PENDING" };
        includeModel = User;
        includeAlias = "Sender";
        break;
      case "sent":
        whereClause = { senderId: req.user.id, status: "PENDING" };
        includeModel = User;
        includeAlias = "Receiver";
        break;
      case "accepted":
        whereClause = {
          [Op.or]: [
            { senderId: req.user.id, status: "ACCEPTED" },
            { receiverId: req.user.id, status: "ACCEPTED" },
          ],
        };
        includeAlias = "Both"; // We'll handle this specially
        break;
      case "declined":
        whereClause = {
          [Op.or]: [
            { senderId: req.user.id, status: "DECLINED" },
            { receiverId: req.user.id, status: "DECLINED" },
          ],
        };
        break;
      case "blocked":
        whereClause = {
          [Op.or]: [
            { senderId: req.user.id, status: "BLOCKED" },
            { receiverId: req.user.id, status: "BLOCKED" },
          ],
        };
        break;
      default:
        res.status(400).json({ message: "Invalid interest type" });
        return;
    }

    // Inclusion logic
    const includes: any[] = [];
    if (type === "received") {
      includes.push({
        model: User,
        as: "Sender",
        include: [
          { model: UserProfile, include: [Religion, City, Education] },
          { model: UserPhoto, as: "photos", required: false },
          {
            model: Subscription,
            required: false,
            where: { status: "active" },
            include: [Plan],
          },
        ],
      });
    } else if (type === "sent") {
      includes.push({
        model: User,
        as: "Receiver",
        include: [
          { model: UserProfile, include: [Religion, City, Education] },
          { model: UserPhoto, as: "photos", required: false },
          {
            model: Subscription,
            required: false,
            where: { status: "active" },
            include: [Plan],
          },
        ],
      });
    } else {
      // For accepted/declined, we need to know which one is the "other" user
      includes.push(
        {
          model: User,
          as: "Sender",
          include: [
            { model: UserProfile, include: [Religion, City, Education] },
            { model: UserPhoto, as: "photos", required: false },
          ],
        },
        {
          model: User,
          as: "Receiver",
          include: [
            { model: UserProfile, include: [Religion, City, Education] },
            { model: UserPhoto, as: "photos", required: false },
          ],
        },
      );
    }

    const { count, rows: interests } = await Interest.findAndCountAll({
      where: whereClause,
      include: includes,
      limit: parseInt(limit as string),
      offset: offset,
      order: [["createdAt", "DESC"]], // basic sorting, premium sorting done in JS for now or complex SQL literal
    });

    // 2. Fetch requester's subscription tier
    const mySub = await Subscription.findOne({
      where: { userId: req.user.id, status: "active" },
      include: [Plan],
    });
    const myTier = mySub?.Plan?.name || "Free";
    const isGoldRequester = myTier === "Gold" || myTier === "Elite Gold";

    const formattedInterests = (interests as any[]).map((interest: any) => {
      const otherUser =
        type === "sent"
          ? interest.Receiver
          : type === "received"
            ? interest.Sender
            : interest.senderId === req.user?.id
              ? interest.Receiver
              : interest.Sender;
      const otherProfile = otherUser?.UserProfile;

      // Disclose contact info if requester is Gold and interest is ACCEPTED
      const shouldDiscloseContact =
        isGoldRequester && interest.status === "ACCEPTED";

      return {
        id: interest.id,
        status: interest.status,
        createdAt: interest.createdAt,
        viewedAt: interest.viewedAt,
        profile: otherProfile
          ? profileSerializer.toPublicProfile(
              {
                ...otherProfile.toJSON(),
                User: otherUser,
              },
              false, // hasSentInterest - already known since it's an interest record
              shouldDiscloseContact,
            )
          : null,
        isPremium: !!otherUser?.Subscriptions?.length,
      };
    });

    // Premium users first sorting if requested
    if (sortBy === "premium") {
      formattedInterests.sort(
        (a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0),
      );
    }

    res.status(200).json({
      total: count,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      interests: formattedInterests,
    });
  } catch (error) {
    console.error("Get interests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/interests
 * Validate limits, prevent duplicates
 */
export const expressInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { receiverId, targetUserId: bodyTargetId } = req.body;
    const senderId = req.user.id;
    const targetUserId = parseInt(bodyTargetId || receiverId, 10);

    if (isNaN(targetUserId)) {
      res.status(400).json({ message: "Invalid target user ID" });
      return;
    }

    if (senderId === targetUserId) {
      res.status(400).json({ message: "Cannot send to self" });
      return;
    }

    // 1. Check existing interest (any status)
    const existing = await Interest.findOne({
      where: {
        senderId,
        receiverId: targetUserId,
      },
    });

    if (existing) {
      if (existing.status === "PENDING") {
        res.status(400).json({ message: "Interest already pending" });
        return;
      }
      if (existing.status === "ACCEPTED") {
        res.status(400).json({ message: "Already connected with this user" });
        return;
      }
      // If WITHDRAWN, DECLINED, or EXPIRED, we allow "re-sending"
    }

    // 2. Check monetization limits
    const sub = await Subscription.findOne({
      where: { userId: senderId, status: "active" },
      include: [Plan],
    });

    const tier = sub?.Plan?.name || "Free";

    if (tier === "Free") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const count = await Interest.count({
        where: {
          senderId,
          createdAt: { [Op.gte]: startOfMonth },
        },
      });

      if (count >= 10) {
        res.status(403).json({
          message:
            "Monthly limit reached for Free plan. Upgrade to Silver or Gold for unlimited interests!",
          limitReached: true,
        });
        return;
      }
    }

    // 3. Create or Update record
    let interest;
    if (existing) {
      existing.status = "PENDING";
      existing.viewedAt = undefined; // Reset viewed status
      // We might want to update createdAt to "now" so it appears at top of received list
      // existing.setDataValue('createdAt', new Date());
      await existing.save();
      interest = existing;
    } else {
      interest = await Interest.create({
        senderId,
        receiverId: targetUserId,
        status: "PENDING",
      });
    }

    // Handle future real-time notification here (e.g., io.to(targetUserId).emit('new_interest'))

    res.status(201).json({
      message: "Interest expressed successfully",
      interest,
    });
  } catch (error) {
    console.error("Express interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/interests/:id/accept
 */
export const acceptInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const interest = await Interest.findOne({
      where: { id, receiverId: req.user.id, status: "PENDING" },
    });

    if (!interest) {
      res.status(404).json({ message: "Pending interest not found" });
      return;
    }

    interest.status = "ACCEPTED";
    await interest.save();

    // Create a match record for mutual connection
    await Match.findOrCreate({
      where: {
        [Op.or]: [
          { userId1: interest.senderId, userId2: interest.receiverId },
          { userId1: interest.receiverId, userId2: interest.senderId },
        ],
      },
      defaults: {
        userId1: interest.senderId,
        userId2: interest.receiverId,
        compatibilityScore: 85, // placeholder
      },
    });

    res
      .status(200)
      .json({ message: "Interest accepted. Match unlocked!", interest });
  } catch (error) {
    console.error("Accept interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/interests/:id/decline
 */
export const declineInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const interest = await Interest.findOne({
      where: { id, receiverId: req.user.id, status: "PENDING" },
    });

    if (!interest) {
      res.status(404).json({ message: "Pending interest not found" });
      return;
    }

    interest.status = "DECLINED";
    await interest.save();

    res.status(200).json({ message: "Interest declined", interest });
  } catch (error) {
    console.error("Decline interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/interests/:id/withdraw
 */
export const withdrawInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const interest = await Interest.findOne({
      where: { id, senderId: req.user.id, status: "PENDING" },
    });

    if (!interest) {
      res
        .status(404)
        .json({ message: "Pending interest not found for withdrawal" });
      return;
    }

    interest.status = "WITHDRAWN";
    await interest.save();

    res
      .status(200)
      .json({ message: "Interest withdrawn successfully", interest });
  } catch (error) {
    console.error("Withdraw interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/interests/:id
 * Remove an interest from the user's list (soft delete or hard delete depending on policy)
 * For now, we perform a hard delete as it's a "remove from list" action.
 */
export const removeInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const userId = req.user.id;

    // Find interest where user is either sender or receiver
    const interest = await Interest.findOne({
      where: {
        id,
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    if (!interest) {
      res.status(404).json({ message: "Interest not found" });
      return;
    }

    await interest.destroy();

    res.status(200).json({ message: "Interest removed from list" });
  } catch (error) {
    console.error("Remove interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/interests/counts
 */
export const getInterestCounts = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const received = await Interest.count({
      where: { receiverId: userId, status: "PENDING" },
    });
    const sent = await Interest.count({
      where: { senderId: userId, status: "PENDING" },
    });
    const accepted = await Interest.count({
      where: {
        status: "ACCEPTED",
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });
    const declined = await Interest.count({
      where: {
        status: "DECLINED",
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });
    const blocked = await Interest.count({
      where: {
        status: "BLOCKED",
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    res.status(200).json({ received, sent, accepted, declined, blocked });
  } catch (error) {
    console.error("Get interest counts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/interests/:id/view
 */
export const markViewed = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const interest = await Interest.findOne({
      where: { id, receiverId: req.user.id },
    });

    if (!interest) {
      res.status(404).json({ message: "Interest not found" });
      return;
    }

    if (!interest.viewedAt) {
      interest.viewedAt = new Date();
      await interest.save();
    }

    res.status(200).json({ message: "Interest marked as viewed", interest });
  } catch (error) {
    console.error("Mark interest as viewed error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/interests/:id/block
 */
export const blockInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const userId = req.user.id;

    const interest = await Interest.findOne({
      where: {
        id,
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    if (!interest) {
      res.status(404).json({ message: "Interest not found" });
      return;
    }

    interest.status = "BLOCKED";
    await interest.save();

    res.status(200).json({ message: "User blocked successfully", interest });
  } catch (error) {
    console.error("Block interest error:", error);
    res.status(500).json({ message: "Server error blocking user" });
  }
};

/**
 * POST /api/interests/notify-call
 */
export const notifyCall = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { targetUserId } = req.body;
    const sender = await User.findByPk(req.user.id);

    if (!sender) {
      res.status(404).json({ message: "Sender not found" });
      return;
    }

    // Check recipient's subscription tier
    const recipientSub = await Subscription.findOne({
      where: { userId: targetUserId, status: "active" },
      include: [Plan],
    });

    const recipientTier = recipientSub?.Plan?.name || "Free";
    const isPremiumRecipient =
      recipientTier === "Silver" ||
      recipientTier === "Gold" ||
      recipientTier === "Elite Gold";

    // Only notify if recipient is NOT premium
    if (!isPremiumRecipient) {
      const userName = `${sender.firstName} ${sender.lastName || ""}`.trim();
      await Notification.create({
        userId: targetUserId,
        senderId: req.user.id,
        type: "CALL_ATTEMPT",
        message: `Profile ${userName} tried to call you.`,
      });
    }

    res.status(200).json({
      message: isPremiumRecipient
        ? "Recipient is premium, skipping notification"
        : "Notification sent successfully",
    });
  } catch (error) {
    console.error("Notify call error:", error);
    res.status(500).json({ message: "Server error sending notification" });
  }
};

/**
 * PATCH /api/interests/:id/unblock
 */
export const unblockInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = req.params;
    const userId = req.user.id;

    const interest = await Interest.findOne({
      where: {
        id,
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        status: "BLOCKED",
      },
    });

    if (!interest) {
      res.status(404).json({ message: "Blocked interest not found" });
      return;
    }

    interest.status = "ACCEPTED";
    await interest.save();

    res.status(200).json({ message: "User unblocked successfully", interest });
  } catch (error) {
    console.error("Unblock interest error:", error);
    res.status(500).json({ message: "Server error unblocking user" });
  }
};
