import React from "react";
import styles from "./Title.module.css";

const Title: React.FC<{
  text: string;
  small?: boolean;
  className?: string;
}> = ({ text, small = false, className = "" }) => {
  const titleClass = `${styles.title} ${
    small ? styles.small : ""
  } ${className}`;
  return <div className={titleClass}>{text}</div>;
};

export default Title;
