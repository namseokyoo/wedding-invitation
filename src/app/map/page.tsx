'use client'
import Link from 'next/link'

export default function MapPage() {
  const address = '더베뉴지서울'
  const kakaoLink = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`
  const naverLink = `nmap://search?query=${encodeURIComponent(address)}`
  const tmapLink = `tmap://search?name=${encodeURIComponent(address)}`
  const googleLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <main className="min-h-screen bg-wedding-gradient">
      <div className="max-w-md mx-auto px-6 py-wedding">
        <h1 className="wedding-section-title text-center">오시는 길</h1>
        <div className="wedding-divider"></div>

        <div className="wedding-card p-6 mb-6 text-center">
          <h2 className="font-wedding text-xl mb-2">더베뉴지서울</h2>
          <p className="wedding-text">서울특별시 강남구 봉은사로 524</p>
          <p className="wedding-text text-sm mt-2 opacity-70">지하철 2호선 삼성역 5번 출구</p>
        </div>

        <div className="space-y-3">
          <a className="wedding-btn-outline block text-center py-4" href={kakaoLink} target="_blank" rel="noopener noreferrer">
            🗺️ 카카오맵으로 보기
          </a>
          <a className="wedding-btn-outline block text-center py-4" href={googleLink} target="_blank" rel="noopener noreferrer">
            🌍 구글지도로 보기
          </a>
          <a className="wedding-btn-outline block text-center py-4" href={naverLink}>
            📍 네이버지도(앱)
          </a>
          <a className="wedding-btn-outline block text-center py-4" href={tmapLink}>
            🚗 티맵(앱)
          </a>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="inline-block wedding-btn">메인으로 돌아가기</Link>
        </div>
      </div>
    </main>
  )
}
