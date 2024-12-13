import { ThemeProvider } from "@/components/theme";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
}
