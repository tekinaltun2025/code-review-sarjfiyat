
export const generateSecureHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
  };
};

export const validateApiResponse = (response: any): boolean => {
  if (!response || typeof response !== 'object') {
    return false;
  }

  if (!response.hasOwnProperty('success')) {
    return false;
  }

  return true;
};

export const createSecureRequest = async (url: string, data: any): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: generateSecureHeaders(),
      body: JSON.stringify(data),
      signal: controller.signal,
      credentials: 'same-origin',
      mode: 'cors',
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const logSecurityEvent = (event: string, details?: any): void => {
  console.warn(`Security Event: ${event}`, details);
  
  // In production, this could send to a security monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Log to monitoring service
  }
};
