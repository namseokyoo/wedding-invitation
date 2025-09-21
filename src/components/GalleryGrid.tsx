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

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const data = items[i]
          const slot = `gallery-${i}`
          return (
            <div key={i} onClick={() => { if (!admin && data) setModalIndex(i) }}>
              <EditableImage slot={slot} src={data?.url} admin={admin} className="aspect-square cursor-pointer" />
            </div>
          )
        })}
      </div>

      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setModalIndex(null)}>
          <div className="relative w-[90vw] max-w-md" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[modalIndex]?.url || ''} alt="gallery" className="w-full rounded-wedding object-cover" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2">
              <button className="wedding-btn-outline px-3 py-1 text-xs" onClick={() => setModalIndex((modalIndex + 11) % 12)}>이전</button>
              <button className="wedding-btn-outline px-3 py-1 text-xs" onClick={() => setModalIndex((modalIndex + 1) % 12)}>다음</button>
            </div>
            <button className="absolute -top-3 -right-3 wedding-btn px-2 py-1 text-xs" onClick={() => setModalIndex(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  )
}
