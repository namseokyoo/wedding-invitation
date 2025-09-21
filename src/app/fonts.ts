import { Noto_Sans, Playfair_Display } from 'next/font/google'

export const sans = Noto_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-sans' })
export const display = Playfair_Display({ subsets: ['latin'], weight: ['700','800'], variable: '--font-display' })
