"use client";;
import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export function Highlighter({
  children,
  action = "highlight",

  // Default pink color
  color = "#ffd1dc",

  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      });

      annotation.show();

      // Store the current element in closure for cleanup
      return () => {
        if (element) {
          annotate(element, { type: action }).remove();
        }
      };
    }
  }, [
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    (<span ref={elementRef} className="inline-block bg-clip-text text-transparent">
      {children}
    </span>)
  );
}
