import React from "react";
import BmiCalculator from "./components/bmicalculator.jsx";

export default function App() {
  return (
    <main className="container">
      <h1 className="title">BMI Calculator</h1>
      <BmiCalculator />
      <footer className="footer">
        <small>Using metric units. BMI = kg / m²</small>
      </footer>
    </main>
  );
}