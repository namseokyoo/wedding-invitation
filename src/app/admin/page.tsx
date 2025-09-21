import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '모바일 청첩장 | 관리자',
}

function csv(rows: any[]) {
  const header = Object.keys(rows[0] || {})
  const lines = [header.join(',')]
  for (const r of rows) lines.push(header.map(h => JSON.stringify((r as any)[h] ?? '')).join(','))
  return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
}

export default async function AdminPage() {
  const key = process.env.ADMIN_KEY || ''
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/api/rsvp?key=${key}`, { cache: 'no-store' })
  const json = await res.json()
  const items = json.ok ? json.items : []

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">관리자</h1>
      <p className="opacity-80 text-sm">RSVP {items.length}건</p>
      <form className="mt-4 grid grid-cols-4 gap-2">
        <input className="col-span-3 rounded border p-2" placeholder="검색(이름/연락처)" name="q" />
        <button className="rounded border p-2">검색</button>
      </form>

      <div className="mt-4 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr>
              <th>이름</th><th>연락처</th><th>참석</th><th>인원</th><th>메시지</th><th>작성</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: any) => (
              <tr key={it.id} className="border-t">
                <td>{it.name}</td>
                <td>{it.contact}</td>
                <td>{it.attendance ? '참석' : '불참'}</td>
                <td>{it.headcount}</td>
                <td className="whitespace-pre-wrap">{it.message}</td>
                <td>{new Date(it.created_at).toLocaleString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="mt-4" action={(formData) => {
        const blob = csv(items)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'rsvp.csv'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      }}>
        <button className="rounded bg-black text-white px-4 py-2 dark:bg-white dark:text-black">CSV 내보내기</button>
      </form>
    </main>
  )
}
