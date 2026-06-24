import { QuantityStepper } from "./QuantityStepper";
import { useBundleStore } from "../store/useBundleStore";
import type { SelectedItem } from "../store/useBundleStore";

interface ReviewLineItemProps {
  item: SelectedItem;
}

export function ReviewLineItem({ item }: ReviewLineItemProps) {
  const increment = useBundleStore((s) => s.increment);
  const decrement = useBundleStore((s) => s.decrement);

  const displayName = item.variantName
    ? `${item.product.name}`
    : item.product.name;

  const priceDisplay = item.product.billingLabel
    ? item.product.billingLabel
    : `$${item.linePrice.toFixed(2)}`;

  const compareDisplay = item.product.isFree
    ? `$${(item.product.price * item.quantity).toFixed(2)}`
    : item.product.compareAtPrice && !item.product.billingLabel
      ? `$${(item.product.compareAtPrice * item.quantity).toFixed(2)}`
      : item.product.compareAtPrice && item.product.billingLabel
        ? `$${item.product.compareAtPrice.toFixed(2)}/mo`
        : null;

  const isPlan = item.product.category === "plan";

  return (
    <div className="flex items-center gap-3 py-2.5">
      <img
        src={item.thumbnail}
        alt={displayName}
        className={`flex-shrink-0 rounded object-contain ${isPlan ? "w-8 h-8" : "w-10 h-10"}`}
      />

      <div className="flex-1 min-w-0">
        {isPlan ? (
          <p className="text-[13px] font-semibold text-primary truncate">
            <span className="font-normal">Cam</span> Unlimited
          </p>
        ) : (
          <p className="text-[13px] font-medium text-text-primary truncate">
            {displayName}
          </p>
        )}
      </div>

      {!isPlan && (
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={() => increment(item.product.id, item.variantId)}
          onDecrement={() => decrement(item.product.id, item.variantId)}
          min={item.product.isRequired ? 1 : 0}
          compact
        />
      )}

      <div className="flex flex-col items-end flex-shrink-0 min-w-[70px] text-right">
        {compareDisplay && (
          <span className="text-xs text-text-muted line-through">
            {compareDisplay}
          </span>
        )}
        {item.product.isFree ? (
          <span className="text-sm font-semibold text-success">FREE</span>
        ) : (
          <span className="text-sm font-semibold text-primary">
            {priceDisplay}
          </span>
        )}
      </div>
    </div>
  );
}
