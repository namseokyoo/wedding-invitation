import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-wedding-gold/20 shadow-sm">
      <nav className="mx-auto max-w-md px-6 py-4 flex items-center justify-center">
        <Link href="/" className="font-wedding text-lg text-wedding-deep hover:text-wedding-gold transition-colors">
          Namseok ♡ Jeongeun
        </Link>
      </nav>
    </header>
  )
}