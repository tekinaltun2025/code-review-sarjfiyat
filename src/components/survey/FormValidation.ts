
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

export const validateSurveyForm = (data: SurveyFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Provider validation
  if (!data.provider_id || data.provider_id.trim().length === 0) {
    errors.provider = "Lütfen bir şarj operatörü seçin";
  } else if (data.provider_id.length > 50) {
    errors.provider = "Geçersiz operatör seçimi";
  }

  // Provider name validation
  if (!data.provider_name || data.provider_name.trim().length === 0) {
    errors.provider_name = "Operatör adı gerekli";
  } else if (data.provider_name.length > 100) {
    errors.provider_name = "Operatör adı çok uzun";
  }

  // Rating validation
  if (!data.rating || data.rating < 1 || data.rating > 5 || !Number.isInteger(data.rating)) {
    errors.rating = "Lütfen 1-5 arası bir puan verin";
  }

  // Comment validation
  if (data.comment && data.comment.length > 500) {
    errors.comment = "Yorum 500 karakterden uzun olamaz";
  }

  // XSS protection for comment
  if (data.comment && /<[^>]*>/.test(data.comment)) {
    errors.comment = "Yorumda HTML etiketleri kullanılamaz";
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /onload/i,
    /onclick/i,
    /onerror/i,
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];

  const allText = `${data.provider_id} ${data.provider_name} ${data.comment}`;
  if (suspiciousPatterns.some(pattern => pattern.test(allText))) {
    errors.security = "Geçersiz karakter veya içerik tespit edildi";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript URLs
    .replace(/data:/gi, '') // Remove data URLs
    .trim();
};

export const isRateLimited = (): boolean => {
  const lastSubmission = localStorage.getItem('lastSurveySubmission');
  if (!lastSubmission) return false;
  
  const timeDiff = Date.now() - parseInt(lastSubmission);
  return timeDiff < 60000; // 1 minute rate limit
};

export const setRateLimitTimestamp = (): void => {
  localStorage.setItem('lastSurveySubmission', Date.now().toString());
};
