import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Login — Joniel Santiago",
  description: "Sign in to your account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/10 p-4">
          {children}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
