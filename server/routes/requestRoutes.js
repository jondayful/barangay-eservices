const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", requestController.createRequest);
router.get("/", requestController.getMyRequests);

router.get("/admin/all", requestController.getAllRequests);
router.put("/:id", requestController.updateStatus);

module.exports = router;
