import { useBundleStore } from '../store/useBundleStore';
import { ReviewLineItem } from './ReviewLineItem';
import type { SelectedItem } from '../store/useBundleStore';

const CATEGORY_ORDER = ['cameras', 'sensors', 'accessories', 'plan'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  cameras: 'CAMERAS',
  sensors: 'SENSORS',
  accessories: 'ACCESSORIES',
  plan: 'PLAN',
};

export function ReviewPanel() {
  const quantities = useBundleStore((s) => s.quantities);
  const getSelectedItems = useBundleStore((s) => s.getSelectedItems);
  const getSubtotal = useBundleStore((s) => s.getSubtotal);
  const getCompareAtTotal = useBundleStore((s) => s.getCompareAtTotal);
  const getSavings = useBundleStore((s) => s.getSavings);
  const saveToLocalStorage = useBundleStore((s) => s.saveToLocalStorage);

  // quantities subscription triggers re-renders; derived values use latest state via get()
  void quantities;
  const items = getSelectedItems();
  const subtotal = getSubtotal();
  const compareAtTotal = getCompareAtTotal();
  const savings = getSavings();

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      const catItems = items.filter((i) => i.product.category === cat);
      if (catItems.length > 0) acc[cat] = catItems;
      return acc;
    },
    {} as Record<string, SelectedItem[]>,
  );

  return (
    <div className="border-t border-border-default pt-4 mt-2 lg:border-t-0 lg:pt-0 bg-bg-bundle rounded-xl p-5 lg:sticky lg:top-6" id="review-panel">
      {/* REVIEW label */}
      <p className="text-[10px] pt-2 uppercase tracking-[0.08em] text-text-muted font-semibold">Review</p>

      {/* Main heading */}
      <h2 className="text-[20px] font-bold text-text-primary mt-3">Your security system</h2>

      {/* Subtitle */}
      <p className="text-xs text-text-secondary mt-1 mb-4 leading-normal">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {/* Category sections */}
      {CATEGORY_ORDER.map((cat) => {
        const catItems = grouped[cat];
        if (!catItems) return null;

        return (
          <div key={cat} className="border-t border-border-default pt-3 mt-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-1.5">{CATEGORY_LABELS[cat]}</h3>
            {catItems.map((item) => (
              <ReviewLineItem key={`${item.product.id}:${item.variantId || 'default'}`} item={item} />
            ))}
          </div>
        );
      })}

      {/* Shipping row */}
      <div className="border-t border-border-default pt-3 mt-3">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <img src="/carbon_delivery.png" alt="" className="w-5 h-5 object-contain" />
            <span className="text-sm text-text-primary">Fast Shipping</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-text-muted line-through text-xs">$5.99</span>
            <span className="text-success font-semibold text-sm">FREE</span>
          </div>
        </div>
      </div>

      {/* Satisfaction guarantee + totals */}
      <div className="border-t border-border-default pt-4 mt-3">
        <div className="flex items-start gap-3 mb-4">
          <img src="/Satisfaction%20Badge-05%201.png" alt="100% Satisfaction Guarantee" className="w-[72px] h-[72px] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {/* Financing pill */}
            <div className="flex justify-end mb-2">
              <span className="text-[11px] font-bold bg-primary text-white px-2.5 py-0.5 rounded-sm shadow-sm">
                as low as ${(subtotal * 0.10214).toFixed(2)}/mo
              </span>
            </div>

            {/* Compare-at total + active total on same line */}
            <div className="flex items-baseline justify-end gap-2">
              {savings > 0 && <span className="text-sm text-text-muted line-through">${compareAtTotal.toFixed(2)}</span>}
              <span className="text-[28px] font-bold text-primary leading-tight">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Savings text */}
        {savings > 0 && (
          <p className="text-[13px] text-success font-medium text-center mb-3">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        )}

        {/* Checkout button */}
        <button
          type="button"
          onClick={() => alert('Checkout — this is a prototype placeholder!')}
          className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-semibold text-base rounded-full transition-colors cursor-pointer"
        >
          Checkout
        </button>

        {/* Save for later */}
        <button
          type="button"
          onClick={() => {
            saveToLocalStorage();
            alert('System saved! Your configuration will be restored on your next visit.');
          }}
          className="w-full mt-3 text-sm text-text-secondary hover:text-text-primary font-medium hover:underline cursor-pointer bg-transparent border-none text-center"
        >
          Save my system for later
        </button>
      </div>
    </div>
  );
}
