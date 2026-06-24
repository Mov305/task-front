import { useEffect } from "react";
import { BundleBuilder } from "./components/BundleBuilder";
import { ReviewPanel } from "./components/ReviewPanel";
import { MobileCartButton } from "./components/MobileCartButton";
import { useBundleStore } from "./store/useBundleStore";

function App() {
  const loadFromLocalStorage = useBundleStore((s) => s.loadFromLocalStorage);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <div className="min-h-screen bg-bg-page font-inter">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6 pb-24 lg:pb-6">
        <h1 className="text-[28px] md:text-[34px] font-bold text-text-primary mb-3 md:mb-5">
          Let's get started!
        </h1>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
          <div className="lg:w-[60%]">
            <BundleBuilder />
          </div>
          <div className="lg:w-[40%]">
            <ReviewPanel />
          </div>
        </div>
      </div>

      <MobileCartButton />
    </div>
  );
}

export default App;
