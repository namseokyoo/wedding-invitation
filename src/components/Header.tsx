import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="mx-auto px-6 py-4 text-center">
        <Link href="/" className="font-wedding text-lg text-wedding-deep hover:text-wedding-gold transition-colors">
          Namseok ♡ Jeongeun
        </Link>
        <div className="text-sm text-wedding-deep/70 mt-1">
          wedding 25.12.28 13:10
        </div>
      </nav>
    </header>
  )
}