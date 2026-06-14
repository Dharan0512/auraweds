import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  Block,
  Report,
  SuccessStory,
  UserProfile,
  UserPhoto,
  User,
} from "../models/sequelize";

export const blockUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const blockerId = req.user!.id;
    const { blockedId } = req.body;
    const targetId = parseInt(blockedId, 10);

    // Upsert equivalent for block
    const existing = await Block.findOne({
      where: { blockerId, blockedId: targetId },
    });
    if (!existing) {
      await Block.create({ blockerId, blockedId: targetId });
    }

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error parsing block" });
  }
};

export const reportUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const reporterId = req.user!.id;
    const { reportedId, reason } = req.body;
    const targetId = parseInt(reportedId, 10);

    const report = await Report.create({
      reporterId,
      reportedId: targetId,
      reason,
    });
    res.status(201).json({ message: "User reported successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Server error saving report" });
  }
};

export const updateSuccessStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const partner1Id = req.user!.id;
    const { partner2Id, status, storyText, weddingDate } = req.body;
    const targetPartnerId = parseInt(partner2Id, 10);

    let story = await SuccessStory.findOne({
      where: {
        partner1Id: [partner1Id, targetPartnerId],
        partner2Id: [partner1Id, targetPartnerId],
      },
    });

    if (story) {
      const wDate = weddingDate ? new Date(weddingDate) : null;
      story = await story.update({
        status,
        storyText,
        weddingDate: wDate && !isNaN(wDate.getTime()) ? wDate : null,
      });
    } else {
      const wDate = weddingDate ? new Date(weddingDate) : null;
      story = await SuccessStory.create({
        partner1Id,
        partner2Id: targetPartnerId,
        status,
        storyText,
        weddingDate: wDate && !isNaN(wDate.getTime()) ? wDate : null,
      });
    }

    res.status(200).json({ message: "Status updated", story });
  } catch (error) {
    res.status(500).json({ message: "Server error updating story" });
  }
};

export const getPendingApprovals = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const pendingProfiles = await UserProfile.findAll({
      where: { approvalStatus: "pending" },
      include: [
        { model: User, attributes: ["firstName", "lastName", "email"] },
      ],
    });

    const pendingPhotos = await UserPhoto.findAll({
      where: { approvalStatus: "pending" },
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    });

    res.status(200).json({
      profiles: pendingProfiles,
      photos: pendingPhotos,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending approvals" });
  }
};

export const getReports = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: reports } = await Report.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "Reporter",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: User,
          as: "Reported",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });

    res.status(200).json({
      total: count,
      reports,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

export const approveProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { profileId } = req.params;
    const profile = await UserProfile.findByPk(Number(profileId));
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    await profile.update({
      approvalStatus: "approved",
      moderationReason: null,
    });
    res.status(200).json({ message: "Profile approved" });
  } catch (error) {
    res.status(500).json({ message: "Error approving profile" });
  }
};

export const rejectProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { profileId } = req.params;
    const { reason } = req.body;
    const profile = await UserProfile.findByPk(Number(profileId));
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    await profile.update({
      approvalStatus: "rejected",
      moderationReason: reason,
    });
    res.status(200).json({ message: "Profile rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting profile" });
  }
};

export const approvePhoto = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { photoId } = req.params;
    const photo = await UserPhoto.findByPk(Number(photoId));
    if (!photo) {
      res.status(404).json({ message: "Photo not found" });
      return;
    }
    await photo.update({ approvalStatus: "approved" });
    res.status(200).json({ message: "Photo approved" });
  } catch (error) {
    res.status(500).json({ message: "Error approving photo" });
  }
};

export const rejectPhoto = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { photoId } = req.params;
    const photo = await UserPhoto.findByPk(Number(photoId));
    if (!photo) {
      res.status(404).json({ message: "Photo not found" });
      return;
    }
    await photo.update({ approvalStatus: "rejected" });
    res.status(200).json({ message: "Photo rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting photo" });
  }
};
