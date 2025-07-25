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
  Grid3X3,
  List,
  Clock,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { blink } from '@/blink/client'

interface DashboardProps {
  onNavigate: (page: string) => void
}

interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  type: 'url-clone' | 'video-ad' | 'template'
  status: 'draft' | 'completed' | 'exported'
  createdAt: Date
  updatedAt: Date
  views?: number
  exports?: number
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState<'all' | 'url-clone' | 'video-ad' | 'template'>('all')

  const loadProjects = async () => {
    try {
      // Mock projects for now - in real app, load from database
      const mockProjects: Project[] = [
        {
          id: '1',
          title: 'SaaS Landing Page Clone',
          description: 'Cloned from a popular SaaS landing page',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
          type: 'url-clone',
          status: 'completed',
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 3600000),
          views: 245,
          exports: 12
        },
        {
          id: '2',
          title: 'Product Demo Video',
          description: 'AI-generated product demonstration',
          thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
          type: 'video-ad',
          status: 'draft',
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 7200000),
          views: 89,
          exports: 3
        },
        {
          id: '3',
          title: 'E-commerce Ad Template',
          description: 'Luxury brand style template',
          thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
          type: 'template',
          status: 'exported',
          createdAt: new Date(Date.now() - 259200000),
          updatedAt: new Date(Date.now() - 10800000),
          views: 156,
          exports: 8
        }
      ]
      setProjects(mockProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  useEffect(() => {
    // Initialize auth state
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (state.user) {
        loadProjects()
      }
    })
    return unsubscribe
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'exported': return 'bg-blue-500'
      case 'draft': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url-clone': return <Globe className="w-4 h-4" />
      case 'video-ad': return <Video className="w-4 h-4" />
      case 'template': return <Star className="w-4 h-4" />
      default: return <Grid3X3 className="w-4 h-4" />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back, {user.displayName || user.email}
            </h1>
            <p className="text-gray-400 mt-1">
              Create stunning video ads with AI-powered tools
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => onNavigate('url-cloner')}
              className="bg-primary hover:bg-primary/90"
            >
              <Globe className="w-4 h-4 mr-2" />
              Clone URL
            </Button>
            <Button
              onClick={() => onNavigate('video-builder')}
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <Video className="w-4 h-4 mr-2" />
              Create Video
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <Grid3X3 className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-white">
                  {projects.reduce((sum, p) => sum + (p.views || 0), 0)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Exports</p>
                <p className="text-2xl font-bold text-white">
                  {projects.reduce((sum, p) => sum + (p.exports || 0), 0)}
                </p>
              </div>
              <Video className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-6"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? 'bg-primary' : 'border-white/20 text-gray-300'}
            >
              All
            </Button>
            <Button
              variant={filterType === 'url-clone' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('url-clone')}
              className={filterType === 'url-clone' ? 'bg-primary' : 'border-white/20 text-gray-300'}
            >
              <Globe className="w-3 h-3 mr-1" />
              Clones
            </Button>
            <Button
              variant={filterType === 'video-ad' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('video-ad')}
              className={filterType === 'video-ad' ? 'bg-primary' : 'border-white/20 text-gray-300'}
            >
              <Video className="w-3 h-3 mr-1" />
              Videos
            </Button>
            <Button
              variant={filterType === 'template' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('template')}
              className={filterType === 'template' ? 'bg-primary' : 'border-white/20 text-gray-300'}
            >
              <Star className="w-3 h-3 mr-1" />
              Templates
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white/10' : 'border-white/20 text-gray-300'}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white/10' : 'border-white/20 text-gray-300'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProjects.length === 0 ? (
            <Card className="p-12 bg-white/5 border-white/10 text-center">
              <div className="text-gray-400">
                <Grid3X3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="mb-6">Start creating your first video ad project</p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => onNavigate('url-cloner')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Clone URL
                  </Button>
                  <Button
                    onClick={() => onNavigate('video-builder')}
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Create Video
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    {viewMode === 'grid' ? (
                      <div>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(project.type)}
                              <Badge variant="outline" className="text-xs">
                                {project.type.replace('-', ' ')}
                              </Badge>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                          </div>
                          <h3 className="font-semibold text-white mb-1 truncate">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{project.views} views</span>
                            <span>{project.exports} exports</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 p-4">
                        <div className="w-20 h-12 overflow-hidden rounded">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeIcon(project.type)}
                            <h3 className="font-semibold text-white">{project.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {project.type.replace('-', ' ')}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{project.views} views</span>
                            <span>{project.exports} exports</span>
                            <span>Updated {project.updatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}