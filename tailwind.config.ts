import type { Config } from 'tailwindcss'
import { backgroundConfig } from './tailwind-config/color/Background'
import { textConfig } from './tailwind-config/color/Text'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/view/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				// accent: 'var(--sidebar-accent)',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			black1: 'var(--black1)',
  			gray1: 'var(--gray1)',
  			gray2: 'var(--gray2)',
  			gray3: 'var(--gray3)',
                ...backgroundConfig,
                ...textConfig,
  			yellow1: 'var(--yellow1)',
  			yellow2: 'var(--yellow2)',
  			yellow3: 'var(--yellow3)',
  			btn: {
  				DEFAULT: 'var(--btn-primary)'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
			},
			screens: {
				'media-2xl': { max: "1599px" },
				'media-xl': { max: "1279px" },
				'media-lg': { max: "1023px" },
				'media-md': { max: "767px" },
				'media-sm': { max: "540px" },
				'media-xs': { max: "450px" },
			},
  	},
  	data: {
  		tabActive: 'state="active"'
		},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config

// function scaleRem(input: any, remBasePx = 10): any {
// 	// default base = 16px
// 	const defaultBaseRem = 16
// 	if (input == null) {
// 		return input
// 	}
// 	switch (typeof input) {
// 		case "object":
// 			if (Array.isArray(input)) {
// 				return input.map((val) => scaleRem(val, remBasePx))
// 			} else {
// 				const ret: Record<string, string> = {}
// 				for (const key in input) {
// 					ret[key] = scaleRem(input[key])
// 				}
// 				return ret
// 			}
// 		case "string":
// 			return input.replace(
// 				/(\d*\.?\d+)rem$/,
// 				(_, val) => (parseFloat(val) * defaultBaseRem) / remBasePx + "rem"
// 			)
// 		default:
// 			return input
// 	}
// }
