import { Router } from "express";
import {
  getDashboardStats,
  getUsers,
  getPayments,
  updateUserStatus,
} from "../controllers/adminController";
import {
  getPendingApprovals,
  getReports,
  approveProfile,
  rejectProfile,
  approvePhoto,
  rejectPhoto,
} from "../controllers/moderationController";
import {
  getCasteRequests,
  approveCasteRequest,
  rejectCasteRequest,
  mergeCasteRequest,
  getSubcasteRequests,
  approveSubcasteRequest,
  rejectSubcasteRequest,
  mergeSubcasteRequest,
} from "../controllers/casteRequestController";
import {
  listTables,
  getTableData,
  createRow,
  updateRow,
  deleteRow,
} from "../controllers/dbAdminController";
import { protect, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

// All routes here require admin privileges
router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);
router.get("/users", getUsers);
router.get("/payments", getPayments);
router.patch("/users/:userId/status", updateUserStatus);

// Moderation
router.get("/reports", getReports);
router.get("/moderation/pending", getPendingApprovals);
router.patch("/moderation/profile/:profileId/approve", approveProfile);
router.patch("/moderation/profile/:profileId/reject", rejectProfile);
router.patch("/moderation/photo/:photoId/approve", approvePhoto);
router.patch("/moderation/photo/:photoId/reject", rejectPhoto);

// Caste / Subcaste moderation
router.get("/caste-requests", getCasteRequests);
router.patch("/caste-requests/:id/approve", approveCasteRequest);
router.patch("/caste-requests/:id/reject", rejectCasteRequest);
router.patch("/caste-requests/:id/merge", mergeCasteRequest);

router.get("/subcaste-requests", getSubcasteRequests);
router.patch("/subcaste-requests/:id/approve", approveSubcasteRequest);
router.patch("/subcaste-requests/:id/reject", rejectSubcasteRequest);
router.patch("/subcaste-requests/:id/merge", mergeSubcasteRequest);

// Generic DB management (browse / add / edit / delete any table)
router.get("/db/tables", listTables);
router.get("/db/tables/:table", getTableData);
router.post("/db/tables/:table", createRow);
router.put("/db/tables/:table", updateRow);
router.delete("/db/tables/:table", deleteRow);

export default router;
