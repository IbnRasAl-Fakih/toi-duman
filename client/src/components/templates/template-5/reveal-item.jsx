import React from "react";
import { useReveal } from "./section-reveal.jsx";

export default function RevealItem({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  threshold,
  rootMargin
}) {
  const [ref, isVisible] = useReveal({ threshold, rootMargin });

  return (
    <Component
      ref={ref}
      className={`template5-item-reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
