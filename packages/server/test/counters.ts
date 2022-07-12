export const getCounter = (key: string) => {
  if (key in (global as any).__COUNTERS__) {
    (global as any).__COUNTERS__[key]++;

    return (global as any).__COUNTERS__[key];
  }

  (global as any).__COUNTERS__[key] = 0;

  return (global as any).__COUNTERS__[key];
};

export const restartCounters = () => {
  (global as any).__COUNTERS__ = Object.keys(
    (global as any).__COUNTERS__
  ).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};
