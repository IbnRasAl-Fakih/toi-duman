import React from "react";

export function useReveal({ threshold = 0.18, rootMargin = "0px 0px -40px 0px" } = {}) {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}

export default function SectionReveal({ children, className = "", style }) {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`template5-reveal ${isVisible ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </section>
  );
}
