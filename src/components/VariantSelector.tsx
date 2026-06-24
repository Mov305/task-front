import type { ProductVariant } from "../types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
  getVariantQuantity: (variantId: string) => number;
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
  getVariantQuantity,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        const qty = getVariantQuantity(variant.id);

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] transition-all cursor-pointer ${
              isActive
                ? "border-text-primary bg-white text-text-primary font-medium"
                : "border-border-default bg-white text-text-secondary hover:border-text-muted font-medium"
            }`}
            title={`${variant.name}${qty > 0 ? ` (${qty})` : ""}`}
          >
            <img
              src={variant.thumbnail || variant.image}
              alt={variant.name}
              className="w-[18px] h-[14px] rounded-sm object-contain flex-shrink-0"
            />
            <span className="pr-0.5">{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
}
