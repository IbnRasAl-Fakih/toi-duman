import React from "react";
import { useReveal } from "../theatre-of-love-template/section-reveal.jsx";

export function CeremonialRevealSection({ children, className = "", style }) {
  const [ref, isVisible] = useReveal({ threshold: 0.14, rootMargin: "0px 0px -56px 0px" });

  return (
    <section ref={ref} className={`ceremonial-reveal ${isVisible ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </section>
  );
}

export function CeremonialRevealItem({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  style,
  threshold,
  rootMargin
}) {
  const [ref, isVisible] = useReveal({ threshold, rootMargin });

  return (
    <Component
      ref={ref}
      className={`ceremonial-reveal-item ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
