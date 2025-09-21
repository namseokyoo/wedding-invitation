'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import EditableImage from '@/components/EditableImage'
import GalleryGrid from '@/components/GalleryGrid'
import { Button, LinkButton, Section, WeddingCard, WeddingTitle, WeddingSubtitle, SectionTitle, WeddingDivider } from '@/components/UI'

const weddingDate = new Date('2025-12-28T13:10:00+09:00') // KST

export default function HomeClient() {
  const [dday, setDday] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    const updateDday = () => {
      const now = new Date()
      const diff = weddingDate.getTime() - now.getTime()
      const d = Math.ceil(diff / (1000 * 60 * 60 * 24))
      setDday(d > 0 ? `D-${d}` : d === 0 ? 'D-DAY' : `D+${Math.abs(d)}`)
    }
    updateDday()
    const id = setInterval(updateDday, 60_000)
    return () => clearInterval(id)
  }, [])

  const handleShare = async () => {
    const url = window.location.origin
    const text = '초대합니다. 2025년 12월 28일(일) 오후 1시 10분, 더베뉴지서울'
    if (navigator.share) {
      await navigator.share({ title: '모바일 청첩장', text, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('링크가 복사되었습니다.')
    }
  }

  const handleAdminLogin = () => {
    if (password === '0123') {
      setIsAdmin(true)
    } else {
      alert('비밀번호가 틀렸습니다.')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setPassword('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="wedding-hero">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="mb-8">
            <EditableImage
              slot="hero-main"
              className="rounded-wedding shadow-wedding-card mx-auto mb-6 aspect-[3/2]"
              admin={isAdmin}
            />
          </div>

          <WeddingSubtitle className="mb-4 wedding-star">WE ARE GETTING MARRIED</WeddingSubtitle>
          <WeddingTitle className="mb-2">
            Namseok & Jeongeun
          </WeddingTitle>
          <WeddingDivider />

          <div className="wedding-text space-y-2 mb-6">
            <p className="text-lg font-medium">2025년 12월 28일 일요일</p>
            <p className="text-base">오후 1시 10분</p>
            <p className="text-base font-medium">더베뉴지서울</p>
          </div>

          <div className="text-3xl font-wedding font-bold text-wedding-gold mb-8 wedding-heart">
            {dday}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleShare}>공유하기</Button>
            <LinkButton href="/api/ics" download>캘린더 저장</LinkButton>
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section className="wedding-couple-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>신랑 & 신부</SectionTitle>
          <WeddingDivider />

          <div className="grid grid-cols-2 gap-6">
            <WeddingCard className="text-center">
              <EditableImage
                slot="couple-jeongeun"
                className="rounded-full mx-auto mb-4 shadow-wedding-soft aspect-square"
                admin={isAdmin}
              />
              <h3 className="font-wedding text-xl mb-1">강정은</h3>
              <p className="wedding-subtitle">Bride</p>
            </WeddingCard>

            <WeddingCard className="text-center">
              <EditableImage
                slot="couple-namseok"
                className="rounded-full mx-auto mb-4 shadow-wedding-soft aspect-square"
                admin={isAdmin}
              />
              <h3 className="font-wedding text-xl mb-1">유남석</h3>
              <p className="wedding-subtitle">Groom</p>
            </WeddingCard>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="wedding-event-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>초대합니다</SectionTitle>
          <WeddingDivider />

          <WeddingCard className="space-y-4">
            <div>
              <h3 className="font-wedding text-xl mb-2">웨딩 본식</h3>
              <p className="wedding-text">더베뉴지서울</p>
              <p className="wedding-text">2025년 12월 28일 일요일 오후 1시 10분</p>
            </div>
          </WeddingCard>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="wedding-gallery-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>포토 갤러리</SectionTitle>
          <WeddingDivider />
          <GalleryGrid admin={isAdmin} />
        </div>
      </section>

      {/* Gift Section 제거됨 */}

      {/* Map Section */}
      <section className="wedding-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>오시는 길</SectionTitle>
          <WeddingDivider />

          <WeddingCard className="space-y-4">
            <h3 className="font-wedding text-xl">더베뉴지서울</h3>
            <p className="wedding-text">(서울특별시 강남구 봉은사로 524)</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://map.kakao.com/link/search/더베뉴지서울"
                target="_blank"
                rel="noopener noreferrer"
                className="wedding-btn-outline py-2 text-sm"
              >
                🗺️ 카카오맵
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=더베뉴지서울"
                target="_blank"
                rel="noopener noreferrer"
                className="wedding-btn-outline py-2 text-sm"
              >
                🌍 구글지도
              </a>
            </div>
          </WeddingCard>
        </div>
      </section>

      {/* Guestbook Section */}
      <section className="wedding-section bg-wedding-rose">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>축하 메시지</SectionTitle>
          <WeddingDivider />
          <div className="space-y-4">
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="성함을 입력해주세요"
                className="p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm"
              />
              <input
                type="text"
                placeholder="신랑/신부와의 관계 (선택)"
                className="p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm"
              />
              <textarea
                placeholder="따뜻한 축하 메시지를 남겨주세요"
                className="p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm h-24 resize-none"
              />
              <Button>메시지 남기기</Button>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="wedding-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>참석 의사</SectionTitle>
          <WeddingDivider />
          <div className="space-y-4">
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="성함을 입력해주세요"
                className="p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm"
              />
              <input
                type="text"
                placeholder="연락처를 입력해주세요"
                className="p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm"
              />
              <div className="space-y-2">
                <p className="text-sm wedding-text">참석 여부</p>
                <div className="flex gap-4 justify-center">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="attendance" value="yes" className="text-wedding-gold" />
                    <span className="text-sm">참석합니다</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="attendance" value="no" className="text-wedding-gold" />
                    <span className="text-sm">불참합니다</span>
                  </label>
                </div>
              </div>
              <Button variant="outline">참석 의사 전달하기</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-wedding-warm">
        <div className="max-w-md mx-auto px-6">
          <p className="wedding-text text-sm opacity-70 mb-6">
            &copy; 2025 Namseok & Jeongeun. All rights reserved.
          </p>

          {!isAdmin && (
            <WeddingCard className="space-y-3">
              <p className="text-sm wedding-text">관리자 모드</p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="flex-1 p-3 border border-wedding-cream rounded-lg bg-white/80 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleAdminLogin} className="px-4 text-sm">입장</Button>
              </div>
            </WeddingCard>
          )}

          {isAdmin && (
            <div className="text-center">
              <p className="text-wedding-gold font-medium">✨ 관리자 모드 활성화됨</p>
              <p className="text-sm wedding-text mt-1">이미지를 클릭하여 수정할 수 있습니다</p>
              <Button
                onClick={handleAdminLogout}
                variant="outline"
                className="mt-3 px-4 py-2 text-sm"
              >
                관리자 모드 종료
              </Button>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}