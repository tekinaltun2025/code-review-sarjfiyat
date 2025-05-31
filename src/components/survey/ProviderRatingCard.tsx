
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Provider } from "@/data/types/provider.types";
import { useToast } from "@/hooks/use-toast";

interface SurveyData {
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface ProviderRatingCardProps {
  provider: Provider;
  onSubmit: (providerId: string, providerName: string, rating: number, comment: string) => void;
  existingRating?: SurveyData;
}

const ProviderRatingCard = ({ provider, onSubmit, existingRating }: ProviderRatingCardProps) => {
  const [rating, setRating] = useState<number>(existingRating?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(existingRating?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleRatingHover = (newRating: number) => {
    setHoveredRating(newRating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Hata",
        description: "Lütfen bir puan verin.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit(provider.id, provider.name, rating, comment);
      toast({
        title: "Değerlendirme Gönderildi",
        description: `${provider.name} için değerlendirmeniz kaydedildi.`,
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Değerlendirme gönderilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (ratingValue: number) => {
    switch (ratingValue) {
      case 5: return "Mükemmel!";
      case 4: return "Çok İyi!";
      case 3: return "Ortalama";
      case 2: return "Vasat";
      case 1: return "Kötü";
      default: return "";
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        {/* Provider Header */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={provider.logo} 
            alt={provider.name} 
            className="h-12 w-12 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <p className="text-sm text-gray-500">
              AC: {provider.acPrice} TL | DC: {provider.dcPrice} TL
            </p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Puanınız *</label>
          <div 
            className="flex gap-1 mb-2"
            onMouseLeave={handleRatingLeave}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                className="focus:outline-none transition-transform hover:scale-110"
                aria-label={`Rate ${star} out of 5`}
              >
                <Star 
                  className={`h-8 w-8 ${
                    (hoveredRating || rating) >= star 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600">{getRatingText(rating)}</p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Yorumunuz</label>
          <Textarea 
            placeholder={`${provider.name} ile ilgili deneyimlerinizi paylaşın...`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {comment.length}/500
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Gönderiliyor..." : existingRating ? "Güncelle" : "Değerlendirmeyi Gönder"}
        </Button>

        {existingRating && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Son güncelleme: {new Date(existingRating.timestamp).toLocaleDateString('tr-TR')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderRatingCard;
