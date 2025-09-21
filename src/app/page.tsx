import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: '모바일 청첩장 | 메인',
  description: '2025-12-28 13:10 더베뉴지서울 안내',
}

export default function HomePage() {
  return <HomeClient />
}
