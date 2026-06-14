import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../models/sequelize/User";
import { UserProfile } from "../models/sequelize/UserProfile";
import { env } from "../config/env";
import { sequelize } from "../config/db.postgres";
import { Badge } from "../models/sequelize/Badge";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const {
      email,
      password,
      createdFor,
      firstName,
      lastName,
      gender,
      mobile,
      dob,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const normalizedCreatedFor = [
      "Self",
      "Parent",
      "Guardian",
      "Friend",
      "Sister",
      "Brother",
      "Daughter",
      "Son",
      "Relative",
    ].includes(createdFor)
      ? createdFor
      : "Self";

    // Only one "Self" profile is allowed per phone number. Profiles created
    // on behalf of others (Daughter, Son, etc.) are exempt from this check.
    if (normalizedCreatedFor === "Self" && mobile) {
      const existingSelfProfile = await User.findOne({
        where: { mobile, createdFor: "Self" },
      });
      if (existingSelfProfile) {
        await transaction.rollback();
        res.status(400).json({
          message:
            "A profile is already registered with this phone number",
        });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      {
        email,
        passwordHash,
        role: "user",
        createdFor: normalizedCreatedFor,
        firstName,
        lastName: lastName || null,
        gender: ["Male", "Female", "Other"].includes(gender) ? gender : "Other",
        mobile,
      },
      { transaction },
    );

    const userProfile = await UserProfile.create(
      {
        userId: newUser.id,
        dob: dob ? new Date(dob) : null,
        profileStrength: 15, // Step 1 gives initial strength
      },
      { transaction },
    );

    // Initial Badge creation
    await Badge.create(
      {
        userProfileId: userProfile.id,
        mobileVerified: true, // Assuming OTP bypass for now or handled via middleware
      },
      { transaction },
    );

    await transaction.commit();

    const token = jsonwebtoken.sign(
      { id: newUser.id, role: newUser.role },
      env.jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error: any) {
    await transaction.rollback();

    // Concurrent registrations can slip past the application-layer check and
    // hit the partial unique index (uniq_users_self_mobile). Map that to the
    // same friendly 400 instead of a generic server error.
    if (
      error?.name === "SequelizeUniqueConstraintError" &&
      (error?.parent?.constraint === "uniq_users_self_mobile" ||
        error?.original?.constraint === "uniq_users_self_mobile")
    ) {
      res.status(400).json({
        message: "A profile is already registered with this phone number",
      });
      return;
    }

    console.error("Register error DETAILED:", {
      message: error.message,
      stack: error.stack,
      payload: req.body,
    });
    res.status(500).json({
      message: "Server error during registration",
      details: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jsonwebtoken.sign(
      { id: user.id, role: user.role },
      env.jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    // Update login tracking
    await user.update({
      lastLoginAt: new Date(),
      ipAddress: req.ip || req.headers["x-forwarded-for"]?.toString() || null,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userReq = (req as any).user;
    if (!userReq) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res
        .status(400)
        .json({ message: "Both current and new passwords are required" });
      return;
    }

    const user = await User.findByPk(userReq.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect current password" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = passwordHash;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error changing password" });
  }
};
