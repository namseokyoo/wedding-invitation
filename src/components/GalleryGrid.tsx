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

  // 모달 상태 디버깅
  console.log('GalleryGrid render - modalIndex:', modalIndex, 'items count:', items.length)

  // 모달이 열릴 때 로그 출력
  useEffect(() => {
    if (modalIndex !== null) {
      console.log('Modal opened for index:', modalIndex)
    }
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
                onClick={() => {
                  console.log('Gallery image clicked:', i, 'admin:', admin)
                  if (!admin) {
                    setModalIndex(i)
                    console.log('Modal opened for index:', i)
                  }
                }}
              />
            </div>
          )
        })}
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          style={{
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            console.log('Modal backdrop clicked, closing modal')
            setModalIndex(null)
          }}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            style={{
              width: '90vw',
              height: '90vh',
              maxWidth: '800px',
              maxHeight: '600px'
            }}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {items.find(item => item.slot === `gallery-${modalIndex}`)?.url ? (
              <img
                src={items.find(item => item.slot === `gallery-${modalIndex}`)?.url || ''}
                alt="gallery"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-lg mb-2">이미지가 없습니다</p>
                  <p className="text-sm opacity-70">관리자 모드에서 이미지를 업로드해주세요</p>
                </div>
              </div>
            )}

            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all duration-200 shadow-lg border-2 border-white/20"
              onClick={() => setModalIndex(null)}
              style={{
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>

            {/* 이전/다음 버튼 */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-black/70 to-transparent text-white rounded-r-full w-20 h-32 flex items-center justify-center hover:from-wedding-gold/80 hover:to-transparent transition-all duration-300 shadow-lg group backdrop-blur-sm"
              onClick={() => setModalIndex((modalIndex + 11) % 12)}
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)'
              }}
            >
              <span className="group-hover:transform group-hover:-translate-x-2 transition-transform duration-300 ml-2">‹</span>
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-black/70 to-transparent text-white rounded-l-full w-20 h-32 flex items-center justify-center hover:from-wedding-gold/80 hover:to-transparent transition-all duration-300 shadow-lg group backdrop-blur-sm"
              onClick={() => setModalIndex((modalIndex + 1) % 12)}
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)'
              }}
            >
              <span className="group-hover:transform group-hover:translate-x-2 transition-transform duration-300 mr-2">›</span>
            </button>

            {/* 이미지 번호 표시 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20 backdrop-blur-sm">
              <span className="text-wedding-gold font-bold">{modalIndex + 1}</span> / 12
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
