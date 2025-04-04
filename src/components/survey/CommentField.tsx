
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface CommentFieldProps {
  control: Control<any>;
  required?: boolean;
  maxLength?: number;
}

const CommentField = ({ control, required = false, maxLength = 500 }: CommentFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Yorumunuz {required && <span className="text-red-500">*</span>}
      </label>
      <FormField
        control={control}
        name="comment"
        rules={{
          required: required ? "Lütfen bir yorum girin" : false,
          maxLength: {
            value: maxLength,
            message: `Yorum ${maxLength} karakterden fazla olamaz`
          }
        }}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <Textarea 
                placeholder="Deneyiminizi paylaşın..." 
                className={`min-h-[100px] ${fieldState.error ? "border-red-500" : ""}`}
                {...field}
              />
            </FormControl>
            <div className="flex justify-between">
              <FormMessage />
              {field.value && (
                <p className={`text-xs ${field.value.length > maxLength ? "text-red-500" : "text-gray-500"}`}>
                  {field.value.length}/{maxLength}
                </p>
              )}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CommentField;
