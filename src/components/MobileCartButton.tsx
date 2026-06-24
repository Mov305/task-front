import { useBundleStore } from "../store/useBundleStore";

export function MobileCartButton() {
  const quantities = useBundleStore((s) => s.quantities);
  const getSelectedItems = useBundleStore((s) => s.getSelectedItems);
  const getSubtotal = useBundleStore((s) => s.getSubtotal);

  void quantities;
  const itemCount = getSelectedItems().reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = getSubtotal();

  if (itemCount === 0) return null;

  const scrollToReview = () => {
    document
      .getElementById("review-panel")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border-default shadow-lg lg:hidden z-50">
      <button
        type="button"
        onClick={scrollToReview}
        className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <span>View Cart ({itemCount})</span>
        <span>· ${subtotal.toFixed(2)}</span>
      </button>
    </div>
  );
}
