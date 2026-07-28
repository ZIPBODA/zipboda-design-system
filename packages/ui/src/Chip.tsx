import React from "react";
import { chipClasses, cx, type ChipVariant } from "@zipboda/ui-core";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
}

/** Chip — figma `20:77` (set `20:78`, 디자인시스템 §12) */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { variant = "default", className, children, ...rest },
  ref
) {
  return (
    <button ref={ref} type="button" className={cx(chipClasses(variant), className)} {...rest}>
      {children}
    </button>
  );
});
