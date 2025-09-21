'use client'
import { useState, useEffect } from 'react'

type Props = { slot: string; src?: string; admin?: boolean; className?: string; onClick?: () => void }

export default function EditableImage({ slot, src, admin, className, onClick }: Props) {
  const [url, setUrl] = useState(src)
  const [busy, setBusy] = useState(false)

  // src prop이 변경되면 url 상태도 업데이트
  useEffect(() => {
    setUrl(src)
  }, [src])

  // 컴포넌트 마운트 시 해당 slot의 이미지 로드
  useEffect(() => {
    async function loadImage() {
      if (!src) { // src가 없을 때만 API에서 로드
        try {
          const res = await fetch(`/api/images?slot=${slot}`)
          const json = await res.json()
          if (json.ok && json.item) {
            setUrl(json.item.url)
          }
        } catch (error) {
          console.warn('Failed to load image for slot:', slot)
        }
      }
    }
    loadImage()
  }, [slot, src])

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    const form = new FormData()
    form.append('slot', slot)
    form.append('file', file)
    // 관리자 업로드 인증 (서버의 ADMIN_KEY와 동일해야 함)
    form.append('password', '0123')
    const res = await fetch('/api/images', { method: 'POST', body: form })
    const json = await res.json()
    setBusy(false)
    if (json.ok) setUrl(json.url)
    else alert('업로드 실패')
  }

  return (
    <div className={`${className} relative`} onClick={onClick}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={slot} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-white/10 border" />
      )}
      {admin && (
        <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
            {busy ? '업로드 중…' : '이미지 선택'}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        </label>
      )}
    </div>
  )
}
