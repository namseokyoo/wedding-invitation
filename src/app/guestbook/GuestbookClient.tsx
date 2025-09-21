'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WeddingCard, SectionTitle, WeddingDivider, Button } from '@/components/UI'

type Item = { id: string; name: string; message: string; relation?: string | null; created_at: string }

export default function GuestbookClient() {
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState({ name: '', message: '', relation: '', is_public: true, website: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const res = await fetch('/api/guestbook', { method: 'GET', cache: 'no-store' })
    const json = await res.json()
    if (json.ok) setItems(json.items)
  }

  useEffect(() => { load() }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const result = await res.json()
    setLoading(false)

    if (result.ok) {
      setForm({ name: '', message: '', relation: '', is_public: true, website: '' })
      load()
    } else {
      setError(result.error || '오류가 발생했습니다.')
    }
  }

  return (
    <main className="min-h-screen bg-wedding-gradient">
      <div className="max-w-md mx-auto px-6 py-wedding">
        <SectionTitle>축하 메시지</SectionTitle>
        <WeddingDivider />

        <WeddingCard className="mb-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                이름 *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                placeholder="성함을 입력해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                관계
              </label>
              <input
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                placeholder="신랑/신부와의 관계 (선택)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                축하 메시지 *
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                placeholder="따뜻한 축하 메시지를 남겨주세요"
              />
            </div>

            {/* 숨겨진 허니팟 필드 */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? '전송 중...' : '메시지 남기기'}
            </Button>
          </form>
        </WeddingCard>

        <div className="space-y-4">
          <h2 className="font-wedding text-xl text-center wedding-text">받은 축하 메시지</h2>
          <WeddingDivider className="w-8" />

          {items.length === 0 ? (
            <WeddingCard className="text-center">
              <p className="wedding-text opacity-70">아직 축하 메시지가 없습니다.</p>
              <p className="wedding-text opacity-70 text-sm mt-1">첫 번째 메시지를 남겨주세요!</p>
            </WeddingCard>
          ) : (
            items.map((item) => (
              <WeddingCard key={item.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium wedding-text">{item.name}</p>
                    {item.relation && (
                      <p className="text-sm wedding-text opacity-70">{item.relation}</p>
                    )}
                  </div>
                  <p className="text-xs wedding-text opacity-50">
                    {new Date(item.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <p className="wedding-text leading-relaxed">{item.message}</p>
              </WeddingCard>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block wedding-btn-outline"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}