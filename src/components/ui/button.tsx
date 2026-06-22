import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-medical-blue text-white hover:bg-medical-blue-dark shadow-sm shadow-medical-blue/20",
        teal: "bg-teal text-white hover:bg-teal-dark shadow-sm shadow-teal/20",
        outline:
          "border border-border-strong bg-surface text-ink hover:bg-bg-alt hover:border-medical-blue",
        ghost: "text-ink-muted hover:bg-bg-alt hover:text-ink",
        emergency:
          "bg-risk-emergency text-white hover:bg-red-700 shadow-sm shadow-red-500/20",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-[3.25rem] px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
