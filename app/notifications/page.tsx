"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Check,
  Clock,
  Play,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Users,
  X
} from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "episode" | "podcast" | "system" | "recommendation"
  timestamp: string
  read: boolean
  action?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "حلقة جديدة من فنجان",
      message: "تم نشر حلقة جديدة: محادثة مع رجل الأعمال أحمد محمد",
      type: "episode",
      timestamp: "منذ 5 دقائق",
      read: false,
      action: "استمع الآن"
    },
    {
      id: "2",
      title: "بودكاست جديد موصى به",
      message: "بودكاست التكنولوجيا قد يعجبك بناءً على تفضيلاتك",
      type: "recommendation",
      timestamp: "منذ ساعة",
      read: false,
      action: "استكشف"
    },
    {
      id: "3",
      title: "تحديث التطبيق",
      message: "تم إصدار تحديث جديد مع ميزات محسنة",
      type: "system",
      timestamp: "منذ 3 ساعات",
      read: true
    },
    {
      id: "4",
      title: "حلقة جديدة من بودكاست التكنولوجيا",
      message: "تم نشر حلقة جديدة: مستقبل الذكاء الاصطناعي",
      type: "episode",
      timestamp: "منذ يوم",
      read: true,
      action: "استمع الآن"
    },
    {
      id: "5",
      title: "بودكاست جديد من صديقك",
      message: "أحمد شارك معك بودكاست الصحة",
      type: "podcast",
      timestamp: "منذ يومين",
      read: true,
      action: "عرض"
    }
  ])

  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "episode":
        return <Play className="w-4 h-4 text-blue-500" />
      case "podcast":
        return <Users className="w-4 h-4 text-green-500" />
      case "recommendation":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "episode":
        return "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
      case "podcast":
        return "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800"
      case "recommendation":
        return "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800"
      case "system":
        return "border-gray-200 bg-gray-50 dark:bg-gray-950/20 dark:border-gray-800"
      default:
        return "border-border bg-background"
    }
  }

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeTab)

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
                <Bell className="w-8 h-8 text-primary" />
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  الإشعارات
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} إشعارات جديدة` : "لا توجد إشعارات جديدة"}
                </span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حلقات جديدة</p>
                  <p className="text-2xl font-bold">
                    {notifications.filter(n => n.type === "episode" && !n.read).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">توصيات</p>
                  <p className="text-2xl font-bold">
                    {notifications.filter(n => n.type === "recommendation").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">بودكاستات</p>
                  <p className="text-2xl font-bold">
                    {notifications.filter(n => n.type === "podcast").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3"
        >
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <Check className="w-4 h-4 ml-2" />
              تحديد الكل كمقروء
            </Button>
          )}
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleDeleteAll}
              className="border-2 border-border/50 hover:border-destructive/50 text-destructive hover:text-destructive transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              حذف الكل
            </Button>
          )}
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50 border-2 border-border/50">
              <TabsTrigger value="all" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Bell className="w-4 h-4" />
                الكل
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Clock className="w-4 h-4" />
                غير مقروءة
              </TabsTrigger>
              <TabsTrigger value="episode" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Play className="w-4 h-4" />
                الحلقات
              </TabsTrigger>
              <TabsTrigger value="podcast" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Users className="w-4 h-4" />
                البودكاست
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Settings className="w-4 h-4" />
                النظام
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Card className="max-w-md mx-auto border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                        <Bell className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
                      <p className="text-muted-foreground">
                        {activeTab === "all" 
                          ? "لا توجد إشعارات حالياً"
                          : activeTab === "unread"
                          ? "جميع الإشعارات مقروءة"
                          : `لا توجد إشعارات ${activeTab === "episode" ? "للحلقات" : activeTab === "podcast" ? "للبودكاست" : "للنظام"}`
                        }
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`border-2 ${getNotificationColor(notification.type)} hover:shadow-lg transition-all duration-300 ${!notification.read ? 'ring-2 ring-primary/20' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-10 h-10 bg-background/80 rounded-lg flex items-center justify-center border border-border/50">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-foreground">{notification.title}</h4>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs">
                                      جديد
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {notification.timestamp}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {notification.action && (
                                <Button size="sm" variant="outline" className="border-2 border-border/50 hover:border-primary/50">
                                  {notification.action}
                                </Button>
                              )}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
} 