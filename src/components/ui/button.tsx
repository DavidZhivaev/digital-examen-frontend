import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap shrink-0 select-none",
    "rounded-lg text-sm font-medium",
    "transition-all duration-200",
    "outline-none",

    // disabled
    "disabled:pointer-events-none disabled:opacity-50",

    // focus (как в норм UI libs)
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

    // press effect
    "active:scale-[0.98]",

    // icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95",

        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9  px-4",
        lg: "h-11 px-6 text-base",
        "icon-sm": "h-8 w-8 rounded-md",
        icon: "h-9 w-9 rounded-md",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  const isDisabled = disabled || loading

  return (
    <Comp
      data-slot="button"
      data-loading={loading ? "true" : "false"}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }