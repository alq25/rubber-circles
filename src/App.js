// src/App.js
import React from "react";
import RubberCircle from "./RubberCircle.jsx";

export default function App() {
  const circleCount = 1; // number of blob shapes

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg) scale(1); }
            23% { transform: translateY(-28px) rotate(7deg) scale(1.35, 0.65); }
            41% { transform: translateY(-18px) rotate(-3deg) scale(0.65, 1.35); }
            59% { transform: translateY(-22px) rotate(4deg) scale(1.25, 0.75); }
            77% { transform: translateY(-12px) rotate(-5deg) scale(0.75, 1.25); }
            100% { transform: translateY(0) rotate(0deg) scale(1); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes fullCircle {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          
          @keyframes rubberBand {
            0% { transform: scale(1); }
            15% { transform: scale(1.3, 0.7); }
            30% { transform: scale(0.7, 1.3); }
            45% { transform: scale(1.2, 0.8); }
            60% { transform: scale(0.8, 1.2); }
            75% { transform: scale(1.1, 0.9); }
            90% { transform: scale(0.9, 1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes rubberBand2 {
            0% { transform: scale(1); }
            20% { transform: scale(1.4, 0.6); }
            40% { transform: scale(0.6, 1.4); }
            60% { transform: scale(1.3, 0.7); }
            80% { transform: scale(0.7, 1.3); }
            100% { transform: scale(1); }
          }
          
          @keyframes rubberBand3 {
            0% { transform: scale(1); }
            25% { transform: scale(1.5, 0.5); }
            50% { transform: scale(0.5, 1.5); }
            75% { transform: scale(1.2, 0.8); }
            100% { transform: scale(1); }
          }
          
          @keyframes rubberBand4 {
            0% { transform: scale(1); }
            16% { transform: scale(1.6, 0.4); }
            32% { transform: scale(0.4, 1.6); }
            48% { transform: scale(1.4, 0.6); }
            64% { transform: scale(0.6, 1.4); }
            80% { transform: scale(1.1, 0.9); }
            96% { transform: scale(0.9, 1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes rubberBand5 {
            0% { transform: scale(1.7, 0.3); }
            33% { transform: scale(0.3, 1.7); }
            66% { transform: scale(1.5, 0.5); }
            100% { transform: scale(1.7, 0.3); }
          }
        `}
      </style>
      
      {/* Full circle shape in top right */}
      <div
        style={{
          position: "absolute",
          top: "-8%",
          right: "-8%",
          width: 300,
          height: 300,
          animation: "fullCircle 8s linear infinite",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((layer) => (
          <div
            key={layer}
            style={{
              position: "absolute",
              width: 300 - layer * 25,
              height: 300 - layer * 25,
              top: (layer * 25) / 2 + (layer * 4),
              left: (layer * 25) / 2 + (layer * 3),
              border: `6px solid #FF69B4`,
              borderRadius: "50%",
              opacity: 1,
            }}
          />
        ))}
      </div>
      
      {/* 1 blob shape */}
      {Array.from({ length: circleCount }).map((_, i) => (
        <RubberCircle key={i} delay={i * 0.3} shapeType="blob" />
      ))}
    </div>
  );
}
