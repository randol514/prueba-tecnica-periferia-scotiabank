import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.sass";

type ButtonSize = "small" | "medium" | "big";
type ButtonVariant = "primary";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  children?: ReactNode;
}

export const Button = ({
  size = "medium",
  variant = "primary",
  rounded = false,
  icon,
  iconPosition = "right",
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = [
    styles["site-btn"],
    styles[`site-btn--${size}`],
    styles[`site-btn--${variant}`],
    rounded && styles["site-btn--rounded"],
    icon && styles[`site-btn--icon-${iconPosition}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement = icon && (
    <span className={styles["site-btn__icon"]}>{icon}</span>
  );

  return (
    <button className={classes} type={type} {...props}>
      <span className={styles["site-btn__inside"]}>
        {iconPosition === "left" && iconElement}
        {children}
        {iconPosition === "right" && iconElement}
      </span>
    </button>
  );
};
