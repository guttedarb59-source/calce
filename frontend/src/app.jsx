
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const handleNumber = (value) => {
    setError("");

    if (waiting) {
      setDisplay(value);
      setWaiting(false);
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  const handleDecimal = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op) => {
    setFirstNumber(Number(display));
    setOperator(op);
    setWaiting(true);
    setError("");
  };

  const clear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaiting(false);
    setError("");
  };

  const deleteLast = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const calculate = async () => {
    if (firstNumber === null || !operator || waiting) return;

    try {
      setError("");

      const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: firstNumber,
          num2: Number(display),
          operator,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Calculation failed");
        return;
      }

      const expression =
        `${firstNumber} ${operator} ${display} = ${data.result}`;

      setDisplay(String(data.result));
      setHistory((old) => [expression, ...old]);

      setFirstNumber(null);
      setOperator(null);
      setWaiting(true);
    } catch {
      setError("Backend connection failed! Please check your server.");
    }
  };

  const buttons = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", ""],
  ];

  const handleClick = (btn) => {
    if (btn === "") return;

    if (btn >= "0" && btn <= "9" && btn.length === 1) {
      handleNumber(btn);
    } else if (btn === ".") {
      handleDecimal();
    } else if (btn === "C") {
      clear();
    } else if (btn === "⌫") {
      deleteLast();
    } else if (btn === "%") {
      setDisplay(String(Number(display) / 100));
    } else if (btn === "=") {
      calculate();
    } else {
      const op = btn === "×" ? "*" : btn === "÷" ? "/" : btn;
      handleOperator(op);
    }
  };

  return (
    <div className="page">
      <div className="calculator">

        <div className="heading">
          <div className="logo">✦</div>
          <h1>SMART CALCULATOR</h1>
          <p>Next Generation Calculation Experience</p>
        </div>

        <div className="display-box">
          <span className="display-label">DISPLAY</span>
          <div className="display">{display}</div>
        </div>

        <div className="buttons">
          {buttons.flat().map((btn, index) => (
            <button
              key={index}
              onClick={() => handleClick(btn)}
              disabled={btn === ""}
              className={
                ["+", "-", "×", "÷", "="].includes(btn)
                  ? "operator"
                  : ["C", "⌫", "%"].includes(btn)
                  ? "special"
                  : btn === ""
                  ? "empty"
                  : "number"
              }
            >
              {btn}
            </button>
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <div className="history">
          <div className="history-heading">
            <h3>Calculation History</h3>
            <button
              className="clear-history"
              onClick={() => setHistory([])}
            >
              Clear
            </button>
          </div>

          {history.length === 0 ? (
            <p className="empty-history">
              Your calculations will appear here.
            </p>
          ) : (
            history.map((item, index) => (
              <p className="history-item" key={index}>
                {item}
              </p>
            ))
          )}
        </div>

        <div className="footer">
          <span>REACT</span> • <span>NODE.JS</span> • <span>MONGODB</span>
        </div>

      </div>
    </div>
  );
}

export default App;
