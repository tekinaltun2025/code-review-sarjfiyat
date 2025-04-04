
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface CommentFieldProps {
  control: Control<any>;
}

const CommentField = ({ control }: CommentFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Yorumunuz</label>
      <FormField
        control={control}
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
  );
};

export default CommentField;
