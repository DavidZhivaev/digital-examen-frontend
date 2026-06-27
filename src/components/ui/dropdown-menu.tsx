"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

/* ROOT */

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

/* PORTAL */

function DropdownMenuPortal(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>
) {
  return (
    <DropdownMenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  )
}

/* TRIGGER */

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

/* CONTENT (IMPORTANT PART) */

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // CORE LAYOUT
          "z-[100] min-w-48 max-w-[260px]",
          "rounded-lg border bg-white",

          // spacing
          "p-1",

          // typography
          "text-sm text-gray-800",

          // shadow (soft, not aggressive)
          "shadow-md",

          // behavior
          "overflow-hidden",

          // animation (light, not distracting)
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",

          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

/* GROUP */

function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>
) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      {...props}
    />
  )
}

/* ITEM */

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex items-center gap-2",
        "rounded-md px-3 py-2",
        "text-sm",

        // UX
        "cursor-default select-none",
        "transition-colors",

        // hover
        "focus:bg-gray-100",

        // disabled
        "data-disabled:pointer-events-none data-disabled:opacity-50",

        // destructive
        variant === "destructive" &&
          "text-red-600 focus:bg-red-50",

        inset && "pl-7",

        className
      )}
      {...props}
    />
  )
}

/* CHECKBOX ITEM */

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      data-inset={inset}
      className={cn(
        "relative flex items-center gap-2",
        "rounded-md px-3 py-2",
        "text-sm",

        "cursor-default select-none",
        "focus:bg-gray-100",

        "data-disabled:pointer-events-none data-disabled:opacity-50",

        inset && "pl-7",

        className
      )}
      {...props}
    >
      <span className="absolute right-3 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

/* RADIO GROUP */

function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

/* RADIO ITEM */

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex items-center gap-2",
        "rounded-md px-3 py-2",
        "text-sm",

        "cursor-default select-none",
        "focus:bg-gray-100",

        "data-disabled:pointer-events-none data-disabled:opacity-50",

        inset && "pl-7",

        className
      )}
      {...props}
    >
      <span className="absolute right-3 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/* LABEL */

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-inset={inset}
      className={cn(
        "px-3 py-2",
        "text-xs font-medium text-gray-500",
        inset && "pl-7",
        className
      )}
      {...props}
    />
  )
}

/* SEPARATOR */

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  )
}

/* SHORTCUT */

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-xs text-gray-400",
        className
      )}
      {...props}
    />
  )
}

/* SUB MENU */

function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
) {
  return (
    <DropdownMenuPrimitive.Sub
      data-slot="dropdown-menu-sub"
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-inset={inset}
      className={cn(
        "flex items-center gap-2",
        "rounded-md px-3 py-2",
        "text-sm",

        "cursor-default select-none",
        "focus:bg-gray-100",

        inset && "pl-7",

        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4 text-gray-400" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "z-[110] min-w-40",
        "rounded-lg border bg-white",
        "p-1 shadow-md",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}