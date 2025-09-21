import type { Metadata } from 'next'
import GuestbookClient from './GuestbookClient'

export const metadata: Metadata = {
  title: '모바일 청첩장 | 방명록',
  description: '축하 메시지를 남겨주세요',
}

export default function GuestbookPage() {
  return <GuestbookClient />
}
