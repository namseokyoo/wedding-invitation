'use client'
import Link from 'next/link'

export default function GiftPage() {
  return (
    <main className="min-h-screen bg-wedding-gradient">
      <div className="max-w-md mx-auto px-6 py-wedding">
        <h1 className="wedding-section-title text-center">마음 전하실 곳</h1>
        <div className="wedding-divider"></div>

        <div className="wedding-card p-6 text-center mb-6">
          <p className="wedding-text mb-4">
            새로운 시작을 함께 축하해주시는<br />
            여러분의 따뜻한 마음에 감사드립니다.
          </p>
          <p className="wedding-text text-sm opacity-80">
            축의금을 전달하실 수 있는 계좌 정보입니다.
          </p>
        </div>

        <div className="space-y-4">
          <div className="wedding-card p-6">
            <div className="text-center mb-4">
              <h3 className="font-wedding text-lg text-wedding-deep">신랑측 계좌</h3>
              <div className="wedding-divider w-8"></div>
            </div>
            <div className="space-y-2">
              <p className="wedding-text font-medium">최원영</p>
              <p className="wedding-text">농협 000-000-000000</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('농협 000-000-000000')
                  alert('계좌번호가 복사되었습니다.')
                }}
                className="wedding-btn-outline mt-3 w-full"
              >
                계좌번호 복사
              </button>
            </div>
          </div>

          <div className="wedding-card p-6">
            <div className="text-center mb-4">
              <h3 className="font-wedding text-lg text-wedding-deep">신부측 계좌</h3>
              <div className="wedding-divider w-8"></div>
            </div>
            <div className="space-y-2">
              <p className="wedding-text font-medium">이소민</p>
              <p className="wedding-text">국민 000-000-000000</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('국민 000-000-000000')
                  alert('계좌번호가 복사되었습니다.')
                }}
                className="wedding-btn-outline mt-3 w-full"
              >
                계좌번호 복사
              </button>
            </div>
          </div>
        </div>

        <div className="wedding-card p-6 mt-6 text-center">
          <p className="wedding-text text-sm opacity-80 leading-relaxed">
            ⚠️ 계좌 이체 시 예금주명을 정확히 확인해주세요.<br />
            문의사항이 있으시면 연락 부탁드립니다.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="inline-block wedding-btn">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}