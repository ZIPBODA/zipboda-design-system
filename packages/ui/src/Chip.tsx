import React from "react";
import { chipVariantTokens, chipSpec, cssVar, type ChipVariant } from "@zipboda/ui-core";

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "style"> {
  variant?: ChipVariant;
  style?: React.CSSProperties;
}

/** Chip — figma `20:77` (set `20:78`, 디자인시스템 §12) */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { variant = "default", children, style, ...rest },
  ref
) {
  const v = chipVariantTokens[variant];
  const css: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "Pretendard, -apple-system, sans-serif",
    fontWeight: v.weight,
    fontSize: chipSpec.font,
    lineHeight: 1.5,
    padding: `${chipSpec.padY}px ${chipSpec.padX}px`,
    borderRadius: cssVar(chipSpec.radiusToken),
    color: cssVar(v.fg),
    background: v.bg ? cssVar(v.bg) : "transparent",
    border: v.border ? `1px solid ${cssVar(v.border)}` : "1px solid transparent",
    cursor: "pointer",
    ...style
  };
  return (
    <button ref={ref} type="button" style={css} {...rest}>
      {children}
    </button>
  );
});
