interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
  min?: number;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  compact = false,
  min = 0,
}: QuantityStepperProps) {
  const isMin = quantity <= min;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onDecrement}
          disabled={isMin}
          className={`w-6 h-6 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 border border-border-default rounded transition-colors ${
            isMin ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-5 text-center text-xs font-medium text-text-primary">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="w-6 h-6 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 border border-border-default rounded transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[18px]">
      <button
        type="button"
        onClick={onDecrement}
        disabled={isMin}
        className={`w-[30px] h-[30px] flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 border border-border-default rounded-lg text-sm transition-colors ${
          isMin ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-5 text-center text-[16px] font-normal text-text-primary">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-[30px] h-[30px] flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 border border-border-default rounded-lg text-sm transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
