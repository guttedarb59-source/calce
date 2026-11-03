# 🧮 Smart Calculator

A modern and technology-based calculator developed using the MERN stack. This project performs basic mathematical operations and stores calculation history in MongoDB.

## 🚀 Features

- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)
- Clear and delete functionality
- Displays entered numbers and results
- Calculation history
- Stores calculations in MongoDB
- Modern dark technology-based user interface

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| CSS | User interface design |
| JavaScript | Calculator functionality |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Database |
| Mongoose | Database connectivity |

## 📂 Project Structure

```text
Calce/
├── backend/
│   ├── models/
│   │   └── Calculation.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   └── temp-frontend/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       └── package.json
│
└── .gitignore
```

## ⚙️ Installation and Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/guttedarb59-source/calce.git
```

### Step 2: Backend Setup

```bash
cd calce/backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node server.js
```

### Step 3: Frontend Setup

Open another terminal:

```bash
cd calce/frontend/temp-frontend
npm install
npm run dev
```

Open the local URL shown in the terminal.

## 🔍 Working of the Project

1. Enter numbers using the calculator buttons.
2. Select an arithmetic operator.
3. Enter the second number.
4. Click the equals button.
5. The result is displayed on the screen.
6. The calculation is sent to the backend and stored in MongoDB.

## 🎯 Project Objective

The main objective is to develop a user-friendly Smart Calculator using MERN stack technologies and understand the integration of frontend, backend and database.

## 👩‍💻 Developed By

**Bhavani**

Department of Computer Science and Engineering (CSE)

## ⭐ Future Enhancements

- Scientific calculator operations
- AI-powered calculation assistance
- Voice-based input
- Advanced calculation history
- Improved responsive design

---

**Thank you for visiting my Smart Calculator project!**
