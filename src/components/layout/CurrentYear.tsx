"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getCurrentYear() {
  return new Date().getFullYear();
}

export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, getCurrentYear, () => buildYear);
  return <>{year}</>;
}
