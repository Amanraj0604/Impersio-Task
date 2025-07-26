# Impersio Task - Node.js Backend API

A Node.js backend project built with **Express.js**, **SQL (Sequelize ORM)**, and **JWT Authentication**, supporting role-based access for three user types: **Admin**, **Client**, and **Partner**.  
Hosted on Render: [https://impersio-task-1.onrender.com](https://impersio-task-1.onrender.com)

---

## 🚀 Features

- User Registration with Role (Admin, Client, Partner)
- User Login with JWT token
- Role-based access control
- Secure password storage with bcrypt
- RESTful API structure
- Hosted live on Render

---

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MYSQL** 
- **JWT (JSON Web Tokens)**
- **Bcrypt**
- **Render** for cloud deployment

---

## 🔐 Roles Supported

- `admin`
- `client`
- `partner`

These roles are assigned during registration and are protected via JWT-based access middleware.

---

## 📬 API Endpoints

### ✅ Register (Sign Up)

**URL:**  
`POST https://impersio-task-1.onrender.com/api/auth/signup`

**Headers:**  
`Content-Type: application/json`

**Body (JSON):**

```json
{
  "username": "Mansi",
  "email": "mansi@gmail.com",
  "phone": "9807987289",
  "password": "Aman@0604",
  "role": "partner"
}
```
### 🔐 Login

**Method:** `GET`  
**URL:**  
`https://impersio-task-1.onrender.com/api/auth/login`


**Body (JSON):**

```json
{
    "email": "amanraj@visiblegain.in",
    "password": "Aman@0604"
}
```

### 📩 Send OTP (Forgot Password)

**Method:** `POST`  
**URL:**  
`https://impersio-task-1.onrender.com/api/auth/send-otp`

**Headers:**  
`Content-Type: application/json`

**Request Body (JSON):**

```json
{
  "email": "amanraj@visiblegain.in"
}
```
### 🔄 Update Password (via OTP)

**Method:** `PUT`  
**URL:**  
`https://impersio-task-1.onrender.com/api/auth/update-password`

**Headers:**  
`Content-Type: application/json`

**Request Body (JSON):**

```json
{
  "email": "discussiondesk413@gmail.com",
  "otp": "697135",
  "newPassword": "Visi@1212"
}
```
### 👥 Get All Users (Admin Only)

**Method:** `GET`  
**URL:**  
`https://impersio-task-1.onrender.com/api/auth/all-users`

**Description:**  
Returns the list of all registered users. Only accessible to users with the `admin` role.

**Example Response:**

```json
{
  "message": "Users fetched successfully",
  "users": [
    {
      "userId": 1,
      "username": "Aman Raj",
      "email": "amanraj@visiblegain.in",
      "phone": "9876543210",
      "emailVerified": true,
      "role": "admin",
      "createdAt": "2025-07-24T17:50:00.000Z",
      "updatedAt": "2025-07-25T11:47:17.000Z"
    },
    {
      "userId": 2,
      "username": "Discussion Desk",
      "email": "discussiondesk413@gmail.com",
      "phone": "9991112233",
      "emailVerified": true,
      "role": "partner",
      "createdAt": "2025-07-25T15:23:57.000Z",
      "updatedAt": "2025-07-26T11:14:17.000Z"
    },
    ...
  ],
  "totalUsers": 9
}
```
### ✏️ Update User Details (Admin Only)

**Method:** `PUT`  
**URL:**  
`https://impersio-task-1.onrender.com/api/auth/update-user`


**Request Body (JSON):**

```json
{
  "username": "raman",
  "email": "raman@gmail.com",
  "phone": "768965434",
  "role": "partner"
}
```

### 📁 Upload Portfolio (Partner Only)

**Method:** `POST`  
**URL:**  
`https://impersio-task-1.onrender.com/api/partner/portfolio`



**Request Body (JSON):**

```json
{
  "id": 1,
  "fullName": "Aman Raj",
  "email": "discussiondesk413@gmail.com",
  "phone": "9876543210",
  "serviceCategory": "Photography",
  "city": "Delhi",
  "aadharNumber": "123456789012",
  "documentUrl": "https://example.com/docs/aman-aadhar.pdf",
  "samplePortfolio": "https://example.com/aman-portfolio"
}
```
