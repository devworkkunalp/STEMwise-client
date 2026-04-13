import { useState, useEffect } from "react";

/**
 * Hook to detect if the current viewport is mobile (<= 768px).
 * @param {number} breakpoint - The width in pixels to treat as mobile.
 * @returns {boolean} - True if mobile, false otherwise.
 */
export const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
