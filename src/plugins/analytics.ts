/**
 * Analytics (required in production): records every page view so you can see visits.
 * Set VITE_UMAMI_WEBSITE_ID and/or VITE_GA_MEASUREMENT_ID in .env; production build fails if neither is set.
 * No personal data is sent; use only for visit counts and anonymized stats.
 */

import type { Router } from 'vue-router';

declare global {
  interface Window {
    umami?: { track: (path?: string) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const UMAMI_SRC = (import.meta.env.VITE_UMAMI_SRC as string) || 'https://analytics.umami.is/script.js';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function trackPage(path: string, title?: string): void {
  if (UMAMI_WEBSITE_ID && typeof window.umami?.track === 'function') {
    window.umami.track(path);
  }
  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
    });
  }
}

function loadUmami(): void {
  if (!UMAMI_WEBSITE_ID) return;
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = UMAMI_SRC;
  script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

function loadGA4(): void {
  if (!GA_MEASUREMENT_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // we send manually on route change
    anonymize_ip: true,
  });
}

export function initAnalytics(router: Router): void {
  if (!UMAMI_WEBSITE_ID && !GA_MEASUREMENT_ID) return;

  loadUmami();
  loadGA4();

  router.afterEach((to) => {
    trackPage(to.fullPath || '/', to.meta?.title as string | undefined);
  });

  // Initial page (afterEach does not run for first load)
  const route = router.currentRoute.value;
  trackPage(route.fullPath || '/', route.meta?.title as string | undefined);
}
