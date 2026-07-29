import React from "react";
import {
  checkboxRootClass,
  checkboxBoxClass,
  checkboxMarkClass,
  checkboxLabelClass,
  cx
} from "@zipboda/ui-core";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

/** Checkbox — figma `20:96` (디자인시스템 §12) */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx(checkboxRootClass, disabled && "cursor-not-allowed", className)}>
      <span className="relative inline-flex">
        <input ref={ref} type="checkbox" disabled={disabled} className={checkboxBoxClass} {...rest} />
        <span className={checkboxMarkClass} aria-hidden="true">
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </span>
      {label != null && <span className={checkboxLabelClass}>{label}</span>}
    </label>
  );
});
