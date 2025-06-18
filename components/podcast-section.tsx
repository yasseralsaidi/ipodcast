"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePodcasts } from "@/hooks/use-podcasts"
import { Clock, Play, RefreshCw } from "lucide-react"
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
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              جاري التحميل...
            </h2>
          </div>
        </div>
      </section>
    )
  }

  if (error && podcasts.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-destructive">
              {error}
            </h2>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="mt-4"
            >
              حاول مرة أخرى
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-8 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              البودكاست المميزة
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    className="h-10 w-10 absolute right-0"
                    disabled={isRefetching}
                  >
                    <motion.div
                      animate={isRefetching ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {isRefetching ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تحديث البودكاست</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.collectionId}
                variants={item}
                layout
              >
                <Card 
                  className="group h-full transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => handlePodcastClick(podcast.collectionId)}
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={podcast.artworkUrl600}
                      alt={podcast.collectionName}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{podcast.collectionName}</CardTitle>
                    <CardDescription className="text-base">{podcast.artistName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {podcast.trackCount} حلقات
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full group-hover:bg-primary/90" 
                      variant="default"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePodcastClick(podcast.collectionId)
                      }}
                    >
                      <Play className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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