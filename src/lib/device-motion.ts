export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth <= 880;
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/** Lighter scroll/animation path — does not change typography layout. */
export function isLowPowerScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return true;
  if (isMobileViewport()) return true;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

/** @deprecated Use isLowPowerScroll for effects; kept for data attribute compatibility. */
export function isLowPowerDevice(): boolean {
  return isLowPowerScroll();
}

export function applyDocumentMotionFlags(): { lowPower: boolean; mobile: boolean } {
  const lowPower = isLowPowerDevice();
  const mobile = isMobileViewport();
  document.documentElement.dataset.lowPower = lowPower ? "true" : "false";
  document.documentElement.dataset.mobile = mobile ? "true" : "false";
  return { lowPower, mobile };
}
