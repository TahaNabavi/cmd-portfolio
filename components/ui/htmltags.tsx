"use client"
import { cn } from "@lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", disabled = false, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={cn(
          `p-2 rounded-xl bg-slate-500/10 transition-all text-gray-700 dark:text-gray-500 relative hover:scale-90 mx-1 border-2 ${
            !disabled
              ? "active:scale-[0.8] dark:hover:text-gray-200 hover:text-gray-900 hover:bg-slate-500/30 border-white/0"
              : "border-red-600/20"
          }`,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", disabled = false, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        disabled={disabled}
        className={cn(
          `p-3 rounded-xl bg-slate-500/10 transition-all text-gray-700 dark:text-gray-200 border-2 focus:outline-none ${
            !disabled
              ? "hover:bg-slate-500/20 focus:bg-slate-500/20 border-white/0 focus:border-slate-500/30"
              : "border-red-600/20 cursor-not-allowed"
          }`,
          className
        )}
      />
    );
  }
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", disabled = false, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        className={cn(
          `p-3 rounded-xl bg-slate-500/10 transition-all text-gray-700 dark:text-gray-200 border-2 focus:outline-none min-h-[100px] ${
            !disabled
              ? "hover:bg-slate-500/20 focus:bg-slate-500/20 border-white/0 focus:border-slate-500/30"
              : "border-red-600/20 cursor-not-allowed"
          }`,
          className
        )}
      />
    );
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", disabled = false, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          `rounded-xl bg-slate-500/10 transition-all border-2 p-4 ${
            !disabled
              ? "hover:bg-slate-500/20 border-white/0 hover:border-slate-500/30"
              : "border-red-600/20"
          }`,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

// Display names for components
Button.displayName = "Button";
Input.displayName = "Input";
Textarea.displayName = "Textarea";
Card.displayName = "Card";