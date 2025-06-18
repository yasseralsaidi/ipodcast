"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Bell,
    Download,
    Monitor,
    Moon,
    Palette,
    Save,
    Shield,
    Sun,
    Volume2
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    newEpisodeAlerts: true,
    weeklyDigest: false,
    
    // Playback
    autoPlay: true,
    crossfade: false,
    crossfadeDuration: 3,
    audioQuality: "high",
    
    // Downloads
    autoDownload: false,
    downloadOverWifi: true,
    downloadQuality: "standard",
    maxStorage: "2GB",
    
    // Privacy
    shareListeningHistory: false,
    publicProfile: true,
    dataCollection: true,
    
    // Appearance
    theme: "system",
    language: "ar",
    fontSize: "medium"
  })

  const handleSettingChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">الإعدادات</h1>
          <p className="text-muted-foreground">
            إدارة تفضيلات الحساب والتطبيق
          </p>
        </div>
        <Button>
          <Save className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="playback" className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            التشغيل
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            التحميل
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            الخصوصية
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            المظهر
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>
                تحكم في كيفية ووقت استلام الإشعارات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات البريد الإلكتروني</Label>
                  <p className="text-sm text-muted-foreground">
                    استلام إشعارات عبر البريد الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات الدفع</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعارات فورية على الجهاز
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تنبيهات الحلقات الجديدة</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعار عند نشر حلقة جديدة من البودكاستات المشترك فيها
                  </p>
                </div>
                <Switch
                  checked={settings.newEpisodeAlerts}
                  onCheckedChange={(checked) => handleSettingChange("newEpisodeAlerts", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التقرير الأسبوعي</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي ملخص أسبوعي لنشاط الاستماع
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التشغيل</CardTitle>
              <CardDescription>
                تخصيص تجربة الاستماع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التشغيل التلقائي</Label>
                  <p className="text-sm text-muted-foreground">
                    تشغيل الحلقة التالية تلقائياً
                  </p>
                </div>
                <Switch
                  checked={settings.autoPlay}
                  onCheckedChange={(checked) => handleSettingChange("autoPlay", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الانتقال التدريجي</Label>
                  <p className="text-sm text-muted-foreground">
                    انتقال تدريجي بين الحلقات
                  </p>
                </div>
                <Switch
                  checked={settings.crossfade}
                  onCheckedChange={(checked) => handleSettingChange("crossfade", checked)}
                />
              </div>
              
              {settings.crossfade && (
                <div className="space-y-2">
                  <Label>مدة الانتقال التدريجي</Label>
                  <Select
                    value={settings.crossfadeDuration.toString()}
                    onValueChange={(value) => handleSettingChange("crossfadeDuration", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ثانية</SelectItem>
                      <SelectItem value="3">3 ثواني</SelectItem>
                      <SelectItem value="5">5 ثواني</SelectItem>
                      <SelectItem value="10">10 ثواني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <Label>جودة الصوت</Label>
                <Select
                  value={settings.audioQuality}
                  onValueChange={(value) => handleSettingChange("audioQuality", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة (32kbps)</SelectItem>
                    <SelectItem value="standard">قياسية (128kbps)</SelectItem>
                    <SelectItem value="high">عالية (320kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التحميل</CardTitle>
              <CardDescription>
                إدارة تحميل الحلقات والتخزين
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التحميل التلقائي</Label>
                  <p className="text-sm text-muted-foreground">
                    تحميل الحلقات الجديدة تلقائياً
                  </p>
                </div>
                <Switch
                  checked={settings.autoDownload}
                  onCheckedChange={(checked) => handleSettingChange("autoDownload", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التحميل عبر Wi-Fi فقط</Label>
                  <p className="text-sm text-muted-foreground">
                    تحميل الحلقات عبر Wi-Fi فقط لتوفير البيانات
                  </p>
                </div>
                <Switch
                  checked={settings.downloadOverWifi}
                  onCheckedChange={(checked) => handleSettingChange("downloadOverWifi", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>جودة التحميل</Label>
                <Select
                  value={settings.downloadQuality}
                  onValueChange={(value) => handleSettingChange("downloadQuality", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="standard">قياسية</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>الحد الأقصى للتخزين</Label>
                <Select
                  value={settings.maxStorage}
                  onValueChange={(value) => handleSettingChange("maxStorage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1GB">1 جيجابايت</SelectItem>
                    <SelectItem value="2GB">2 جيجابايت</SelectItem>
                    <SelectItem value="5GB">5 جيجابايت</SelectItem>
                    <SelectItem value="10GB">10 جيجابايت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الخصوصية</CardTitle>
              <CardDescription>
                التحكم في خصوصية البيانات والمعلومات الشخصية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>مشاركة سجل الاستماع</Label>
                  <p className="text-sm text-muted-foreground">
                    السماح للآخرين برؤية ما تستمع إليه
                  </p>
                </div>
                <Switch
                  checked={settings.shareListeningHistory}
                  onCheckedChange={(checked) => handleSettingChange("shareListeningHistory", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الملف الشخصي العام</Label>
                  <p className="text-sm text-muted-foreground">
                    جعل ملفك الشخصي مرئياً للجميع
                  </p>
                </div>
                <Switch
                  checked={settings.publicProfile}
                  onCheckedChange={(checked) => handleSettingChange("publicProfile", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>جمع البيانات</Label>
                  <p className="text-sm text-muted-foreground">
                    السماح بجمع بيانات الاستخدام لتحسين الخدمة
                  </p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) => handleSettingChange("dataCollection", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المظهر</CardTitle>
              <CardDescription>
                تخصيص مظهر التطبيق
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>المظهر</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => handleSettingChange("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        فاتح
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        داكن
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        تلقائي
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>اللغة</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingChange("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>حجم الخط</Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value) => handleSettingChange("fontSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">صغير</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="large">كبير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 