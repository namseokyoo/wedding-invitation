'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import EditableImage from '@/components/EditableImage'
import GalleryGrid from '@/components/GalleryGrid'
import { Button, LinkButton, Section, WeddingCard, WeddingTitle, WeddingSubtitle, SectionTitle, WeddingDivider } from '@/components/UI'

// 카운트다운 타이머 컴포넌트
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="text-center">
        <div className="bg-wedding-gold text-white rounded-lg p-3 mb-2">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-sm">일</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-wedding-gold text-white rounded-lg p-3 mb-2">
          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm">시간</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-wedding-gold text-white rounded-lg p-3 mb-2">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm">분</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-wedding-gold text-white rounded-lg p-3 mb-2">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-sm">초</div>
        </div>
      </div>
    </div>
  )
}

// 달력 컴포넌트
function WeddingCalendar({ targetDate }: { targetDate: Date }) {
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth() + 1
  const day = targetDate.getDate()
  
  // 달력 생성 로직
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const days = []
  
  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-wedding-soft">
      <div className="text-center mb-4">
        <h3 className="text-lg font-wedding text-wedding-deep">{year}년 {month}월</h3>
      </div>
      
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((weekDay, index) => (
          <div key={weekDay} className="text-center text-sm font-medium p-2">
            <span className={index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'}>
              {weekDay}
            </span>
          </div>
        ))}
      </div>
      
      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="text-center p-2">
            {date && (
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                date === day 
                  ? 'bg-wedding-gold text-white font-bold ring-2 ring-wedding-gold ring-offset-2 shadow-lg transform scale-110' 
                  : index % 7 === 0 
                    ? 'text-red-500' 
                    : index % 7 === 6 
                      ? 'text-blue-500' 
                      : 'text-gray-700'
              }`}>
                {date}
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  )
}

// 히어로 섹션 컴포넌트 (백그라운드 이미지 포함)
function HeroSectionWithBackground({ admin, onShare, dday }: { admin: boolean; onShare: () => void; dday: string }) {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null)

  // 히어로 이미지 로드
  useEffect(() => {
    async function loadHeroImage() {
      try {
        const res = await fetch('/api/images?slot=hero-main')
        const json = await res.json()
        if (json.ok && json.item) {
          setHeroImageUrl(json.item.url)
        }
      } catch (error) {
        console.warn('Failed to load hero image')
      }
    }
    loadHeroImage()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const form = new FormData()
    form.append('slot', 'hero-main')
    form.append('file', file)
    form.append('password', '0123')
    
    const res = await fetch('/api/images', { method: 'POST', body: form })
    const json = await res.json()
    
    if (json.ok) {
      setHeroImageUrl(json.url)
    } else {
      alert('업로드 실패')
    }
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 백그라운드 오버레이 */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* 컨텐츠 */}
      <div className="relative z-10 max-w-md mx-auto px-6 text-white">
        <WeddingSubtitle className="mb-4 wedding-star text-white/90">WE ARE GETTING MARRIED</WeddingSubtitle>
        <WeddingTitle className="mb-2 text-white">
          Namseok & Jeongeun
        </WeddingTitle>
        <WeddingDivider />

        <div className="wedding-text space-y-2 mb-6 text-white/90">
          <p className="text-lg font-medium">2025년 12월 28일 일요일</p>
          <p className="text-base">오후 1시 10분</p>
          <p className="text-base font-medium">더베뉴지서울</p>
        </div>


        <div className="flex gap-4 justify-center">
          <Button onClick={onShare} className="bg-white text-wedding-deep hover:bg-wedding-cream">공유하기</Button>
          <LinkButton href="/api/ics" download className="bg-transparent border-white text-white hover:bg-white hover:text-wedding-deep">캘린더 저장</LinkButton>
        </div>
      </div>

      {/* 관리자 모드 이미지 업로드 */}
      {admin && (
        <div className="absolute top-4 right-4 z-20">
          <label className="bg-black/50 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black/70 transition-colors">
            {heroImageUrl ? '배경 이미지 변경' : '배경 이미지 추가'}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      )}
    </section>
  )
}

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
      <HeroSectionWithBackground admin={isAdmin} onShare={handleShare} dday={dday} />

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

      {/* 일정 & 카운트다운 Section */}
      <section className="wedding-event-section">
        <div className="max-w-md mx-auto px-6 py-wedding text-center">
          <SectionTitle>일정</SectionTitle>
          <WeddingDivider />

          <div className="space-y-6">
            {/* 날짜/시간 정보 */}
            <div className="text-center mb-4">
              <h3 className="font-wedding text-xl mb-2 text-wedding-deep">2025년 12월 28일 일요일</h3>
              <p className="text-lg text-wedding-gold font-medium">오후 1시 10분</p>
            </div>
            
            {/* 달력 */}
            <WeddingCalendar targetDate={weddingDate} />
            
            {/* 카운트다운 타이머 */}
            <div className="text-center">
              <h3 className="font-wedding text-lg mb-4 text-wedding-deep">결혼까지 남은 시간</h3>
              <CountdownTimer targetDate={weddingDate} />
            </div>
          </div>
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