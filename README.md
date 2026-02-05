# 🚗 Parking Management System (MERN)

A full-stack Parking Management System built using the MERN stack.  
The application allows users to book parking slots, calculate billing based on parking duration, and download invoices. Admin users can manage bookings and force exit vehicles.

---

## ✨ Features

### 👤 User Features
- User registration & login (JWT authentication)
- View available parking slots
- Book parking slots
- Exit parking with automatic billing
- Download parking invoice (PDF)
- Dark / Light mode UI

### 🧑‍💼 Admin Features
- Admin dashboard with statistics
- View all bookings
- Force exit active parking
- Billing calculation on admin exit

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## ⏱ Billing Logic

- 🚗 Car: ₹20 per hour  
- 🏍 Bike: ₹10 per hour  
- Minimum charge: 1 hour  
- Partial hours are rounded up  

---

## 📂 Project Structure

