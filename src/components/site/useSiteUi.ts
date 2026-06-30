"use client";

import { useEffect } from "react";
import { applyDocumentMotionFlags } from "@/lib/device-motion";

export function useSiteUi(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let cancelled = false;
    let teardown: (() => void) | undefined;

    const init = () => {
      if (cancelled) return;
      const root = rootRef.current;
      if (!root) {
        requestAnimationFrame(init);
        return;
      }

      const { lowPower } = applyDocumentMotionFlags();
      const $$ = (s: string) => Array.from(root.querySelectorAll(s));
      const $ = (s: string) => root.querySelector(s);

      const menu = $("[data-menu]") as HTMLElement | null;
      const setMenu = (open: boolean) => {
        if (!menu) return;
        menu.style.opacity = open ? "1" : "0";
        menu.style.pointerEvents = open ? "auto" : "none";
        $$("[data-menu-link]").forEach((l, i) => {
          const el = l as HTMLElement;
          el.style.transitionDelay = (open ? 0.05 + 0.06 * i : 0) + "s";
          el.style.opacity = open ? "1" : "0";
          el.style.transform = open ? "none" : "translateY(20px)";
        });
      };

      $("[data-menu-open]")?.addEventListener("click", () => setMenu(true));
      $("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
      $$("[data-menu-link]").forEach((l) => l.addEventListener("click", () => setMenu(false)));

      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                const el = e.target as HTMLElement;
                el.style.opacity = "1";
                el.style.transform = "none";
                io.unobserve(el);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        $$("[data-reveal]").forEach((el) => io.observe(el));
      } else {
        $$("[data-reveal]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
        });
      }

      const nav = $("[data-nav]") as HTMLElement | null;
      let navScrolled = false;
      const onScroll = () => {
        if (!nav) return;
        const scrolled = window.scrollY > 40;
        if (navScrolled === scrolled) return;
        navScrolled = scrolled;
        if (scrolled) {
          nav.style.background = lowPower ? "rgba(11,11,12,.92)" : "rgba(11,11,12,.72)";
          nav.style.backdropFilter = lowPower ? "none" : "blur(18px)";
          nav.style.setProperty("-webkit-backdrop-filter", lowPower ? "none" : "blur(18px)");
          nav.style.borderColor = "rgba(255,255,255,.12)";
          nav.style.borderRadius = "9999px";
        } else {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
          nav.style.setProperty("-webkit-backdrop-filter", "none");
          nav.style.borderColor = "rgba(255,255,255,0)";
          nav.style.borderRadius = "0";
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      teardown = () => {
        window.removeEventListener("scroll", onScroll);
      };
    };

    init();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [rootRef]);
}
