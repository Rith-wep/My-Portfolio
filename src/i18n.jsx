import { useMemo, useState } from 'react'
import { I18nContext } from './i18n-context'
import { languages, translations } from './i18n-data'

function interpolate(value, params = {}) {
  return Object.entries(params).reduce(
    (text, [key, replacement]) => text.replaceAll(`{{${key}}}`, replacement),
    value,
  )
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const value = useMemo(() => {
    const dictionary = translations[language] ?? translations.en

    return {
      language,
      setLanguage,
      languages,
      t(path, params) {
        const value = path
          .split('.')
          .reduce((current, key) => current?.[key], dictionary)

        if (typeof value !== 'string') return value
        return interpolate(value, params)
      },
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
