import React from "react";

interface Button {
  type: "button" | "submit" | "reset" | undefined;
  content: any;
  onClick?: () => void;
  className?: string;
}
const Button = ({ type, content, onClick, className }: Button) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default Button;
