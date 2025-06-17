import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("user@mail.com");
  const [password, setPassword] = useState("ipassword");
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });
      
      if ('error' in response && response.error?.message) {
        if (response.error.message.includes('Invalid password')) {
          toast.error("كلمة المرور غير صحيحة");
        } else if (response.error.message.includes('User not found')) {
          toast.error("البريد الإلكتروني غير مسجل");
        } else {
          toast.error("بيانات الدخول غير صحيحة");
        }
        return;
      }

      await refreshSession();
      toast.success("تم تسجيل الدخول بنجاح");
      router.refresh();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Invalid password')) {
          toast.error("كلمة المرور غير صحيحة");
        } else if (err.message.includes('User not found')) {
          toast.error("البريد الإلكتروني غير مسجل");
        } else {
          toast.error("بيانات الدخول غير صحيحة");
        }
      } else {
        toast.error("بيانات الدخول غير صحيحة");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
        </Button>
      </form>
    </div>
  );
} 