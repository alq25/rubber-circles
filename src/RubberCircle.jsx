import { useEffect, useState } from "react";

// Damped oscillation for elastic snap
function rubberPinch(t, amplitude = 0.3, frequency = 1, damping = 0.12) {
  return 1 + amplitude * Math.exp(-damping * t) * Math.cos(frequency * t * 2 * Math.PI);
}

export default function RubberCircle({ shapeType = "blob", size = 300 }) {
  const layers = [0, 1, 2, 3, 4];
  const organicShapes = [
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "40% 60% 70% 30% / 30% 60% 40% 70%",
    "70% 30% 60% 40% / 40% 60% 30% 70%",
    "30% 70% 40% 60% / 70% 40% 60% 30%",
    "50% 50% 20% 80% / 80% 20% 50% 50%",
  ];

  // Independent phase per layer
  const [phases] = useState(layers.map(() => Math.random() * Math.PI * 2));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setTick((prev) => prev + 0.25); // much faster, very dynamic speed
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (shapeType !== "blob") return null;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: 15 }}>
      {layers.map((layer, idx) => {
        const layerSize = size - layer * 60;
        const offset = (size - layerSize) / 2;

        // Unique time per layer for independent motion
        const layerTime = tick + phases[idx];

        // Each layer has its own frequency & amplitude
        const frequency = 0.6 + layer * 0.2;
        const amplitude = 0.3 - layer * 0.05;

        // Pick a random pinch side per layer with longer timing and smoother movements
        const pinchSide = Math.floor(layerTime * 0.06 + phases[idx] * 2) % 4;
        const pinchProgress = (layerTime * 0.3 + phases[idx]) % 1; // Slower, smoother pinch movements

        // Enhanced elastic rubber band physics with dramatic outer layer warping
        const tension = amplitude * Math.sin(pinchProgress * Math.PI) * 0.8; // Base tension for stability
        const elasticModulus = 0.8 + layer * 0.15; // Gentler elasticity differences
        
        // Calculate elastic deformation with enhanced outer layer effects
        let deformationX = 1;
        let deformationY = 1;
        let shearDeformation = 0;
        let twistDeformation = 0;
        
        // Create enhanced localized stretching effect for outer layers
        const pinchIntensity = Math.sin(pinchProgress * Math.PI) * Math.exp(-pinchProgress * 2);
        // Outer layers get much more dramatic warping and animation
        const layerWarpFactor = Math.pow(1.4, layer); // Stronger exponential increase for outer layers
        const elasticStretch = tension * elasticModulus * layerWarpFactor;
        
        // Stable effects for outer layers with smooth memory and minimal hysteresis
        const baseMemoryEffect = Math.exp(-pinchProgress * 3.0); // Smoother snap-back
        const enhancedMemoryEffect = layer >= 3 ? Math.exp(-pinchProgress * 2.5) : baseMemoryEffect; // Smoother for outer layers
        const memoryEffect = enhancedMemoryEffect;
        const hysteresisEffect = layer >= 3 ? Math.sin(pinchProgress * Math.PI + phases[idx] * 0.3) * 0.08 : Math.sin(pinchProgress * Math.PI + phases[idx] * 0.2) * 0.05; // Much reduced amplitude and frequency
        
        if (pinchSide === 0) { // Top pinch
          // Stable stretching and warping for outer layers with smooth movement
          const isOuterLayer = layer >= 3;
          deformationY = 1 + elasticStretch * (isOuterLayer ? 1.8 + Math.sin(pinchProgress * Math.PI * 2) * 0.6 : 1.4 + Math.sin(pinchProgress * Math.PI * 2) * 0.3);
          deformationX = 1 - elasticStretch * (isOuterLayer ? 0.6 * (1 + Math.sin(pinchProgress * Math.PI * 2) * 0.3) : 0.5 * (1 + Math.sin(pinchProgress * Math.PI) * 0.2));
          shearDeformation = elasticStretch * (isOuterLayer ? 1.2 : 0.4) * Math.sin(pinchProgress * Math.PI + hysteresisEffect);
          twistDeformation = elasticStretch * (isOuterLayer ? 0.3 : 0.15) * Math.sin(pinchProgress * Math.PI * 2);
        } else if (pinchSide === 1) { // Right pinch
          // Stable stretching and warping for outer layers with smooth movement
          const isOuterLayer = layer >= 3;
          deformationX = 1 + elasticStretch * (isOuterLayer ? 1.8 + Math.sin(pinchProgress * Math.PI * 2) * 0.6 : 1.4 + Math.sin(pinchProgress * Math.PI * 2) * 0.3);
          deformationY = 1 - elasticStretch * (isOuterLayer ? 0.6 * (1 + Math.sin(pinchProgress * Math.PI * 2) * 0.3) : 0.5 * (1 + Math.sin(pinchProgress * Math.PI) * 0.2));
          shearDeformation = -elasticStretch * (isOuterLayer ? 1.2 : 0.4) * Math.sin(pinchProgress * Math.PI + hysteresisEffect);
          twistDeformation = -elasticStretch * (isOuterLayer ? 0.3 : 0.15) * Math.sin(pinchProgress * Math.PI * 2);
        } else if (pinchSide === 2) { // Bottom pinch
          // Enhanced stretching and warping for outer layers with fluid movement
          const isOuterLayer = layer >= 3;
          deformationY = 1 + elasticStretch * (isOuterLayer ? 2.4 + Math.sin(pinchProgress * Math.PI * 2) * 1.2 : 1.8 + Math.sin(pinchProgress * Math.PI * 2) * 0.6);
          deformationX = 1 - elasticStretch * (isOuterLayer ? 0.8 * (1 + Math.sin(pinchProgress * Math.PI * 2) * 0.6) : 0.7 * (1 + Math.sin(pinchProgress * Math.PI) * 0.5));
          shearDeformation = -elasticStretch * (isOuterLayer ? 1.8 : 0.6) * Math.sin(pinchProgress * Math.PI + hysteresisEffect);
          twistDeformation = -elasticStretch * (isOuterLayer ? 0.5 : 0.2) * Math.sin(pinchProgress * Math.PI * 2);
        } else { // Left pinch
          // Enhanced stretching and warping for outer layers with fluid movement
          const isOuterLayer = layer >= 3;
          deformationX = 1 + elasticStretch * (isOuterLayer ? 2.4 + Math.sin(pinchProgress * Math.PI * 2) * 1.2 : 1.8 + Math.sin(pinchProgress * Math.PI * 2) * 0.6);
          deformationY = 1 - elasticStretch * (isOuterLayer ? 0.8 * (1 + Math.sin(pinchProgress * Math.PI * 2) * 0.6) : 0.7 * (1 + Math.sin(pinchProgress * Math.PI) * 0.5));
          shearDeformation = elasticStretch * (isOuterLayer ? 1.8 : 0.6) * Math.sin(pinchProgress * Math.PI + hysteresisEffect);
          twistDeformation = elasticStretch * (isOuterLayer ? 1.2 : 0.4) * Math.sin(pinchProgress * Math.PI * 2);
        }
        
        // Apply complex memory and elastic recovery effects
        deformationX = 1 + (deformationX - 1) * memoryEffect;
        deformationY = 1 + (deformationY - 1) * memoryEffect;
        shearDeformation *= memoryEffect;
        twistDeformation *= memoryEffect;

        // Varied rotation for organic movement with smoother cycles
        const rotate = (1.5 + layer * 1.2) * Math.sin(layerTime * 0.2 + phases[idx] * 0.3) * 0.6; // Slower, smoother rotation

        // Fluid stretching effect without separate bouncing
        const stretchEffect = 1; // No separate bounce, just pure stretching and warping

        return (
          <div
            key={layer}
            style={{
              position: "absolute",
              top: offset,
              left: offset,
              width: layerSize,
              height: layerSize,
              borderRadius: organicShapes[layer],
              border: `2px solid #FFD700`,
              transform: `scaleX(${deformationX * stretchEffect}) scaleY(${deformationY * stretchEffect}) skew(${shearDeformation}deg) rotate(${rotate + twistDeformation}deg)`,
              transition: "transform 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          />
        );
      })}
    </div>
  );
}
