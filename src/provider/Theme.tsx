import { ThemeProvider as Theme } from "@/components/theme";
import { Toaster } from "@/components/ui/toaster";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={true}
    >
      {children}
      <Toaster />
    </Theme>
  );
};
