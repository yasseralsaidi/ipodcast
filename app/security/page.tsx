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
    Smartphone
} from "lucide-react"
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">الأمان</h1>
          <p className="text-muted-foreground">
            إدارة إعدادات الأمان والخصوصية لحسابك
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          الحساب محمي
        </Badge>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المصادقة الثنائية</p>
                <p className="text-xl font-bold text-green-600">مفعلة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الأجهزة النشطة</p>
                <p className="text-xl font-bold">{sessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">آخر تسجيل دخول</p>
                <p className="text-xl font-bold">اليوم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription>
                تحكم في إعدادات الأمان الأساسية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>المصادقة الثنائية</Label>
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
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تنبيهات تسجيل الدخول</Label>
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
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إدارة الأجهزة</Label>
                  <p className="text-sm text-muted-foreground">
                    مراجعة وإدارة الأجهزة المتصلة
                  </p>
                </div>
                <Switch
                  checked={securitySettings.deviceManagement}
                  onCheckedChange={(checked) => handleSettingChange("deviceManagement", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                تغيير كلمة المرور
              </CardTitle>
              <CardDescription>
                تحديث كلمة المرور الخاصة بك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {newPassword && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">قوة كلمة المرور:</span>
                    <span className={`text-xs font-medium ${newPasswordStrength.color}`}>
                      {newPasswordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500">كلمات المرور غير متطابقة</p>
                )}
              </div>

              <Button className="w-full" disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}>
                تحديث كلمة المرور
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Sessions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                الجلسات النشطة
              </CardTitle>
              <CardDescription>
                إدارة الأجهزة المتصلة بحسابك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{session.device}</h4>
                        {session.current && (
                          <Badge variant="secondary" className="text-xs">الحالي</Badge>
                        )}
                        {session.trusted && (
                          <Badge variant="outline" className="text-xs">موثوق</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {session.lastActive}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!session.trusted && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTrustSession(session.id)}
                        className="h-8 px-2"
                      >
                        ثقة
                      </Button>
                    )}
                    {!session.current && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRevokeSession(session.id)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        إلغاء
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Log */}
          <Card>
            <CardHeader>
              <CardTitle>سجل الأمان</CardTitle>
              <CardDescription>
                آخر الأنشطة الأمنية على حسابك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>تسجيل دخول ناجح من MacBook Pro</span>
                <span className="text-muted-foreground text-xs">منذ 5 دقائق</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>تم تفعيل المصادقة الثنائية</span>
                <span className="text-muted-foreground text-xs">منذ يوم</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>محاولة تسجيل دخول فاشلة من دبي</span>
                <span className="text-muted-foreground text-xs">منذ 3 أيام</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>تم تغيير كلمة المرور</span>
                <span className="text-muted-foreground text-xs">منذ أسبوع</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 