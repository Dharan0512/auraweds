import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Notification, User } from "../models/sequelize";
import { Op } from "sequelize";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Only fetch notifications from the last 10 days
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const notifications = await Notification.findAll({
      where: {
        userId: req.user.id,
        createdAt: {
          [Op.gte]: tenDaysAgo,
        },
      },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 100, // Increased limit as we're filtering by date now
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = req.params;
    const notification = await Notification.findOne({
      where: { id, userId: req.user.id },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await notification.save();

    res
      .status(200)
      .json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Server error updating notification" });
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Notification.update(
      { isRead: true },
      { where: { userId: req.user.id, isRead: false } },
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all as read error:", error);
    res.status(500).json({ message: "Server error updating notifications" });
  }
};

export const clearAllNotifications = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Notification.destroy({
      where: { userId: req.user.id },
    });

    res.status(200).json({ message: "All notifications cleared" });
  } catch (error) {
    console.error("Clear all notifications error:", error);
    res.status(500).json({ message: "Server error clearing notifications" });
  }
};
