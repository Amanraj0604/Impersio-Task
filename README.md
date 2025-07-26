# Impersio Task - Node.js Backend API

A Node.js backend project built with **Express.js**, **SQL (Sequelize ORM)**, and **JWT Authentication**, supporting role-based access for three user types: **Admin**, **Client**, and **Partner**.  
Hosted on Render: [https://impersio-task-1.onrender.com](https://impersio-task-1.onrender.com)

---

## 🚀 Features

- User Registration with Role (Admin, Client, Partner)
- User Login with JWT token
- Role-based access control
- Secure password storage with bcrypt
- Password Forgot By OTP verification
- User Verification Through Email as well as tshi API https://impersio-task-1.onrender.com/api/admin/verifications by ADMIN
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
## 🛠️ Run Locally (Development Setup)

Follow these steps to run the project locally on your system.

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) or any supported SQL database
- Git (to clone the project)

---

### 🚀 Steps to Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Amanraj0604/Impersio-Task.git
cd your-repo-name

npm install

npm start

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
### Ones the User Registered then admin resive a mail like below screen short
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5f82f70c-e411-4382-8da9-413eef577b31" />

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
### 📋 Get Partner Leads (Auto-assigned)

**Method:** `GET`  
**URL:**  
`https://impersio-task-1.onrender.com/api/partner/leads`


**Description:**  
Fetches the list of **leads automatically assigned** by system based on location and cetegory to the currently logged-in partner by the system.  
Only accessible to authenticated users with the `partner` role.

> 🔐 This route is protected and requires a valid JWT token from a logged-in **partner**.


### 🔄 Update Lead Status (Partner Only)

**Method:** `PUT`  
**URL:**  
`https://impersio-task-1.onrender.com/api/partner/update-leads`

**Request Body (JSON):**

```json
{
  "id": 1,
  "status": "booked"
}
```
### 📝 Create Lead / Inquiry (Client Only)

**Method:** `POST`  
**URL:**  
`https://impersio-task-1.onrender.com/api/lead/inquiry`


**Request Body (JSON):**

```json
{
  "category": "photography",
  "date": "2025-08-30",
  "budget": 15000,
  "city": "Delhi",
  "referenceImageUrl": "https://in.pinterest.com/pin/353532639519963448/"
}
```
### 🛂 Get Partner Verification Requests (Admin Only)

**Method:** `GET`  
**URL:**  
`https://impersio-task-1.onrender.com/api/admin/verifications`



**Description:**  
Fetches a list of **pending, approved, and rejected** partner registration requests. Admins can use the verification or rejection links to approve or reject users.

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "users": [
    {
      "username": "neha",
      "email": "neha@gmail.com",
      "phone": "9876543216",
      "role": "partner",
      "status": "rejected",
      "createdAt": "2025-07-26T08:39:29.000Z",
      "note": "This user has been rejected"
    },
    {
      "username": "Anshika",
      "email": "anshika@gmail.com",
      "phone": "9807687239",
      "role": "partner",
      "status": "pending",
      "createdAt": "2025-07-26T11:51:39.000Z",
      "verificationLink": "https://impersio-task-1.onrender.com/api/auth/signup-verify?userEmail=anshika%40gmail.com",
      "RejectionLink": "https://impersio-task-1.onrender.com/api/admin/reject-user?userEmail=anshika%40gmail.com",
      "note": "Click the above links to either verify or reject this user"
    },
    {
      "username": "Mansi",
      "email": "mansi@gmail.com",
      "phone": "9807987289",
      "role": "partner",
      "status": "rejected",
      "createdAt": "2025-07-26T11:53:22.000Z",
      "note": "This user has been rejected"
    }
  ]
}
```
**After Verify the user Admin Get Response Like :**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e6b034ad-56b9-4f58-afbf-2f249666c7bc" />

**After Reject the user Admin Get Response Like :**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/763c1665-6e07-4eff-b1e9-117346e522a6" />
