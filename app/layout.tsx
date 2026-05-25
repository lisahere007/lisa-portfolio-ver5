import type { Metadata } from 'next'
import { LangProvider } from '@/context/LangContext'
import Sidebar from '@/components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lisa · PM Portfolio',
  description: '6-year IT Project Manager Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, background: '#F0F4FA' }}>
        <LangProvider>
          <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <main style={{
  marginLeft: '180px',
  flex: 1,
  height: '100vh',
  overflowY: 'auto',
}} className="main-content">
              {children}
            </main>
          </div>
        </LangProvider>
      </body>
    </html>
  )
}
