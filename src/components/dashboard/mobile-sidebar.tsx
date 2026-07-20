"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { dashboardBrand, dashboardNavigation } from "@/lib/constants/dashboard";

import { Logo } from "./logo";
import { NavigationItem } from "./navigation-item";
import { ProfileSummary } from "./profile-summary";

export function MobileSidebar() {
  const pathname = usePathname();
  const dialogId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  function closeSidebar({ restoreFocus = false } = {}) {
    setIsOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSidebar({ restoreFocus: true });
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/4 bg-white px-5 lg:hidden">
        <div className="flex items-center gap-2">
          <Logo size={32} className="shrink-0 text-[#292D32]" />
          <span className="text-xl font-semibold tracking-tight text-[#292D32]">
            {dashboardBrand.name}
          </span>
          <span className="mt-1 text-[9px] text-[#838383]">
            {dashboardBrand.version}
          </span>
        </div>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open navigation menu"
          aria-controls={dialogId}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="grid size-10 place-items-center rounded-xl text-[#292D32] transition-colors hover:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/40"
        >
          <Menu aria-hidden="true" className="size-6" />
        </button>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => closeSidebar({ restoreFocus: true })}
            className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
          />
          <aside
            ref={drawerRef}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard navigation"
            className="relative flex h-dvh w-[min(86vw,320px)] flex-col bg-white px-6 py-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo size={32} className="shrink-0 text-[#292D32]" />
                <span className="text-xl font-semibold tracking-tight text-[#292D32]">
                  {dashboardBrand.name}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => closeSidebar({ restoreFocus: true })}
                className="grid size-10 place-items-center rounded-xl text-[#292D32] transition-colors hover:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/40"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile dashboard navigation" className="mt-10 space-y-3">
              {dashboardNavigation.map((item) => (
                <NavigationItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  href={"href" in item ? item.href : undefined}
                  available={item.available}
                  active={"href" in item && item.href === pathname}
                  onNavigate={closeSidebar}
                />
              ))}
            </nav>
            <div className="mt-auto border-t border-[#EEEEEE] pt-5">
              <ProfileSummary />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
