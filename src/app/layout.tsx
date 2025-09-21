import './globals.css'
import type { Metadata } from 'next'
import { sans, display } from './fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
const title = '모바일 청첩장'
const description = '2025년 12월 28일(일) 오후 1시 10분, 더베뉴지서울'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    url: siteUrl,
    title,
    description,
    siteName: title,
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://placehold.co/1200x630/png?text=Wedding',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://placehold.co/1200x630/png?text=Wedding'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: 'index, follow',
  },
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
}

import { GoogleAnalytics } from '@next/third-parties/google'
// import Header from '@/components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`min-h-screen font-sans antialiased ${sans.variable} ${display.variable}`}>
        {/* <Header /> */}
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  )
}
