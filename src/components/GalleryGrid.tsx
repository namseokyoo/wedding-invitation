'use client'
import { useEffect, useState } from 'react'
import EditableImage from './EditableImage'

interface GalleryGridProps {
  admin: boolean
}

export default function GalleryGrid({ admin }: GalleryGridProps) {
  const [items, setItems] = useState<{ id: string; url: string }[]>([])
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  async function load() {
    const res = await fetch('/api/gallery', { cache: 'no-store' })
    const json = await res.json()
    if (json.ok) setItems(json.items)
  }
  
  useEffect(() => { load() }, [])
  
  // 키보드 네비게이션
  useEffect(() => {
    if (modalIndex === null) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setModalIndex((modalIndex + 11) % 12)
      } else if (e.key === 'ArrowRight') {
        setModalIndex((modalIndex + 1) % 12)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalIndex])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const data = items[i]
          const slot = `gallery-${i}`
          return (
            <div key={i} onClick={() => { if (data) setModalIndex(i) }}>
              <EditableImage slot={slot} src={data?.url} admin={admin} className="aspect-square cursor-pointer" />
            </div>
          )
        })}
      </div>

      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setModalIndex(null)}>
          <div className="relative w-[95vw] h-[95vh] max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={items[modalIndex]?.url || ''} 
              alt="gallery" 
              className="w-full h-full object-contain rounded-lg" 
            />
            
            {/* 닫기 버튼 */}
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setModalIndex(null)}
            >
              ✕
            </button>
            
            {/* 이전/다음 버튼 */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setModalIndex((modalIndex + 11) % 12)}
            >
              ‹
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setModalIndex((modalIndex + 1) % 12)}
            >
              ›
            </button>
            
            {/* 이미지 번호 표시 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {modalIndex + 1} / 12
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
