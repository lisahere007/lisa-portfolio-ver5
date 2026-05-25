'use client'

import { useLang } from '@/context/LangContext'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const skills = [
  { name: 'Service Planning', level: 95 },
  { name: 'System Design', level: 94 },
  { name: 'Ecommerce (Cafe24 / WooCommerce / Odoo / Shopify)', level: 95 },
  { name: 'Project Management', level: 95 },
  { name: 'QA & Testing', level: 95 },
  { name: 'Data Analysis (GA4 / Power BI)', level: 90 },
]

const devTools = [
  { name: 'Inspo', desc_en: 'Screenshot & collaboration tool', desc_kr: '스크린샷 기록 협업 툴', status: 'done' },
  { name: 'TalkTalk', desc_en: 'Ecommerce messenger UI/UX', desc_kr: '이커머스 메신저 기능 UI/UX', status: 'done' },
  { name: 'A/B Test Tool', desc_en: 'A/B testing platform', desc_kr: 'A/B 테스트 플랫폼', status: 'pending' },
  { name: 'Survey Tool', desc_en: 'Survey management platform', desc_kr: '설문 관리 플랫폼', status: 'pending' },
  { name: 'Seller Center', desc_en: 'Seller/settlement management', desc_kr: '셀러 / 입점 / 정산 관리 툴', status: 'pending' },
  { name: 'Segment Lab', desc_en: 'User segment & targeting', desc_kr: '유저 세그먼트 / 타겟팅 관리 툴', status: 'pending' },
]

const studyItems = [
  {
    category_en: 'Computer Science', category_kr: '컴퓨터공학',
    items: [
      { en: 'C Programming', kr: 'C언어' }, { en: 'Database', kr: '데이터베이스' },
      { en: 'Algorithms', kr: '알고리즘' }, { en: 'Operating Systems', kr: '운영체제' },
      { en: 'Data Structures', kr: '자료구조' }, { en: 'Computer Architecture', kr: '컴퓨터구조' },
      { en: 'Computer Networks', kr: '컴퓨터네트워크' },
    ],
  },
  {
    category_en: 'Analytics', category_kr: '분석',
    items: [{ en: 'Google Analytics (GA4)', kr: '구글 애널리틱스(GA4)' }],
  },
]

const tagColors: Record<string, string> = {
  'B2B': '#1a4fd8', 'Feature': '#0f8a5a', 'Platform': '#6a4fd8',
  'Marketing': '#8a2fd8', 'Ecommerce': '#1a8ad8', 'QA': '#0f8a5a',
  'PM': '#d87a1a', 'Migration': '#6a4fd8', 'Consulting': '#8a6f0f',
  'Logistics': '#8a6f0f', 'Customs': '#d84040', 'Operations': '#4a8a0f',
  'Analytics': '#1a8ad8', 'Payment': '#d87a1a', 'Brand': '#e05a9a',
}

const tagBg: Record<string, string> = {
  'B2B': '#E6F1FB', 'Feature': '#E1F5EE', 'Platform': '#EEEDFE',
  'Marketing': '#EEEDFE', 'Ecommerce': '#E6F1FB', 'QA': '#E1F5EE',
  'PM': '#FAEEDA', 'Migration': '#EEEDFE', 'Consulting': '#F1EFE8',
  'Logistics': '#F1EFE8', 'Customs': '#FCEBEB', 'Operations': '#EAF3DE',
  'Analytics': '#E6F1FB', 'Payment': '#FAEEDA', 'Brand': '#FBEAF0',
}

type Project = {
  id: string; name: string; period: string; tag: string; company: string
  desc_en: string; desc_kr: string; detail_en: string; detail_kr: string
}

const companies = [
  {
    id: 'kiss', name: 'KISS', period: '2024~Now', color: '#1a4fd8',
    projects: [
      { id: 'k1', name: 'IVYUSA Shopify', period: '2024~Now', tag: 'Ecommerce', company: 'KISS', desc_en: 'US flagship Shopify store operation', desc_kr: 'US 자사몰 Shopify 플랫폼 운영', detail_en: 'Managed and operated the IVYUSA main Shopify storefront. Handled feature development, data management, issue response, and operational support.', detail_kr: 'IVYUSA 메인 Shopify 자사몰 운영 및 기능 개발. 데이터 관리, 이슈 대응, 전반적인 운영 지원 담당.' },
      { id: 'k2', name: 'Etlee', period: '2024~Now', tag: 'Ecommerce', company: 'KISS', desc_en: 'Etlee brand site development', desc_kr: 'Etlee 브랜드 사이트 개발', detail_en: 'Led development of the Etlee brand site.', detail_kr: 'Etlee 브랜드 사이트 개발 총괄.' },
      { id: 'k3', name: 'Arria', period: '2024~Now', tag: 'Ecommerce', company: 'KISS', desc_en: 'Arria brand site development', desc_kr: 'Arria 브랜드 사이트 개발', detail_en: 'Led development of the Arria brand site.', detail_kr: 'Arria 브랜드 사이트 개발 총괄.' },
      { id: 'k4', name: 'IVYUSA B2B Pro', period: '2026.01~03', tag: 'B2B', company: 'KISS', desc_en: 'Wholesale order system design', desc_kr: 'Wholesale 주문 시스템 전체 설계', detail_en: 'Designed the entire B2B wholesale ordering system from scratch for US market clients.', detail_kr: '미국 시장 B2B 클라이언트를 위한 Wholesale 주문 시스템 전체 설계.' },
      { id: 'k5', name: 'TalkTalk Messenger', period: '2026.03', tag: 'Feature', company: 'KISS', desc_en: 'Real-time messaging feature architecture', desc_kr: '실시간 메시징 기능 아키텍처 설계', detail_en: 'Designed the architecture and service flow for TalkTalk.', detail_kr: '자사몰 내 TalkTalk 메신저 기능의 아키텍처 및 서비스 플로우 설계.' },
      { id: 'k6', name: 'Odoo → Shopify Migration', period: '2024', tag: 'Migration', company: 'KISS', desc_en: 'Full platform migration — zero downtime', desc_kr: '전체 플랫폼 마이그레이션 · 무중단 전환', detail_en: 'Led full platform migration from Odoo to Shopify. Migrated all product, customer, and order data with zero downtime.', detail_kr: 'IVYUSA Odoo → Shopify 전체 플랫폼 마이그레이션. 상품·고객·주문 데이터 전량 이관, 무중단 전환 리드.' },
      { id: 'k7', name: 'Beautizen 2.0', period: '2025.08~2026.03', tag: 'Marketing', company: 'KISS', desc_en: 'Gamification & participation automation', desc_kr: '게이미피케이션 & 참여 자동화 플랫폼', detail_en: 'Built XP/Level gamification structure and participation automation.', detail_kr: 'XP/Level 게이미피케이션 구조와 참여 자동화 체계 신규 설계.' },
      { id: 'k8', name: 'Round Table 2.0', period: '2025.06~08', tag: 'Platform', company: 'KISS', desc_en: 'Automation-focused platform redesign', desc_kr: '자동화 중심 플랫폼 아키텍처 재설계', detail_en: 'Redesigned the Round Table platform architecture with focus on automation.', detail_kr: '자동화 중심으로 Round Table 플랫폼 아키텍처 전면 재설계.' },
      { id: 'k9', name: 'Round Table 3.0', period: '2026.03', tag: 'Platform', company: 'KISS', desc_en: 'Product test platform enhancement', desc_kr: '제품 테스트 플랫폼 고도화', detail_en: 'Full enhancement of Round Table 3.0 with advanced automation and tier classification (B/A/PRO).', detail_kr: 'Round Table 3.0 고도화. 자동화 시스템 및 티어 분류(B/A/PRO) 적용.' },
      { id: 'k10', name: 'Marketplace Platform', period: '2024.10~2025.09', tag: 'Platform', company: 'KISS', desc_en: 'B2C/B2B marketplace — seller onboarding', desc_kr: 'B2C/B2B 마켓플레이스 · 셀러 입점 설계', detail_en: 'Designed marketplace commerce platform supporting B2C and B2B with seller onboarding.', detail_kr: 'B2C와 B2B를 지원하는 마켓플레이스형 커머스 플랫폼 및 셀러 입점 시스템 설계.' },
      { id: 'k11', name: 'Shopify Product AI SEO', period: '2024~Now', tag: 'Feature', company: 'KISS', desc_en: 'AI-powered product SEO management', desc_kr: 'AI 기반 상품 SEO 데이터 관리', detail_en: 'Managed AI-powered SEO data generation for Shopify product listings.', detail_kr: 'Shopify 상품 리스팅 AI 기반 SEO 데이터 생성 및 최적화 관리.' },
      { id: 'k12', name: 'User Segment', period: '2024~Now', tag: 'Feature', company: 'KISS', desc_en: 'Member segmentation data page', desc_kr: '자사몰 회원 세그먼트 데이터 페이지', detail_en: 'Developed member segmentation data visualization page.', detail_kr: '자사몰 회원 세그먼트 데이터 페이지 개발.' },
      { id: 'k13', name: 'Operations & Issue Mgmt', period: '2024~Now', tag: 'Operations', company: 'KISS', desc_en: 'Platform ops, data & issue response', desc_kr: '플랫폼 운영 데이터 관리 및 이슈 대응', detail_en: 'Managed day-to-day platform operations and issue response.', detail_kr: '일상적인 플랫폼 운영 관리 및 이슈 대응.' },
      { id: 'k14', name: 'Tax · Coupon · Point 운영', period: '2024~Now', tag: 'Operations', company: 'KISS', desc_en: 'Tax, coupon & point issue response', desc_kr: '세금·쿠폰·포인트 이슈 대응 및 운영', detail_en: 'Handled tax, coupon, and point bugs and operational issues.', detail_kr: '세금 계산 이슈, 쿠폰 할인 오류, 포인트 차감 버그 대응.' },
    ],
  },
  {
    id: 'amoeba', name: 'Amoeba', period: '2023~2024', color: '#0f8a5a',
    projects: [
      { id: 'a1', name: 'IVYUSA WooCommerce', period: '2023~2024', tag: 'Ecommerce', company: 'Amoeba', desc_en: 'US flagship WooCommerce + 100+ plugins', desc_kr: 'WooCommerce 자사몰 + 플러그인 100개+ 운영', detail_en: 'Managed IVYUSA WooCommerce storefront. Tested and operated over 100 plugins. Directly resolved Tax and PG integration issues.', detail_kr: 'IVYUSA WooCommerce 자사몰 운영. 플러그인 100개 이상 테스트 및 운영. Tax·PG 연동 이슈 직접 대응.' },
      { id: 'a2', name: 'Cafe24 → WooCommerce Migration', period: '2023', tag: 'Migration', company: 'Amoeba', desc_en: 'Full migration across all brand stores', desc_kr: '전 브랜드 스토어 전체 데이터 이관', detail_en: 'Led full platform migration from Cafe24 to WooCommerce for IVYUSA and all sub-brands.', detail_kr: 'IVYUSA 및 서브 브랜드 Cafe24 → WooCommerce 전체 마이그레이션.' },
      { id: 'a3', name: 'Power BI', period: '2023~2024', tag: 'Analytics', company: 'Amoeba', desc_en: 'WooCommerce order & sales dashboard', desc_kr: 'WooCommerce 주문·매출 시각화 대시보드', detail_en: 'Maintained Power BI dashboard connected to WooCommerce data.', detail_kr: 'WooCommerce 데이터 연동 Power BI 대시보드 유지 및 업데이트.' },
      { id: 'a4', name: 'GA4 / GTM', period: '2023~2024', tag: 'Analytics', company: 'Amoeba', desc_en: 'Multi-brand WooCommerce GA4 tracking', desc_kr: '멀티 브랜드 WooCommerce GA4 트래킹', detail_en: 'Configured GA4 and GTM for multiple WooCommerce brand stores.', detail_kr: '다수 WooCommerce 브랜드 스토어 GA4 및 GTM 이커머스 이벤트 트래킹 설정.' },
      { id: 'a5', name: 'Tax / Authorize', period: '2023~2024', tag: 'Payment', company: 'Amoeba', desc_en: 'AvaTax + Authorize.net PG integration', desc_kr: 'AvaTax 세금 계산 및 Authorize.net 연동', detail_en: 'Managed AvaTax and Authorize.net PG integration.', detail_kr: 'AvaTax 세금 계산 설정 및 Authorize.net PG 연동 관리.' },
      { id: 'a6', name: 'ShipStation', period: '2023~2024', tag: 'Logistics', company: 'Amoeba', desc_en: '3PL shipping integration & issue response', desc_kr: '3PL 배송 연동 및 이슈 대응', detail_en: 'Managed ShipStation 3PL logistics integration.', detail_kr: 'ShipStation 3PL 물류 연동 관리.' },
      { id: 'a7', name: 'Beautizen 1.0', period: '2023~2024', tag: 'Marketing', company: 'Amoeba', desc_en: 'Beauty community platform PM', desc_kr: '뷰티 커뮤니티 플랫폼 PM', detail_en: 'Managed requirements, schedule, and QA for Beautizen 1.0.', detail_kr: 'Beautizen 1.0 요구사항 정의, 일정 관리, QA 담당.' },
      { id: 'a8', name: 'Round Table 1.0', period: '2023~2024', tag: 'Platform', company: 'Amoeba', desc_en: 'Product test platform PM', desc_kr: '제품 테스트 플랫폼 PM', detail_en: 'Managed Round Table 1.0 requirements and schedule.', detail_kr: 'Round Table 1.0 요구사항 및 일정 관리.' },
      { id: 'a9', name: 'BOPIS', period: '2023~2024', tag: 'Feature', company: 'Amoeba', desc_en: 'Buy Online Pick-up In Store PM', desc_kr: 'BOPIS 온라인 구매 매장 픽업 PM', detail_en: 'Managed requirements for BOPIS feature.', detail_kr: 'BOPIS 기능 요구사항 정의 및 개발 조율 담당.' },
      { id: 'a10', name: 'Plugin QA & Management', period: '2023~2024', tag: 'QA', company: 'Amoeba', desc_en: '100+ WooCommerce plugins tested & managed', desc_kr: 'WooCommerce 플러그인 100개+ QA 및 관리', detail_en: 'Managed and QA-tested 100+ WooCommerce plugins.', detail_kr: 'WooCommerce 플러그인 100개 이상 목록 관리 및 전체 QA.' },
      { id: 'a11', name: 'Add-on App Design', period: '2023~2024', tag: 'Feature', company: 'Amoeba', desc_en: 'Add-on application design & dev support', desc_kr: 'Add-on 앱 설계 및 개발 지원', detail_en: 'Designed and supported Add-on applications.', detail_kr: 'Add-on 애플리케이션 설계 및 개발 지원.' },
      { id: 'a12', name: 'Document Management', period: '2023~2024', tag: 'PM', company: 'Amoeba', desc_en: 'Project schedule & document management', desc_kr: '프로젝트 일정 및 문서 관리', detail_en: 'Managed project timelines and design documents.', detail_kr: '프로젝트별 타임라인 조율 및 주요 설계 문서 관리.' },
    ],
  },
  {
    id: 'cafe24', name: 'Cafe24', period: '2021~2023', color: '#6a4fd8',
    projects: [
      { id: 'c1', name: 'IVYUSA Cafe24', period: '2021~2023', tag: 'Ecommerce', company: 'Cafe24', desc_en: 'US flagship store + 10 sub-brands', desc_kr: 'Cafe24 자사몰 + 서브 브랜드 10개 운영', detail_en: 'Built and operated the IVYUSA main Cafe24 store and 10 sub-brand stores.', detail_kr: 'IVYUSA Cafe24 메인몰 및 서브 브랜드 10개 구축 및 운영.' },
      { id: 'c2', name: 'Lock & Lock Vietnam', period: '2021~2023', tag: 'Ecommerce', company: 'Cafe24', desc_en: 'Vietnam D2C store build', desc_kr: 'Vietnam 자사몰 구축', detail_en: 'Built the Lock & Lock Vietnam D2C online store on Cafe24.', detail_kr: 'Lock & Lock 베트남 자사몰 Cafe24 기반 구축.' },
      { id: 'c3', name: 'Coway Vietnam', period: '2021~2023', tag: 'Ecommerce', company: 'Cafe24', desc_en: 'Vietnam D2C store build', desc_kr: 'Vietnam 자사몰 구축', detail_en: 'Developed the Coway Vietnam D2C store.', detail_kr: 'Coway 베트남 가전제품 자사몰 개발.' },
      { id: 'c4', name: 'Solgar Vietnam', period: '2021~2023', tag: 'Ecommerce', company: 'Cafe24', desc_en: 'Vietnam health supplement store', desc_kr: 'Vietnam 건강기능식품 자사몰', detail_en: 'Built the Solgar Vietnam health supplement store.', detail_kr: 'Solgar 베트남 건강기능식품 자사몰 구축.' },
      { id: 'c5', name: 'Full Data Migration', period: '2021~2022', tag: 'Migration', company: 'Cafe24', desc_en: 'Shopify & Cafe24 full data migration', desc_kr: 'Shopify & Cafe24 전체 데이터 마이그레이션', detail_en: 'Full data migration covering all products, customers, orders, and media.', detail_kr: '상품·고객·주문·미디어 전량 이전.' },
      { id: 'c6', name: 'Power BI', period: '2021~2023', tag: 'Analytics', company: 'Cafe24', desc_en: 'Cafe24 order & sales dashboard', desc_kr: 'Cafe24 주문·매출 데이터 대시보드', detail_en: 'Built Power BI dashboard connected to Cafe24 data.', detail_kr: 'Cafe24 데이터와 연동된 Power BI 대시보드 구축.' },
      { id: 'c7', name: 'GA4 / GTM', period: '2021~2023', tag: 'Analytics', company: 'Cafe24', desc_en: 'Multi-brand Cafe24 GA tracking', desc_kr: 'Cafe24 멀티 브랜드 GA 트래킹', detail_en: 'Configured GA and GTM for multiple Cafe24 brand stores.', detail_kr: '다수 Cafe24 브랜드 스토어 GA 및 GTM 이벤트 트래킹 설정.' },
      { id: 'c8', name: 'Tax / Authorize', period: '2021~2023', tag: 'Payment', company: 'Cafe24', desc_en: 'AvaTax + Authorize.net integration', desc_kr: 'AvaTax 세금 계산 및 Authorize.net 연동', detail_en: 'Configured AvaTax and Authorize.net integration.', detail_kr: 'AvaTax 설정 및 Authorize.net 연동.' },
      { id: 'c9', name: 'ShipStation', period: '2021~2023', tag: 'Logistics', company: 'Cafe24', desc_en: '3PL shipping integration', desc_kr: '3PL 배송 연동', detail_en: 'Integrated ShipStation for 3PL logistics.', detail_kr: 'ShipStation 3PL 물류 연동.' },
      { id: 'c10', name: 'Overseas Incubating', period: '2021~2023', tag: 'Consulting', company: 'Cafe24', desc_en: 'Overseas expansion consulting', desc_kr: '해외 진출 컨설팅 및 지원', detail_en: 'Managed incubating services for overseas expansion clients.', detail_kr: '해외 진출 희망 고객사 대상 인큐베이팅 서비스 관리.' },
    ],
  },
  {
    id: 'cargo', name: 'Cargorush', period: '2018~2021', color: '#8a6f0f',
    projects: [
      { id: 'g1', name: 'Global Import/Export', period: '2018~2021', tag: 'Logistics', company: 'Cargorush', desc_en: 'Sea/air import-export operations', desc_kr: '해상/항공 수출입 운영 관리', detail_en: 'Managed global sea/air import-export operations.', detail_kr: '글로벌 해상·항공 수출입 운영 관리.' },
      { id: 'g2', name: 'Customs & Clearance', period: '2018~2021', tag: 'Customs', company: 'Cargorush', desc_en: 'Customs clearance and compliance', desc_kr: '통관 및 규정 관리', detail_en: 'Handled customs clearance and FTA tariff benefits.', detail_kr: '세관 및 통관 이슈 대응, FTA 관세 혜택 담당.' },
      { id: 'g3', name: 'Warehouse Management', period: '2018~2021', tag: 'Operations', company: 'Cargorush', desc_en: 'Warehouse & inventory management', desc_kr: '창고 & 재고 관리', detail_en: 'Managed inbound/outbound and inventory.', detail_kr: '입출고 및 재고 관리.' },
    ],
  },
]

const domains = [
  {
    id: 'ecommerce', index: '01', color: '#185FA5', bgColor: '#E6F1FB',
    title_en: 'E-Commerce Platform', title_kr: 'E-Commerce 플랫폼',
    sub_en: '100+ plugins tested · Tax troubleshooting · 4 platform migrations',
    sub_kr: '플러그인 100개+ 테스트·운영 · Tax 트러블슈팅 · 4개 플랫폼 마이그레이션',
    tags: ['Shopify', 'WooCommerce', 'Cafe24', 'Odoo'],
    hlTags: ['Shopify', 'WooCommerce'],
    depth: 95,
    companies: ['KISS', 'Amoeba', 'Cafe24'],
    projectIds: ['k1', 'k6', 'a1', 'a2', 'c5', 'a10'],
  },
  {
    id: 'platform', index: '02', color: '#534AB7', bgColor: '#EEEDFE',
    title_en: 'Platform Development', title_kr: '플랫폼 개발 PM',
    sub_en: 'Product Testing & Marketing systems · v1 to v3 · Notification Messaging Service',
    sub_kr: '제품 테스트 & 마케팅 시스템 · v1~v3 · 알림메세지 서비스',
    tags: ['RT 1.0~3.0', 'BT 1.0~2.0', 'Marketplace', 'BOPIS', 'TalkTalk'],
    hlTags: ['RT 1.0~3.0', 'BT 1.0~2.0'],
    depth: 95,
    companies: ['KISS', 'Amoeba'],
    projectIds: ['k7', 'k8', 'k9', 'k10', 'k4', 'a7', 'a8', 'a9'],
  },
  {
    id: 'analytics', index: '03', color: '#185FA5', bgColor: '#E6F1FB',
    title_en: 'Data & Analytics', title_kr: '데이터 & 분석',
    sub_en: 'GA4 setup to dashboard · Multi-brand tracking',
    sub_kr: 'GA4 세팅부터 대시보드까지 · 멀티 브랜드 트래킹',
    tags: ['GA4', 'GTM', 'Power BI', 'Google Console'],
    hlTags: ['GA4', 'GTM'],
    depth: 90,
    companies: ['KISS', 'Amoeba', 'Cafe24'],
    projectIds: ['a3', 'a4', 'c6', 'c7', 'k11', 'k12'],
  },
  {
    id: 'integration', index: '04', color: '#854F0B', bgColor: '#FAEEDA',
    title_en: 'Integration & Logistics', title_kr: '연동 & 물류',
    sub_en: 'Tax automation · PG integration · 3PL logistics',
    sub_kr: '미국 판매세 자동화 · PG 연동 · 3PL 물류 연동',
    tags: ['AvaTax', 'ShipStation', 'Authorize.net'],
    hlTags: ['AvaTax', 'ShipStation'],
    depth: 95,
    companies: ['KISS', 'Amoeba', 'Cafe24'],
    projectIds: ['a5', 'a6', 'c8', 'c9', 'k13', 'k14'],
  },
]

const allProjects: Project[] = companies.flatMap(c => c.projects)

export default function Skills() {
  const { lang } = useLang()
  const isEN = lang === 'EN'
  const [tab, setTab] = useState<'projects' | 'tools'>('projects')
  const [viewMode, setViewMode] = useState<'company' | 'domain'>('domain')
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null)
  const [animatedSkills, setAnimatedSkills] = useState(false)

  useEffect(() => {
    if (tab === 'tools') setTimeout(() => setAnimatedSkills(true), 200)
    else setAnimatedSkills(false)
  }, [tab])

  useEffect(() => {
    document.body.style.overflow = selectedCompany ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedCompany])

  const t = (en: string, kr: string) => isEN ? en : kr
  const getDomainProjects = (domain: typeof domains[0]) =>
    domain.projectIds.map(id => allProjects.find(p => p.id === id)).filter(Boolean) as Project[]

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4FA' }}>
   <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E4ECF7; border-radius: 2px; }
        .company-card:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .domain-card:hover { border-color: #CBD5E1 !important; }
        .project-row:hover { background: #EBF3FF !important; }
        .view-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid #E4ECF7; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .15s; }
        .view-btn.active { background: #1A2235; border-color: #1A2235; }
   @media (max-width: 768px) {
  .domain-grid { grid-template-columns: 1fr !important; }
  .company-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .tools-grid { grid-template-columns: 1fr !important; }
  .tools-inner-grid { grid-template-columns: 1fr !important; }
  .profile-img-wrap { height: 280px !important; }
}
      `}</style>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '40px 32px 60px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#5B9CF6' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '3px' }}>SKILLS · PM-003</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#1A2235', letterSpacing: '-1px' }}>
            {t('Experience & Projects', '경력 및 프로젝트')}
          </h1>
        </div>

        {/* 탭 + 뷰 토글 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['projects', 'tools'] as const).map(tb => (
              <button key={tb} onClick={() => setTab(tb)} style={{
                padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: tab === tb ? '#1A2235' : '#fff',
                color: tab === tb ? '#fff' : '#64748B',
                boxShadow: tab === tb ? '0 2px 8px rgba(26,34,53,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                {tb === 'projects' ? t('Projects', '프로젝트') : t('Tools & Study', '툴 & 학습')}
              </button>
            ))}
          </div>
          {tab === 'projects' && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className={`view-btn ${viewMode === 'domain' ? 'active' : ''}`} onClick={() => setViewMode('domain')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2" width="14" height="3" rx="1.5" fill={viewMode === 'domain' ? '#fff' : '#9AAABB'} />
                  <rect x="1" y="7" width="14" height="3" rx="1.5" fill={viewMode === 'domain' ? '#fff' : '#9AAABB'} />
                  <rect x="1" y="12" width="14" height="3" rx="1.5" fill={viewMode === 'domain' ? '#fff' : '#9AAABB'} />
                </svg>
              </button>
              <button className={`view-btn ${viewMode === 'company' ? 'active' : ''}`} onClick={() => setViewMode('company')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill={viewMode === 'company' ? '#fff' : '#9AAABB'} />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill={viewMode === 'company' ? '#fff' : '#9AAABB'} />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill={viewMode === 'company' ? '#fff' : '#9AAABB'} />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill={viewMode === 'company' ? '#fff' : '#9AAABB'} />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* 회사별 뷰 */}
        {tab === 'projects' && viewMode === 'company' && (
          <div className="company-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {companies.map(company => (
              <div key={company.id} className="company-card" onClick={() => setSelectedCompany(company)}
                style={{ background: '#fff', borderRadius: '18px', padding: '22px', border: `1px solid ${company.color}25`, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: company.color, marginBottom: '4px' }}>{company.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', marginBottom: '20px' }}>{company.period}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#64748B' }}>{company.projects.length} {t('projects', '프로젝트')} →</div>
              </div>
            ))}
          </div>
        )}

        {/* 도메인별 뷰 */}
        {tab === 'projects' && viewMode === 'domain' && (
          <div>
            <div className="domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
              {domains.map(domain => (
                <div key={domain.id} className="domain-card"
                  style={{ background: '#fff', border: '0.5px solid #E4ECF7', borderRadius: '14px', padding: '18px', transition: 'border-color .2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB' }}>{domain.index}</span>
                    <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: domain.bgColor, color: domain.color, fontFamily: 'monospace' }}>
                      {getDomainProjects(domain).length} {t('projects', '프로젝트')}
                    </span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1A2235', marginBottom: '4px' }}>
                    {t(domain.title_en, domain.title_kr)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55, marginBottom: '12px' }}>
                    {t(domain.sub_en, domain.sub_kr)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                    {domain.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '12px', padding: '2px 8px', borderRadius: '99px',
                        border: `0.5px solid ${domain.hlTags.includes(tag) ? domain.color : '#E4ECF7'}`,
                        color: domain.hlTags.includes(tag) ? domain.color : '#64748B',
                        fontWeight: domain.hlTags.includes(tag) ? 500 : 400,
                      }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    {domain.companies.map(co => (
                      <span key={co} style={{ fontSize: '12px', padding: '1px 6px', borderRadius: '4px', background: '#F0F4FA', color: '#9AAABB', fontFamily: 'monospace' }}>{co}</span>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9AAABB', marginBottom: '4px', fontFamily: 'monospace' }}>
                      <span>{t('Depth', '경험')}</span><span>{domain.depth}%</span>
                    </div>
                    <div style={{ height: '3px', background: '#EDF0F7', borderRadius: '99px', width: '100%' }}>
                      <div style={{ height: '3px', borderRadius: '99px', background: domain.color, width: `${domain.depth}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 05 Brand — full width */}
            <div style={{ background: '#fff', border: '0.5px solid #E4ECF7', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB' }}>05</span>
                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: '#FBEAF0', color: '#993556', fontFamily: 'monospace' }}>
                  17 {t('brands', '브랜드')}
                </span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1A2235', marginBottom: '4px' }}>
                {t('Brand & Web Development', '브랜드 & 웹 개발')}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55, marginBottom: '14px' }}>
                {t('B2C·B2B stores · 13 brands · Overseas consulting', 'B2C·B2B 자사몰 · 13개 브랜드 · 해외 진출 컨설팅')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {[
                  { label: 'US', color: '#185FA5', brands: ['IVYUSA', 'Etlee', 'Arria', 'VIVACE', 'RED by KISS', 'iEnvy by KISS', 'Ruby Kiss EN', 'Ruby Kiss SP', 'VLuxe', 'Mad Shade', 'KISS Gel Pro', 'KissNYPro', 'Gold Finger'] },
                  { label: 'VN', color: '#0F6E56', brands: ['Lock & Lock', 'Coway', 'Solgar', 'CJ FOOD'] },
                ].map(region => (
                  <div key={region.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600, color: region.color, minWidth: '28px', paddingTop: '3px' }}>{region.label}</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {region.brands.map(brand => (
                        <span key={brand} style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '99px', border: '0.5px solid #E4ECF7', color: '#64748B' }}>{brand}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '12px' }}>
                {['KISS', 'Amoeba', 'Cafe24', 'Cargorush'].map(co => (
                  <span key={co} style={{ fontSize: '12px', padding: '1px 6px', borderRadius: '4px', background: '#F0F4FA', color: '#9AAABB', fontFamily: 'monospace' }}>{co}</span>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9AAABB', marginBottom: '4px', fontFamily: 'monospace' }}>
                  <span>{t('Depth', '경험')}</span><span>100%</span>
                </div>
                <div style={{ height: '3px', background: '#EDF0F7', borderRadius: '99px', width: '100%' }}>
                  <div style={{ height: '3px', borderRadius: '99px', background: '#993556', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools 탭 */}
        {tab === 'tools' && (
  <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 프로필 사진 */}
              <div className="profile-img-wrap" style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', overflow: 'hidden', width: '100%', height: '333px' }}>
                <img src="/profile.jpg" alt="Lisa" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E4ECF7', padding: '18px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1A2235', marginBottom: '4px' }}>Lisa</div>
                <div style={{ fontSize: '13px', color: '#5A6A85', lineHeight: 1.6 }}>IT Project Manager<br /><span style={{ color: '#5B9CF6' }}>AX Era</span> · Seoul</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[{ num: '6+', label: t('Years', '년 경력') }, { num: '4', label: t('Companies', '회사') }, { num: '30+', label: t('Projects', '프로젝트') }].map((s, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E4ECF7', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#1A2235', letterSpacing: '-0.5px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', color: '#9AAABB', marginTop: '3px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '24px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '20px' }}>SKILLS</p>
                {skills.map((skill, i) => (
                  <div key={skill.name} style={{ marginBottom: i === skills.length - 1 ? 0 : '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <span style={{ fontSize: '13px', color: '#475569' }}>{skill.name}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#5B9CF6', fontWeight: 600 }}>{skill.level}</span>
                    </div>
                    <div style={{ height: '4px', background: '#EDF0F7', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #5B9CF6, #A78BFA)', width: animatedSkills ? `${skill.level}%` : '0%', transition: `width 1.2s ease ${i * 0.1}s` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="tools-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '22px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '12px' }}>DEV TOOLS</p>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                    {[{ color: '#34D399', label: t('Done', '완료') }, { color: '#FB923C', label: t('Planned', '예정') }].map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color }} />
                        <span style={{ fontSize: '12px', color: '#9AAABB' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {devTools.map(tool => (
                      <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E4ECF7' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: tool.status === 'done' ? '#34D399' : '#FB923C', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#1A2235', flex: 1 }}>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E4ECF7', padding: '22px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', letterSpacing: '2px', marginBottom: '16px' }}>{t('STUDYING', '학습 중')}</p>
                  {studyItems.map(s => (
                    <div key={s.category_en} style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '12px', color: '#9AAABB', marginBottom: '8px', fontFamily: 'monospace' }}>{t(s.category_en, s.category_kr)}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {s.items.map(item => (
                          <span key={item.en} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '99px', background: '#F0F4FA', border: '1px solid #E4ECF7', color: '#475569' }}>
                            {t(item.en, item.kr)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 회사별 모달 */}
      {selectedCompany && createPortal(
        <div onClick={() => setSelectedCompany(null)} style={{ position: 'fixed', inset: 0, zIndex: 998, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,34,53,0.4)', backdropFilter: 'blur(8px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '600px', width: '90%', maxHeight: '75vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: selectedCompany.color, marginBottom: '2px' }}>{selectedCompany.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB' }}>{selectedCompany.period}</div>
              </div>
              <button onClick={() => setSelectedCompany(null)} style={{ padding: '7px 16px', borderRadius: '8px', background: '#F0F4FA', border: '1px solid #E4ECF7', color: '#64748B', fontSize: '13px', cursor: 'pointer' }}>
                {t('Close', '닫기')}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {selectedCompany.projects.map(project => (
                <div key={project.id} className="project-row"
                  onClick={() => setSelectedCompany(null)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E4ECF7', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: tagBg[project.tag] || '#F0F4FA', color: tagColors[project.tag] || '#888', border: `1px solid ${tagColors[project.tag] || '#888'}25`, whiteSpace: 'nowrap', marginTop: '2px', fontWeight: 500 }}>
                    {project.tag}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A2235', marginBottom: '3px' }}>{project.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{t(project.desc_en, project.desc_kr)}</div>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9AAABB', whiteSpace: 'nowrap', marginTop: '2px' }}>{project.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
