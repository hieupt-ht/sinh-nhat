import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  tintClassName?: string;
};

export function GlassPanel({
  className,
  tintClassName,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/55 bg-white/48 shadow-[0_24px_60px_rgba(36,14,46,0.16)] backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_58%)]",
          tintClassName,
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
