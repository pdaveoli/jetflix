"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useState } from "react";

import { cn } from "@/lib/utils"

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Drawer = ({ open, onOpenChange, children }: DrawerProps) => (
  <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
    <div className="fixed inset-0 bg-black opacity-50" onClick={() => onOpenChange(false)}></div>
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg">
      {children}
    </div>
  </div>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = ({ children }: { children: React.ReactNode }) => (
  <button onClick={() => onOpenChange(false)}>{children}</button>
)

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b">{children}</div>
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-t">{children}</div>
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-600">{children}</p>
)
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
