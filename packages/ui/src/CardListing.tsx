import React from "react";
import {
  cardListingRootClass,
  cardListingHeaderClass,
  cardListingTitleClass,
  cardListingBodyClass,
  cardListingLocationClass,
  cardListingDdayClass,
  cx
} from "@zipboda/ui-core";

export interface CardListingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  location?: string;
  dday?: string;
}

/** Card/Listing — figma `20:193` (26:56, 디자인시스템 §12) */
export const CardListing = React.forwardRef<HTMLDivElement, CardListingProps>(function CardListing(
  { title, location, dday, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx(cardListingRootClass, className)} {...rest}>
      <div className={cardListingHeaderClass}>
        <span className={cardListingTitleClass}>{title}</span>
      </div>
      <div className={cardListingBodyClass}>
        {location && <span className={cardListingLocationClass}>{location}</span>}
        {dday && <span className={cardListingDdayClass}>{dday}</span>}
      </div>
    </div>
  );
});
