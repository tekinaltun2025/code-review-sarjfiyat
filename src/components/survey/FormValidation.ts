
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface SurveyFormData {
  provider_id: string;
  provider_name: string;
  rating: number;
  comment: string;
}

// Enhanced security patterns
const SECURITY_PATTERNS = [
  /javascript:/gi,
  /data:/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi, // onclick, onload, etc.
  /<\s*script/gi,
  /<\s*iframe/gi,
  /<\s*object/gi,
  /<\s*embed/gi,
  /<\s*link/gi,
  /<\s*meta/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
  /url\s*\(/gi,
  /import\s+/gi,
  /require\s*\(/gi,
  /document\./gi,
  /window\./gi,
  /\.innerHTML/gi,
  /\.outerHTML/gi
];

const PROFANITY_PATTERNS = [
  /\b(spam|fake|scam|fraud|hack|virus|malware)\b/gi,
  /\b(admin|administrator|root|system)\b/gi
];

export const validateSurveyForm = (data: SurveyFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Enhanced provider validation
  if (!data.provider_id || typeof data.provider_id !== 'string') {
    errors.provider = "Lütfen bir şarj operatörü seçin";
  } else {
    const trimmedProviderId = data.provider_id.trim();
    if (trimmedProviderId.length === 0) {
      errors.provider = "Lütfen geçerli bir şarj operatörü seçin";
    } else if (trimmedProviderId.length > 50) {
      errors.provider = "Geçersiz operatör seçimi";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(trimmedProviderId)) {
      errors.provider = "Operatör ID'si geçersiz karakterler içeriyor";
    }
  }

  // Enhanced provider name validation
  if (!data.provider_name || typeof data.provider_name !== 'string') {
    errors.provider_name = "Operatör adı gerekli";
  } else {
    const trimmedProviderName = data.provider_name.trim();
    if (trimmedProviderName.length === 0) {
      errors.provider_name = "Operatör adı boş olamaz";
    } else if (trimmedProviderName.length > 100) {
      errors.provider_name = "Operatör adı çok uzun";
    } else if (!/^[\p{L}\p{N}\s\-_.&()]+$/u.test(trimmedProviderName)) {
      errors.provider_name = "Operatör adı geçersiz karakterler içeriyor";
    }
  }

  // Enhanced rating validation
  if (typeof data.rating !== 'number' || !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.rating = "Lütfen 1-5 arası bir puan verin";
  }

  // Enhanced comment validation
  if (data.comment) {
    if (typeof data.comment !== 'string') {
      errors.comment = "Yorum geçersiz format";
    } else if (data.comment.length > 500) {
      errors.comment = "Yorum 500 karakterden uzun olamaz";
    } else if (data.comment.trim().length > 0 && data.comment.trim().length < 3) {
      errors.comment = "Yorum en az 3 karakter olmalı";
    }
    
    // Enhanced XSS protection
    if (SECURITY_PATTERNS.some(pattern => pattern.test(data.comment))) {
      errors.comment = "Yorumda güvenlik açısından tehlikeli içerik tespit edildi";
    }
    
    // Check for potential spam
    if (PROFANITY_PATTERNS.some(pattern => pattern.test(data.comment))) {
      errors.comment = "Yorumda uygunsuz içerik tespit edildi";
    }
    
    // Check for excessive repetition (spam indicator)
    const words = data.comment.toLowerCase().split(/\s+/);
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const maxRepeats = Math.max(...Object.values(wordCount));
    if (maxRepeats > 5) {
      errors.comment = "Yorumda çok fazla tekrar tespit edildi";
    }
  }

  // Cross-field validation
  const allText = `${data.provider_id} ${data.provider_name} ${data.comment || ''}`;
  if (SECURITY_PATTERNS.some(pattern => pattern.test(allText))) {
    errors.security = "Güvenlik açısından tehlikeli içerik tespit edildi";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript URLs
    .replace(/data:/gi, '') // Remove data URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/eval\s*\(/gi, '') // Remove eval calls
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .trim()
    .substring(0, 1000); // Limit length
};

export const isRateLimited = (): boolean => {
  try {
    const lastSubmission = localStorage.getItem('lastSurveySubmission');
    if (!lastSubmission) return false;
    
    const lastTime = parseInt(lastSubmission);
    if (isNaN(lastTime)) return false;
    
    const timeDiff = Date.now() - lastTime;
    return timeDiff < 60000; // 1 minute rate limit
  } catch (error) {
    console.warn('Rate limiting check failed:', error);
    return false;
  }
};

export const setRateLimitTimestamp = (): void => {
  try {
    localStorage.setItem('lastSurveySubmission', Date.now().toString());
  } catch (error) {
    console.warn('Failed to set rate limit timestamp:', error);
  }
};

// Additional utility functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const generateSecureHash = (input: string): string => {
  // Simple hash function for client-side use
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};
