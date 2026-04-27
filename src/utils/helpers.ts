export const scrollSync = (selector: string): (() => void) => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

  if (elements.length < 2) return () => {};

  let active: HTMLElement | null = null;
  let frameId: number | null = null;
  let isSyncing = false;

  const onMouseEnter = (e: Event) => {
    active = e.currentTarget as HTMLElement;
  };

  const onScroll = (e: Event) => {
    if (isSyncing) return;
    if (e.currentTarget !== active) return;

    if (frameId !== null) cancelAnimationFrame(frameId);

    frameId = requestAnimationFrame(() => {
      if (!active) return;

      const ratio = active.scrollTop / (active.scrollHeight - active.clientHeight);

      isSyncing = true;

      for (const target of elements) {
        if (target === active) continue;
        target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
      }

      requestAnimationFrame(() => {
        isSyncing = false;
      });

      frameId = null;
    });
  };

  for (const el of elements) {
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('scroll', onScroll, { passive: true });
  }

  return () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    for (const el of elements) {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('scroll', onScroll);
    }
  };
};
