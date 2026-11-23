# Certificate Portal

## About the Project
Certificate Portal is a web-based application designed to simplify the process of requesting and managing college certificates. Students can submit certificate requests and track their status, while administrators can manage and process requests.

## Features

### Student Module
- Student registration and login.
- Request Bonafide and Study Certificates.
- Specify the purpose and number of copies.
- Track certificate request status.
- View administrator remarks.

### Admin Module
- Admin login.
- View all student certificate requests.
- Manage certificate requests.
- Approve or reject requests.
- Update request status.
- Provide remarks.

## Technologies Used

**Frontend**
- React.js
- Vite
- HTML
- CSS
- JavaScript
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

**Database**
- MongoDB
- Mongoose

## Installation and Setup

### Clone the Repository
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Application Workflow
1. Students register and log in.
2. Students submit certificate requests.
3. Administrators view submitted requests.
4. Administrators approve or reject requests.
5. Students track their request status.

## Security
- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected routes.
- Role-based access control.

## Future Enhancements
- Email notifications.
- PDF certificate generation.
- Improved dashboard and analytics.

## Author
Developed as a College Project