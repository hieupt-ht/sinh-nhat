"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(135deg,#ffcf9d,#ff89b5)] text-[#4f2747] shadow-[0_18px_35px_rgba(255,151,193,0.3)] hover:brightness-105",
  secondary:
    "bg-white/65 text-[#5a3e56] shadow-[0_16px_32px_rgba(160,112,136,0.16)] ring-1 ring-white/65 hover:bg-white/78",
  ghost:
    "bg-white/18 text-white shadow-[0_16px_32px_rgba(44,24,61,0.14)] ring-1 ring-white/25 hover:bg-white/26",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.02em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
