import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  Religion,
  Caste,
  Subcaste,
  CasteRequest,
  SubcasteRequest,
} from "../models/sequelize";

const REQUEST_USER_ATTRS = ["id", "firstName", "lastName", "email", "mobile"];

// ---------------- Caste requests ----------------

export const getCasteRequests = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const status = (req.query.status as string) || "Pending";
    const requests = await CasteRequest.findAll({
      where: { status },
      include: [
        { model: User, attributes: REQUEST_USER_ATTRS },
        { model: Religion, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get caste requests error:", error);
    res.status(500).json({ message: "Error fetching caste requests" });
  }
};

export const approveCasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await CasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }

    // Reuse an existing caste with the same name if it appeared meanwhile.
    let caste = await Caste.findOne({
      where: { religionId: request.religionId, name: request.name },
    });
    if (!caste) {
      caste = await Caste.create({
        religionId: request.religionId,
        name: request.name,
      });
    }

    await request.update({ status: "Approved", reviewedBy: req.user!.id });
    // Link the requesting user's profile to the newly available caste.
    await UserProfile.update(
      { casteId: caste.id },
      { where: { userId: request.userId } },
    );

    res.status(200).json({ message: "Caste approved", caste });
  } catch (error) {
    console.error("Approve caste request error:", error);
    res.status(500).json({ message: "Error approving caste request" });
  }
};

export const rejectCasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await CasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }
    await request.update({ status: "Rejected", reviewedBy: req.user!.id });
    res.status(200).json({ message: "Caste request rejected" });
  } catch (error) {
    console.error("Reject caste request error:", error);
    res.status(500).json({ message: "Error rejecting caste request" });
  }
};

export const mergeCasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await CasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }

    const targetCasteId = Number(req.body.casteId);
    const caste = await Caste.findByPk(targetCasteId);
    if (!caste) {
      res.status(400).json({ message: "Target caste not found" });
      return;
    }

    await request.update({
      status: "Approved",
      reviewedBy: req.user!.id,
      mergedIntoCasteId: caste.id,
    });
    await UserProfile.update(
      { casteId: caste.id },
      { where: { userId: request.userId } },
    );

    res.status(200).json({ message: "Caste request merged", caste });
  } catch (error) {
    console.error("Merge caste request error:", error);
    res.status(500).json({ message: "Error merging caste request" });
  }
};

// ---------------- Subcaste requests ----------------

export const getSubcasteRequests = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const status = (req.query.status as string) || "Pending";
    const requests = await SubcasteRequest.findAll({
      where: { status },
      include: [
        { model: User, attributes: REQUEST_USER_ATTRS },
        { model: Caste, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get subcaste requests error:", error);
    res.status(500).json({ message: "Error fetching subcaste requests" });
  }
};

export const approveSubcasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await SubcasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }

    let subcaste = await Subcaste.findOne({
      where: { casteId: request.casteId, name: request.name },
    });
    if (!subcaste) {
      subcaste = await Subcaste.create({
        casteId: request.casteId,
        name: request.name,
      });
    }

    await request.update({ status: "Approved", reviewedBy: req.user!.id });
    await UserProfile.update(
      { subcasteId: subcaste.id },
      { where: { userId: request.userId } },
    );

    res.status(200).json({ message: "Subcaste approved", subcaste });
  } catch (error) {
    console.error("Approve subcaste request error:", error);
    res.status(500).json({ message: "Error approving subcaste request" });
  }
};

export const rejectSubcasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await SubcasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }
    await request.update({ status: "Rejected", reviewedBy: req.user!.id });
    res.status(200).json({ message: "Subcaste request rejected" });
  } catch (error) {
    console.error("Reject subcaste request error:", error);
    res.status(500).json({ message: "Error rejecting subcaste request" });
  }
};

export const mergeSubcasteRequest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const request = await SubcasteRequest.findByPk(Number(req.params.id));
    if (!request || request.status !== "Pending") {
      res.status(404).json({ message: "Pending request not found" });
      return;
    }

    const targetSubcasteId = Number(req.body.subcasteId);
    const subcaste = await Subcaste.findByPk(targetSubcasteId);
    if (!subcaste) {
      res.status(400).json({ message: "Target subcaste not found" });
      return;
    }

    await request.update({
      status: "Approved",
      reviewedBy: req.user!.id,
      mergedIntoSubcasteId: subcaste.id,
    });
    await UserProfile.update(
      { subcasteId: subcaste.id },
      { where: { userId: request.userId } },
    );

    res.status(200).json({ message: "Subcaste request merged", subcaste });
  } catch (error) {
    console.error("Merge subcaste request error:", error);
    res.status(500).json({ message: "Error merging subcaste request" });
  }
};
