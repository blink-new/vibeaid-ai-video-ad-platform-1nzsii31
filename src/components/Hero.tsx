import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Video, BarChart3 } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'

const features = [
  {
    icon: Zap,
    title: 'AI URL Cloning',
    description: 'Clone any ad layout from URLs instantly',
  },
  {
    icon: Video,
    title: 'Video Builder',
    description: 'Timeline-based editor with animations',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Track performance and optimize',
  },
]

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered Video Ad Creation</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create Viral{' '}
            <span className="gradient-text">Video Ads</span>
            <br />
            in Minutes, Not Hours
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Clone any ad layout from URLs, customize with AI assistance, and export professional video ads 
            for Instagram, LinkedIn, and TikTok. No design skills required.
          </motion.p>

          {/* URL Input Section */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-6 glass border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Start by cloning an ad you love
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Paste any URL (LinkedIn post, landing page, etc.)"
                  className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 px-8">
                  Clone & Edit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Or start from scratch with our AI-powered templates
              </p>
            </Card>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 px-8 py-3 text-lg glow-hover"
            >
              Start Creating Free
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <Card className="p-6 glass border-purple-500/20 hover:border-purple-500/40 transition-colors glow-hover">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}