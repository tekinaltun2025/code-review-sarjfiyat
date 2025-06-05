export const generateSecureHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

export const validateApiResponse = (response: any): boolean => {
  if (!response || typeof response !== 'object') {
    logSecurityEvent('Invalid response format', { type: typeof response });
    return false;
  }

  if (!response.hasOwnProperty('success')) {
    logSecurityEvent('Missing success property in response');
    return false;
  }

  // Additional validation for response structure
  if (response.success && response.data && typeof response.data !== 'object') {
    logSecurityEvent('Invalid data format in response');
    return false;
  }

  return true;
};

export const createSecureRequest = async (url: string, data: any): Promise<Response> => {
  // Input validation
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }

  if (!url.startsWith('https://') && !url.startsWith('http://localhost')) {
    throw new Error('Only HTTPS URLs are allowed');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    logSecurityEvent('Request timeout', { url });
  }, 10000); // 10 second timeout

  try {
    // Sanitize data before sending
    const sanitizedData = sanitizeRequestData(data);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: generateSecureHeaders(),
      body: JSON.stringify(sanitizedData),
      signal: controller.signal,
      credentials: 'same-origin',
      mode: 'cors',
      integrity: 'sha256-' + await generateDataHash(JSON.stringify(sanitizedData))
    });

    clearTimeout(timeoutId);

    // Validate response status
    if (!response.ok) {
      logSecurityEvent('HTTP error response', { 
        status: response.status, 
        statusText: response.statusText,
        url 
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    logSecurityEvent('Request failed', { error: error.message, url });
    throw error;
  }
};

export const logSecurityEvent = (event: string, details?: any): void => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    details: details || {},
    userAgent: navigator.userAgent.substring(0, 100), // Limit user agent length
    url: window.location.href
  };

  console.warn(`🔒 Security Event: ${event}`, logEntry);
  
  // Store security events locally for debugging
  try {
    const securityLogs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
    securityLogs.push(logEntry);
    
    // Keep only last 50 entries
    if (securityLogs.length > 50) {
      securityLogs.splice(0, securityLogs.length - 50);
    }
    
    localStorage.setItem('securityLogs', JSON.stringify(securityLogs));
  } catch (error) {
    console.warn('Failed to store security log:', error);
  }

  // In production, this could send to a security monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Could implement external logging here
    scheduleSecurityReport(logEntry);
  }
};

// Helper functions
const sanitizeRequestData = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      // Remove potentially dangerous content
      sanitized[key] = sanitized[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .substring(0, 1000); // Limit string length
    }
  }

  return sanitized;
};

const generateDataHash = async (data: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    logSecurityEvent('Hash generation failed', error);
    // Fallback to simple hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
};

const scheduleSecurityReport = (logEntry: any): void => {
  // Could implement batched reporting to external service
  console.info('Security event scheduled for reporting:', logEntry.event);
};

// Enhanced CSP violation handler
export const handleCSPViolation = (event: SecurityPolicyViolationEvent): void => {
  logSecurityEvent('CSP Violation', {
    directive: event.violatedDirective,
    source: event.sourceFile,
    line: event.lineNumber,
    column: event.columnNumber,
    blockedURI: event.blockedURI
  });
};

// Initialize security monitoring
export const initializeSecurity = (): void => {
  // Listen for CSP violations
  document.addEventListener('securitypolicyviolation', handleCSPViolation);
  
  // Monitor for suspicious activity
  let clickCount = 0;
  let lastClickTime = 0;
  
  document.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 100) { // Very fast clicking
      clickCount++;
      if (clickCount > 10) {
        logSecurityEvent('Suspicious rapid clicking detected');
        clickCount = 0;
      }
    } else {
      clickCount = 0;
    }
    lastClickTime = now;
  });
  
  console.info('🔒 Security monitoring initialized');
};
