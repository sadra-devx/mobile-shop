// src/hooks/useInView.js
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "home-animations-played";

export function useInView(options = { threshold: 0.15 }) {
  const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "true";
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(alreadyPlayed);

  useEffect(() => {
    if (alreadyPlayed) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}