'use client'

import { useLang } from '@/context/LangContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const content = {
  EN: {
    tag: 'PM · 001',
    name: 'Lisa',
    role: 'IT Project Manager · AX Era',
    copy: 'DX experience. AX vision. Building what comes next.',
    cta: 'View my work',
    cta2: 'Get in touch',
    sub: 'Lisa · PM 001 · ',
    cards: [
      { index: '01', num: '6+', label: 'Years of Experience' },
      { index: '02', num: '4+', label: 'Countries Worked In' },
      { index: '03', num: '30+', label: 'Projects Shipped' },
    ],
  },
  KR: {
    tag: 'PM · 001',
    name: 'Lisa',
    role: 'IT 프로젝트 매니저 · AX 시대',
    copy: 'DX 기반의 경험을 토대로, AX 비전을 실현하는 다음을 만들어갑니다.',
    cta: '프로젝트 보기',
    cta2: '연락하기',
    sub: 'Lisa · PM 001 · 서울, 대한민국',
    cards: [
      { index: '01', num: '6+', label: '경력' },
      { index: '02', num: '4+', label: '회사' },
      { index: '03', num: '30+', label: '프로젝트' },
    ],
  },
}

export default function Home() {
  const { lang } = useLang()
  const t = content[lang]
  const router = useRouter()

  const [phase, setPhase] = useState<'name' | 'role' | 'done'>('name')
  const [typedName, setTypedName] = useState('')
  const [typedRole, setTypedRole] = useState('')

  useEffect(() => {
    setTypedName('')
    setTypedRole('')
    setPhase('name')
  }, [lang])

  useEffect(() => {
    if (phase !== 'name') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedName(t.name.slice(0, i))
      if (i >= t.name.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('role'), 400)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [phase, t.name])

  useEffect(() => {
    if (phase !== 'role') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedRole(t.role.slice(0, i))
      if (i >= t.role.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('done'), 300)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [phase, t.role])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F0F4FA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px, 10vw, 40px) 32px 40px',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .cursor { display: inline-block; animation: blink 1s infinite; margin-left: 2px; }
        @media (max-width: 768px) {
          .home-wrap { padding: 24px 24px 24px !important; align-items: flex-start !important; }
          .home-tag { margin-bottom: 12px !important; }
          .home-name { font-size: 52px !important; min-height: 56px !important; margin-bottom: 10px !important; letter-spacing: -2px !important; }
          .home-role { font-size: 12px !important; margin-bottom: 14px !important; }
          .home-copy { font-size: 14px !important; margin-bottom: 6px !important; line-height: 1.5 !important; }
          .home-cta { margin-bottom: 24px !important; }
          .home-stat-num { font-size: 24px !important; }
        }
      `}</style>

      <div className="home-wrap" style={{ maxWidth: '600px', width: '100%' }}>

        {/* 태그 */}
        <div className="home-tag" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5B9CF6' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9AAABB', letterSpacing: '3px' }}>{t.tag}</span>
        </div>

        {/* name */}
        <h1 className="home-name" style={{
          fontSize: 'clamp(52px, 8vw, 80px)',
          fontWeight: 700,
          color: '#1A2235',
          letterSpacing: '-3px',
          lineHeight: 1,
          marginBottom: '16px',
          minHeight: '88px',
        }}>
          {typedName}
          {phase === 'name' && <span className="cursor" style={{ fontWeight: 200, color: '#5B9CF6' }}>|</span>}
        </h1>

        {/* role */}
        <p className="home-role" style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(13px, 1.8vw, 16px)',
          color: '#5B9CF6',
          letterSpacing: '2px',
          marginBottom: '24px',
          minHeight: '24px',
        }}>
          {typedRole}
          {phase === 'role' && <span className="cursor">|</span>}
        </p>

        {/* fade-in 영역 */}
        <div style={{
          opacity: phase === 'done' ? 1 : 0,
          transform: phase === 'done' ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>

          {/* copy */}
          <p className="home-copy" style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 400,
            color: '#5A6A85',
            lineHeight: 1.6,
            marginBottom: '12px',
          }}>{t.copy}</p>

          <p style={{ marginBottom: '36px' }} />

          {/* CTA 버튼 */}
          <div className="home-cta" style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
            <button
              onClick={() => router.push('/skills')}
              style={{
                padding: '12px 24px', borderRadius: '12px', border: 'none',
                background: '#1A2235', color: '#fff', fontSize: '13px',
                fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >{t.cta}</button>
            <button
              onClick={() => router.push('/contact')}
              style={{
                padding: '12px 24px', borderRadius: '12px',
                border: '1px solid #E4ECF7', background: '#fff',
                color: '#1A2235', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#5B9CF6')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#E4ECF7')}
            >{t.cta2}</button>
          </div>

          {/* 스탯 */}
          <div style={{ display: 'flex', gap: '40px' }}>
            {t.cards.map((card, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                animation: phase === 'done' ? `fadeUp 0.5s ease ${i * 0.1}s both` : 'none',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#9AAABB', letterSpacing: '1px' }}>{card.index}</span>
                <span className="home-stat-num" style={{ fontSize: '32px', fontWeight: 700, color: '#1A2235', letterSpacing: '-1px', lineHeight: 1 }}>{card.num}</span>
                <span style={{ fontSize: '12px', color: '#5A6A85', marginTop: '2px' }}>{card.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}