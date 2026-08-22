/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F8F6',
        foreground: '#1A1A1A',
        surface: '#EBE5DE',
        muted: '#6C6863',
        accent: {
          DEFAULT: '#D4AF37',
          hover: '#C29F2F',
          light: '#E6CA65',
        },
        'accent-foreground': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'editorial-tight': '-0.02em',
        'editorial-normal': '0.05em',
        'editorial-wide': '0.2em',
        'editorial-widest': '0.25em',
        'editorial-super': '0.3em',
      },
      boxShadow: {
        'hero': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'feature': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'blog': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'blog-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'btn': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'btn-hover': '0 8px 24px rgba(0, 0, 0, 0.25)',
        'inner-hairline': 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'editorial': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        fadeIn: 'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
    },
  },
  plugins: [],
}
