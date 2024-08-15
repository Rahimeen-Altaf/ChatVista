# ChatVista

ChatVista is a modern, full-featured chat application built using the MERN stack (MongoDB, Express, React, Node.js). It features real-time messaging, robust user management, and dynamic group chat functionalities. The frontend is designed with React, styled using Material UI (MUI), and state management is handled by Redux Toolkit. The backend is powered by Node.js and Express, with deployments on Railway (backend) and Vercel (frontend), and a custom domain configured via Namecheap.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Messaging:** Instant messaging capabilities with Socket.io.
- **Real-Time Notifications:** Push notifications using Socket.io.
- **User Authentication & Authorization:** Secure login and signup with JWT.
- **Group Chats & Direct Messaging:** Create and manage group chats or engage in one-on-one conversations.
- **Admin Dashboard:** 
  - **User Management:** View and manage all users.
  - **Message Management:** Access and manage all messages.
  - **Chats Management:** Overview and control of group and direct chats.
  - **Data Visualization:** Monitor activity with interactive Doughnut and Line Charts.
- **Group Chat Admin Features:**
  - Edit group names.
  - Add or remove members.
  - Delete group chats.
- **Media & File Sharing:** Seamlessly share files and media within chats.
- **Responsive Design:** Optimized for both desktop and mobile using Material UI.
- **Interactive Data Visualizations:** Charts powered by Chart.js to display user and message statistics.
- **SEO Optimization:** Enhanced search engine visibility with React Helmet Async.

## Tech Stack

### Frontend:
- **React** (18.3.1) for building user interfaces.
- **Material UI (MUI):** Component library for responsive and customizable designs.
- **Redux Toolkit (2.2.6):** For state management.
- **React Router DOM (6.24.0):** For routing and navigation.
- **Socket.io Client (4.7.5):** Enables real-time communication.
- **Framer Motion:** Provides smooth animations.

### Backend:
- **Node.js** and **Express.js:** For server-side operations.
- **MongoDB:** NoSQL database for storing data.
- **Socket.io:** Manages real-time, bidirectional communication and notifications.
- **bcrypt:** For hashing passwords.
- **jsonwebtoken (JWT):** Secure token-based authentication.
- **Multer:** Middleware for handling file uploads.
- **Cloudinary:** Cloud-based image and video management.
- **UUID:** Generates unique identifiers.

### Deployment:
- **Frontend:** Hosted on Vercel.
- **Backend:** Deployed on Railway.
- **Domain:** Custom domain setup via Namecheap.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rahimeen-Altaf/ChatVista.git
   cd ChatVista
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   # For the frontend
   cd client
   npm install
   
   # For the backend
   cd ../backend
   npm install
   ```

3. **Start the development servers:**
   - **Frontend:**
     ```bash
     cd client
     npm run dev
     ```
   - **Backend:**
     ```bash
     cd ../backend
     npm run dev
     ```

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```bash
# Backend
MONGO_URI=<your-mongodb-uri>
PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
ADMIN_SECRET_KEY=<your-admin-secret-key>
NODE_ENV=<your_node_env>
CLIENT_URL=<your-client_url>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# Frontend
VITE_SERVER=<your-backend-api-url>
```

## Scripts

### Frontend

- `npm run dev` - Starts the frontend development server.
- `npm run build` - Builds the frontend for production.
- `npm run lint` - Lints the project for errors.
- `npm run preview` - Previews the built frontend.

### Backend

- `npm run start` - Runs the backend server.
- `npm run dev` - Starts the backend server in development mode.

## Deployment

### Backend (Railway)
1. Deploy your backend to [Railway](https://chatapp-production-a445.up.railway.app).
2. Set up the necessary environment variables in Railway.

### Frontend (Vercel)
1. Deploy your frontend to [Vercel](https://www.chatvista.rahh.me/).
2. Set up your custom domain through Namecheap.

## Contributing

Contributions are welcome! Feel free to open a Pull Request or report an issue.

## License

This project is licensed under the MIT License.
