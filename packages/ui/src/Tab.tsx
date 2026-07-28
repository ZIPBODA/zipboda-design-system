import React from "react";
import { tabClasses, cx } from "@zipboda/ui-core";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Tab — figma `20:90` (set `20:91`, 디자인시스템 §12) */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { active = false, className, children, ...rest },
  ref
) {
  return (
    <button ref={ref} type="button" role="tab" aria-selected={active} className={cx(tabClasses(active), className)} {...rest}>
      {children}
    </button>
  );
});
