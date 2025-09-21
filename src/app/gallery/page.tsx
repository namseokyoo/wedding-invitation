import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '모바일 청첩장 | 갤러리',
}

const images = [
  { src: '/images/gallery/1.jpg', w: 800, h: 1000, alt: 'gallery-1' },
  { src: '/images/gallery/2.jpg', w: 1000, h: 800, alt: 'gallery-2' },
  { src: '/images/gallery/3.jpg', w: 800, h: 1000, alt: 'gallery-3' },
  { src: '/images/gallery/4.jpg', w: 1000, h: 800, alt: 'gallery-4' },
  { src: '/images/gallery/5.jpg', w: 800, h: 1000, alt: 'gallery-5' },
  { src: '/images/gallery/6.jpg', w: 1000, h: 800, alt: 'gallery-6' },
]

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold">갤러리</h1>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {images.map((img) => (
          <div key={img.src} className="relative aspect-[4/5] overflow-hidden rounded border">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </main>
  )
}
