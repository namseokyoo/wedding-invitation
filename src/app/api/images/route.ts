import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const slot = url.searchParams.get('slot')
  const prefix = url.searchParams.get('prefix')

  if (slot) {
    const { data, error } = await supabaseAdmin.from('images').select('slot,url').eq('slot', slot).maybeSingle()
    if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
    return NextResponse.json({ ok: true, item: data })
  }

  if (prefix) {
    const { data, error } = await supabaseAdmin
      .from('images')
      .select('slot,url')
      .like('slot', `${prefix}%`)
      .order('slot', { ascending: true })
    if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
    return NextResponse.json({ ok: true, items: data })
  }

  const { data, error } = await supabaseAdmin.from('images').select('slot,url')
  if (error) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })
  return NextResponse.json({ ok: true, items: data })
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const slot = String(form.get('slot') || '')
    if (!file || !slot) return NextResponse.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 })

    const filename = `${slot}-${Date.now()}`
    const { error: upErr } = await supabaseAdmin.storage.from('wedding-images').upload(filename, file, {
      cacheControl: '3600', upsert: false, contentType: file.type,
    })
    if (upErr) return NextResponse.json({ ok: false, error: 'UPLOAD_ERROR' }, { status: 500 })

    const { data } = supabaseAdmin.storage.from('wedding-images').getPublicUrl(filename)
    const publicUrl = data.publicUrl

    const { error: dbErr } = await supabaseAdmin.from('images').upsert({ slot, url: publicUrl })
    if (dbErr) return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 })

    // 갤러리 슬롯인 경우 자동 추가
    if (slot.startsWith('gallery-')) {
      const { error: gErr } = await supabaseAdmin.from('gallery_images').insert({ url: publicUrl })
      if (gErr) console.warn('Failed to add to gallery_images', gErr)
    }

    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}
