"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationButtonProps } from "../../interface/app_interface";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeButtonsAfterSelected } from "@/app/store/slices/appSlice";

const NavigationButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname(); // Get the current path

  // All possible paths (defined inside the component)
  const allSteps: NavigationButtonProps[] = [
    { name: "Cart", path: "/product-cart", key: "product-cart" },
  ];

  const [steps, setSteps] = useState<NavigationButtonProps[]>([]);
  const [activeStep, setActiveStep] = useState("");

  useEffect(() => {
    // Find all steps that are part of the current path
    const updatedSteps = allSteps.filter((step) =>
      pathname.startsWith(step.path)
    );

    // Find the active step
    const activeStep =
      updatedSteps.find((step) => step.path === pathname)?.key || "";

    setSteps(updatedSteps);
    setActiveStep(activeStep);
  }, [pathname]);

  const handleStepClick = (step: NavigationButtonProps) => {
    setActiveStep(step.key);
    if (steps.length > 0) {
      dispatch(removeButtonsAfterSelected(step.key));
    }
  };

  return (
    <section className="w-full text-[14px] py-4 px-8">
      {steps ? (
        <div className="flex flex-row gap-2 items-center">
          <span className="flex items-center gap-2">
            <Link
              href="/"
              className="text-secondary"
              onClick={() =>
                handleStepClick({ name: "Home", path: "/", key: "home" })
              }
            >
              {"Home"}
            </Link>
            <Image
              src="/icons/Chevron.svg"
              alt="Chevron Icon"
              width={16}
              height={16}
              className="-rotate-90"
            />
          </span>
          {steps.map((step, index) => {
            const isActive = activeStep === step.key;
            return (
              <span key={step.path} className="flex items-center gap-2">
                <Link
                  href={step.path}
                  className={`${
                    isActive ? "text-dark font-semibold" : "text-secondary"
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  {step.name}
                </Link>
                {index < steps.length - 1 && (
                  <Image
                    src="/icons/Chevron.svg"
                    alt="Chevron Icon"
                    width={16}
                    height={16}
                    className="-rotate-90"
                  />
                )}
              </span>
            );
          })}
        </div>
      ) : (
        <div>No navigation steps available</div>
      )}
    </section>
  );
};

export default NavigationButton;
