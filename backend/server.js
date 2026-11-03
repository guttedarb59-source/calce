
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Calculation = require("./models/Calculation");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((error) => console.log(error));

// Test route
app.get("/", (req, res) => {
    res.send("Calculator Backend is Running!");
});

// Calculate and save result
app.post("/calculate", async (req, res) => {
    try {
        const { num1, num2, operator } = req.body;

        const a = Number(num1);
        const b = Number(num2);

        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            return res.status(400).json({
                message: "Invalid numbers"
            });
        }

        let result;

        switch (operator) {
            case "+":
                result = a + b;
                break;

            case "-":
                result = a - b;
                break;

            case "*":
                result = a * b;
                break;

            case "/":
                if (b === 0) {
                    return res.status(400).json({
                        message: "Cannot divide by zero"
                    });
                }
                result = a / b;
                break;

            default:
                return res.status(400).json({
                    message: "Invalid operator"
                });
        }

        const calculation = new Calculation({
            num1: a,
            num2: b,
            operator,
            result
        });

        await calculation.save();

        res.json({
            result,
            message: "Calculation saved successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
