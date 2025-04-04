
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

interface SurveyFormProps {
  onSubmitted?: () => void;
}

const SurveyForm = ({ onSubmitted }: SurveyFormProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{
    provider?: string;
    rating?: string;
  }>({});
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch providers data when component mounts
    const loadProviders = async () => {
      try {
        setLoading(true);
        const data = await fetchProviderData();
        setProviders(data);
      } catch (error) {
        console.error("Failed to load providers:", error);
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
    setSelectedProvider(value);
    setValidationErrors(prev => ({ ...prev, provider: undefined }));
  };
  
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    setValidationErrors(prev => ({ ...prev, rating: undefined }));
  };

  const validateForm = () => {
    const errors: { provider?: string; rating?: string } = {};
    
    if (!selectedProvider) {
      errors.provider = "Lütfen bir şarj operatörü seçin";
    }
    
    if (userRating === 0) {
      errors.rating = "Lütfen bir puan verin";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (data: any) => {
    if (!validateForm()) {
      return;
    }
    
    // Get provider name from the id
    const providerObj = providers.find(p => p.id === selectedProvider);
    const providerName = providerObj ? providerObj.name : selectedProvider;
    
    const surveyData = {
      provider_id: selectedProvider,
      provider_name: providerName,
      rating: userRating,
      comment: data.comment,
      // Normalde veritabanı bilgileri backend'de güvenli bir şekilde tutulmalıdır
      // Burada sadece örnek amaçlı eklenmiştir
      db_name: "evfix_survey",
      db_user: "evfix_survey_user",
      db_pass: "survey_password_2025"
    };
    
    console.log("API'ye anket verisi gönderiliyor:", surveyData);
    
    try {
      setSubmitting(true);
      
      // PHP dosyasına POST isteği gönder
      const response = await fetch('/api/submit-survey.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
      
      // API yanıtını JSON olarak parse et
      // PHP kodunu görebildiğimiz için, burada sunucudan plain text 
      // olarak dönen php dosyasını değil JSON cevabını parse etmeliyiz
      const resultText = await response.text();
      let result;
      
      try {
        // PHP kaynak kodunu değil, çalıştırıldığında üretilen JSON çıktıyı almaya çalışalım
        result = JSON.parse(resultText);
      } catch (e) {
        console.error("API yanıtı geçerli bir JSON değil:", resultText);
        throw new Error("API yanıtı işlenemedi");
      }
      
      if (result.success) {
        toast({
          title: "Anket Gönderildi",
          description: "Değerlendirmeniz için teşekkür ederiz!",
        });
        
        // Form'u sıfırla
        form.reset();
        setSelectedProvider("");
        setUserRating(0);
        setValidationErrors({});
        
        // İstatistikleri yenile
        if (onSubmitted) {
          onSubmitted();
        }
      } else {
        throw new Error(result.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error("Anket gönderilirken hata:", error);
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
        {/* Hero Section with Gradient Background */}
        <SurveyHero />

        {/* Survey Form */}
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Şarj Operatörü Memnuniyet Anketi</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Provider Selection */}
                <ProviderSelector 
                  providers={providers} 
                  loading={loading} 
                  selectedProvider={selectedProvider} 
                  onProviderChange={handleProviderChange}
                  error={validationErrors.provider}
                  required
                />

                {/* Star Rating */}
                <RatingPicker 
                  userRating={userRating} 
                  onRatingChange={handleRatingChange} 
                  error={validationErrors.rating}
                  required
                />

                {/* Comment */}
                <CommentField 
                  control={form.control} 
                  maxLength={500}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={submitting}
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
