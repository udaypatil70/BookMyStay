<div align="center">

# BookMyStay

### Premium Hotel Booking Platform

A full-stack hotel reservation system with role-based dashboards, Razorpay payment integration, and admin approval workflows.

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-07263E?style=flat&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Key Features

- **Multi-Role System** -- User, Hotel Owner, and Admin with dedicated dashboards
- **Advanced Search** -- Airbnb-style search with country/state/district drill-down, date range picker, and guest selector
- **Room Management** -- Owners can add, edit, and manage room listings with up to 4 interior photos
- **Availability Check** -- Real-time room availability validation before booking
- **Flexible Payments** -- Pay 50% now, pay 100% now, or pay at hotel via Razorpay integration
- **Partial Payment Tracking** -- Tracks paid vs. remaining amounts with "Pay Remaining" flow
- **Hotel Approval Workflow** -- Admin reviews and approves/rejects hotel registrations with document verification
- **Reviews & Ratings** -- Users can rate and review rooms (1-5 stars)
- **Favourites** -- Save and manage favourite hotels
- **Newsletter & Contact** -- Subscription and contact form submissions managed from admin panel
- **Email Notifications** -- Automated booking confirmations, cancellations, and payment receipts via Brevo SMTP
- **Responsive Design** -- Mobile-first UI with smooth animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router 7, Vite 8, TailwindCSS 4 |
| **Backend** | Express 5, Node.js, ES Modules |
| **Database** | MongoDB (Mongoose 9) |
| **Authentication** | Clerk (sign-in, sign-up, webhooks, role-based access) |
| **Payments** | Razorpay (partial, full, pay-at-hotel) |
| **Image Storage** | Cloudinary |
| **Email** | Nodemailer + Brevo SMTP |
| **Deployment** | Vercel (both frontend and backend) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MongoDB Atlas** account (or local MongoDB)
- **Clerk** account ([clerk.com](https://clerk.com))
- **Razorpay** account ([razorpay.com](https://razorpay.com))
- **Cloudinary** account ([cloudinary.com](https://cloudinary.com))
- **Brevo** account for SMTP ([brevo.com](https://brevo.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/udaypatil70/BookMyStay.git
cd BookMyStay

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../Frontend/client
npm install
```

### Environment Variables

Create `.env` files using the provided examples:

```bash
cp server/.env.example server/.env
cp Frontend/client/.env.example Frontend/client/.env
```

#### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 4000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SENDER_EMAIL` | Email sender address |
| `SMTP_USER` | Brevo SMTP username |
| `SMTP_PASS` | Brevo SMTP password |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |
| `CURRENCY` | Currency symbol (default: `$`) |
| `FRONTEND_URL` | Allowed CORS origins (comma-separated) |
| `NODE_ENV` | `production` or `development` |

#### Client (`Frontend/client/.env`)

| Variable | Description |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `VITE_BACKEND_URL` | Backend API URL (default: `http://localhost:4000`) |
| `VITE_CURRENCY` | Currency symbol |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key for client-side checkout |

### Running Locally

```bash
# Terminal 1 -- Start server
cd server
npm run server          # Dev with nodemon
# or
npm start               # Production

# Terminal 2 -- Start client
cd Frontend/client
npm run dev             # Vite dev server at http://localhost:5173
```

---

## Project Structure

```
BookMyStay/
├── server/                          # Express.js API
│   ├── server.js                    # Entry point
│   ├── src/
│   │   ├── config/                  # DB, Cloudinary, Nodemailer setup
│   │   ├── controllers/             # Route handlers (10 modules)
│   │   ├── middleware/               # Auth, upload, validation
│   │   ├── models/                  # Mongoose schemas (7 models)
│   │   ├── routes/                  # API routes (8 modules)
│   │   └── validations/             # Request validation schemas
│   └── scripts/                     # DB migration scripts
│
└── Frontend/client/                 # React + Vite SPA
    ├── src/
    │   ├── assets/                  # Icons, images, static data
    │   ├── components/              # Reusable UI components
    │   │   ├── Admin/               # Admin panel components
    │   │   └── HotelOwner/          # Owner panel components
    │   ├── context/                 # AppContext (global state)
    │   ├── pages/                   # Page components (13 pages)
    │   │   ├── Admin/               # Admin dashboard pages
    │   │   └── HotelOwner/          # Owner dashboard pages
    │   ├── App.jsx                  # Route definitions
    │   └── main.jsx                 # App bootstrap
    └── vite.config.js
```

---

## API Endpoints

### Public

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/hotels` | Get all hotels |
| `GET` | `/api/rooms` | Get all rooms (supports date filtering) |
| `GET` | `/api/search/rooms` | Search rooms |
| `GET` | `/api/search/cities` | Get available cities |
| `GET` | `/api/reviews/room/:roomId` | Get room reviews |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/newsletter` | Subscribe to newsletter |

### Authenticated (`Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/user` | Get current user |
| `PUT` | `/api/user/profile` | Update profile |
| `POST` | `/api/bookings/book` | Create booking |
| `GET` | `/api/bookings/user` | Get user's bookings |
| `POST` | `/api/bookings/cancel` | Cancel booking |
| `POST` | `/api/bookings/create-razorpay-order` | Create payment order |
| `POST` | `/api/bookings/verify-payment` | Verify Razorpay payment |
| `POST` | `/api/reviews` | Add review |
| `POST` | `/api/user/toggle-favourite` | Toggle favourite hotel |

### Hotel Owner (`ownerGuard`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/hotels/owner/details` | Get owner's hotel |
| `POST` | `/api/hotels` | Register hotel |
| `POST` | `/api/rooms` | Create room |
| `PUT` | `/api/rooms/update` | Update room |
| `DELETE` | `/api/rooms/delete` | Delete room |
| `GET` | `/api/bookings/hotel` | Get hotel bookings |
| `GET` | `/api/bookings/owner/stats` | Get dashboard stats |
| `PUT` | `/api/bookings/status` | Update booking status |

### Admin (`adminGuard`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/stats` | Dashboard statistics |
| `GET` | `/api/admin/users` | Get all users |
| `POST` | `/api/admin/users/role` | Update user role |
| `GET` | `/api/admin/hotels/pending` | Pending hotel approvals |
| `POST` | `/api/admin/hotels/approve` | Approve hotel |
| `POST` | `/api/admin/hotels/reject` | Reject hotel |
| `GET` | `/api/admin/contacts` | Contact submissions |
| `GET` | `/api/admin/newsletter` | Newsletter subscribers |

---

## Database Schema

| Model | Key Fields | Indexes |
|---|---|---|
| **User** | `_id` (Clerk), `username`, `email`, `role`, `favouriteHotels` | -- |
| **Hotel** | `name`, `address`, `owner`, `city`, `status` (pending/active/rejected), `documents[]` | `owner` (unique partial), `status+city` |
| **Room** | `hotel`, `roomType`, `pricePerNight`, `amenities[]`, `images[]`, `isAvailable` | `hotel`, `isAvailable+pricePerNight` |
| **Booking** | `user`, `room`, `hotel`, `checkInDate`, `checkOutDate`, `totalPrice`, `paidAmount`, `paymentOption`, `status` | `user+status`, `room+status+dates` |
| **Review** | `user`, `room`, `hotel`, `rating`, `comment` | `room+user` (unique) |
| **Contact** | `name`, `email`, `phone`, `message`, `isRead` | -- |
| **Newsletter** | `email`, `subscribed` | `email` (unique) |

---

## Security

- **Helmet** -- HTTP security headers
- **Rate Limiting** -- 100 req/15min (general), 20 req/15min (auth routes)
- **CORS** -- Configurable allowed origins
- **Input Validation** -- Custom validation schemas on all endpoints
- **Role-Based Access** -- Middleware guards for user, owner, and admin routes
- **Webhook Verification** -- Svix for Clerk webhook signature validation

---

## Deployment

Both the server and client are configured for **Vercel** deployment.

### Server

The `server/vercel.json` maps all routes to `server.js` as a Node.js serverless function.

### Client

The `Frontend/client/vercel.json` uses SPA rewrite rules so React Router handles client-side routing.

### Environment

Set all environment variables in the Vercel project settings for both deployments. Ensure `FRONTEND_URL` includes your deployed frontend domain for CORS.

---

## Scripts

### Server

```bash
npm run server    # Development with auto-reload (nodemon)
npm start         # Production
```

### Client

```bash
npm run dev       # Vite development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with passion for seamless hotel booking experiences.**

</div>
