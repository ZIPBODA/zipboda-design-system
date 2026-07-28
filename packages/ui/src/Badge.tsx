import React from "react";
import { badgeVariantTokens, badgeSpec, cssVar, type BadgeVariant } from "@zipboda/ui-core";

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
  variant?: BadgeVariant;
  style?: React.CSSProperties;
}

/** Badge — figma `20:136` (디자인시스템 §12) */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", children, style, ...rest },
  ref
) {
  const v = badgeVariantTokens[variant];
  const css: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "Pretendard, -apple-system, sans-serif",
    fontWeight: badgeSpec.weight,
    fontSize: badgeSpec.font,
    lineHeight: 1.5,
    padding: `${badgeSpec.padY}px ${badgeSpec.padX}px`,
    borderRadius: badgeSpec.radius,
    color: cssVar(v.fg),
    background: cssVar(v.bg),
    ...style
  };
  return (
    <span ref={ref} style={css} {...rest}>
      {children}
    </span>
  );
});
