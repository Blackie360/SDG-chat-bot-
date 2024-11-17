

import { useState, useEffect } from 'react'
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1
        return newProgress > 100 ? 0 : newProgress
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        {/* Main pulsating circle */}
        <div 
          className="w-40 h-40 bg-red-500 bg-opacity-20 rounded-full animate-pulse"
          style={{
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)'
          }}
        ></div>
        
        {/* Orbiting elements */}
        {[
          { icon: GitBranch, delay: '0s' },
          { icon: GitCommit, delay: '1s' },
          { icon: GitPullRequest, delay: '2s' }
        ].map((item, index) => (
          <div 
            key={index}
            className="absolute top-0 left-0 w-full h-full animate-spin"
            style={{ 
              animation: `spin ${12 + index * 4}s linear infinite`,
              animationDelay: item.delay,
              transformOrigin: 'center center'
            }}
          >
            <div 
              className="absolute p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
              style={{
                top: `${50 - Math.cos(index * (Math.PI * 2 / 3)) * 50}%`,
                left: `${50 + Math.sin(index * (Math.PI * 2 / 3)) * 50}%`,
              }}
            >
              <item.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        ))}
        
        {/* Progress text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{progress}%</span>
        </div>
      </div>
      <div className="absolute mt-32 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">GitScope</h2>
        <p className="text-gray-600 dark:text-gray-400">Analyzing your GitHub data...</p>
      </div>
    </div>
  )
}