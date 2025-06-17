"use client"

import { useAuth } from "@/components/auth/auth-provider";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BoringAvatar from "boring-avatars";
import { Bell, ChevronDown, LogOut, Settings, Shield, User } from 'lucide-react';
import Link from "next/link";

export function UserAccountNav() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 items-center justify-between flex"
        >
            <Avatar className="ring-background shadow-sm">
              <BoringAvatar
                className="size-9"
                size={48}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#C271B4", "#C20D90"]}
              />
           
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold truncate ml-2">
              {user.name}
            </span>
            {/* <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              {user.email}
            </span> */}
          </div>
          <ChevronDown className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 p-2" 
        align="end" 
        forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3 bg-muted/30 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-12 ring-2 ring-background shadow-sm">
                <BoringAvatar
                  size={48}
                  name={user.name}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#C271B4", "#C20D90"]}
                />
              </Avatar>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold leading-none truncate">
                  {user.name}
                </p>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  Pro
                </Badge>
              </div>
              <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                {user.email}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <div className="size-2 bg-green-500 rounded-full" />
                <span className="text-xs text-muted-foreground">متصل الآن</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="space-y-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center size-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <User className="size-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">الملف الشخصي</span>
                <span className="text-xs text-muted-foreground">عرض وتحرير ملفك الشخصي</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link 
              href="/settings" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center size-8 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
                <Settings className="size-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">الإعدادات</span>
                <span className="text-xs text-muted-foreground">إدارة تفضيلات الحساب</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link 
              href="/notifications" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center size-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg relative">
                <Bell className="size-4 text-yellow-600 dark:text-yellow-400" />
                <div className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">الإشعارات</span>
                <span className="text-xs text-muted-foreground">3 إشعارات جديدة</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link 
              href="/security" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center size-8 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Shield className="size-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">الأمان</span>
                <span className="text-xs text-muted-foreground">إعدادات الأمان والخصوصية</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10 px-3 py-2.5 rounded-lg transition-colors"
          onClick={() => signOut()}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <LogOut className="size-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">تسجيل الخروج</span>
              <span className="text-xs text-muted-foreground">إنهاء الجلسة الحالية</span>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
