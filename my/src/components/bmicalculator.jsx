import React, { useState } from "react";

function getBmiInfo(bmi) {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      colorClass: "yellow",
      tips: [
        "Eat more frequently with nutrient-dense snacks (nuts, yogurt, smoothies).",
        "Include protein in every meal (eggs, legumes, fish, poultry).",
        "Do strength training 2–3×/week to build lean mass.",
        "Don’t skip breakfast; add whole grains and healthy fats.",
      ],
    };
  }
  if (bmi < 25) {
    return {
      label: "Normal weight",
      colorClass: "green",
      tips: [
        "Maintain a balanced plate: veggies, lean protein, whole grains, healthy fats.",
        "Stay active ~150 min/week; add 1–2 strength sessions.",
        "Prioritize sleep (7–9 hrs) and stress management.",
        "Do periodic habit check-ins to stay consistent.",
      ],
    };
  }
  if (bmi < 30) {
    return {
      label: "Overweight",
      colorClass: "red",
      tips: [
        "Cut back on sugary drinks and ultra-processed snacks.",
        "Prioritize protein + fiber to keep you full.",
        "Aim for 150–300 min/week cardio + 2× strength.",
        "Use smaller plates and track portions for a bit.",
      ],
    };
  }
  return {
    label: "Obesity",
    colorClass: "red",
    tips: [
      "Consult a healthcare professional for a tailored plan.",
      "Focus on whole foods; limit refined sugars and alcohol.",
      "Build a routine: daily steps + progressive strength.",
      "Set gradual goals (e.g., 0.25–0.5 kg/week).",
    ],
  };
}

export default function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("");   // user input (cm)
  const [weightKg, setWeightKg] = useState("");   // user input (kg)
  const [bmi, setBmi] = useState(null);           // computed BMI number
  const [categoryInfo, setCategoryInfo] = useState(null); // {label,colorClass,tips}
  const [error, setError] = useState("");         // validation message

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);

    if (Number.isNaN(h) || Number.isNaN(w)) {
      setError("Please enter valid numbers for height and weight.");
      setBmi(null);
      setCategoryInfo(null);
      return;
    }
    if (h <= 0 || w <= 0) {
      setError("Height and weight must be greater than zero.");
      setBmi(null);
      setCategoryInfo(null);
      return;
    }

    const heightM = h / 100;
    const bmiValue = w / (heightM * heightM);
    const rounded = Number(bmiValue.toFixed(1));

    setBmi(rounded);
    setCategoryInfo(getBmiInfo(rounded));
  }

  function handleReset() {
    setHeightCm("");
    setWeightKg("");
    setBmi(null);
    setCategoryInfo(null);
    setError("");
  }

  return (
    <section className="card">
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            type="number"
            min="0"
            step="0.1"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g., 170"
            inputMode="decimal"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            min="0"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="e.g., 65"
            inputMode="decimal"
            required
          />
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="actions">
          <button type="submit">Calculate BMI</button>
          <button type="button" className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {bmi !== null && categoryInfo && (
        <div className={`result ${categoryInfo.colorClass}`} aria-live="polite">
          <p className="result-line"><strong>Your BMI:</strong> {bmi}</p>
          <p className="result-line"><strong>Category:</strong> {categoryInfo.label}</p>

          <div className="tips">
            <strong>Tips:</strong>
            <ul>
              {categoryInfo.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}