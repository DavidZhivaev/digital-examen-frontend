import * as React from "react"
import { cn } from "@/lib/utils"

/* CARD ROOT */

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl",
        "bg-white border border-gray-200",
        "text-gray-900",
        "shadow-sm",

        // spacing system
        size === "default" ? "gap-4" : "gap-3",

        className
      )}
      {...props}
    />
  )
}

/* HEADER */

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1",
        "px-5 pt-5",
        className
      )}
      {...props}
    />
  )
}

/* TITLE */

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[16px] font-semibold leading-6",
        "text-gray-900",
        className
      )}
      {...props}
    />
  )
}

/* DESCRIPTION */

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-[14px] leading-5 text-gray-500",
        className
      )}
      {...props}
    />
  )
}

/* ACTION */

function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "flex items-center justify-end",
        className
      )}
      {...props}
    />
  )
}

/* CONTENT */

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-5 pb-5",
        "text-[15px] leading-6 text-gray-800",
        className
      )}
      {...props}
    />
  )
}

/* FOOTER */

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between",
        "px-5 py-4",
        "border-t border-gray-100",
        "bg-gray-50/60",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}