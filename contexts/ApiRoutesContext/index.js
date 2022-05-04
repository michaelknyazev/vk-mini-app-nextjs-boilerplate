import { createContext } from 'react';
import { GetEnvNames } from '../../services';

import getValuesFromSourceByKeys from '../../helpers/getValuesFromSourceByKeys';
import _log from '../../helpers/log';

const ApiRoutesContext = createContext({});
const ApiRoutesContextProvider = ({ children }) => {
  const routes = (() => {
    if (typeof(window) != 'undefined') {
      const { props } = window.__NEXT_DATA__;
      const { __ApiRoutes } = props.pageProps;

      if (!__ApiRoutes) return console.warn("No API routes was registered on Client.");
  
      return __ApiRoutes;
    }

    return getValuesFromSourceByKeys(GetEnvNames(), process.env);
  })()

  const Value = {
    __call: (Service, method, data = {}) => {
      if (typeof(Service) === 'string') throw new Error(`Service can't be a string`);
      if (typeof(method) === 'string') throw new Error(`Method can't be a string`);

      const API_ROUTE = Service.ENV_NAME && routes[Service.ENV_NAME];

      if (!API_ROUTE) return method({ ...data });

      return method(routes[Service.ENV_NAME], { ...data });
    },
  }

  _log.action('Render', 'Context', 'APIRoutes')

  return (
    <ApiRoutesContext.Provider value={Value}>
      {children}
    </ApiRoutesContext.Provider>
  );
}

export {
  ApiRoutesContext,
  ApiRoutesContextProvider
}