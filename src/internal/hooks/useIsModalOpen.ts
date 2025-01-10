import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export let observer: MutationObserver | null = null;
export const subscribers = new Set<Dispatch<SetStateAction<boolean>>>();

export function useIsModalOpen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    createObserver();
    subscribers.add(setIsModalOpen);

    return () => {
      subscribers.delete(setIsModalOpen);
      cleanupObserver();
    };
  }, []);

  return isModalOpen;
}

function createObserver() {
  if (observer) {
    return;
  }

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const isModalOpen = !!document.querySelector(
          '[data-modal-overlay="true"]',
        );
        for (const subscriber of subscribers) {
          subscriber(isModalOpen);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function cleanupObserver() {
  if (subscribers.size === 0 && observer) {
    observer.disconnect();
    observer = null;
  }
}

export const __test__ = {
  getState: () => ({
    subscriberCount: subscribers.size,
    hasObserver: !!observer,
  }),
  reset: () => {
    subscribers.clear();
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  },
};
