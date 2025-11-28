const Request = require("../models/Request");
const User = require("../models/User");
const sendEmail = require("../services/emailService");

exports.createRequest = async (req, res) => {
  try {
    const { docType, purpose, pickup } = req.body;
    const userId = req.user.id;

    const newRequest = await Request.create({
      UserId: userId,
      docType,
      purpose,
      pickup,
    });

    const user = await User.findByPk(userId);

    const emailSubject = `New Document Request: ${docType}`;
    const emailBody = `
            <h3>New Request Received</h3>
            <p><strong>Resident:</strong> ${user.firstName} ${user.lastName}</p>
            <p><strong>Contact:</strong> ${user.phone || "N/A"}</p>
            <p><strong>Document:</strong> ${docType}</p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Preferred Pickup:</strong> ${pickup || "Walk-in"}</p>
            <br/>
            <p>Please login to the admin dashboard to process this request.</p>
        `;

    sendEmail(process.env.STAFF_EMAIL, emailSubject, emailBody);

    res
      .status(201)
      .json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating request", error: error.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await Request.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [
        { model: User, attributes: ["firstName", "lastName", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all requests" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByPk(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status} successfully` });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating status" });
  }
};
