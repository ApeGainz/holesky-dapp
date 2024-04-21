import React from "react";
import styles from "./Subtitle.module.css";

const Subtitle: React.FC<{
  text: string;
  className?: string;
  small?: boolean;
}> = ({ text, className = "", small = false }) => {
  const subtitleClass = `${styles.subtitle} ${
    small ? styles.small : ""
  } ${className}`;
  return <div className={subtitleClass}>{text}</div>;
};

export default Subtitle;
