import React, { forwardRef, useState } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, showCharCount, maxLength, className = '', id, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2
            border rounded-lg
            bg-white
            text-secondary-900
            placeholder-secondary-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-secondary-100 disabled:cursor-not-allowed
            resize-vertical
            ${error ? 'border-red-500' : 'border-secondary-300'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          onChange={handleChange}
          {...props}
        />
        <div className="mt-1 flex justify-between items-center">
          <div className="flex-1">
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-red-600">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-secondary-500">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && maxLength && (
            <p className="text-sm text-secondary-500 ml-2">
              {charCount} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
