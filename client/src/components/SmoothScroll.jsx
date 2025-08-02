import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

const SmoothScroll = ({ children }) =>  {
  const containerRef = useRef(null); // Reference to the scroll container

  useEffect(() => {
    // Initialize Lenis on mount
    const lenis = new Lenis({
      duration: 1, // Smooth scroll duration, adjust as needed
      easing: (t) => t * (2 - t), // Easing function (default is ease-in-out)
      direction: "vertical", // Direction of scrolling
      smoothWheel: true, // Enable smooth scroll with mouse wheel
      smoothTouch: true, // Enable smooth scroll with touch events (for mobile)
      infinite: false, // Infinite scroll is disabled by default
      wheelMultiplier: 0.5,
      // lerp: 0.01,
    });

    lenis.on("scroll", ({ scroll }) => {
      if (scroll % window.innerHeight < 5) {
        lenis.stop(); // Stop to allow snap
        setTimeout(() => lenis.start(), 1); // Restart after small delay
      }
    });

    // Request animation frame for smooth scroll
    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate)
    }

    // Start the animation frame loop
    requestAnimationFrame(animate)

    // Cleanup: Destroy the Lenis instance on component unmount
    return () => {
      lenis.destroy()
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export { SmoothScroll }
