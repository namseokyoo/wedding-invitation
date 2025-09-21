import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'
import crypto from 'crypto'

const bodySchema = z.object({
  name: z.string().min(1).max(50),
  message: z.string().min(1).max(500),
  relation: z.string().max(50).optional(),
  is_public: z.boolean().optional().default(true),
  website: z.string().optional()
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

    const { name, message, relation, is_public, website } = parsed.data
    if (website && website.length > 0) return NextResponse.json({ ok: true })

    const ip = getIp(req)
    const now = Date.now()
    const last = limiter.get(ip) || 0
    if (now - last < 5000) return NextResponse.json({ ok: false, error: 'RATE_LIMITED' }, { status: 429 })
    limiter.set(ip, now)

    const salt = process.env.GUESTBOOK_IP_SALT || ''
    const ip_hash = salt ? crypto.createHash('sha256').update(ip + salt).digest('hex') : null

    const { error } = await supabase.from('guestbook').insert({ name, message, relation, is_public, ip_hash })
    if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('id, name, message, relation, created_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
  return NextResponse.json({ ok: true, items: data })
}
