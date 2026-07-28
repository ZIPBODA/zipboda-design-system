import React from "react";
import { buttonClasses, cx, type ButtonContract } from "@zipboda/ui-core";

export interface ButtonProps
  extends ButtonContract,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Button — figma: Button set `5:150` (디자인시스템 §11)
 * Tailwind 유틸 클래스 기반. 상태(hover/active/disabled)는 variant 클래스로 처리.
 * 소비처 Tailwind에 @zipboda/tokens/tailwind preset + content(@zipboda/ui, ui-core) 필요.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "lg", fullWidth, className, children, ...rest },
  ref
) {
  return (
    <button ref={ref} className={cx(buttonClasses({ variant, size, fullWidth }), className)} {...rest}>
      {children}
    </button>
  );
});
