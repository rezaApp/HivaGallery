"use client";

import { useRouter, Link } from "@/i18n/navigation";
import { SignInForm } from "@/components/auth/sign-in-form";
import type { AuthMethod } from "@/types";
import { Card } from "@/components/ui/card";
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
            HIVA
          </Link>
        </div>

        <Card className="rounded-2xl p-8 shadow-sm">
          <SignInForm onSubmit={handleSubmit} />
        </Card>

        <p className="text-muted-foreground text-center text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
