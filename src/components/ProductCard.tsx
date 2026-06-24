import type { Product } from "../types";
import { useBundleStore } from "../store/useBundleStore";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const activeVariantId = useBundleStore(
    (s) => s.activeVariant[product.id]
  );
  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);
  const increment = useBundleStore((s) => s.increment);
  const decrement = useBundleStore((s) => s.decrement);
  const getQuantity = useBundleStore((s) => s.getQuantity);

  const currentVariantId = product.variants ? activeVariantId : undefined;

  const quantity = useBundleStore((s) => {
    const key = currentVariantId ? `${product.id}:${currentVariantId}` : product.id;
    return s.quantities[key] || 0;
  });

  const isSelected = useBundleStore((s) => {
    if (product.variants) {
      return product.variants.some(
        (v) => (s.quantities[`${product.id}:${v.id}`] || 0) > 0
      );
    }
    return (s.quantities[product.id] || 0) > 0;
  });

  const currentImage = product.variants
    ? product.variants.find((v) => v.id === activeVariantId)?.image ||
      product.image
    : product.image;

  return (
    <div
      className={`relative flex flex-row rounded-xl p-3 transition-all duration-150 w-full sm:w-[calc(50%-8px)] min-w-0 gap-3 ${
        isSelected
          ? "border-2 border-primary bg-white shadow-sm"
          : "border border-border-default bg-white"
      }`}
    >
      {product.badge && (
        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          {product.badge}
        </span>
      )}

      {/* Left: image area */}
      <div className="relative flex-shrink-0 w-[115px] flex items-center justify-center">
        <img
          src={currentImage}
          alt={product.name}
          className="max-h-[100px] max-w-full object-contain"
        />
      </div>

      {/* Right: content area */}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-text-primary leading-tight">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-xs text-text-secondary leading-snug mt-1">
              {product.description}
              {product.learnMoreUrl && (
                <a
                  href={product.learnMoreUrl}
                  className="text-xs font-semibold text-[#003CFF] underline ml-1 inline hover:text-blue-800"
                >
                  Learn More
                </a>
              )}
            </p>
          )}

          {!product.description && product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="text-xs font-semibold text-[#003CFF] underline mt-1 inline-block hover:text-blue-800"
            >
              Learn More
            </a>
          )}

          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              activeVariantId={activeVariantId}
              onSelect={(variantId) =>
                setActiveVariant(product.id, variantId)
              }
              getVariantQuantity={(variantId) =>
                getQuantity(product.id, variantId)
              }
            />
          )}
        </div>

        <div className="flex items-end justify-between pt-2">
          <QuantityStepper
            quantity={quantity}
            onIncrement={() => increment(product.id, currentVariantId)}
            onDecrement={() => decrement(product.id, currentVariantId)}
            min={product.isRequired ? 1 : 0}
          />
          <div className="flex flex-col items-end text-right">
            {product.compareAtPrice && (
              <span className="text-[13px] font-normal text-compare-price line-through leading-tight mb-0.5">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[16px] font-normal text-[#575757] leading-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
