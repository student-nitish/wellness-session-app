const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraftSession,
  publishSession,
} = require("../controllers/Session");


router.get("/sessions", getPublicSessions);


router.get("/my-sessions", auth, getMySessions);
router.get("/my-sessions/:id",auth, getMySessionById);
router.post("/my-sessions/save-draft",auth, saveDraftSession);
router.post("/my-sessions/publish",auth, publishSession);

module.exports = router;
