# IntelliPrep AI – An AI-Powered Technical Interview Preparation Platform

## Problem Statement
Job seekers in the technical industry often struggle to find interview questions that are specifically tailored to their target role, experience level, and desired areas of study. Generic question banks fail to provide the focused, personalized practice needed to build confidence and effectively prepare. IntelliPrep AI aims to solve this by leveraging AI to generate custom-fit technical questions and answers, providing a dynamic and personalized preparation experience for every user.

## System Architecture
The project is built on the MERN stack, integrating an external AI service for content generation.
The architecture is as follows:
**Frontend (Client) → Backend (REST API) → Database ↓ AI Service (Gemini API)**

*   **Frontend**: A single-page application (SPA) built with React.js. It handles all user interface elements, routing, and communication with the backend API.
*   **Backend**: A RESTful API built with Node.js and Express.js. It manages business logic, user authentication, and interactions between the frontend, the database, and the AI service.
*   **Database**: A MongoDB non-relational database is used to store user data, interview preparation sessions, and generated questions.
*   **Authentication**: User authentication is handled using JSON Web Tokens (JWT). Upon successful login, a token is issued to the client and sent with subsequent requests to access protected routes.
*   **Hosting**:
    *   **Frontend**: Deployed on a static hosting platform like Vercel or Netlify.
    *   **Backend**: Deployed on a PaaS (Platform as a Service) like Render or Railway.
    *   **Database**: Hosted on a cloud service like MongoDB Atlas.

## Key Features

| Category | Features |
| :--- | :--- |
| **Authentication & Authorization** | - Secure user registration and login system.<br>- JWT-based authentication to protect user-specific data and routes.<br>- User logout functionality to invalidate sessions. |
| **AI-Powered Q&A Generation** | - Create new interview preparation sessions by specifying a job role, experience level, and key topics.<br>- Integrates with the Google Gemini API to generate relevant, beginner-friendly questions and answers in real-time.<br>- "Load More" functionality to dynamically fetch additional questions for an ongoing session. |
| **CRUD Operations (Interview Sessions)** | - **Create**: Users can create new interview prep sessions.<br>- **Read**: View all created sessions on a central dashboard.<br>- **Read (Detailed)**: View the full list of questions and answers within a specific session.<br>- **Delete**: Users can delete entire sessions with a confirmation prompt. |
| **Frontend Routing & UI/UX** | - **Pages**: Home/Landing, Login, Signup, Dashboard, Interview Session Details.<br>- A clean, user-friendly interface built with TailwindCSS.<br>- Collapsible cards for questions to show/hide answers.<br>- Fully mobile-responsive design for access on any device. |
| **Export to Sheets** | - Export interview data to spreadsheets. |

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js |
| **AI** | Google Gemini API |
| **Hosting** | **Frontend**: Vercel, Netlify<br>**Backend**: Render, Railway<br>**Database**: MongoDB Atlas |

## API Overview
Here are some of the core API endpoints for the IntelliPrep AI application:

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | Registers a new user account. | Public |
| `/api/auth/login` | POST | Authenticates a user and returns a JWT. | Public |
| `/api/sessions` | GET | Fetches all interview sessions for the logged-in user. | Authenticated |
| `/api/sessions` | POST | Creates a new interview session and generates initial questions using the AI. | Authenticated |
| `/api/sessions/:id` | GET | Fetches the details and all Q&A for a specific session. | Authenticated |
| `/api/sessions/:id` | DELETE | Deletes a specific interview session. | Authenticated |
| `/api/sessions/:id/more-questions` | POST | Generates and adds more questions to an existing session. | Authenticated |
