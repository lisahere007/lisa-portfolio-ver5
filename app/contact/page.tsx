'use client'

import { useLang } from '@/context/LangContext'
import { useState } from 'react'

const faqs = [
  {
    q_en: 'What is your current employment status?',
    q_kr: '현재 재직 중이신가요?',
    a_en: 'Yes, I am currently working at KISS Nail Products Inc. as an IT Project Manager since April 2024. I am open to new opportunities depending on the role and company.',
    a_kr: '네, 현재 KISS Nail Products Inc.에서 IT 프로젝트 매니저로 재직 중입니다 (2024.04~). 역할과 회사에 따라 새로운 기회에 열려 있습니다.',
  },
  {
    q_en: 'What type of roles are you looking for?',
    q_kr: '어떤 직무를 찾고 계신가요?',
    a_en: 'I am looking for IT Project Manager, Service Planner, or Product Manager roles.',
    a_kr: 'IT 프로젝트 매니저, 서비스 기획자, 또는 프로덕트 매니저 직무를 찾고 있습니다.',
  },
  {
    q_en: 'What industries have you worked in?',
    q_kr: '어떤 업종에서 일해보셨나요?',
    a_en: 'Ecommerce (US D2C, B2B/B2C), IT consulting, SaaS platform development, and international logistics. My experience spans Korea, Vietnam, and the US market.',
    a_kr: '이커머스 (미국 D2C, B2B/B2C), IT 컨설팅, SaaS 플랫폼 개발, 국제 물류 업종에서 일했습니다. 한국, 베트남, 미국 시장 경험이 있습니다.',
  },
  {
    q_en: 'Can you work remotely or overseas?',
    q_kr: '원격 근무나 해외 근무가 가능하신가요?',
    a_en: 'Yes. I have extensive experience working remotely and across time zones (Korea, Vietnam, US). I am comfortable with async communication and cross-cultural collaboration.',
    a_kr: '네. 한국, 베트남, 미국 등 다양한 타임존에서 원격으로 일한 경험이 풍부합니다. 비동기 커뮤니케이션과 다문화 협업에 익숙합니다.',
  },
  {
    q_en: 'What kind of organization do you work best with?',
    q_kr: '어떤 조직과 잘 맞나요?',
    a_en: 'I work best in environments where roles are flexible and people solve problems proactively. Rather than simply handling assigned tickets, I prefer working in a way that organizes ambiguous situations and turns them into executable directions.',
    a_kr: '역할이 지나치게 고정된 환경보다는, 다양한 문제를 함께 보고 유연하게 해결하는 환경과 잘 맞습니다. 단순한 티켓 처리보다는, 모호한 상황을 구조화하고 실행 가능한 방향으로 정리하는 방식으로 일합니다.',
  },
  {
    q_en: 'Are you available for freelance or consulting?',
    q_kr: '프리랜서나 컨설팅도 가능하신가요?',
    a_en: 'Depending on the scope and timeline, yes. Feel free to reach out!',
    a_kr: '범위와 일정에 따라 가능합니다. 편하게 연락 주세요!',
    link: true,
  },
]

export default function Contact() {
  const { lang } = useLang()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const isEN = lang === 'EN'

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4FA' }}>
  <style>{`
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #E4ECF7; border-radius: 2px; }
  .faq-row:hover { background: #F8FAFC !important; }
  .contact-link:hover { background: #EBF3FF !important; }
  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr !important; }
  }
`}</style>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '40px 32px 60px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#5B9CF6' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '3px' }}>
              CONTACT · PM-004
            </span>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#1A2235', letterSpacing: '-1px', marginBottom: '8px' }}>
            {isEN ? 'Get in Touch' : '연락하기'}
          </h1>

          <p style={{ fontSize: '14px', color: '#5A6A85', lineHeight: 1.7, margin: 0 }}>
            {isEN
              ? 'Feel free to reach out for work inquiries or collaborations.'
              : '업무 문의나 협업 제안은 편하게 연락 주세요.'}
          </p>
        </div>

        {/* 2컬럼 */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* 왼쪽: Contact + Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* 연락처 */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '16px' }}>
                {isEN ? 'CONTACT' : '연락처'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Email', value: 'contact.lisa.pm@gmail.com', href: 'mailto:hyein.pm@gmail.com', icon: '✉' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/hyein-kim', href: 'https://www.linkedin.com/in/hyein-kim-95129736a/', icon: '↗' },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '13px 14px',
                      borderRadius: '12px',
                      background: '#F8FAFC',
                      border: '1px solid #E4ECF7',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '9px',
                        background: '#EBF3FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '15px',
                        color: '#5B9CF6',
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>

                    <div>
                      <div style={{ fontSize: '12px', color: '#9AAABB', marginBottom: '2px', letterSpacing: '0.5px' }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize: '13px', color: '#1A2235', fontWeight: 500 }}>
                        {c.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 상태 */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '14px' }}>
                {isEN ? 'STATUS' : '현황'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A2235' }}>
                  {isEN ? 'Currently Employed' : '재직 중'}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7, margin: 0 }}>
                {isEN
                  ? 'Open to new opportunities depending on role & company.'
                  : '역할과 회사에 따라 새로운 기회에 열려 있습니다.'}
              </p>
            </div>

            {/* 응답 안내 */}
            <div style={{ background: '#EBF3FF', borderRadius: '20px', border: '1px solid #C7DEFF', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#5B9CF6', fontWeight: 600, marginBottom: '6px' }}>
                📌 Note
              </div>

              <p style={{ fontSize: '13px', color: '#5A6A85', lineHeight: 1.7, margin: 0 }}>
                {isEN
                  ? 'Best reached via email. I typically respond within 1–2 business days.'
                  : '이메일로 연락 주시면 1~2 영업일 내 답변드립니다.'}
              </p>
            </div>
          </div>

          {/* 오른쪽: FAQ */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '28px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '20px' }}>
              FAQ
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '12px',
                    border: `1px solid ${openIdx === i ? '#C7DEFF' : '#E4ECF7'}`,
                    background: openIdx === i ? '#F0F7FF' : '#FAFBFD',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    className="faq-row"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    style={{
                      padding: '15px 18px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'transparent',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: openIdx === i ? 600 : 400,
                        color: openIdx === i ? '#1A2235' : '#475569',
                        lineHeight: 1.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      {isEN ? faq.q_en : faq.q_kr}
                    </span>

                    <span
                      style={{
                        fontSize: '18px',
                        color: '#9AAABB',
                        flexShrink: 0,
                        transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        display: 'inline-block',
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </div>

                  <div
                    style={{
                      maxHeight: openIdx === i ? '220px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <div style={{ padding: '0 18px 16px', borderTop: '1px solid #E4ECF7' }}>
                      <p
                        style={{
                          fontSize: '13px',
                          color: '#64748B',
                          lineHeight: 1.8,
                          margin: '14px 0',
                          marginBottom: faq.link ? '12px' : '0',
                        }}
                      >
                        {isEN ? faq.a_en : faq.a_kr}
                      </p>

                      {faq.link && (
                        <a
                          href="https://www.linkedin.com/in/hyein-kim-95129736a/"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: '12px',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: '#EBF3FF',
                            border: '1px solid #C7DEFF',
                            color: '#5B9CF6',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontWeight: 500,
                          }}
                        >
                          LinkedIn →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
