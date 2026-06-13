import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  Interest,
  Religion,
  City,
  Education,
} from "../models/sequelize";
import { Op } from "sequelize";
import { profileSerializer } from "../serializers/profileSerializer";

export const getDailyMatches = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const myUser = await User.findByPk(req.user.id);
    if (!myUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // users.gender is a Postgres enum (Male | Female | Other), so we must
    // match the exact enum label — a lowercased variant fails to cast and
    // crashes the whole query.
    const oppositeGender = myUser.gender === "Male" ? "Female" : "Male";

    // Find opposite gender users
    const matches = await UserProfile.findAll({
      include: [
        {
          model: User,
          where: {
            id: { [Op.ne]: req.user.id },
            gender: oppositeGender,
          },
        },
        Religion,
        City,
        Education,
      ],
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    // 2. Fetch interests for these profiles to mark 'hasSentInterest'
    const targetUserIds = matches.map((p) => p.userId);
    const existingInterests = await Interest.findAll({
      where: {
        senderId: req.user.id,
        receiverId: { [Op.in]: targetUserIds },
        status: { [Op.ne]: "WITHDRAWN" },
      },
      attributes: ["receiverId"],
    });

    const sentInterestSet = new Set(existingInterests.map((i) => i.receiverId));

    // Discover matches using serializer to unify response
    const matchesWithScores = (matches as any).map((match: any) =>
      profileSerializer.toPublicProfile(
        match,
        sentInterestSet.has(match.userId),
      ),
    );

    res
      .status(200)
      .json(
        matchesWithScores.sort((a: any, b: any) => b.matchScore - a.matchScore),
      );
  } catch (error) {
    console.error("Discover matches error:", error);
    res.status(500).json({ message: "Server error fetching matches" });
  }
};
