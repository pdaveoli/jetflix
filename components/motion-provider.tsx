\
// filepath: /workspaces/jetflix/landingpage/components/motion-provider.tsx\n\"use client\"\n\nimport { LazyMotion, domAnimation } from \"framer-motion\"\nimport type React from \"react\"\n\nexport function MotionProvider({ children }: { children: React.ReactNode }) {\n  return <LazyMotion features={domAnimation}>{children}</LazyMotion>\n}\n
