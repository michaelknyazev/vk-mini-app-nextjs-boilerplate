import { createContext, useState } from 'react';

import _log from '../../helpers/log';

import Translations from '../../config/i18n';

const TranslationContext = createContext({});
const TranslationContextProvider = ({ children }) => {
  const [lang, setLang] = useState({
    current: 'ruRU',
    available: Object.keys(Translations)
  });

  const Value = {
    getCurrent: () => lang.current,
    getAvailable: () => lang.available,
    setCurrent: key => setLang({ ...lang, current: key }),
    translate: key => {
      const _current = Translations[lang.current];

      if (_current) return _current[key] || 'UNDEFINED';

      return 'UNDEFINED';
    }
  }

  _log.action('Render', 'Context', 'Translation')

  return (
    <TranslationContext.Provider value={Value}>
      {children}
    </TranslationContext.Provider>
  );
}

export {
  TranslationContext,
  TranslationContextProvider
}