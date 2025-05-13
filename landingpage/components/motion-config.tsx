"use client";

import { MotionConfig as FramerMotionConfig } from "framer-motion";

export default function MotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FramerMotionConfig reducedMotion="user">
      {children}
    </FramerMotionConfig>
  );
}