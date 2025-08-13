import React, { useEffect, useRef, useState } from 'react';

const RubberBand = ({ size = 200, stroke = "#FFD700", strokeWidth = 3 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [controlPoints, setControlPoints] = useState({
    top: { x: size / 2, y: 0 },
    right: { x: size, y: size / 2 },
    bottom: { x: size / 2, y: size },
    left: { x: 0, y: size / 2 }
  });

  useEffect(() => {
    let time = 0;
    let currentPoint = 0;
    const points = ['top', 'right', 'bottom', 'left'];
    const pointChangeInterval = 1500; // 1.5 seconds per point

    const animate = () => {
      time += 16; // ~60fps
      
      // Change which point gets pinched every 1.5 seconds
      if (time % pointChangeInterval < 16) {
        currentPoint = (currentPoint + 1) % points.length;
      }

      setControlPoints(prevPoints => {
        const newPoints = { ...prevPoints };
        
        // Animate only the current active point with sine wave
        const activePoint = points[currentPoint];
        const progress = (time % pointChangeInterval) / pointChangeInterval;
        const sineValue = Math.sin(progress * Math.PI * 2) * 15; // 15px pinch distance
        
        switch (activePoint) {
          case 'top':
            newPoints.top.y = Math.max(0, size / 2 + sineValue);
            break;
          case 'right':
            newPoints.right.x = Math.min(size, size / 2 + sineValue);
            break;
          case 'bottom':
            newPoints.bottom.y = Math.min(size, size / 2 + sineValue);
            break;
          case 'left':
            newPoints.left.x = Math.max(0, size / 2 + sineValue);
            break;
          default:
            break;
        }
        
        return newPoints;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size]);

  // Create smooth path from control points
  const createPath = () => {
    const { top, right, bottom, left } = controlPoints;
    
    // Create a smooth curve through the control points
    const path = [
      `M ${top.x} ${top.y}`,
      `C ${top.x + 20} ${top.y}, ${right.x} ${right.y - 20}, ${right.x} ${right.y}`,
      `C ${right.x} ${right.y + 20}, ${bottom.x + 20} ${bottom.y}, ${bottom.x} ${bottom.y}`,
      `C ${bottom.x - 20} ${bottom.y}, ${left.x} ${left.y + 20}, ${left.x} ${left.y}`,
      `C ${left.x} ${left.y - 20}, ${top.x - 20} ${top.y}, ${top.x} ${top.y}`,
      'Z'
    ].join(' ');
    
    return path;
  };

  return (
    <svg
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <path
        d={createPath()}
        fill="transparent"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RubberBand;
