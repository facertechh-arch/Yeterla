"use client";

import { useState, useEffect } from "react";

export function useMovementCounter(initialValue: number = 5732) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextIncrement = () => {
      // Random interval between 30 seconds and 3 minutes
      const minDelay = 30 * 1000;
      const maxDelay = 180 * 1000;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      timeoutId = setTimeout(() => {
        setCount((prev) => (prev !== null ? prev + 1 : prev));
        scheduleNextIncrement();
      }, randomDelay);
    };

    scheduleNextIncrement();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return count;
}
