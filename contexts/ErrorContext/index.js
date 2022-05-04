import { createContext, useState } from 'react';

import * as Error from '../../config/errors';

import ErrorMessage from '../../components/features/Error/components/Message';

import _log from '../../helpers/log';

const ErrorContext = createContext();
const ErrorContextProvider = ({ children }) => {
  const isSignCheckFailed = (() => {
    if (typeof(window) === 'undefined') return true;

    const { props } = window.__NEXT_DATA__;
    const { __signCheckFailed = false } = props.pageProps;

    return __signCheckFailed;
  })();
  const [error, setError] = useState(isSignCheckFailed ? Error.CHECK_SIGN : null);

  const Value = {
    trigger: (error) => setError(error)
  };

  _log.action('Render', 'Context', 'Error')

  return (
    <ErrorContext.Provider value={Value}>
      {(() => {
        if (error) {
          return <ErrorMessage {...error} />;
        }

        return children;
      })()}
    </ErrorContext.Provider>
  );
}

export {
  ErrorContext,
  ErrorContextProvider
}