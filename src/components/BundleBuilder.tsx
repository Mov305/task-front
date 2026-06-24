import { useBundleStore } from "../store/useBundleStore";
import { StepAccordion } from "./StepAccordion";
import { ProductCard } from "./ProductCard";
import type { StepConfig } from "../types";

const STEPS: StepConfig[] = [
  { step: 1, title: "Choose your cameras", icon: "\u{1F4F7}", nextLabel: "Choose your plan" },
  { step: 2, title: "Choose your plan", icon: "\u{1F49C}", nextLabel: "Choose your sensors" },
  { step: 3, title: "Choose your sensors", icon: "\u{1F4E1}", nextLabel: "Add extra protection" },
  { step: 4, title: "Add extra protection", icon: "\u{1F6E1}️" },
];

export function BundleBuilder() {
  const products = useBundleStore((s) => s.products);
  const activeStep = useBundleStore((s) => s.activeStep);
  const toggleStep = useBundleStore((s) => s.toggleStep);
  const setActiveStep = useBundleStore((s) => s.setActiveStep);

  return (
    <div className="flex-1 min-w-0">
      {STEPS.map((stepConfig) => {
        const stepProducts = products.filter(
          (p) => p.step === stepConfig.step
        );

        return (
          <StepAccordion
            key={stepConfig.step}
            step={stepConfig.step}
            title={stepConfig.title}
            icon={stepConfig.icon}
            isExpanded={activeStep === stepConfig.step}
            onToggle={() => toggleStep(stepConfig.step)}
            nextLabel={stepConfig.nextLabel}
            onNext={
              stepConfig.nextLabel
                ? () => setActiveStep(stepConfig.step + 1)
                : undefined
            }
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {stepProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </StepAccordion>
        );
      })}
    </div>
  );
}
