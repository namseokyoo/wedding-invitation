'use client'
import EditableImage from '@/components/EditableImage'

export default function HeroEditable({ admin }: { admin?: boolean }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border shadow-soft">
      <div className="aspect-[16/9]">
        <EditableImage slot="hero-1" admin={admin} className="w-full h-full" />
      </div>
    </div>
  )
}
