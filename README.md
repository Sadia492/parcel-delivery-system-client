# 📦 ParcelGuru

A **secure, role-based, and user-friendly** frontend application for a **Parcel Delivery System** (similar to Pathao Courier or Sundarban), built with **React.js, Redux Toolkit, and RTK Query**.

This application provides dashboards for **Senders, Receivers, and Admins**, offering seamless parcel management, authentication, and parcel tracking features.

---

## 🚀 Project Overview

- **Public landing pages** with service information
- **Role-based dashboards** with tailored features for Sender, Receiver, and Admin
- **State management & API integration** via Redux Toolkit & RTK Query
- **Responsive & clean UI** styled with Tailwind CSS

This project consumes the backend **Parcel Delivery API** to manage parcels, users, and tracking information.

---

## 🛠 Tech Stack

### **Frontend**

- React (with TypeScript)
- Redux Toolkit + RTK Query (state & API management)
- React Router (routing)
- Tailwind CSS (styling)
- Toast library (notifications)

### **Backend (API)**

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt (authentication & security)

---

## ✨ Features

### 🔓 Public Section

- Home page (service intro)
- About page (mission, services, team)
- Contact page (inquiry form simulation)

### 🔑 Authentication

- Login with JWT
- Register as **Sender** or **Receiver**
- Role-based redirection
- Persisted authentication state
- Logout

### 📤 Sender Dashboard

- Create parcel delivery requests
- Cancel parcels (if not dispatched)
- View created parcels with status logs

### 📥 Receiver Dashboard

- View incoming parcels
- Confirm parcel delivery
- Delivery history

### 👨‍💼 Admin Dashboard

- Manage users (block/unblock)
- Manage parcels (update status, block/unblock)
- Assign delivery personnel (optional)

### 📍 Parcel Tracking

- Unique tracking ID for each parcel
- Search parcels by tracking ID (public/authenticated)
- Status logs with timestamps and notes

### 📊 General & UI/UX

- Role-based navigation menus
- Loading indicators & error handling
- Form validations & advanced filtering
- Pagination for long lists
- Toast notifications
- Dashboard visualizations:

  - Overview cards (total, delivered, pending, cancelled)
  - Bar/pie charts for trends & distribution
  - Paginated parcel tables with actions
  - Timeline view of parcel history

- Fully responsive & accessible design

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sadia492/parcel-delivery-system-client.git
   cd parcel-delivery-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root and add:

   ```env
   VITE_WebApi_URL=https://your-backend-api-url.com
   ```

4. **Run the app locally**

   ```bash
   npm run dev
   ```

---

## ▶️ Usage

- **Public users** can explore landing pages and track parcels using tracking IDs.
- **Senders** can create and manage parcel requests.
- **Receivers** can view and confirm parcels.
- **Admins** can manage users and all parcels.

---

## 🔐 Authentication & Roles

- **Sender** → Can create, cancel, and view their parcels
- **Receiver** → Can confirm deliveries & view incoming parcels
- **Admin** → Can manage users and parcels

Authentication is persisted using **JWT tokens** stored securely.

---

## 🧪 Demo Credentials

You can use the following accounts to explore the dashboards in the live demo:

| Role         | Email / Username  | Password  |
| ------------ | ----------------- | --------- |
| **Admin**    | `zasil@gmail.com` | `zasil12` |
| **Sender**   | `snig@gmail.com`  | `snig12`  |
| **Receiver** | `amina@gmail.com` | `amina12` |

## 🌍 Deployment

- **Frontend Live URL:** [Parcel Delivery Frontend](https://parcel-delivery-system-client.vercel.app/)
- **Backend Live URL:** [Parcel Delivery Backend](https://parcel-delivery-system-server.vercel.app/)

---
