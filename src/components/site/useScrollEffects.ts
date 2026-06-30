"use client";

import { useEffect, useRef } from "react";
import { applyDocumentMotionFlags, prefersReducedMotion } from "@/lib/device-motion";

const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function viewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

function nearViewport(el: Element, vh: number) {
  const r = el.getBoundingClientRect();
  return r.bottom > -vh * 0.35 && r.top < vh * 1.35;
}

export function useScrollEffects(rootRef: React.RefObject<HTMLElement | null>) {
  const rafRef = useRef<number>(0);
  const navScrolledRef = useRef(false);

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

      const { lowPower, mobile } = applyDocumentMotionFlags();
      const reduce = prefersReducedMotion();
      const $ = (s: string) => root.querySelector(s);
      const $$ = (s: string) => Array.from(root.querySelectorAll(s));

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

        if (lowPower) {
          $$("[data-center-fade]").forEach((el) => {
            const e = el as HTMLElement;
            e.style.opacity = "1";
            e.style.transform = "none";
          });
        }
      } else {
        $$("[data-reveal]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
        });
        $$("[data-center-fade]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
        });
      }

      if (reduce) {
        $$("[data-hero-w]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = el.hasAttribute("data-hero-title-1") ? "rotate(-2.5deg)" : "none";
        });
        const eyebrow = $("[data-hero-eyebrow]") as HTMLElement | null;
        if (eyebrow) eyebrow.style.opacity = "1";
        return;
      }

      const sceneP = (el: Element) => {
        const vh = viewportHeight();
        const r = el.getBoundingClientRect();
        const total = (el as HTMLElement).offsetHeight - vh;
        return cl((-r.top) / (total || 1));
      };

      const navWrap = $("[data-nav-wrap]") as HTMLElement | null;
      const nav = $("[data-nav]") as HTMLElement | null;
      const hero = $('[data-scene="hero"]');
      const heroMedia = $("[data-hero-media]") as HTMLElement | null;
      const heroStage = $("[data-hero-stage]") as HTMLElement | null;
      const heroDark = $("[data-hero-dark]") as HTMLElement | null;
      const eyebrow = $("[data-hero-eyebrow]") as HTMLElement | null;
      const heroBar = $("[data-hero-bar]") as HTMLElement | null;
      const heroFrame = $("[data-hero-frame]") as HTMLElement | null;
      const heroWords = $$("[data-hero-w]");
      const heroFade = $$("[data-hero-fade]");
      const founders = $('[data-scene="founders"]');
      const hscenes = lowPower ? [] : $$("[data-hscroll]");
      const svcs = lowPower ? [] : $$("[data-svc]");
      const footerBrand = lowPower ? null : ($("[data-footer-brand]") as HTMLElement | null);
      const cf = lowPower ? [] : $$("[data-center-fade]");

      const setNavScrolled = (scrolled: boolean) => {
        if (!nav || navScrolledRef.current === scrolled) return;
        navScrolledRef.current = scrolled;
        if (scrolled) {
          nav.style.background = lowPower ? "rgba(11,11,12,.92)" : "rgba(11,11,12,.72)";
          nav.style.backdropFilter = lowPower ? "none" : "blur(18px)";
          nav.style.setProperty("-webkit-backdrop-filter", lowPower ? "none" : "blur(18px)");
          nav.style.borderColor = "rgba(255,255,255,.12)";
          nav.style.borderRadius = "9999px";
          nav.style.paddingTop = "12px";
          nav.style.paddingBottom = "12px";
          nav.style.boxShadow = "0 20px 50px rgba(0,0,0,.4)";
          if (navWrap) navWrap.style.transform = "translateY(6px)";
        } else {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
          nav.style.setProperty("-webkit-backdrop-filter", "none");
          nav.style.borderColor = "rgba(255,255,255,0)";
          nav.style.borderRadius = "0";
          nav.style.paddingTop = "20px";
          nav.style.paddingBottom = "20px";
          nav.style.boxShadow = "none";
          if (navWrap) navWrap.style.transform = "none";
        }
      };

      const update = () => {
        const vh = viewportHeight();
        const y = window.scrollY || window.pageYOffset;
        setNavScrolled(y > 40);

        if (nav && navWrap && !lowPower) {
          const p = cl(y / 150);
          const navMax = mobile ? window.innerWidth - 28 : 1180;
          const navMin = mobile ? window.innerWidth - 48 : 720;
          nav.style.maxWidth = lerp(navMax, navMin, p) + "px";
          nav.style.background = `rgba(17,17,19,${lerp(0, 0.55, p)})`;
          nav.style.backdropFilter = `blur(${lerp(0, 16, p)}px)`;
          nav.style.setProperty("-webkit-backdrop-filter", `blur(${lerp(0, 16, p)}px)`);
          nav.style.borderColor = `rgba(255,255,255,${lerp(0, 0.12, p)})`;
          nav.style.borderRadius = lerp(0, 999, p) + "px";
          nav.style.paddingTop = lerp(20, 12, p) + "px";
          nav.style.paddingBottom = lerp(20, 12, p) + "px";
          nav.style.boxShadow = `0 20px 50px rgba(0,0,0,${lerp(0, 0.4, p)})`;
          navWrap.style.transform = `translateY(${lerp(0, 6, p)}px)`;
        } else if (nav && mobile) {
          nav.style.maxWidth = `${window.innerWidth - 28}px`;
        }

        if (hero && nearViewport(hero, vh)) {
          const p = sceneP(hero);
          if (!lowPower && heroMedia) heroMedia.style.transform = `scale(${lerp(1.12, 1.2, p)})`;
          const sh = cl((p - 0.6) / 0.4);
          if (!lowPower && heroStage) {
            heroStage.style.borderRadius = (sh * (mobile ? 28 : 42)) + "px";
            heroStage.style.transform = `scale(${lerp(1, mobile ? 0.9 : 0.84, sh)})`;
          }
          if (heroDark) heroDark.style.opacity = String(sh * (lowPower ? 0.25 : 0.4));
          if (eyebrow) {
            const o = 1 - cl((p - 0.28) / 0.16);
            eyebrow.style.opacity = String(o);
            if (!lowPower) eyebrow.style.transform = `translateY(${-(1 - o) * 16}px)`;
          }
          const out = cl((p - 0.42) / 0.4);
          heroWords.forEach((w, i) => {
            const el = w as HTMLElement;
            el.style.opacity = String(1 - out);
            if (lowPower) {
              const tilt = el.hasAttribute("data-hero-title-1") ? "rotate(-2.5deg)" : "";
              el.style.transform = tilt || "none";
              return;
            }
            const drift = (i - 1) * out * (mobile ? 36 : 60);
            const yOff = -out * (mobile ? 72 : 110);
            const tilt = el.hasAttribute("data-hero-title-1") ? "rotate(-2.5deg) " : "";
            el.style.transform = `${tilt}translate(${drift}px, ${yOff}px)`;
          });
          heroFade.forEach((el) => {
            const e = el as HTMLElement;
            e.style.opacity = String(1 - cl(out * 1.4));
            if (!lowPower) e.style.transform = `translateY(${-out * (mobile ? 40 : 56)}px)`;
          });
          if (heroBar) heroBar.style.width = p * 100 + "%";
          if (heroFrame) heroFrame.textContent = String(Math.round(lerp(1, 240, p))).padStart(4, "0");
        }

        cf.forEach((el) => {
          if (!nearViewport(el, vh)) return;
          const e = el as HTMLElement;
          const r = e.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - vh * 0.5) / (vh * 0.6);
          const o = cl(1 - d);
          e.style.opacity = String(lerp(0.14, 1, o));
          e.style.transform = `translateY(${lerp(12, 0, o)}px)`;
        });

        hscenes.forEach((sc, si) => {
          if (!nearViewport(sc, vh)) return;
          const track = sc.querySelector("[data-htrack]") as HTMLElement | null;
          if (!track) return;
          const p = sceneP(sc);
          const max = Math.max(0, track.scrollWidth - window.innerWidth);
          track.style.transform = `translate3d(${-p * max}px,0,0)`;
        });

        if (founders && !lowPower && nearViewport(founders, vh)) {
          const p = sceneP(founders);
          const t = cl((p - 0.4) / 0.22);
          const m1 = founders.querySelector('[data-founder="1"]') as HTMLElement | null;
          const m2 = founders.querySelector('[data-founder="2"]') as HTMLElement | null;
          const b1 = founders.querySelector('[data-bio="1"]') as HTMLElement | null;
          const b2 = founders.querySelector('[data-bio="2"]') as HTMLElement | null;
          if (m1) { m1.style.opacity = String(1 - t); m1.style.transform = `scale(${lerp(1, 1.05, t)})`; }
          if (m2) { m2.style.opacity = String(t); m2.style.transform = `scale(${lerp(1.05, 1, t)})`; }
          if (b1) { b1.style.opacity = String(1 - t); b1.style.transform = `translateY(${-t * 28}px)`; }
          if (b2) { b2.style.opacity = String(t); b2.style.transform = `translateY(${lerp(28, 0, t)}px)`; }
        }

        svcs.forEach((c, i) => {
          const card = c as HTMLElement;
          if (!nearViewport(card, vh)) return;
          const next = svcs[i + 1] as HTMLElement | undefined;
          if (!next) { card.style.transform = "none"; return; }
          const nr = next.getBoundingClientRect();
          const cover = cl((vh - nr.top) / vh);
          const scaleAmt = mobile ? 0.05 : 0.07;
          const liftAmt = mobile ? 5 : 8;
          card.style.transform = `scale(${1 - cover * scaleAmt}) translateY(${-cover * liftAmt}px)`;
        });

        if (footerBrand && nearViewport(footerBrand, vh)) {
          const r = footerBrand.getBoundingClientRect();
          const prog = cl((vh - r.top) / (vh + r.height));
          const drift = mobile ? 24 : 50;
          footerBrand.style.transform = `translateX(${lerp(drift, -drift, prog)}px)`;
        }
      };

      let scheduled = false;
      const scheduleUpdate = () => {
        if (scheduled) return;
        scheduled = true;
        rafRef.current = requestAnimationFrame(() => {
          scheduled = false;
          update();
        });
      };

      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      const vv = window.visualViewport;
      vv?.addEventListener("resize", scheduleUpdate);
      update();

      teardown = () => {
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
        vv?.removeEventListener("resize", scheduleUpdate);
        cancelAnimationFrame(rafRef.current);
      };
    };

    init();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [rootRef]);
}
