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
  Settings,
  Shield,
  Sparkles,
  Sun,
  Volume2
} from "lucide-react"
import { motion } from "motion/react"
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
                <Settings className="w-8 h-8 text-primary" />
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  الإعدادات
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">إدارة تفضيلات الحساب والتطبيق</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl px-6 py-3">
            <Save className="w-5 h-5 ml-2" />
            حفظ التغييرات
          </Button>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <Tabs defaultValue="notifications" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50 border-2 border-border/50">
              <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Bell className="w-4 h-4" />
                الإشعارات
              </TabsTrigger>
              <TabsTrigger value="playback" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Volume2 className="w-4 h-4" />
                التشغيل
              </TabsTrigger>
              <TabsTrigger value="downloads" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Download className="w-4 h-4" />
                التحميل
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Shield className="w-4 h-4" />
                الخصوصية
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Palette className="w-4 h-4" />
                المظهر
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    إعدادات الإشعارات
                  </CardTitle>
                  <CardDescription>
                    تحكم في كيفية ووقت استلام الإشعارات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">إشعارات البريد الإلكتروني</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">إشعارات الدفع</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">تنبيهات الحلقات الجديدة</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">التقرير الأسبوعي</Label>
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
              <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    إعدادات التشغيل
                  </CardTitle>
                  <CardDescription>
                    تخصيص تجربة الاستماع
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">التشغيل التلقائي</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">الانتقال التدريجي</Label>
                      <p className="text-sm text-muted-foreground">
                        انتقال تدريجي بين الحلقات
                      </p>
                    </div>
                    <Switch
                      checked={settings.crossfade}
                      onCheckedChange={(checked) => handleSettingChange("crossfade", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4 p-4 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">جودة الصوت</Label>
                      <p className="text-sm text-muted-foreground">
                        اختيار جودة الصوت المفضلة
                      </p>
                    </div>
                    <Select
                      value={settings.audioQuality}
                      onValueChange={(value) => handleSettingChange("audioQuality", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفضة (32kbps)</SelectItem>
                        <SelectItem value="medium">متوسطة (128kbps)</SelectItem>
                        <SelectItem value="high">عالية (320kbps)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    إعدادات التحميل
                  </CardTitle>
                  <CardDescription>
                    إدارة تحميل الحلقات والتخزين
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">التحميل التلقائي</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">التحميل عبر Wi-Fi فقط</Label>
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
                  
                  <div className="space-y-4 p-4 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">الحد الأقصى للتخزين</Label>
                      <p className="text-sm text-muted-foreground">
                        تحديد الحد الأقصى لمساحة التخزين
                      </p>
                    </div>
                    <Select
                      value={settings.maxStorage}
                      onValueChange={(value) => handleSettingChange("maxStorage", value)}
                    >
                      <SelectTrigger className="w-full">
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
              <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    إعدادات الخصوصية
                  </CardTitle>
                  <CardDescription>
                    التحكم في خصوصية البيانات والمعلومات الشخصية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">مشاركة سجل الاستماع</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">الملف الشخصي العام</Label>
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
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">جمع البيانات</Label>
                      <p className="text-sm text-muted-foreground">
                        السماح بجمع البيانات لتحسين الخدمة
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
              <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    إعدادات المظهر
                  </CardTitle>
                  <CardDescription>
                    تخصيص مظهر التطبيق والواجهة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 p-4 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">المظهر</Label>
                      <p className="text-sm text-muted-foreground">
                        اختيار مظهر التطبيق
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={settings.theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSettingChange("theme", "light")}
                        className="flex items-center gap-2"
                      >
                        <Sun className="w-4 h-4" />
                        فاتح
                      </Button>
                      <Button
                        variant={settings.theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSettingChange("theme", "dark")}
                        className="flex items-center gap-2"
                      >
                        <Moon className="w-4 h-4" />
                        داكن
                      </Button>
                      <Button
                        variant={settings.theme === "system" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSettingChange("theme", "system")}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="w-4 h-4" />
                        تلقائي
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4 p-4 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">حجم الخط</Label>
                      <p className="text-sm text-muted-foreground">
                        اختيار حجم الخط المناسب
                      </p>
                    </div>
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) => handleSettingChange("fontSize", value)}
                    >
                      <SelectTrigger className="w-full">
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
        </motion.div>
      </div>
    </div>
  )
} 