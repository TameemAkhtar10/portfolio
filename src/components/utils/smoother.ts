import type { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother | null = null;

export const setSmoother = (value: ScrollSmoother) => {
    smoother = value;
};