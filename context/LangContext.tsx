'use client'

import { createContext, useContext, useState } from 'react'

type Lang = 'EN' | 'KR'

const LangContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
}>({
  lang: 'EN',
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN')
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

