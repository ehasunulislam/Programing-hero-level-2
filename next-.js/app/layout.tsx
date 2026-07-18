import "./globals.css";
import { Oxanium, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const oxanium = Oxanium({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", oxanium.variable, geistHeading.variable)}>
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />
        {children}
        </body>
    </html>
  );
}
