import React from "react";
import { buttonVariantTokens, buttonSizeSpec, cssVar, type ButtonContract } from "@zipboda/ui-core";

export interface ButtonProps
  extends ButtonContract,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  style?: React.CSSProperties;
}

/**
 * Button — figma: Button set `5:150` (디자인시스템 §11)
 * variant: primary/secondary/outline/ghost/dark · size: lg/sm
 * hover/active 상태색은 토큰(brand-primary-hover 등)으로 CSS에서 처리 권장.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "lg", fullWidth, disabled, children, style, ...rest },
  ref
) {
  const v = buttonVariantTokens[variant];
  const s = buttonSizeSpec[size];
  const css: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "Pretendard, -apple-system, sans-serif",
    fontWeight: s.weight,
    fontSize: s.font,
    lineHeight: 1.43,
    padding: `${s.padY}px ${s.padX}px`,
    borderRadius: s.radius,
    color: cssVar(v.fg),
    background: v.bg ? cssVar(v.bg) : "transparent",
    border: v.border ? `1.5px solid ${cssVar(v.border)}` : "1px solid transparent",
    width: fullWidth ? "100%" : "auto",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background .15s ease, opacity .15s ease",
    ...style
  };
  return (
    <button ref={ref} disabled={disabled} style={css} {...rest}>
      {children}
    </button>
  );
});
