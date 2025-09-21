import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'

const bodySchema = z.object({
  name: z.string().min(1).max(50),
  contact: z.string().min(1).max(100),
  attendance: z.boolean(),
  headcount: z.number().int().min(1).max(10).default(1),
  message: z.string().max(500).optional(),
  website: z.string().optional(), // honeypot
})

const limiter = new Map<string, number>()

function getIp(req: Request) {
  const xf = req.headers.get('x-forwarded-for')
  return (xf?.split(',')[0] || '0.0.0.0').trim()
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ ok: false, error: 'INVALID_INPUT' }, { status: 400 })

    const { name, contact, attendance, headcount, message, website } = parsed.data
    if (website && website.length > 0) return NextResponse.json({ ok: true })

    const ip = getIp(req)
    const now = Date.now()
    const last = limiter.get(ip) || 0
    if (now - last < 5000) return NextResponse.json({ ok: false, error: 'RATE_LIMITED' }, { status: 429 })
    limiter.set(ip, now)

    const { error } = await supabase.from('rsvp').insert({ name, contact, attendance, headcount, message })
    if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key') || ''
  const adminKey = process.env.ADMIN_KEY || ''
  if (!adminKey || key !== adminKey) return NextResponse.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })

  const { data, error } = await supabase
    .from('rsvp')
    .select('id,name,contact,attendance,headcount,message,created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
  return NextResponse.json({ ok: true, items: data })
}
