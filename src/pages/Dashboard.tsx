import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Globe, 
  Video, 
  BarChart3, 
  Settings, 
  Search,
  Filter,
  MoreVertical,
  Play,
  Download,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { blink } from '@/blink/client'

interface Project {
  id: string
  title: string
  type: 'cloned' | 'video' | 'template'
  status: 'draft' | 'completed' | 'exported'
  thumbnail: string
  createdAt: Date
  updatedAt: Date
  views?: number
  exports?: number
}

interface DashboardProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'url-cloner' | 'video-builder' | 'analytics' | 'settings') => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'cloned' | 'video' | 'template'>('all')

  useEffect(() => {
    // Initialize auth state
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })

    // Mock projects data
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Product Launch Campaign',
        type: 'video',
        status: 'completed',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        views: 1250,
        exports: 5
      },
      {
        id: '2',
        title: 'LinkedIn Ad Clone',
        type: 'cloned',
        status: 'draft',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18'),
        views: 0,
        exports: 0
      },
      {
        id: '3',
        title: 'Social Media Template',
        type: 'template',
        status: 'exported',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
        views: 890,
        exports: 12
      }
    ]
    setProjects(mockProjects)

    return unsubscribe
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900 text-green-300'
      case 'exported': return 'bg-blue-900 text-blue-300'
      default: return 'bg-yellow-900 text-yellow-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />
      case 'cloned': return <Globe className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VibeAd
              </h1>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Dashboard
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('settings')}
                className="text-gray-400 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Creator'}!
          </h2>
          <p className="text-gray-400">
            Create stunning video ads with AI-powered tools
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <Card 
            className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 p-6 cursor-pointer hover:from-primary/30 hover:to-primary/10 transition-all"
            onClick={() => onNavigate('url-cloner')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Clone URL</h3>
            </div>
            <p className="text-sm text-gray-400">
              Extract and recreate ad layouts from any URL
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20 p-6 cursor-pointer hover:from-accent/30 hover:to-accent/10 transition-all"
            onClick={() => onNavigate('video-builder')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Video Builder</h3>
            </div>
            <p className="text-sm text-gray-400">
              Create timeline-based video ads with AI
            </p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/20 p-6 cursor-pointer hover:from-blue-500/30 hover:to-blue-500/10 transition-all"
            onClick={() => onNavigate('analytics')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
            </div>
            <p className="text-sm text-gray-400">
              Track performance and engagement metrics
            </p>
          </Card>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Projects</h3>
            <Button 
              onClick={() => onNavigate('url-cloner')}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'cloned', 'video', 'template'].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type as any)}
                  className={
                    filterType === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
                  }
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-700 overflow-hidden hover:border-gray-600 transition-colors group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Eye className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {getTypeIcon(project.type)}
                        <span className="ml-1 capitalize">{project.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-white truncate flex-1">
                        {project.title}
                      </h4>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.updatedAt.toLocaleDateString()}
                      </div>
                      {project.views !== undefined && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {project.views}
                        </div>
                      )}
                      {project.exports !== undefined && (
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {project.exports}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => onNavigate('url-cloner')}
                      >
                        Continue Editing
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filterType !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Create your first project to get started'
                }
              </p>
              <Button 
                onClick={() => onNavigate('url-cloner')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}