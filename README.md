# 🏛️ BarangayConnect: E-Services Portal

**BarangayConnect** is a modern, full-stack web application designed to digitize local government services. It allows residents to request official documents (Clearances, Certificates of Indigency, Residency) online, track their status, and receive email notifications.

Includes a dedicated **Admin Portal** for barangay staff to manage, approve, or reject requests efficiently.

---

## 🚀 Features

### 👤 **Resident Portal**

- **Secure Authentication:** User registration and login with JWT encryption.
- **Document Requests:** Easy-to-use forms for Barangay Clearance, Indigency, and Residency.
- **Real-time Status:** Track requests (Pending, Approved, Rejected) via a dashboard.
- **Profile Management:** Update contact info and change passwords securely.
- **Forgot Password:** Email-based password reset flow.

### 🛡️ **Admin Portal**

- **Request Management:** View all incoming requests in a centralized table.
- **Status Updates:** Approve or Reject requests with a single click.
- **Filtering:** Filter requests by status (Pending, Approved, Rejected) for easier processing.
- **Role-Based Access:** Protected routes ensure only authorized staff can access admin features.

---

## 🛠️ Tech Stack

### **Frontend**

- **React.js (Vite):** Fast, modern UI library.
- **Tailwind CSS:** Utility-first styling for a clean, responsive design.
- **Lucide React:** Beautiful, lightweight icons.
- **Axios:** For handling API requests.

### **Backend**

- **Node.js & Express:** Robust REST API architecture.
- **MySQL & Sequelize:** Relational database with ORM for safe queries.
- **JSON Web Tokens (JWT):** Stateless authentication mechanism.
- **Nodemailer:** For sending email notifications (Reset Password, Request Updates).
- **Helmet & Rate Limit:** Basic security hardening.

---

## ⚙️ Installation Guide

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/) (XAMPP or Workbench)

### 2. Clone the Repository

```bash
git clone [https://github.com/yourusername/barangay-eservices.git](https://github.com/yourusername/barangay-eservices.git)
cd barangay-eservices
```

### 3. Database Setup

1.  Open your MySQL tool (phpMyAdmin or Workbench).
2.  Create a new empty database named: `barangay_eservices_db`
3.  The tables will be automatically created by Sequelize when you start the server

### 4. Backend Setup

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

**Configure Environment Variables:**
Create a `.env` file inside the `server/` folder:

```env
PORT=5000
# Database Config
DB_HOST=localhost
DB_USER=root
DB_PASS=            # Leave empty if using XAMPP default
DB_NAME=barangay_eservices_db

# Security
JWT_SECRET=your_super_secret_key_here

# Email Service (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
STAFF_EMAIL=admin-email@gmail.com
```

**Start the Server:**

```bash
npm run dev
```

_You should see: `✅ Database & Tables synced!`_

---

### 5. Frontend Setup

Open a new terminal, navigate to the client folder, and install dependencies:

```bash
cd client
npm install
```

**Start the Client:**

```bash
npm run dev
```

_The app will be available at `http://localhost:5173`_

---

## 👥 How to Create an Admin User

By default, all new registrations are `role: 'user'`. To create an Admin:

1.  Register a new account normally via the website.
2.  Open your MySQL Database (e.g., phpMyAdmin).
3.  Go to the `Users` table.
4.  Find your user row and change the `role` column from `'user'` to `'admin'`.
5.  Log out and log back in to access the **Admin Dashboard**.

---

## 📂 Project Structure

```text
barangay-eservices/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Modal, Guards)
│   │   ├── pages/          # Full Pages (Home, Dashboard, Login)
│   │   ├── services/       # API integration (Axios)
│   │   └── main.jsx        # Entry point
│   └── ...
│
└── server/                 # Backend (Express + MySQL)
    ├── config/             # DB Connection
    ├── controllers/        # Logic for Auth and Requests
    ├── middleware/         # Auth protection & Role checks
    ├── models/             # Sequelize Database Schemas
    ├── routes/             # API Endpoints
    └── server.js           # Server Entry Point
```

---

## 🤝 Contributing

Contributions are welcome\!

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
