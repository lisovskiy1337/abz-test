import React, { useRef, useEffect, useState } from "react";
import "./TruncateStyle.scss";

const Truncate = ({ text, addTooltip = false, className = "" }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const containerElement = containerRef.current;
    const textElement = textRef.current;

    const handleResize = () => {
      if (containerElement && textElement) {
        setIsTruncated(
          textElement.getBoundingClientRect().width >
            containerElement.getBoundingClientRect().width
        );
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="truncate-container">
      <div className={`${className} truncate`} ref={containerRef}>
        <span ref={textRef}>{text}</span>
      </div>
      {isTruncated && addTooltip && (
        <span className="truncate__tooltip">{text}</span>
      )}
    </div>
  );
};

export default Truncate;
