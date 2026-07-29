import React from "react";
import { dividerClass, cx, type DividerOrientation } from "@zipboda/ui-core";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
}

/** Divider — figma `20:175` (1px #F3F4F6, 디자인시스템 §12) */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = "horizontal", className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cx(dividerClass[orientation], className)}
      {...rest}
    />
  );
});
