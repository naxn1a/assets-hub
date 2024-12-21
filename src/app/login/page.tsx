import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "@/components/login/Login";
import LoginTheme from "@/components/login/LoginTheme";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium select-none">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <LoginTheme text="Assets Hub" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}