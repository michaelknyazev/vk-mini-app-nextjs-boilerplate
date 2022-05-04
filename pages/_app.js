import '../styles/globals.scss'

import { useEffect, useState } from 'react';
import { AppRoot, ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";

import _log from '../helpers/log';

import { EventContextProvider } from '../contexts/EventContext'

import DefaultGlobalLayout from '../components/layouts/DefaultGlobalLayout'
import DefaultPageLayout from '../components/layouts/DefaultPageLayout'

import { TranslationContextProvider } from '../contexts/TranslationContext';
import { ApiRoutesContextProvider } from '../contexts/ApiRoutesContext';
import { VKBridgeContextProvider } from '../contexts/VKBridgeContext'
import { ErrorContextProvider } from '../contexts/ErrorContext';

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  const GlobalLayout = Component.GlobalLayout || DefaultGlobalLayout
  const PageLayout = Component.PageLayout || DefaultPageLayout

  useEffect(() => {
    setLoading(false);
  }, []);

  _log.action('Render', 'Component', 'App')

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <ErrorContextProvider>
            <ApiRoutesContextProvider>
              <TranslationContextProvider>
                <EventContextProvider>
                  <VKBridgeContextProvider>
                      <GlobalLayout>
                        <PageLayout>
                          <Component {...pageProps} />
                        </PageLayout>
                      </GlobalLayout>
                  </VKBridgeContextProvider>
                </EventContextProvider>
              </TranslationContextProvider>
            </ApiRoutesContextProvider>
          </ErrorContextProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
