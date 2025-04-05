
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

// Veritabanı bilgileri - normalde .env veya başka güvenli bir yerden alınmalı
const DB_INFO = {
  db_name: "sarjfiya_sarjanketdb",
  db_user: "sarjfiya_sarjuser",
  db_pass: "Dallama11!"
};

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
        // Mock veri kullanıyoruz çünkü API çalışmıyor
        const mockData: Provider[] = [
          {
            id: 'zes',
            name: 'ZES',
            logo: 'https://example.com/logos/zes.png',
            acPrice: 8.99,
            dcPrice: 12.99
          },
          {
            id: 'esarj',
            name: 'Eşarj',
            logo: 'https://example.com/logos/esarj.png',
            acPrice: 8.9,
            dcPrice: 11.9
          },
          {
            id: 'voltrun',
            name: 'Voltrun',
            logo: 'https://example.com/logos/voltrun.png',
            acPrice: 9.29,
            dcPrice: 12.49
          },
          {
            id: 'trugo',
            name: 'Trugo',
            logo: 'https://example.com/logos/trugo.png',
            acPrice: 8.49,
            dcPrice: 11.82
          }
        ];
        setProviders(mockData);
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
      ...DB_INFO,
      provider_id: selectedProvider,
      provider_name: providerName,
      rating: userRating,
      comment: data.comment
    };
    
    console.log("Anket gönderiliyor:", surveyData);
    
    try {
      setSubmitting(true);
      
      // Simulate API submission because the actual API is not working
      // Simulate successful API response
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
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
