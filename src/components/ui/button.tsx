import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F97A5] disabled:pointer-events-none disabled:opacity-50 gap-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#3F97A5] text-white hover:bg-[#35818D] shadow-xs active:bg-[#143B42]",
        destructive:
          "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 active:bg-rose-200",
        outline:
          "border border-slate-200 bg-white hover:bg-[#EBF6F6]/60 text-slate-700 hover:text-[#143B42]",
        secondary:
          "bg-[#EBF6F6] text-[#143B42] hover:bg-[#DDF0F0]",
        ghost:
          "hover:bg-[#EBF6F6]/70 hover:text-[#143B42] text-slate-600",
        link:
          "text-[#3F97A5] underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-full px-6 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
