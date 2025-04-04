
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import StarRating from './StarRating';

interface Comment {
  text: string;
}

interface SurveyStatItem {
  provider_name: string;
  average_rating: number;
  response_count: number;
  comments?: string[];
}

interface SurveyStatCardsProps {
  stats: SurveyStatItem[];
}

const SurveyStatCards = ({ stats }: SurveyStatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-xl">{stat.provider_name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{stat.provider_name}</h3>
                <div className="flex items-center">
                  <StarRating rating={stat.average_rating} />
                  <span className="text-sm text-gray-500 ml-2">({stat.response_count} değerlendirme)</span>
                </div>
              </div>
            </div>
            {stat.comments && stat.comments.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-500 font-medium mb-2">Son Yorumlar:</p>
                <div className="max-h-24 overflow-y-auto">
                  {stat.comments.slice(0, 2).map((comment: string, i: number) => (
                    <p key={i} className="text-sm text-gray-600 mb-2 italic">
                      "{comment}"
                    </p>
                  ))}
                  {stat.comments.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{stat.comments.length - 2} daha fazla yorum
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SurveyStatCards;
