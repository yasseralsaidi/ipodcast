"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import BoringAvatar from "boring-avatars"
import { Calendar, Camera, Edit, Mail, MapPin, Save, Sparkles, User, X } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "مستمع شغوف بالبودكاست ومحب للمعرفة والتعلم المستمر",
    location: "الرياض، المملكة العربية السعودية",
    joinDate: "يناير 2024",
    timeZone: "GMT+3"
  })

  const handleSave = () => {
    // Here you would typically save to the backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      bio: "مستمع شغوف بالبودكاست ومحب للمعرفة والتعلم المستمر",
      location: "الرياض، المملكة العربية السعودية",
      joinDate: "يناير 2024",
      timeZone: "GMT+3"
    })
    setIsEditing(false)
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
                <User className="w-8 h-8 text-primary" />
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  الملف الشخصي
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">إدارة معلومات ملفك الشخصي</span>
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
          className="flex items-center justify-center gap-3"
        >
          {isEditing ? (
            <>
              <Button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl px-6 py-3"
              >
                <Save className="w-5 h-5 ml-2" />
                حفظ
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="border-2 border-border/50 hover:border-destructive/50 text-destructive hover:text-destructive transition-all duration-300 rounded-2xl px-6 py-3"
              >
                <X className="w-5 h-5 ml-2" />
                إلغاء
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl px-6 py-3"
            >
              <Edit className="w-5 h-5 ml-2" />
              تحرير
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Enhanced Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-6">
                  <Avatar className="w-32 h-32 ring-4 ring-background shadow-xl">
                    <BoringAvatar
                      size={128}
                      name={profileData.name}
                      variant="marble"
                      colors={["#92A1C6", "#146A7C", "#C271B4", "#C20D90"]}
                    />
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                      variant="secondary"
                    >
                      <Camera className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold">{profileData.name}</CardTitle>
                <CardDescription className="text-base">{profileData.email}</CardDescription>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <Badge variant="secondary" className="px-3 py-1 text-sm">
                    Pro
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm border-2 border-border/50">
                    مستمع نشط
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">{profileData.bio}</p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">تاريخ الانضمام:</span>
                      <span className="font-medium mr-2">{profileData.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">الموقع:</span>
                      <span className="font-medium mr-2">{profileData.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  معلومات الحساب
                </CardTitle>
                <CardDescription>
                  تحديث معلومات ملفك الشخصي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-medium">الاسم</Label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-medium">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bio" className="text-base font-medium">نبذة شخصية</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="border-2 border-border/50 focus:border-primary/50 transition-colors resize-none"
                    placeholder="اكتب نبذة عن نفسك..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-base font-medium">الموقع</Label>
                    <div className="relative">
                      <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                        className="pr-12 h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                        placeholder="أدخل موقعك"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="timezone" className="text-base font-medium">المنطقة الزمنية</Label>
                    <Input
                      id="timezone"
                      value={profileData.timeZone}
                      onChange={(e) => setProfileData({ ...profileData, timeZone: e.target.value })}
                      disabled={!isEditing}
                      className="h-12 border-2 border-border/50 focus:border-primary/50 transition-colors"
                      placeholder="GMT+3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 