# ChatVista

ChatVista is a modern, full-featured chat application built using the MERN stack (MongoDB, Express, React, Node.js). The frontend is designed with React, styled using Material UI (MUI), and state management is handled by Redux Toolkit. The backend is built with Node.js and Express, and the application is deployed on Railway (backend) and Vercel (frontend). The project is also configured with a custom domain from Namecheap.

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

- Real-time messaging using Socket.io
- Real-time notifications using Socket.io
- User authentication and authorization
- Group chats and direct messaging
- Media and file sharing
- Responsive design with Material UI
- Notifications and alerts using React Hot Toast
- Interactive data visualizations using Chart.js
- SEO optimization with React Helmet Async

## Tech Stack

### Frontend:
- **React** (18.3.1)
- **Material UI** (MUI) for component design
- **Redux Toolkit** (2.2.6) for state management
- **React Router DOM** (6.24.0) for routing
- **Socket.io Client** (4.7.5) for real-time communication
- **Framer Motion** for animations

### Backend:
- **Node.js** and **Express.js**
- **MongoDB** for database
- **Socket.io** for real-time bi-directional communication and notifications
- **bcrypt** for password hashing
- **jsonwebtoken** for authentication
- **Multer** for file uploads
- **Cloudinary** for media storage
- **UUID** for unique identifier generation

### Deployment:
- **Frontend:** Vercel
- **Backend:** Railway
- **Domain:** Namecheap

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rahimeen-Altaf/ChatVista.git
   cd ChatVista
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../backend
   npm install
   ```

3. Start the development server:
   ```bash
   cd client
   npm run dev
   ```

4. Start the backend server:
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

- `npm run dev` - Runs the frontend development server.
- `npm run build` - Builds the frontend for production.
- `npm run lint` - Lints the project for any linting errors.
- `npm run preview` - Previews the built frontend.

### Backend

- `npm run start` - Runs the backend server.
- `npm run dev` - Runs the backend in development mode.

## Deployment

### Backend (Railway)
1. Deploy your backend to [Railway](https://chatapp-production-a445.up.railway.app).
2. Set up the environment variables in Railway.

### Frontend (Vercel)
1. Deploy your frontend to [Vercel](https://www.chatvista.rahh.me/).
2. Set up your custom domain from Namecheap.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
