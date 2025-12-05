// src/app/layout.tsx
// "use client";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthHydrator from "@/components/AuthHydrator";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Electroco - Electronics Catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthHydrator /> {/* runs once on startup */}
          {children}
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
