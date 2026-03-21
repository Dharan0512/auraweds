import { Response } from "express";
import { Op } from "sequelize";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  Subscription,
  Payment,
  Plan,
} from "../models/sequelize";
import { sequelize } from "../config/db.postgres";

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      activeUsers7Days,
      newSignupsToday,
      paidUsers,
      revenueTodayResult,
    ] = await Promise.all([
      User.count({ where: { role: "user" } }),
      User.count({
        where: {
          role: "user",
          lastLoginAt: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      User.count({
        where: {
          role: "user",
          createdAt: { [Op.gte]: today },
        },
      }),
      Subscription.count({
        where: {
          status: "active",
        },
      }),
      Payment.findOne({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("amount")), "totalToday"],
        ],
        where: {
          paymentStatus: "success",
          createdAt: { [Op.gte]: today },
        },
        raw: true,
      }),
    ]);

    // Distribution
    const tierDistribution = await Subscription.findAll({
      attributes: [
        [sequelize.col("Plan.name"), "tier"],
        [sequelize.fn("COUNT", sequelize.col("Subscription.id")), "count"],
      ],
      where: { status: "active" },
      include: [{ model: Plan, attributes: [] }],
      group: ["Plan.name"],
      raw: true,
    });

    const revenueToday = (revenueTodayResult as any)?.totalToday || 0;

    res.status(200).json({
      stats: {
        totalUsers,
        activeUsers7Days,
        newSignupsToday,
        paidUsers,
        revenueToday,
        tierDistribution,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Error fetching dashboard statistics" });
  }
};

export const getUsers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where: any = { role: "user" };
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { mobile: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UserProfile,
          attributes: ["approvalStatus", "profileStrength"],
        },
        {
          model: Subscription,
          limit: 1,
          order: [["createdAt", "DESC"]],
          include: [Plan],
        },
      ],
    });

    res.status(200).json({
      total: count,
      users,
      currentPage: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateUserStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.update({ isActive });
    res
      .status(200)
      .json({ message: `User ${isActive ? "activated" : "suspended"}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating user status" });
  }
};
