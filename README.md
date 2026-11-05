# PasteApp 📝

A full-stack web application to create, manage, and share text snippets easily. PasteApp provides a simple way to store text content and access it whenever needed.

## 🚀 Live Demo

- **Frontend:** https://paste-app-v2-omega.vercel.app
- **Backend API:** https://pasteapp-v2.onrender.com

## ✨ Features

- 🔐 User registration and login
- 👤 User account management
- 📝 Create and manage text snippets
- 📋 Store and retrieve pasted content
- 📧 Welcome email after registration (demo configuration)
- 🌐 Deployed frontend and backend

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer / Resend for email delivery

**Deployment**
- Vercel — Frontend
- Render — Backend
- MongoDB — Database

## 📂 Project Structure

```text
PasteApp.V2/
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
└── README.md
```

*The exact folder structure may vary depending on the current project files.*

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/shagunxv/PasteApp.V2.git
cd PasteApp.V2
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

Replace the placeholder values with your own credentials. Configure email variables according to the email service used in your current code.

### 3. Start the backend

```bash
npm start
```

If no start script is configured, check `backend/package.json` for the appropriate command.

### 4. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal.

## 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT authentication |
| `RESEND_API_KEY` | API key for Resend email delivery |

Only configure variables that are actually referenced by your current application. Never commit `.env` files or expose API keys, database credentials, or JWT secrets in a public repository.

## 📧 Email Configuration

PasteApp includes a welcome email feature for registration.

The current demo email configuration uses Resend's test sender. Test-mode restrictions may limit delivery to the email address associated with the Resend account. Sending emails to arbitrary recipients may require a verified sending domain and compliance with the provider's requirements.

## 🔒 Security Notes

- Keep credentials in environment variables.
- Do not upload `.env` files to GitHub.
- Use strong, unique JWT secrets.
- Validate user input on the backend.
- Never expose private API keys in frontend code.

## 🎯 Future Improvements

- Email verification for new accounts
- Password reset functionality
- Improved error handling and form validation
- Search and filtering for saved snippets
- Automated API testing
- Responsive UI improvements

## 👩‍💻 Author

**Shagun Ojha**

- GitHub: https://github.com/shagunxv
- LinkedIn: https://www.linkedin.com/in/shagun-ojha-ab7594352

---

If you find this project useful, feel free to explore the repository and share feedback.

**Built with ❤️ by Shagun Ojha**
