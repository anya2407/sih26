/**
 * Heritage API Service Layer
 * 
 * Provides clean abstractions for backend heritage endpoints:
 * - /api/get-monument: Identifies monument, state, and POIs for coordinates
 * - /api/get-location: Identifies user's exact spot and returns LLM contextual narration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Normalizes monument response data to ensure robust handling of various casing/naming schemes.
 */
export const normalizeMonumentResponse = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response structure received from /api/get-monument');
  }

  // Extract State
  const state = data.state || data.State || data.detected_state || data.state_name || '';

  // Extract Monument Name
  const monumentName = data.monument || 
    data.monument_name || 
    data.monumentName || 
    data.name || 
    data.monumentTitle || 
    data.title || 
    '';

  // Extract Points of Interest
  const rawPois = data.points_of_interest || 
    data.pointsOfInterest || 
    data.pois || 
    data.poi_list || 
    data.points || 
    data.point_of_interests || 
    [];

  const pointsOfInterest = Array.isArray(rawPois)
    ? rawPois.map((poi, idx) => {
        if (typeof poi === 'string') {
          return {
            id: `poi-${idx + 1}`,
            name: poi.trim(),
            location: '',
            narration: '',
            description: ''
          };
        }
        return {
          id: poi.id || `poi-${idx + 1}`,
          name: poi.name || poi.poi_name || poi.title || poi.point || `Point ${idx + 1}`,
          location: poi.location || poi.spot || '',
          narration: poi.narration || poi.transcript || poi.text || '',
          description: poi.description || ''
        };
      })
    : [];

  return {
    state: String(state).trim(),
    monumentName: String(monumentName).trim(),
    pointsOfInterest,
    raw: data
  };
};

/**
 * Normalizes exact location/transcript response data.
 */
export const normalizeLocationResponse = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response structure received from /api/get-location');
  }

  // Extract LLM Transcript / Narration
  const transcript = data.transcript || 
    data.narration || 
    data.text || 
    data.response || 
    data.content || 
    data.message || 
    data.script || 
    '';

  // Extract exact current spot/POI
  const currentLocation = data.current_location || 
    data.currentLocation || 
    data.current_poi || 
    data.currentPoi || 
    data.point_of_interest || 
    data.pointOfInterest || 
    data.spot || 
    data.currentSpot || 
    data.poi || 
    data.location || 
    data.name || 
    '';

  return {
    transcript: String(transcript).trim(),
    currentLocation: String(currentLocation).trim(),
    raw: data
  };
};

/**
 * Fetches monument identification and its points of interest from GPS coordinates.
 * @param {number} latitude - Current GPS latitude
 * @param {number} longitude - Current GPS longitude
 * @returns {Promise<{state: string, monumentName: string, pointsOfInterest: Array, raw: any}>}
 */
export async function getMonument(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new Error(`Valid latitude and longitude required. Received: lat=${latitude}, lng=${longitude}`);
  }

  const endpoint = `${API_BASE_URL}/api/get-monument`;
  const payload = { latitude, longitude };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // If POST is not supported (e.g. 405), attempt GET as fallback
      if (response.status === 405) {
        const getUrl = `${endpoint}?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
        const getResponse = await fetch(getUrl, {
          headers: { 'Accept': 'application/json' }
        });
        if (!getResponse.ok) {
          throw new Error(`Server returned error ${getResponse.status}: ${getResponse.statusText}`);
        }
        const getData = await getResponse.json();
        return normalizeMonumentResponse(getData);
      }

      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} from ${endpoint}: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    return normalizeMonumentResponse(data);
  } catch (err) {
    console.error(`[heritageApi.getMonument] Error requesting ${endpoint}:`, err);
    throw err;
  }
}

/**
 * Fetches exact location spot identification and LLM-generated narration transcript from GPS coordinates.
 * @param {number} latitude - Current GPS latitude
 * @param {number} longitude - Current GPS longitude
 * @returns {Promise<{transcript: string, currentLocation: string, raw: any}>}
 */
export async function getLocation(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new Error(`Valid latitude and longitude required. Received: lat=${latitude}, lng=${longitude}`);
  }

  const endpoint = `${API_BASE_URL}/api/get-location`;
  const payload = { latitude, longitude };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 405) {
        const getUrl = `${endpoint}?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
        const getResponse = await fetch(getUrl, {
          headers: { 'Accept': 'application/json' }
        });
        if (!getResponse.ok) {
          throw new Error(`Server returned error ${getResponse.status}: ${getResponse.statusText}`);
        }
        const getData = await getResponse.json();
        return normalizeLocationResponse(getData);
      }

      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} from ${endpoint}: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    return normalizeLocationResponse(data);
  } catch (err) {
    console.error(`[heritageApi.getLocation] Error requesting ${endpoint}:`, err);
    throw err;
  }
}
