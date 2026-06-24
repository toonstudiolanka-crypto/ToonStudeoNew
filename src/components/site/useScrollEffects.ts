"use client";

import { useEffect, useRef } from "react";

const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function viewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

export function useScrollEffects(rootRef: React.RefObject<HTMLElement | null>) {
  const rafRef = useRef<number>(0);
  const smoothRef = useRef<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      const root = rootRef.current;
      if (!root) {
        requestAnimationFrame(init);
        return;
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      } else {
        $$("[data-reveal]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
        });
      }

      if (reduce) {
        $$("[data-center-fade]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
        });
        $$("[data-hero-w]").forEach((el) => {
          const e = el as HTMLElement;
          e.style.opacity = "1";
          e.style.transform = "none";
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
      const smooth = (k: string, t: number, f = 0.14) => {
        const sm = smoothRef.current;
        sm[k] = sm[k] == null ? t : lerp(sm[k], t, f);
        return sm[k];
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
      const hscenes = $$("[data-hscroll]");
      const svcs = $$("[data-svc]");
      const footerBrand = $("[data-footer-brand]") as HTMLElement | null;
      const cf = $$("[data-center-fade]");

      const update = () => {
        const vh = viewportHeight();
        const y = window.scrollY || window.pageYOffset;
        const isMobile = window.innerWidth <= 880;
        const smoothFactor = isMobile ? 0.22 : 0.16;

        if (nav && navWrap) {
          const p = cl(y / 150);
          const navMax = isMobile ? window.innerWidth - 28 : 1180;
          const navMin = isMobile ? window.innerWidth - 48 : 720;
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
        }

        if (hero) {
          const p = sceneP(hero);
          if (heroMedia) heroMedia.style.transform = `scale(${lerp(1.12, 1.2, p)})`;
          const sh = cl((p - 0.6) / 0.4);
          if (heroStage) {
            heroStage.style.borderRadius = (sh * (isMobile ? 28 : 42)) + "px";
            heroStage.style.transform = `scale(${lerp(1, isMobile ? 0.9 : 0.84, sh)})`;
          }
          if (heroDark) heroDark.style.opacity = String(sh * 0.4);
          if (eyebrow) {
            const o = 1 - cl((p - 0.28) / 0.16);
            eyebrow.style.opacity = String(o);
            eyebrow.style.transform = `translateY(${-(1 - o) * 16}px)`;
          }
          const out = cl((p - 0.42) / 0.4);
          heroWords.forEach((w, i) => {
            const el = w as HTMLElement;
            el.style.opacity = String(1 - out);
            const drift = (i - 1) * out * (isMobile ? 36 : 60);
            el.style.transform = `translate(${drift}px, ${-out * (isMobile ? 72 : 110)}px)`;
          });
          heroFade.forEach((el) => {
            const e = el as HTMLElement;
            e.style.opacity = String(1 - cl(out * 1.4));
            e.style.transform = `translateY(${-out * (isMobile ? 40 : 56)}px)`;
          });
          if (heroBar) heroBar.style.width = p * 100 + "%";
          if (heroFrame) heroFrame.textContent = String(Math.round(lerp(1, 240, p))).padStart(4, "0");
        }

        cf.forEach((el) => {
          const e = el as HTMLElement;
          const r = e.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - vh * 0.5) / (vh * 0.6);
          const o = cl(1 - d);
          e.style.opacity = String(lerp(0.14, 1, o));
          e.style.transform = `translateY(${lerp(12, 0, o)}px)`;
        });

        hscenes.forEach((sc, si) => {
          const track = sc.querySelector("[data-htrack]") as HTMLElement | null;
          if (!track) return;
          const p = sceneP(sc);
          const max = Math.max(0, track.scrollWidth - window.innerWidth);
          const tx = smooth("h" + si, -p * max, smoothFactor);
          track.style.transform = `translate3d(${tx}px,0,0)`;
        });

        if (founders) {
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
          const next = svcs[i + 1] as HTMLElement | undefined;
          if (!next) { card.style.transform = "none"; return; }
          const nr = next.getBoundingClientRect();
          const cover = cl((vh - nr.top) / vh);
          const scaleAmt = isMobile ? 0.05 : 0.07;
          const liftAmt = isMobile ? 5 : 8;
          card.style.transform = `scale(${1 - cover * scaleAmt}) translateY(${-cover * liftAmt}px)`;
        });

        if (footerBrand) {
          const r = footerBrand.getBoundingClientRect();
          const prog = cl((vh - r.top) / (vh + r.height));
          const drift = isMobile ? 24 : 50;
          footerBrand.style.transform = `translateX(${lerp(drift, -drift, prog)}px)`;
        }
      };

      const loop = () => { update(); rafRef.current = requestAnimationFrame(loop); };
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      window.addEventListener("touchmove", update, { passive: true });
      window.addEventListener("touchend", update, { passive: true });
      const vv = window.visualViewport;
      vv?.addEventListener("scroll", update);
      vv?.addEventListener("resize", update);
      update();
      rafRef.current = requestAnimationFrame(loop);

      teardown = () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        window.removeEventListener("touchmove", update);
        window.removeEventListener("touchend", update);
        vv?.removeEventListener("scroll", update);
        vv?.removeEventListener("resize", update);
        cancelAnimationFrame(rafRef.current);
      };
    };

    let teardown: (() => void) | undefined;
    init();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [rootRef]);
}
