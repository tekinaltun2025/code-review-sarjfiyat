
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
  };
  
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const onSubmit = async (data: any) => {
    // Get provider name from the id
    const providerObj = providers.find(p => p.id === selectedProvider);
    const providerName = providerObj ? providerObj.name : selectedProvider;
    
    const surveyData = {
      provider_id: selectedProvider,
      provider_name: providerName,
      rating: userRating,
      comment: data.comment
    };
    
    console.log("Form submitted:", surveyData);
    
    // Submit to database - Using simulated response instead of actual API call
    try {
      setSubmitting(true);
      
      // Simulate successful API response
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const result = {
        success: true,
        message: "Anket başarıyla kaydedildi."
      };
      
      if (result.success) {
        toast({
          title: "Anket Gönderildi",
          description: "Değerlendirmeniz için teşekkür ederiz!",
        });
        
        // Reset form after submission
        form.reset();
        setSelectedProvider("");
        setUserRating(0);
        
        // Refresh survey stats if callback is provided
        if (onSubmitted) {
          onSubmitted();
        }
      } else {
        throw new Error(result.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error("Failed to submit survey:", error);
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
                />

                {/* Star Rating */}
                <RatingPicker 
                  userRating={userRating} 
                  onRatingChange={handleRatingChange} 
                />

                {/* Comment */}
                <CommentField control={form.control} />

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={submitting || userRating === 0 || selectedProvider === ""}
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
