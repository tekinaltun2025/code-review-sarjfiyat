
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { fetchProviderData } from "@/services/googleSheetsService";
import { Provider } from "@/data/types/provider.types";
import { useToast } from "@/hooks/use-toast";
import SurveyHero from "./SurveyHero";
import ProviderSelector from "./ProviderSelector";
import RatingPicker from "./RatingPicker";
import CommentField from "./CommentField";
import { validateSurveyForm, sanitizeInput, isRateLimited, setRateLimitTimestamp } from "./FormValidation";
import { createSecureRequest, validateApiResponse, logSecurityEvent } from "./SecurityUtils";

interface SurveyFormProps {
  onSubmitted?: () => void;
}

const SurveyForm = ({ onSubmitted }: SurveyFormProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        // Mock veri kullanıyoruz çünkü API çalışmıyor
        const mockData: Provider[] = [
          {
            id: 'zes',
            name: 'ZES',
            logo: 'https://example.com/logos/zes.png',
            acPrice: 8.99,
            dcPrice: 12.99,
            fastDcPrice: 12.99,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://zes.net/tr"
          },
          {
            id: 'esarj',
            name: 'Eşarj',
            logo: 'https://example.com/logos/esarj.png',
            acPrice: 8.9,
            dcPrice: 11.9,
            fastDcPrice: 11.9,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://esarj.com"
          },
          {
            id: 'voltrun',
            name: 'Voltrun',
            logo: 'https://example.com/logos/voltrun.png',
            acPrice: 9.29,
            dcPrice: 12.49,
            fastDcPrice: 12.49,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://voltrun.com"
          },
          {
            id: 'trugo',
            name: 'Trugo',
            logo: 'https://example.com/logos/trugo.png',
            acPrice: 8.49,
            dcPrice: 11.82,
            fastDcPrice: 11.82,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://trugo.com.tr"
          },
          {
            id: 'voltgo',
            name: 'Voltgo',
            logo: 'https://example.com/logos/voltgo.png',
            acPrice: 6.99,
            dcPrice: 9.75,
            fastDcPrice: 9.75,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://voltgo.com.tr"
          }
        ];
        setProviders(mockData);
      } catch (error) {
        console.error("Failed to load providers:", error);
        logSecurityEvent("Provider loading failed", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProviders();
  }, []);
  
  const form = useForm({
    defaultValues: {
      provider: "",
      rating: 0,
      comment: ""
    }
  });

  const handleProviderChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setSelectedProvider(sanitizedValue);
    setValidationErrors(prev => ({ ...prev, provider: undefined }));
  };
  
  const handleRatingChange = (rating: number) => {
    if (rating >= 1 && rating <= 5 && Number.isInteger(rating)) {
      setUserRating(rating);
      setValidationErrors(prev => ({ ...prev, rating: undefined }));
    }
  };

  const onSubmit = async (data: any) => {
    // Check rate limiting
    if (isRateLimited()) {
      toast({
        title: "Çok Hızlı",
        description: "Lütfen bir dakika bekleyip tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    // Get and sanitize provider data
    const providerObj = providers.find(p => p.id === selectedProvider);
    const providerName = providerObj ? sanitizeInput(providerObj.name) : sanitizeInput(selectedProvider);
    
    const surveyData = {
      provider_id: sanitizeInput(selectedProvider),
      provider_name: providerName,
      rating: userRating,
      comment: sanitizeInput(data.comment || "")
    };

    // Validate form data
    const validation = validateSurveyForm(surveyData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Form Hatası",
        description: "Lütfen tüm alanları doğru şekilde doldurun.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Güvenli anket gönderiliyor:", surveyData);
    
    try {
      setSubmitting(true);
      
      // Use localStorage instead of external API for security
      const existingSurveys = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
      
      // Check for duplicate submissions
      const isDuplicate = existingSurveys.some((survey: any) => 
        survey.provider_id === surveyData.provider_id &&
        survey.rating === surveyData.rating &&
        Date.now() - new Date(survey.timestamp).getTime() < 300000 // 5 minutes
      );

      if (isDuplicate) {
        toast({
          title: "Tekrar Gönderim",
          description: "Bu değerlendirmeyi yakın zamanda göndermişsiniz.",
          variant: "destructive",
        });
        return;
      }

      const newSurvey = {
        ...surveyData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
        userAgent: navigator.userAgent.substring(0, 50) // Limited user agent info
      };
      
      existingSurveys.push(newSurvey);
      
      // Limit storage to last 100 surveys
      if (existingSurveys.length > 100) {
        existingSurveys.splice(0, existingSurveys.length - 100);
      }
      
      localStorage.setItem('surveyResponses', JSON.stringify(existingSurveys));
      
      // Set rate limit timestamp
      setRateLimitTimestamp();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Anket Gönderildi",
        description: "Değerlendirmeniz için teşekkür ederiz!",
      });
      
      // Reset form securely
      form.reset();
      setSelectedProvider("");
      setUserRating(0);
      setValidationErrors({});
      
      if (onSubmitted) {
        onSubmitted();
      }
      
    } catch (error) {
      console.error("Anket gönderilirken hata:", error);
      logSecurityEvent("Survey submission failed", error);
      toast({
        title: "Hata",
        description: "Anket gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <SurveyHero />

        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Şarj Operatörü Memnuniyet Anketi</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ProviderSelector 
                  providers={providers} 
                  loading={loading} 
                  selectedProvider={selectedProvider} 
                  onProviderChange={handleProviderChange}
                  error={validationErrors.provider}
                  required
                />

                <RatingPicker 
                  userRating={userRating} 
                  onRatingChange={handleRatingChange} 
                  error={validationErrors.rating}
                  required
                />

                <CommentField 
                  control={form.control} 
                  maxLength={500}
                  error={validationErrors.comment}
                />

                {validationErrors.security && (
                  <div className="text-red-600 text-sm">
                    {validationErrors.security}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={submitting || !selectedProvider || userRating === 0}
                >
                  {submitting ? "Gönderiliyor..." : "Anketi Gönder"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveyForm;
