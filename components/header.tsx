"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface HeaderProps {
  onSearch?: (searchTerm: string) => void
  searchTerm?: string
}

export function Header({ onSearch, searchTerm }: HeaderProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearchTerm.trim() && onSearch) {
      onSearch(localSearchTerm.trim())
    }
  }

  return (
    <header className="bg-background border-b h-16 flex items-center justify-between px-6 fixed top-0 right-64 left-0 z-10">
      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
          <ChevronRight className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث في أكثر من 70 مليون بودكاست وحلقة..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full bg-background border-input text-foreground placeholder-muted-foreground pr-12 pl-4 py-2 rounded-full focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </form>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
          تسجيل الدخول
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          إنشاء حساب
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
