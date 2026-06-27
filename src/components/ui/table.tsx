import * as React from "react"
import { cn } from "@/lib/utils"

/* CONTAINER */

function Table({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white">
      <table
        className={cn(
          "w-full border-collapse",
          "text-[15.5px] leading-6 text-gray-800",
          className
        )}
        {...props}
      />
    </div>
  )
}

/* HEADER */

function TableHeader(props: React.ComponentProps<"thead">) {
  return (
    <thead
      className="bg-gray-50 border-b"
      {...props}
    />
  )
}

/* BODY */

function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} />
}

/* ROW */

function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b last:border-0",
        "hover:bg-gray-50 transition-colors",
        className
      )}
      {...props}
    />
  )
}

/* HEAD CELL */

function TableHead({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "text-left font-semibold text-gray-700",
        "px-5 py-4",
        "whitespace-nowrap",
        "text-[15px]"
      )}
      {...props}
    />
  )
}

/* CELL */

function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "px-5 py-4",
        "text-[15.5px] text-gray-800",
        "whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

/* CAPTION */

function TableCaption(props: React.ComponentProps<"caption">) {
  return (
    <caption
      className="mt-3 text-sm text-gray-500"
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}