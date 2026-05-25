'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'

const navItems = [
  {
    path: '/',
    labelEN: 'Home', labelKR: 'Home',
    subEN: 'Introduction', subKR: '소개 & 인트로',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#1A2235' : '#9AAABB'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    path: '/about',
    labelEN: 'About', labelKR: 'About',
    subEN: 'Profile & History', subKR: '프로필',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#1A2235' : '#9AAABB'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    path: '/skills',
    labelEN: 'Skills', labelKR: 'Skills',
    subEN: 'Projects & Stack', subKR: '프로젝트',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#1A2235' : '#9AAABB'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    path: '/contact',
    labelEN: 'Contact', labelKR: 'Contact',
    subEN: 'FAQ & Links', subKR: 'FAQ & 연락처',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#1A2235' : '#9AAABB'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang, setLang } = useLang()

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside style={{
        width: '180px', height: '100vh', background: '#FFFFFF',
        borderRight: '1px solid #EDF0F7', display: 'flex', flexDirection: 'column',
        position: 'fixed', left: 0, top: 0, zIndex: 50,
      }}
        className="desktop-sidebar"
      >
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #EDF0F7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#1A2235', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>LP</span>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A2235', lineHeight: 1.2 }}>Lisa</div>
              <div style={{ fontSize: '12px', color: '#9AAABB', marginTop: '2px' }}>PM · Portfolio</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const active = pathname === item.path
            const label = lang === 'EN' ? item.labelEN : item.labelKR
            const sub = lang === 'EN' ? item.subEN : item.subKR
            return (
              <button key={item.path} onClick={() => router.push(item.path)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: active ? '#F0F4FA' : 'transparent', width: '100%', textAlign: 'left', transition: 'background 0.15s ease', height: '52px' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                <div style={{ flexShrink: 0 }}>{item.icon(active)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#1A2235' : '#5A6A85', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: active ? '#5B9CF6' : '#9AAABB', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
                </div>
                {active && <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: '#5B9CF6', flexShrink: 0 }} />}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid #EDF0F7' }}>
          <div style={{ display: 'flex', background: '#F0F4FA', borderRadius: '8px', padding: '3px' }}>
            {(['EN', 'KR'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{ flex: 1, padding: '5px 0', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600, background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#1A2235' : '#9AAABB', boxShadow: lang === l ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s ease' }}
              >{l}</button>
            ))}
          </div>
        </div>
      </aside>

      {/* 모바일 하단 탭바 */}
      <div className="mobile-navbar" style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff', borderTop: '1px solid #EDF0F7',
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {navItems.map((item) => {
            const active = pathname === item.path
            const label = lang === 'EN' ? item.labelEN : item.labelKR
            return (
              <button key={item.path} onClick={() => router.push(item.path)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px' }}
              >
                {item.icon(active)}
                <span style={{ fontSize: '11px', fontWeight: active ? 600 : 400, color: active ? '#1A2235' : '#9AAABB' }}>{label}</span>
              </button>
            )
          })}
          {/* EN/KR 토글 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {(['EN', 'KR'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding: '2px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 600, background: lang === l ? '#1A2235' : 'transparent', color: lang === l ? '#fff' : '#9AAABB' }}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-navbar { display: block !important; }
        }
      `}</style>
    </>
  )
}
