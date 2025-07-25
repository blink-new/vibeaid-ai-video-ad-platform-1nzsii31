import { useEffect, useState } from 'react'

interface Comet {
  id: number
  left: number
  animationDuration: number
  delay: number
}

export function CometBackground() {
  const [comets, setComets] = useState<Comet[]>([])

  useEffect(() => {
    const generateComets = () => {
      const newComets: Comet[] = []
      for (let i = 0; i < 8; i++) {
        newComets.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 3 + Math.random() * 4, // 3-7 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
        })
      }
      setComets(newComets)
    }

    generateComets()
    const interval = setInterval(generateComets, 10000) // Regenerate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="comet-bg">
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="comet"
          style={{
            left: `${comet.left}%`,
            animationDuration: `${comet.animationDuration}s`,
            animationDelay: `${comet.delay}s`,
          }}
        />
      ))}
    </div>
  )
}