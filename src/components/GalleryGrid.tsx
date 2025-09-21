'use client'
import { useEffect, useState } from 'react'
import EditableImage from './EditableImage'

interface GalleryGridProps {
  admin: boolean
}

export default function GalleryGrid({ admin }: GalleryGridProps) {
  const [items, setItems] = useState<{ slot: string; url: string }[]>([])
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  async function load() {
    const res = await fetch('/api/images?prefix=gallery-', { cache: 'no-store' })
    const json = await res.json()
    if (json.ok) {
      // gallery-0, gallery-1, ... 형태의 slot을 숫자 순서로 정렬
      const sortedItems = json.items.sort((a: any, b: any) => {
        const aNum = parseInt(a.slot.replace('gallery-', ''))
        const bNum = parseInt(b.slot.replace('gallery-', ''))
        return aNum - bNum
      })
      setItems(sortedItems)
    }
  }

  useEffect(() => { load() }, [])

  // 터치 스와이프 기능
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && modalIndex !== null) {
      setModalIndex((modalIndex + 1) % 12)
    }
    if (isRightSwipe && modalIndex !== null) {
      setModalIndex((modalIndex + 11) % 12)
    }
  }

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
          const data = items.find(item => item.slot === `gallery-${i}`)
          const slot = `gallery-${i}`
          return (
            <div key={i}>
              <EditableImage
                slot={slot}
                src={data?.url}
                admin={admin}
                className="aspect-square cursor-pointer"
                onClick={() => { if (data && !admin) setModalIndex(i) }}
              />
            </div>
          )
        })}
      </div>

      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setModalIndex(null)}>
          <div 
            className="relative w-[95vw] h-[95vh] max-w-4xl max-h-[90vh]" 
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items.find(item => item.slot === `gallery-${modalIndex}`)?.url || ''}
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
