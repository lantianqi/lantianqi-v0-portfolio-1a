"use client";
import { useEffect, useRef } from "react";

export default function CartoonFace() {
  const leftPupil = useRef<SVGCircleElement>(null);
  const rightPupil = useRef<SVGCircleElement>(null);

  // Target position for smooth animation
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      // Center of the face
      const faceRect = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      targetPos.current.x = clientX - faceRect.x;
      targetPos.current.y = clientY - faceRect.y;
    };

    const mouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);

    let animationFrame: number;
    const animate = () => {
      const ease = 0.1; // smoothness factor
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      const eyes = [
        { ref: leftPupil, cx: 60, cy: 60 },
        { ref: rightPupil, cx: 140, cy: 60 },
      ];
      const maxMove = 8; // max pupil offset

      eyes.forEach(({ ref, cx, cy }) => {
        if (!ref.current) return;
        const dx = currentPos.current.x + (cx - 100);
        const dy = currentPos.current.y + (cy - 100);
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(maxMove, Math.hypot(dx, dy) / 15);
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        ref.current.setAttribute("cx", (cx + offsetX).toString());
        ref.current.setAttribute("cy", (cy + offsetY).toString());
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48 md:w-64 md:h-64 drop-shadow-lg"
      >
        {/* Face */}
        <circle cx="100" cy="100" r="80" fill="#FFD580" stroke="#333" strokeWidth="4" />
        {/* Eyes (white) */}
        <circle cx="60" cy="60" r="20" fill="white" stroke="#333" strokeWidth="2" />
        <circle cx="140" cy="60" r="20" fill="white" stroke="#333" strokeWidth="2" />
        {/* Pupils */}
        <circle ref={leftPupil} cx="60" cy="60" r="8" fill="#333" />
        <circle ref={rightPupil} cx="140" cy="60" r="8" fill="#333" />
        {/* Mouth */}
        <path
          d="M 60 130 Q 100 160 140 130"
          stroke="#333"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>
    </div>
  );
}
