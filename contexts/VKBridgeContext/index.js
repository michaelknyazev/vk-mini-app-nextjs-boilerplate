import { createContext, useEffect, useState, useContext } from 'react';
import { ScreenSpinner } from '@vkontakte/vkui';

import _log from '../../helpers/log';
import * as Errors from '../../config/errors';

import { ErrorContext } from '../ErrorContext';

import * as VKBridgeService from '../../services/vk.bridge';
import * as VKBridgeMockService from '../../services/vk.bridge.mock';

const VKBridgeContext = createContext();
const VKBridgeContextProvider = ({ children }) => {
  const { trigger } = useContext(ErrorContext);
  const _mode = (() => {
    if (typeof(window) === 'undefined') return process.env.MODE;
    const { props } = window.__NEXT_DATA__;
    const { __AppMode = 'production' } = props.pageProps;

    return __AppMode;
  })()
  const isProduction = _mode === 'production';
  
  const [VKUser, setVKUser] = useState({
    loading: true,
    data: {}
  });


  useEffect(() => {
    Value.bridge.VKWebAppInit().then(({ result }) => {
      if (!result) {
        setVKUser({ ...VKUser, loading: false });

        return trigger(Errors.BRIDGE_INIT);
      }

      Value.bridge.VKWebAppGetUserInfo().then(data => {
        if (data.error_type) {
          setVKUser({ ...VKUser, loading: false });

          return trigger(Errors.GET_VK_USER);
        }

        setVKUser({ loading: false, data });
      }).catch(() => {
        setVKUser({ ...VKUser, loading: false });

        return trigger(Errors.GET_VK_USER);
      })

    }).catch(() => {
      setVKUser({ ...VKUser, loading: false });

      return trigger(Errors.BRIDGE_INIT);
    })
  }, [])

  const Value = {
    bridge: isProduction ? VKBridgeService : VKBridgeMockService,
    //bridge: VKBridgeService,
    getVKUser: () => ({ ...VKUser.data })
  }

  _log.action('Render', 'Context', 'VKBridge')

  return (
    <VKBridgeContext.Provider value={Value}>
      {(() => {
        if (VKUser.loading) return <ScreenSpinner />;

        return children;
      })()}
    </VKBridgeContext.Provider>
  );
}

export {
  VKBridgeContext,
  VKBridgeContextProvider
}