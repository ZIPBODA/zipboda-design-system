import React from "react";
import {
  cardProductRootClass,
  cardProductImageClass,
  cardProductInfoClass,
  cardProductBrandClass,
  cardProductNameClass,
  cardProductPriceClass,
  cx
} from "@zipboda/ui-core";

export interface CardProductProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  imageAlt?: string;
  brand?: string;
  name: string;
  price: string;
}

/** Card/Product — figma `20:183` (26:50, 디자인시스템 §12) */
export const CardProduct = React.forwardRef<HTMLDivElement, CardProductProps>(function CardProduct(
  { imageSrc, imageAlt = "", brand, name, price, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx(cardProductRootClass, className)} {...rest}>
      <div className={cardProductImageClass}>
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />}
      </div>
      <div className={cardProductInfoClass}>
        {brand && <span className={cardProductBrandClass}>{brand}</span>}
        <span className={cardProductNameClass}>{name}</span>
        <span className={cardProductPriceClass}>{price}</span>
      </div>
    </div>
  );
});
