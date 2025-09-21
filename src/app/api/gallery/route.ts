import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('gallery_images')
    .select('id,url,sort,created_at')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
  return NextResponse.json({ ok: true, items: data })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!Array.isArray(body)) return NextResponse.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 })
    const { error } = await supabaseAdmin.from('gallery_images').upsert(body)
    if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}
