'use client'

import { AuthForm } from "@/components/auth/auth-form";
import { SignUpForm } from "@/components/auth/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="container max-w-md mx-auto py-10">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <AuthForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
} 