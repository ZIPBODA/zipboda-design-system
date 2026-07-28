import React from "react";
import { badgeClasses, cx, type BadgeVariant } from "@zipboda/ui-core";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/** Badge — figma `20:136` (디자인시스템 §12) */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", className, children, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cx(badgeClasses(variant), className)} {...rest}>
      {children}
    </span>
  );
});
