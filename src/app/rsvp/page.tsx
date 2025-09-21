import { Metadata } from 'next'
import Link from 'next/link'
import { WeddingCard, SectionTitle, WeddingDivider, Button } from '@/components/UI'

export const metadata: Metadata = {
  title: 'RSVP',
  description: '참석 의사를 전달해주세요',
}

export default function RSVPPage() {
  async function onSubmit(formData: FormData) {
    'use server'
    const payload = {
      name: String(formData.get('name') || ''),
      contact: String(formData.get('contact') || ''),
      attendance: String(formData.get('attendance') || 'yes') === 'yes',
      headcount: Number(formData.get('headcount') || 1),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
    }
    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json()
    if (json.ok) {
      console.log('RSVP 제출 완료')
    } else {
      console.error('RSVP 제출 실패:', json.error)
    }
  }

  return (
    <main className="min-h-screen bg-wedding-gradient">
      <div className="max-w-md mx-auto px-6 py-wedding">
        <SectionTitle>참석 의사 전달</SectionTitle>
        <WeddingDivider />

        <WeddingCard>
          <form action={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                이름 *
              </label>
              <input
                name="name"
                required
                placeholder="성함을 입력해주세요"
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                연락처 *
              </label>
              <input
                name="contact"
                required
                placeholder="연락처를 입력해주세요"
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-3">
                참석 여부 *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="wedding-card p-3 cursor-pointer hover:bg-wedding-gold/10 transition-colors">
                  <input type="radio" name="attendance" value="yes" defaultChecked className="mr-2" />
                  <span className="wedding-text">참석</span>
                </label>
                <label className="wedding-card p-3 cursor-pointer hover:bg-wedding-gold/10 transition-colors">
                  <input type="radio" name="attendance" value="no" className="mr-2" />
                  <span className="wedding-text">불참</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                참석 인원
              </label>
              <input
                type="number"
                name="headcount"
                min={1}
                max={10}
                defaultValue={1}
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium wedding-text mb-2">
                메시지 (선택)
              </label>
              <textarea
                name="message"
                placeholder="전하고 싶은 말씀이 있으시면 적어주세요"
                className="w-full p-3 border border-wedding-cream rounded-lg bg-white/80 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-wedding-gold"
              />
            </div>

            {/* 숨겨진 허니팟 필드 */}
            <input
              name="website"
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            <Button type="submit" className="w-full">
              참석 의사 전달하기
            </Button>
          </form>
        </WeddingCard>

        <div className="text-center mt-8">
          <Link href="/" className="inline-block wedding-btn-outline">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}