import React from "react";
import { inputClasses, cx } from "@zipboda/ui-core";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Input/Text — figma `20:113` (set `20:117`, 디자인시스템 §12)
 *  포커스는 Tailwind `focus:border-brand`(JS 상태 불필요). disabled 별도 클래스. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, disabled, ...rest },
  ref
) {
  return <input ref={ref} disabled={disabled} className={cx(inputClasses(disabled), className)} {...rest} />;
});
