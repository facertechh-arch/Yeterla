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
      // Random interval between 8 minutes and 12 minutes (averaging 10 minutes)
      const minDelay = 8 * 60 * 1000;
      const maxDelay = 12 * 60 * 1000;
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
