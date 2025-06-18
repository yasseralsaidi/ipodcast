"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    EyeOff,
    Key,
    Lock,
    Shield,
    Smartphone,
    Sparkles
} from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

interface SecuritySession {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
  trusted: boolean
}

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    deviceManagement: true,
    sessionTimeout: "30",
    passwordExpiry: "90"
  })

  const [sessions, setSessions] = useState<SecuritySession[]>([
    {
      id: "1",
      device: "MacBook Pro (Chrome)",
      location: "الرياض، المملكة العربية السعودية",
      lastActive: "الآن",
      current: true,
      trusted: true
    },
    {
      id: "2",
      device: "iPhone 14 (Safari)",
      location: "جدة، المملكة العربية السعودية",
      lastActive: "منذ ساعتين",
      current: false,
      trusted: true
    },
    {
      id: "3",
      device: "Windows PC (Edge)",
      location: "دبي، الإمارات العربية المتحدة",
      lastActive: "منذ يوم",
      current: false,
      trusted: false
    }
  ])

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
  }

  const handleRevokeSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id))
  }

  const handleTrustSession = (id: string) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id ? { ...session, trusted: true } : session
      )
    )
  }

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, label: "", color: "" }
    if (password.length < 8) return { score: 1, label: "ضعيف", color: "text-red-500" }
    if (password.length < 12) return { score: 2, label: "متوسط", color: "text-yellow-500" }
    if (password.length < 16) return { score: 3, label: "جيد", color: "text-blue-500" }
    return { score: 4, label: "قوي", color: "text-green-500" }
  }

  const newPasswordStrength = passwordStrength(newPassword)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  الأمان
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">إدارة إعدادات الأمان والخصوصية لحسابك</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 text-base border-2 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            الحساب محمي
          </Badge>
        </motion.div>

        {/* Enhanced Security Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المصادقة الثنائية</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">مفعلة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الأجهزة النشطة</p>
                  <p className="text-xl font-bold">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">آخر تسجيل دخول</p>
                  <p className="text-xl font-bold">اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Enhanced Security Settings */}
          <div className="space-y-6">
            <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  إعدادات الأمان
                </CardTitle>
                <CardDescription>
                  تحكم في إعدادات الأمان الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">
                      طبقة أمان إضافية لحسابك
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">تنبيهات تسجيل الدخول</Label>
                    <p className="text-sm text-muted-foreground">
                      إشعار عند تسجيل الدخول من جهاز جديد
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginAlerts}
                    onCheckedChange={(checked) => handleSettingChange("loginAlerts", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">إدارة الأجهزة</Label>
                    <p className="text-sm text-muted-foreground">
                      مراقبة وإدارة الأجهزة المتصلة
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.deviceManagement}
                    onCheckedChange={(checked) => handleSettingChange("deviceManagement", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Password Change */}
            <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  تغيير كلمة المرور
                </CardTitle>
                <CardDescription>
                  تحديث كلمة المرور الخاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="current-password" className="text-base font-medium">كلمة المرور الحالية</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                      placeholder="أدخل كلمة المرور الحالية"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="new-password" className="text-base font-medium">كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                      placeholder="أدخل كلمة المرور الجديدة"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {newPassword && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">قوة كلمة المرور:</span>
                      <span className={`text-sm font-medium ${newPasswordStrength.color}`}>
                        {newPasswordStrength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirm-password" className="text-base font-medium">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl px-6 py-3">
                  <Key className="w-5 h-5 ml-2" />
                  تحديث كلمة المرور
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Active Sessions */}
          <div className="space-y-6">
            <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  الجلسات النشطة
                </CardTitle>
                <CardDescription>
                  إدارة الأجهزة المتصلة بحسابك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      session.current
                        ? "border-primary/50 bg-primary/5"
                        : session.trusted
                        ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800"
                        : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{session.device}</h4>
                          {session.current && (
                            <Badge variant="secondary" className="text-xs">
                              الحالي
                            </Badge>
                          )}
                          {session.trusted && !session.current && (
                            <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                              موثوق
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{session.location}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {session.lastActive}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!session.trusted && !session.current && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTrustSession(session.id)}
                            className="border-2 border-border/50 hover:border-green-500 text-green-600 hover:text-green-600"
                          >
                            ثقة
                          </Button>
                        )}
                        {!session.current && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRevokeSession(session.id)}
                            className="border-2 border-border/50 hover:border-destructive/50 text-destructive hover:text-destructive"
                          >
                            إلغاء
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 