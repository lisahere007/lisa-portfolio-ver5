'use client'

import { useLang } from '@/context/LangContext'
import { useState, useEffect } from 'react'

const content = {
  EN: {
    tag: 'ABOUT · PM-002',
    title: 'Who is Lisa?',
    subtitle: '6-year IT Project Manager with end-to-end experience from service planning, system design, development collaboration to operational stability.',
    tabs: ['Timeline', 'Personality'],
    timelineLabel: 'TIMELINE',
    personalityLabel: 'PERSONALITY',
    insightLabel: 'AI INSIGHT',
    chatLabel: 'AI_INSIGHT.sys · analyzing Lisa...',
    timeline: [
      { year: '1997', age: '', event: 'Born' },
      { year: '2002', age: 'Age 6', event: 'World Cup' },
      { year: '2010', age: 'Age 14', event: 'Middle school → Singapore' },
      { year: '2016', age: 'Age 20', event: 'University · Jeju return · Singapore exchange' },
      { year: '2018', age: 'Age 22', event: 'Graduated · Vietnam · Cargorush begins' },
      { year: '2021', age: 'Age 25', event: 'Cargorush → Cafe24 Vietnam' },
      { year: '2023', age: 'Age 27', event: 'Cafe24 Vietnam → Amoeba' },
      { year: '2024', age: 'Age 28', event: 'Return to Korea · KISS begins' },
      { year: '2026', age: 'Age 30', event: 'KISS · Present' },
    ],
    traits: [
      { label: 'ENTP', color: '#5B9CF6' },
      { label: 'AB Type', color: '#5B9CF6' },
      { label: 'Quick Learner', color: '#A78BFA' },
      { label: 'Logical Thinker', color: '#A78BFA' },
      { label: 'Risk Detector', color: '#FB923C' },
      { label: 'Communicator', color: '#FB923C' },
      { label: 'Realist', color: '#34D399' },
      { label: 'Accountable', color: '#34D399' },
      { label: 'Curious', color: '#F472B6' },
    ],
    chat: [
      { role: 'user', text: 'What kind of person is Lisa?' },
      { role: 'ai', text: 'Someone who turns complexity into structure. She asks "Can this be systematized?" before jumping to solutions.' },
      { role: 'user', text: 'How does she collaborate?' },
      { role: 'ai', text: 'She listens first, then structures the next action.' },
      { role: 'ai', text: 'From planning to dev, QA, and ops — she connects developers, designers, and decision-makers to keep things moving.' },
      { role: 'user', text: 'What are her strengths?' },
      { role: 'ai', text: 'Structural thinking · Risk detection · Reality check · End-to-end ownership — these four define her.' },
      { role: 'user', text: 'Any weaknesses?' },
      { role: 'ai', text: 'She tends to hold too many moving parts at once. "Just let it slide" doesn\'t come naturally to her.' },
    ],
    insights: [
      { icon: '⬡', title: 'Structural Thinker', desc: 'Turns complex requirements into executable systems' },
      { icon: '◈', title: 'Risk Detector', desc: 'Catches edge cases before they become problems' },
      { icon: '◇', title: 'Reality Checker', desc: 'Prioritizes what works over what sounds ideal' },
      { icon: '○', title: 'End-to-End Owner', desc: 'From idea to operational stability' },
    ],
  },
  KR: {
    tag: 'ABOUT · PM-002',
    title: '리사는 누구인가?',
    subtitle: '서비스 기획, 시스템 설계, 개발 협업 및 운영 안정화까지 End-to-End로 수행해온 6년 차 IT 프로젝트 매니저입니다.',
    tabs: ['타임라인', '성격'],
    timelineLabel: '타임라인',
    personalityLabel: '성격',
    insightLabel: 'AI 인사이트',
    chatLabel: 'AI_INSIGHT.sys · Lisa 분석 중...',
    timeline: [
      { year: '1997', age: '', event: '출생' },
      { year: '2002', age: '6살', event: '붉은악마 월드컵' },
      { year: '2010', age: '14살', event: '싱가포르 중학교 입학' },
      { year: '2016', age: '20살', event: '제주복귀 · 대학교 → 싱가포르 교환학생' },
      { year: '2018', age: '22살', event: '대학졸업 · 베트남 해외취업프로그램 · Cargorush 입사' },
      { year: '2021', age: '25살', event: 'Cargorush → Cafe24 베트남 이직' },
      { year: '2023', age: '27살', event: 'Cafe24 베트남 → Amoeba 이직' },
      { year: '2024', age: '28살', event: '한국 귀국 · KISS Korea 이직' },
      { year: '2026', age: '30살', event: 'KISS · 현재' },
    ],
    traits: [
      { label: 'ENTP', color: '#5B9CF6' },
      { label: 'AB형', color: '#5B9CF6' },
      { label: '빠른 이해', color: '#A78BFA' },
      { label: '논리적 사고', color: '#A78BFA' },
      { label: '리스크 감지', color: '#FB923C' },
      { label: '소통', color: '#FB923C' },
      { label: '현실주의', color: '#34D399' },
      { label: '책임감', color: '#34D399' },
      { label: '호기심', color: '#F472B6' },
    ],
    chat: [
      { role: 'user', text: '리사는 어떤 사람이야?' },
      { role: 'ai', text: '복잡한 걸 구조로 바꾸는 사람이에요. "이게 시스템적으로 계산 가능한가?"를 먼저 물어요.' },
      { role: 'user', text: '협업 방식은 어때?' },
      { role: 'ai', text: '먼저 듣고, 구조화해서 다음 액션으로 연결해요.' },
      { role: 'ai', text: '기획부터 개발, QA, 운영까지 — 개발자·디자이너·의사결정자를 연결해서 굴러가게 만들어요.' },
      { role: 'user', text: '강점이 뭐야?' },
      { role: 'ai', text: '구조적 사고 · 리스크 감지 · 현실 감각 · 끝까지 책임지는 유형이에요.' },
      { role: 'user', text: '단점은?' },
      { role: 'ai', text: '생각할 포인트를 동시에 너무 많이 들고 가요. "대충 넘기자"가 잘 안 돼요.' },
    ],
    insights: [
      { icon: '⬡', title: '구조적 사고', desc: '복잡한 요구사항을 실행 가능한 시스템으로 전환' },
      { icon: '◈', title: '리스크 감지', desc: '예외 케이스를 문제가 되기 전에 포착' },
      { icon: '◇', title: '현실 감각', desc: '이상보다 실제 구현 가능성을 먼저' },
      { icon: '○', title: '책임', desc: '아이디어부터 운영 안정화까지' },
    ],
  },
}

function ChatSection({ chat }: { chat: { role: string; text: string }[] }) {
  const [phase, setPhase] = useState<'typing-user' | 'typing-ai' | 'done'>('typing-user')
  const [typed, setTyped] = useState('')

  const firstUserText = chat.find(m => m.role === 'user')?.text ?? ''
  const firstAiText = chat.find(m => m.role === 'ai')?.text ?? ''

  useEffect(() => {
    setTyped('')
    setPhase('typing-user')
    let i = 0
    const interval = setInterval(() => {
      i++
      setTyped(firstUserText.slice(0, i))
      if (i >= firstUserText.length) {
        clearInterval(interval)
        setTimeout(() => {
          setTyped('')
          setPhase('typing-ai')
          let j = 0
          const interval2 = setInterval(() => {
            j++
            setTyped(firstAiText.slice(0, j))
            if (j >= firstAiText.length) {
              clearInterval(interval2)
              setTimeout(() => setPhase('done'), 200)
            }
          }, 30)
        }, 400)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [firstUserText, firstAiText])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chat.map((msg, i) => {
        const isFirstUser = msg.role === 'user' && chat.findIndex(m => m.role === 'user') === i
        const isFirstAi = msg.role === 'ai' && chat.findIndex(m => m.role === 'ai') === i
        const showRest = phase === 'done'

        if (isFirstUser) {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: '13px', lineHeight: 1.6, background: '#5B9CF6', color: '#fff' }}>
                {phase === 'typing-user' ? <>{typed}<span style={{ animation: 'blink 1s infinite' }}>|</span></> : firstUserText}
              </div>
            </div>
          )
        }

        if (isFirstAi) {
          if (phase === 'typing-user') return null
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#5B9CF6', fontWeight: 700, flexShrink: 0 }}>A</div>
              <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: '13px', lineHeight: 1.6, background: '#F8FAFC', color: '#1A2235', border: '1px solid #E4ECF7' }}>
                {phase === 'typing-ai' ? <>{typed}<span style={{ animation: 'blink 1s infinite' }}>|</span></> : firstAiText}
              </div>
            </div>
          )
        }

        if (!showRest) return null

        return (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
            {msg.role === 'ai' && (
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#5B9CF6', fontWeight: 700, flexShrink: 0 }}>A</div>
            )}
            <div style={{
              maxWidth: '75%', padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              fontSize: '13px', lineHeight: 1.6,
              background: msg.role === 'user' ? '#5B9CF6' : '#F8FAFC',
              color: msg.role === 'user' ? '#fff' : '#1A2235',
              border: msg.role === 'ai' ? '1px solid #E4ECF7' : 'none',
            }}>
              {msg.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function About() {
  const { lang } = useLang()
  const t = content[lang]
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4FA' }}>
<style>{`
  @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #E4ECF7; border-radius: 2px; }
  @media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr !important; }
  .about-left { order: 2; }
  .about-right { order: 1; }
}
`}</style>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '40px 32px 60px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#5B9CF6' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '3px' }}>{t.tag}</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#1A2235', letterSpacing: '-1px', marginBottom: '8px' }}>{t.title}</h1>
          <p style={{ fontSize: '14px', color: '#5A6A85', maxWidth: '520px', lineHeight: 1.7, margin: 0 }}>{t.subtitle}</p>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {t.tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s ease',
                background: activeTab === i ? '#1A2235' : '#fff',
                color: activeTab === i ? '#fff' : '#64748B',
                boxShadow: activeTab === i ? '0 2px 8px rgba(26,34,53,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div style={{ animation: 'fadeIn 0.3s ease' }} key={activeTab}>

          {/* Timeline 탭 */}
          {activeTab === 0 && (
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '32px 40px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '28px' }}>{t.timelineLabel}</p>
              <div style={{ position: 'relative', maxWidth: '600px' }}>
                <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px', background: '#EDF0F7' }} />
                {t.timeline.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '24px', alignItems: 'flex-start' }}>
                    <div style={{ width: '72px', flexShrink: 0, textAlign: 'right' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '14px', color: i === t.timeline.length - 1 ? '#5B9CF6' : '#475569', fontWeight: 600 }}>{item.year}</div>
                      {item.age && <div style={{ fontSize: '12px', color: '#9AAABB', marginTop: '2px' }}>{item.age}</div>}
                    </div>
                    <div style={{ flexShrink: 0, marginTop: '6px', position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: i === t.timeline.length - 1 ? '#5B9CF6' : '#fff',
                        border: `2px solid ${i === t.timeline.length - 1 ? '#5B9CF6' : '#CBD5E1'}`,
                      }} />
                    </div>
                    <div style={{ fontSize: '14px', color: i === t.timeline.length - 1 ? '#1A2235' : '#64748B', lineHeight: 1.6, fontWeight: i === t.timeline.length - 1 ? 500 : 400 }}>{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personality 탭 */}
          {activeTab === 1 && (
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px', alignItems: 'start' }}>

              {/* 왼쪽: 성격 + 인사이트 */}
              <div className="about-left" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* 성격 태그 */}
                <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '16px' }}>{t.personalityLabel}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {t.traits.map((tr) => (
                      <span key={tr.label} style={{
                        fontSize: '13px', fontWeight: 500,
                        padding: '6px 14px', borderRadius: '100px',
                        background: `${tr.color}15`,
                        color: tr.color,
                        border: `1px solid ${tr.color}30`,
                      }}>{tr.label}</span>
                    ))}
                  </div>
                </div>

                {/* AI 인사이트 */}
                <div className="about-right" style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '18px' }}>{t.insightLabel}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {t.insights.map((ins, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '16px', color: '#5B9CF6', flexShrink: 0, marginTop: '1px' }}>{ins.icon}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A2235', marginBottom: '3px' }}>{ins.title}</div>
                          <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>{ins.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽: AI 챗 */}
              <div className="about-right" style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #EDF0F7' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px' }}>{t.chatLabel}</span>
                </div>
                <ChatSection key={lang} chat={t.chat} />
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}
