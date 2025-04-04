
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import StarRating from './StarRating';

interface SurveyStatItem {
  provider_name: string;
  average_rating: number;
  response_count: number;
  comments?: string[];
}

interface SurveyTableProps {
  stats: SurveyStatItem[];
}

const SurveyTable = ({ stats }: SurveyTableProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Operatör</TableHead>
            <TableHead>Değerlendirme</TableHead>
            <TableHead>Değerlendirme Sayısı</TableHead>
            <TableHead>Son Yorumlar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <TableCell className="font-medium">{stat.provider_name}</TableCell>
              <TableCell>
                <StarRating rating={stat.average_rating} size="md" />
              </TableCell>
              <TableCell>{stat.response_count}</TableCell>
              <TableCell>
                {stat.comments && stat.comments.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto">
                    {stat.comments.slice(0, 2).map((comment: string, i: number) => (
                      <p key={i} className="text-sm text-gray-600 mb-2">
                        "{comment.substring(0, 100)}{comment.length > 100 ? '...' : ''}"
                      </p>
                    ))}
                    {stat.comments.length > 2 && (
                      <p className="text-xs text-gray-500">
                        +{stat.comments.length - 2} daha fazla yorum
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Yorum yok</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyTable;
