import { useRef, useEffect, useState } from "react";
import { StepHeader } from "./StepHeader";

interface StepAccordionProps {
  step: number;
  title: string;
  icon?: string;
  isExpanded: boolean;
  onToggle: () => void;
  nextLabel?: string;
  onNext?: () => void;
  children: React.ReactNode;
}

export function StepAccordion({
  step,
  title,
  icon,
  isExpanded,
  onToggle,
  nextLabel,
  onNext,
  children,
}: StepAccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isExpanded ? "none" : "0px");

  useEffect(() => {
    if (isExpanded) {
      const el = contentRef.current;
      if (el) {
        setMaxHeight(`${el.scrollHeight}px`);
        const timer = setTimeout(() => setMaxHeight("none"), 300);
        return () => clearTimeout(timer);
      }
    } else {
      const el = contentRef.current;
      if (el) {
        setMaxHeight(`${el.scrollHeight}px`);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setMaxHeight("0px");
          });
        });
      }
    }
  }, [isExpanded]);

  return (
    <div className={`border-t border-border-default transition-all duration-300 ${isExpanded ? "bg-bg-bundle rounded-xl px-4 pb-5 pt-1 mt-2 mb-2" : "px-1"}`}>
      <StepHeader
        step={step}
        title={title}
        icon={icon}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />

      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight,
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="pb-2 pt-2">
          {children}

          {nextLabel && onNext && (
            <div className="flex justify-center mt-5">
              <button
                type="button"
                onClick={onNext}
                className="px-8 py-2.5 bg-white border border-primary text-primary font-semibold text-sm rounded-full hover:bg-selected-bg transition-colors cursor-pointer"
              >
                Next: {nextLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
