"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePodcasts } from "@/hooks/use-podcasts"
import { Clock, Headphones, Play, RefreshCw, TrendingUp } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function PodcastSection() {
  const router = useRouter()
  const { podcasts, loading, error, refetch, isRefetching } = usePodcasts()

  const handlePodcastClick = (podcastId: number) => {
    router.push(`/podcast/${podcastId}`)
  }

  const handleRefresh = async () => {
    try {
      await refetch()
    } catch (error) {
      console.error('Failed to refresh podcasts:', error)
    }
  }

  if (loading && podcasts.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center mb-6 gap-2">
            <Headphones className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              البودكاست المميزة
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    className="h-10 w-10 ml-4 border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
                    disabled={isRefetching}
                  >
                    <motion.div
                      key={isRefetching ? 'refetching' : 'idle'}
                      animate={isRefetching ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تحديث البودكاست</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              اكتشف مجموعة متنوعة من البودكاست المميزة في مختلف المجالات
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }, (_, i) => (
              <Card key={`podcast-skeleton-${Math.random().toString(36).substr(2, 9)}-${i}`} className="group h-full transition-all duration-300 border-2 border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute top-3 right-3">
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                </div>
                <CardHeader className="p-4 lg:p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 lg:p-6 pt-0">
                  <div className="flex items-center">
                    <Skeleton className="h-3 w-3 mr-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 lg:p-6 pt-0">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error && podcasts.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-destructive mb-4">
                حدث خطأ في تحميل البودكاست
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {error}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleRefresh}
              className="px-8 py-3"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              حاول مرة أخرى
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center mb-6 gap-2">
            <Headphones className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              البودكاست المميزة
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    className="h-10 w-10 ml-4 border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
                    disabled={isRefetching}
                  >
                    <motion.div
                      key={isRefetching ? 'refetching' : 'idle'}
                      animate={isRefetching ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تحديث البودكاست</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            اكتشف مجموعة متنوعة من البودكاست المميزة في مختلف المجالات
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={loading ? "loading" : "loaded"}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.collectionId}
                variants={item}
                layout
              >
                <Card 
                  className="group h-full transition-all duration-300 hover:shadow-xl cursor-pointer border-2 border-border/50 hover:border-primary/50 bg-background/80 backdrop-blur-sm overflow-hidden"
                  onClick={() => handlePodcastClick(podcast.collectionId)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={podcast.artworkUrl600}
                      alt={podcast.collectionName}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        مميز
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle className="text-lg lg:text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {podcast.collectionName}
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-base line-clamp-1 text-muted-foreground">
                      {podcast.artistName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6 pt-0">
                    <div className="flex items-center text-xs lg:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                      {podcast.trackCount} حلقات
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 lg:p-6 pt-0">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-all duration-300 text-sm lg:text-base rounded-lg" 
                      variant="default"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePodcastClick(podcast.collectionId)
                      }}
                    >
                      <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-2 transition-transform group-hover:translate-x-1" />
                      استمع الآن
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
} 