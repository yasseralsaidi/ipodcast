"use client"

import type React from "react"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search through over 70 million podcasts and episodes..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-12 pr-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
          Log in
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          Sign up
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
