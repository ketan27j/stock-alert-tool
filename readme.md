# NSE/BSE Corporate Announcement Alert Tool

A full-stack web application that alerts traders and investors about corporate announcements from NSE/BSE listed companies.

## Features

✅ User authentication (Register/Login with JWT)
✅ Company search and selection
✅ Create custom alerts for companies
✅ Email notifications for announcements
✅ WhatsApp notifications (premium feature)
✅ Filter announcements by category
✅ Subscription management (₹199/month)
✅ Real-time scraping from NSE/BSE websites
✅ Responsive React frontend with Tailwind CSS

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **MikroORM** - TypeScript ORM
- **MySQL** - Database
- **Passport JWT** - Authentication
- **Nodemailer** - Email service
- **Twilio** - WhatsApp service
- **Razorpay** - Payment gateway
- **Axios & Cheerio** - Web scraping

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Query** - Data fetching
- **React Router** - Navigation
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MySQL 8+
- Gmail account (for SMTP)
- Twilio account (for WhatsApp, optional)
- Razorpay account (for payments)

### Backend Setup

1. **Clone and navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create database**
```sql
CREATE DATABASE nse_alerts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. **Run database migrations**
```bash
npm run migration:up
```

6. **Seed initial companies (optional)**
```bash
npm run seed
```

7. **Start development server**
```bash
npm run start:dev
```

Backend will run on http://localhost:3000

### Frontend Setup

1. **Navigate to frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. **Start development server**
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=mysql://user:password@localhost:3306/nse_alerts
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your-key
```