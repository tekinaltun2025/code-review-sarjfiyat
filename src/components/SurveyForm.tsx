
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { fetchProviderData } from "@/services/googleSheetsService";
import { Provider } from "@/data/types/provider.types";
import { useToast } from "@/hooks/use-toast";

interface SurveyFormProps {
  onSubmitted?: () => void;
}

const SurveyForm = ({ onSubmitted }: SurveyFormProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
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
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };
  
  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };
  
  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const renderStars = (count: number, filled: boolean = true) => {
    return Array(count).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-6 w-6 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
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
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl p-8 mb-10 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Elektrikli Araç Şarj Fiyatlarını Karşılaştırın</h1>
              <p className="text-lg mb-6">
                Türkiye'deki tüm şarj istasyonu operatörlerinin güncel fiyatlarını karşılaştırın,
                sizin için en ekonomik şarj noktasını bulun.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Fiyatları Karşılaştır
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/20 rounded-lg">
                  <div className="bg-teal-400 p-2 rounded-full">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Güncel Tarifeler</h3>
                    <p className="text-sm">Tüm operatörlerin en güncel şarj fiyatları</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/20 rounded-lg">
                  <div className="bg-teal-400 p-2 rounded-full">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Şeffaf Fiyatlandırma</h3>
                    <p className="text-sm">Üyelik ücretleri ve tarifeler hakkında tam bilgi</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/20 rounded-lg">
                  <div className="bg-teal-400 p-2 rounded-full">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tüm Şarj Ağları</h3>
                    <p className="text-sm">Türkiye'deki tüm şarj operatörleri karşılaştırması</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Survey Form */}
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Şarj Operatörü Memnuniyet Anketi</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Provider Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Şarj Operatörü Seçin</label>
                  <Select onValueChange={handleProviderChange} value={selectedProvider}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Şarj operatörü seçin" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      {loading ? (
                        <SelectItem value="loading" disabled>Yükleniyor...</SelectItem>
                      ) : (
                        providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            <div className="flex items-center gap-2">
                              <img 
                                src={provider.logo} 
                                alt={provider.name} 
                                className="h-6 w-6 object-contain"
                              />
                              <span>{provider.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Star Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Puanınız</label>
                  <div 
                    className="flex gap-1"
                    onMouseLeave={handleRatingLeave}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleRatingHover(star)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-8 w-8 ${
                            (hoveredRating || userRating) >= star 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Yorumunuz</label>
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Deneyiminizi paylaşın..." 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

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

        {/* We've removed the Provider Ratings section since we now display this data at the top of the page */}
      </div>
    </div>
  );
};

export default SurveyForm;
