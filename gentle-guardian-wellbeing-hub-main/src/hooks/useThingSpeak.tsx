import { useState, useCallback } from 'react';




const useThingSpeak = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const channelId = import.meta.env.VITE_THINGSPEAK_CHANNEL_ID;
  const readApiKey = import.meta.env.VITE_THINGSPEAK_READ_API_KEY;

  /**
   * Fetches the latest data from the ThingSpeak channel.
   */
  const fetchLatestData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetches only the latest entry from your channel
      const response = await fetch(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=2`

      );

      if (!response.ok) {
        throw new Error(`ThingSpeak API error: ${response.statusText} (Status: ${response.status})`);
      }

      const result = await response.json();
      
      if (result && result.feeds && result.feeds.length > 0) {
        // The latest feed is the first (and only) item in the array
        setData(result.feeds[0]);
      } else {
        // Handle case where channel has no data
        setData(null);
      }

    } catch (err) {
      console.error("Failed to fetch from ThingSpeak:", err);
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback with an empty dependency array as channel details are constant

  return { data, loading, error, fetchLatestData };
};

export default useThingSpeak;