import React from "react";
import { searchBarRootClass, searchBarIconClass, searchBarInputClass, cx } from "@zipboda/ui-core";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  containerClassName?: string;
}

/** SearchBar — figma `20:126` (디자인시스템 §12) */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { className, containerClassName, ...rest },
  ref
) {
  return (
    <div className={cx(searchBarRootClass, containerClassName)}>
      <svg
        className={searchBarIconClass}
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input ref={ref} type="search" className={cx(searchBarInputClass, className)} {...rest} />
    </div>
  );
});
