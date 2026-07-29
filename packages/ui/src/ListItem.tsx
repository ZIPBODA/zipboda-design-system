import React from "react";
import { listItemRootClass, listItemLabelClass, listItemValueClass, cx } from "@zipboda/ui-core";

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value?: React.ReactNode;
}

/** ListItem — figma `20:203` (디자인시스템 §12) */
export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { label, value, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx(listItemRootClass, className)} {...rest}>
      <span className={listItemLabelClass}>{label}</span>
      {value != null && <span className={listItemValueClass}>{value}</span>}
    </div>
  );
});
