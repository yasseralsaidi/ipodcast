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
    Star,
    Trash2,
    Users,
    X
} from "lucide-react"
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
        return "border-blue-200 bg-blue-50"
      case "podcast":
        return "border-green-200 bg-green-50"
      case "recommendation":
        return "border-yellow-200 bg-yellow-50"
      case "system":
        return "border-gray-200 bg-gray-50"
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">الإشعارات</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} إشعارات جديدة` : "لا توجد إشعارات جديدة"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 ml-2" />
              تحديد الكل كمقروء
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" onClick={handleDeleteAll}>
              <Trash2 className="w-4 h-4 ml-2" />
              حذف الكل
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
                <p className="text-xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">حلقات جديدة</p>
                <p className="text-xl font-bold">
                  {notifications.filter(n => n.type === "episode" && !n.read).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">توصيات</p>
                <p className="text-xl font-bold">
                  {notifications.filter(n => n.type === "recommendation" && !n.read).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">بودكاستات</p>
                <p className="text-xl font-bold">
                  {notifications.filter(n => n.type === "podcast" && !n.read).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">الكل ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">غير مقروء ({unreadCount})</TabsTrigger>
          <TabsTrigger value="episode">الحلقات</TabsTrigger>
          <TabsTrigger value="recommendation">التوصيات</TabsTrigger>
          <TabsTrigger value="system">النظام</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Bell className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">لا توجد إشعارات</p>
                  <p className="text-sm">
                    {activeTab === "unread" 
                      ? "جميع الإشعارات مقروءة" 
                      : "ستظهر الإشعارات الجديدة هنا"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? 'ring-2 ring-primary/20' : ''
                  } ${getNotificationColor(notification.type)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-background rounded-lg">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {notification.timestamp}
                              </div>
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">جديد</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {notification.action && (
                              <Button size="sm" variant="outline">
                                {notification.action}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 