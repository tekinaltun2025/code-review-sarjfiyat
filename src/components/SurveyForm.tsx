
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

const SurveyForm = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
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
  
  const onSubmit = (data: any) => {
    console.log("Form submitted:", {
      provider: selectedProvider,
      rating: userRating,
      comment: data.comment
    });
    // Reset form after submission
    form.reset();
    setSelectedProvider("");
    setUserRating(0);
  };

  // Sample provider ratings (we'd use real data in a production app)
  const providerRatings = [
    {
      id: "trugo",
      name: "Trugo",
      logo: "/lovable-uploads/4e883d70-0fb2-41c7-9bc4-f51d94c026ef.png",
      rating: 5.0
    },
    {
      id: "zes",
      name: "ZES",
      logo: "/lovable-uploads/6e47365f-9335-4024-9da3-18b00c4ce94b.png",
      rating: 4.2
    },
    {
      id: "beefull",
      name: "Beefull",
      logo: "/lovable-uploads/cc0015aa-72d6-4e18-bc05-8c7486d57eb7.png",
      rating: 2.5
    },
    {
      id: "esarj",
      name: "Eşarj",
      logo: "/lovable-uploads/fb66fe81-1208-4c6d-a276-363ee14ce4b9.png",
      rating: 4.9
    }
  ];

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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Anketi Gönder
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Provider Ratings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Şarj Operatörü Değerlendirmeleri</h2>
          
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <h3 className="font-medium mb-2">Yıldız Ortalaması</h3>
              <div className="flex justify-center">
                {renderStars(5)}
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <h3 className="font-medium mb-2">Not Ortalaması</h3>
              <span className="text-2xl font-bold">4.2</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {providerRatings.map((provider) => (
              <div key={provider.id} className="bg-white rounded-md shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
                      <img 
                        src={provider.logo} 
                        alt={provider.name} 
                        className="max-h-8 max-w-8 object-contain" 
                      />
                    </div>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex">
                      {renderStars(Math.floor(provider.rating))}
                      {provider.rating % 1 > 0 && 
                        renderStars(5 - Math.floor(provider.rating), false)}
                    </div>
                    <div className="w-12 h-12 rounded-md border flex items-center justify-center font-bold">
                      {provider.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
