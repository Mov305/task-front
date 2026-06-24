import { useBundleStore } from "../store/useBundleStore";

const STEP_ICONS: Record<number, string> = {
  1: "/livestream.png",
  2: "/logo_hms_new%201.png",
  3: "/Group%201417.png",
  4: "/Group%201418.png",
};

function StepIcon({ step }: { step: number }) {
  return <img src={STEP_ICONS[step]} alt="" className="w-6 h-6 object-contain" />;
}

interface StepHeaderProps {
  step: number;
  title: string;
  icon?: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function StepHeader({
  step,
  title,
  isExpanded,
  onToggle,
}: StepHeaderProps) {
  const selectedCount = useBundleStore((s) => s.getSelectedCountForStep(step));

  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted pt-3 pb-0.5 px-1">
        STEP {step} OF 4
      </p>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2.5 px-1 cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <StepIcon step={step} />
          <span className="text-[20px] font-bold text-text-primary tracking-tight">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          {selectedCount > 0 && <span>{selectedCount} selected</span>}
          <span className="text-[10px]">{isExpanded ? "▲" : "▼"}</span>
        </div>
      </button>
    </div>
  );
}
