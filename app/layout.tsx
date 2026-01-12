import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scalekit Demo - Next.js',
  description: 'A Next.js application demonstrating OIDC authentication with Scalekit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

