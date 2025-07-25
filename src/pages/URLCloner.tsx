import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe, Wand2, Download, Eye, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface ClonedTemplate {
  id: string
  url: string
  title: string
  description: string
  thumbnail: string
  elements: {
    type: string
    content: string
    style: Record<string, string>
  }[]
  vibe: string
  createdAt: Date
}

export default function URLCloner() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [isCloning, setIsCloning] = useState(false)
  const [clonedTemplate, setClonedTemplate] = useState<ClonedTemplate | null>(null)
  const [selectedVibe, setSelectedVibe] = useState('original')

  const vibes = [
    { id: 'original', name: 'Original', color: 'bg-gray-500' },
    { id: 'bold', name: 'Bold', color: 'bg-red-500' },
    { id: 'luxury', name: 'Luxury', color: 'bg-yellow-500' },
    { id: 'playful', name: 'Playful', color: 'bg-pink-500' },
    { id: 'genz', name: 'Gen Z', color: 'bg-purple-500' },
    { id: 'minimalist', name: 'Minimalist', color: 'bg-blue-500' },
    { id: 'spiritual', name: 'Spiritual', color: 'bg-green-500' }
  ]

  const handleClone = async () => {
    if (!url.trim()) return

    setIsCloning(true)
    
    // Simulate AI cloning process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock cloned template
    const mockTemplate: ClonedTemplate = {
      id: `template_${Date.now()}`,
      url,
      title: 'Cloned Ad Template',
      description: 'AI-generated template from the provided URL',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      elements: [
        {
          type: 'heading',
          content: 'Revolutionary Product',
          style: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff' }
        },
        {
          type: 'text',
          content: 'Transform your workflow with our innovative solution',
          style: { fontSize: '18px', color: '#a1a1aa' }
        },
        {
          type: 'button',
          content: 'Get Started',
          style: { backgroundColor: '#8B5CF6', color: '#ffffff', padding: '12px 24px' }
        }
      ],
      vibe: selectedVibe,
      createdAt: new Date()
    }

    setClonedTemplate(mockTemplate)
    setIsCloning(false)
  }

  const handleEditTemplate = () => {
    // Navigate to editor with template data
    navigate('/editor', { state: { template: clonedTemplate } })
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">URL Cloner</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input & Controls */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">Clone Any Ad Layout</h2>
              <p className="text-gray-400">
                Enter a URL to automatically extract and recreate the ad layout as an editable template.
              </p>
            </motion.div>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Website URL
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/product-ad"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleClone}
                    disabled={!url.trim() || isCloning}
                    className="bg-primary hover:bg-primary/90 text-white px-6"
                  >
                    {isCloning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Wand2 className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Clone
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Vibe Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Choose Vibe
                </label>
                <div className="flex flex-wrap gap-2">
                  {vibes.map((vibe) => (
                    <Button
                      key={vibe.id}
                      variant={selectedVibe === vibe.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVibe(vibe.id)}
                      className={`${
                        selectedVibe === vibe.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${vibe.color} mr-2`} />
                      {vibe.name}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Cloning Progress */}
            {isCloning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold">AI is analyzing the page...</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Extracting layout structure
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Analyzing fonts and colors
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    Detecting animations
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    Applying {vibes.find(v => v.id === selectedVibe)?.name} vibe
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            {clonedTemplate ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Cloned Template</h3>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">
                    Ready to Edit
                  </Badge>
                </div>

                <Card className="bg-gray-900 border-gray-700 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <img
                      src={clonedTemplate.thumbnail}
                      alt="Template preview"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                      <h4 className="text-2xl font-bold mb-2">Revolutionary Product</h4>
                      <p className="text-gray-300 mb-4">Transform your workflow with our innovative solution</p>
                      <Button className="bg-primary hover:bg-primary/90">
                        Get Started
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Source URL:</span>
                      <span className="text-sm text-blue-400 truncate max-w-xs">
                        {clonedTemplate.url}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Vibe Applied:</span>
                      <Badge variant="outline" className="border-gray-600">
                        {vibes.find(v => v.id === clonedTemplate.vibe)?.name}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Elements:</span>
                      <span className="text-sm text-gray-300">
                        {clonedTemplate.elements.length} components
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button
                    onClick={handleEditTemplate}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Edit Template
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center"
              >
                <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  No template cloned yet
                </h3>
                <p className="text-gray-500">
                  Enter a URL above to start cloning an ad layout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}