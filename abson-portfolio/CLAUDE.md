# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** for Abson, a Full Stack developer. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. The site is a single-page application featuring sections for Hero, About, Skills, Projects, and Contact.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Installation
```bash
# Install dependencies
npm install
```

The development server runs on http://localhost:3000

## Architecture Overview

### Project Structure
- **`src/app/`**: Next.js App Router structure
  - `layout.tsx`: Root layout with Header/Footer and font configuration
  - `page.tsx`: Home page combining all sections
  - `globals.css`: Global styles and CSS variables

- **`src/components/`**: React components
  - `Header.tsx`: Fixed navigation with scroll effects and mobile menu
  - `Footer.tsx`: Site footer
  - `sections/`: Page sections (HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection)

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 with custom color variables
- **Fonts**: Inter (sans) and Poppins (display) from Google Fonts
- **Linting**: ESLint with Next.js config

### Styling Architecture
- Uses CSS custom properties for colors (defined in globals.css)
- Tailwind config extends with custom font families and animations
- Color system: `background`, `foreground`, `accent`, `secondary`, `border`
- Responsive design with mobile-first approach
- Custom animations: `bounce-slow`, `pulse-slow`

### Component Patterns
- All components use TypeScript
- Client components marked with `'use client'` directive when needed
- Navigation uses anchor links for single-page navigation
- Responsive header with scroll effects and mobile hamburger menu
- SEO optimized with comprehensive metadata in layout.tsx

## Key Features
- **Single Page Application**: All content on one page with section navigation
- **Responsive Design**: Mobile-first with responsive breakpoints
- **SEO Optimized**: OpenGraph, Twitter cards, and proper metadata
- **Performance**: Uses Next.js 15 with Turbopack for fast development
- **Accessibility**: Proper ARIA labels and semantic HTML

## Development Notes
- The site is in Portuguese (lang="pt-BR")
- Uses a dark theme color scheme
- Portfolio focuses on Flutter, Angular, .NET Core, Next.js, and Azure technologies
- Brand colors: Primary text #F5F5F5, Accent #FF9100