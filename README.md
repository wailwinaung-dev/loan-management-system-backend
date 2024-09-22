
---

### **README for Backend (Node.js/Express/MongoDB Project)**

# Loan Management System - Backend

This is the backend for the **Loan Management System** project. The backend is built with **Node.js**, **Express**, and **MongoDB**, and provides the RESTful API for managing loans, borrowers, repayments, and schedules.


## Technology Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **TypeScript**: Static typing for JavaScript

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (>=14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)

## Getting Started

1. Clone the repository:

    ```bash
   git clone https://github.com/yourusername/loan-management-backend.git
   cd loan-management-backend

2. Install the dependencies:

   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn install

3. Change values in following:

   ```bash
   PORT=5000
   MONGO_URI={your-mongo-db-url} //eg.http://localhost:27017/loan-management
 
4. Start the server:

   ```bash
   # Using npm
   npm start

   # Or using yarn
   yarn start
