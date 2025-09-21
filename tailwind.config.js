/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 웨딩 테마 색상 팔레트
        wedding: {
          gold: '#D4AF37',
          cream: '#F5F5DC', 
          rose: '#E8B4B8',
          lavender: '#DDA0DD',
          warm: '#F8F6F0',
          deep: '#8B4513',
          blush: '#FFF0F5',
          pearl: '#F8F6F2',
        },
        primary: {
          DEFAULT: '#D4AF37', // Wedding Gold
          foreground: '#ffffff'
        },
        secondary: '#F5F5DC', // Wedding Cream
        accent: '#E8B4B8', // Wedding Rose
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-noto-serif-kr)', 'serif'],
        wedding: ['var(--font-noto-serif-kr)', 'serif'],
        display: ['var(--font-noto-serif-kr)', 'serif']
      },
      boxShadow: {
        'wedding-soft': '0 8px 32px rgba(212, 175, 55, 0.1)',
        'wedding-card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'wedding-glow': '0 0 20px rgba(212, 175, 55, 0.2)',
        soft: '0 8px 30px rgba(0,0,0,0.08)'
      },
      backgroundImage: {
        'wedding-gradient': 'linear-gradient(135deg, #F8F6F0 0%, #F5F5DC 50%, #FFF0F5 100%)',
        'wedding-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E87D 100%)',
        'wedding-rose': 'linear-gradient(135deg, #E8B4B8 0%, #F5DDE0 100%)',
      },
      spacing: {
        'wedding': '3.5rem',
      },
      borderRadius: {
        'wedding': '1.5rem',
      },
    }
  },
  plugins: [],
}
