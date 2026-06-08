"use client";

import { useRouter, Link } from "@/i18n/navigation";
import { SignInForm, type AuthMethod } from "@/components/auth/sign-in-form";
import { useAuthFlowStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const setFlow = useAuthFlowStore((s) => s.setFlow);

  function handleSubmit(credential: string, method: AuthMethod) {
    setFlow(credential, method);
    router.push("/otp-verify");
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link
            href="/"
            className="text-foreground inline-block text-2xl font-bold tracking-tight"
          >
            Hiva
          </Link>
        </div>

        <div className="bg-card border-border rounded-2xl border p-8 shadow-sm">
          <SignInForm onSubmit={handleSubmit} />
        </div>

        <p className="text-muted-foreground text-center text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
