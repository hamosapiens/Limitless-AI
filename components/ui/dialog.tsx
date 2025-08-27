"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* Root */
function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/* Trigger */
function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/* Portal */
function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/* Overlay */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

/* Close (exported for DX; used internally, too) */
function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/* Content */
type ContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
  /** custom close element; wrapped in Radix <Close asChild> */
  close?: React.ReactNode
  /** preset reveal animations */
  reveal?: "none" | "blur" | "mask"
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  close,
  reveal = "none",
  ...props
}: ContentProps) {
  const revealClass =
    reveal === "blur"
      ? [
          "transition-[filter,transform,opacity] duration-300",
          "data-[state=closed]:opacity-0 data-[state=closed]:translate-y-2",
          "data-[state=closed]:[filter:blur(10px)_saturate(80%)]",
          "data-[state=open]:opacity-100 data-[state=open]:translate-y-0",
          "data-[state=open]:[filter:blur(0)_saturate(110%)]",
        ].join(" ")
      : reveal === "mask"
      ? [
          "relative transition-[filter,transform,opacity] duration-500",
          "data-[state=closed]:opacity-0 data-[state=closed]:translate-y-2",
          "data-[state=closed]:[filter:blur(10px)_saturate(80%)]",
          "data-[state=open]:opacity-100 data-[state=open]:translate-y-0",
          "data-[state=open]:[filter:blur(0)_saturate(110%)]",
          // gradient mask reveal (top→down)
          "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
          "before:[mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_85%)]",
          "before:[mask-size:100%_0%] before:[mask-repeat:no-repeat]",
          "data-[state=open]:before:[mask-size:100%_140%] before:transition-[mask-size] before:duration-500",
        ].join(" ")
      : ""

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4",
          "rounded-2xl border p-6 shadow-lg bg-background",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          revealClass,
          className
        )}
        {...props}
      >
        {children}

        {close ? (
          <DialogPrimitive.Close asChild>{close}</DialogPrimitive.Close>
        ) : showCloseButton ? (
          <DialogClose
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md
                       bg-black/30 text-white/90 ring-1 ring-white/20 backdrop-blur transition
                       hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/* Header / Footer / Title / Description */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2 text-left", className)} {...props} />
}
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}
function DialogTitle(props: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg font-semibold leading-none", props.className)} {...props} />
}
function DialogDescription(props: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-sm text-muted-foreground", props.className)} {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
