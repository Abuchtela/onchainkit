import { ANALYTICS_API_URL } from '@/core/analytics/constants';
import type {
  AnalyticsEvent,
  AnalyticsEventData,
} from '@/core/analytics/types';
import { sendAnalytics } from '@/core/analytics/utils/sendAnalytics';
import { useOnchainKit } from '@/useOnchainKit';
import { useEffect, useState } from 'react';

/**
 * useAnalytics handles analytics events and data preparation
 */
export const useAnalytics = () => {
  const { apiKey, sessionId, config } = useOnchainKit();
  const [appName, setAppName] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setAppName(document.title);
    setOrigin(window.location.origin);
  }, []);

  const prepareAnalyticsPayload = <T extends AnalyticsEvent>(
    event: T,
    data: AnalyticsEventData[T],
  ) => {
    return {
      url: config?.analyticsUrl ?? ANALYTICS_API_URL,
      headers: {
        'OnchainKit-App-Name': appName,
      },
      body: {
        apiKey: apiKey ?? 'undefined',
        sessionId: sessionId ?? 'undefined',
        timestamp: Date.now(),
        eventType: event,
        data,
        origin,
      },
    };
  };

  return {
    sendAnalytics: <T extends AnalyticsEvent>(
      event: T,
      data: AnalyticsEventData[T],
    ) => {
      // Don't send analytics if disabled
      if (!config?.analytics) {
        return;
      }
      const payload = prepareAnalyticsPayload(event, data);
      sendAnalytics(payload);
    },
  };
};
