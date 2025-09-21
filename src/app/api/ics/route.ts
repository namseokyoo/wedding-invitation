import { NextResponse } from 'next/server'

export async function GET() {
  const title = '결혼식'
  const location = '더베뉴지서울'
  const description = '모바일 청첩장'
  // 2025-12-28 13:10 KST → UTC (KST-9h)
  const startUtc = '20251228T041000Z'
  const endUtc = '20251228T061000Z' // 2시간 이벤트로 가정
  const uid = 'wedding-20251228@local'

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding//KR//',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${startUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="wedding.ics"'
    }
  })
}
