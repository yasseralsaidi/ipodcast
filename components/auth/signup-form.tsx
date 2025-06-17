'use client'

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authClient.signUp.email({
        email,
        name,
        password,
      });

      if ('error' in response && response.error?.message) {
        if (response.error.message.includes('existing email')) {
          toast.error("البريد الإلكتروني مسجل مسبقاً");
        } else {
          toast.error("فشل إنشاء الحساب");
        }
        return;
      }

      // Refresh the session to update auth state
      await refreshSession();
      toast.success("تم إنشاء الحساب بنجاح");
      router.refresh();
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "فشل إنشاء الحساب";
      if (errorMessage.includes('existing email')) {
        toast.error("البريد الإلكتروني مسجل مسبقاً");
      } else {
        toast.error("فشل إنشاء الحساب");
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري التحميل..." : "إنشاء حساب"}
        </Button>
      </form>
    </div>
  );
} 