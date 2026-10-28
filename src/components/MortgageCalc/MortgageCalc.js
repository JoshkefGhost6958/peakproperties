"use client";

import { useState } from "react";
import styles from "./MortgageCalc.module.css";

const PROGRAMS = [
  { id: "family", name: "Family Mortgage (6%)", rate: 0.06 },
  { id: "it", name: "IT Specialists (6%)", rate: 0.06 },
  { id: "standard", name: "Standard Bank (18%)", rate: 0.18 },
];

export default function MortgageCalc({ onApplyMortgage }) {
  const [propertyPrice, setPropertyPrice] = useState(140000); // USD
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [termYears, setTermYears] = useState(25); // 25 years
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0]);

  // Calculations
  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = selectedProgram.rate / 12;
  const totalMonths = termYears * 12;

  // Annuity monthly payment formula
  const monthlyPayment = Math.round(
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const formatUsd = (num) =>
    "$" + num.toLocaleString("en-US");

  return (
    <section className={styles.section} id="mortgage">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>FINANCING</span>
          <h2 className={styles.heading}>
            Mortgage & Financing Calculator
          </h2>
          <p className={styles.subheading}>
            Calculate your monthly payment with subsidized preferential rates
            from partner federal banks.
          </p>
        </div>

        <div className={styles.calcGrid}>
          {/* Left Controls */}
          <div className={styles.controlsCol}>
            {/* Program selection */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Select Loan Program</label>
              <div className={styles.programSelector}>
                {PROGRAMS.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    className={`${styles.programBtn} ${
                      selectedProgram.id === prog.id
                        ? styles.programBtnActive
                        : ""
                    }`}
                    onClick={() => setSelectedProgram(prog)}
                  >
                    {prog.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Price Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Property Value</span>
                <span className={styles.controlValue}>
                  {formatUsd(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min="98000"
                max="350000"
                step="5000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLimits}>
                <span>$98,000</span>
                <span>$350,000</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Initial Down Payment</span>
                <span className={styles.controlValue}>
                  {downPaymentPercent}% ({formatUsd(downPaymentAmount)})
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLimits}>
                <span>15%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Loan Term Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Loan Duration</span>
                <span className={styles.controlValue}>{termYears} years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLimits}>
                <span>5 years</span>
                <span>30 years</span>
              </div>
            </div>
          </div>

          {/* Right Summary Box */}
          <div className={styles.resultCol}>
            <div>
              <span className={styles.resultTitle}>Estimated Monthly Payment</span>
              <div className={styles.monthlyPayment}>
                {formatUsd(monthlyPayment)}
                <span style={{ fontSize: "18px", fontWeight: "500", opacity: 0.8 }}>
                  /mo
                </span>
              </div>
              <div className={styles.paymentSubtitle}>
                Rate: {(selectedProgram.rate * 100).toFixed(0)}% APR fixed
              </div>
            </div>

            <div className={styles.resultStats}>
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Financed Loan Amount:</span>
                <span className={styles.resultRowVal}>{formatUsd(loanAmount)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Required Down Payment:</span>
                <span className={styles.resultRowVal}>{formatUsd(downPaymentAmount)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Recommended Min. Income:</span>
                <span className={styles.resultRowVal}>{formatUsd(Math.round(monthlyPayment * 1.8))}/mo</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.applyBtn}
              onClick={() => onApplyMortgage(selectedProgram.name, monthlyPayment)}
            >
              Get Pre-Approved for Mortgage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
