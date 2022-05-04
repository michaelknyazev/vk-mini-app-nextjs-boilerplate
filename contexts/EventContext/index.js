import { createContext, useContext, useState } from 'react';
import { Snackbar } from '@vkontakte/vkui';
import * as Events from '../../config/events';

import _log from '../../helpers/log';
import { TranslationContext } from '../TranslationContext';

const EventContext = createContext();
const EventContextProvider = ({ children }) => {
  const [item, setItem] = useState()
  const { translate } = useContext(TranslationContext);

  const _addEvent = (event) => setItem(event);

  const Event = {
    addEvent: (eventId, props = {}) => {
      const _event = Events[eventId] || Events['FRONTEND_ERROR_EVENTMISSING'];
      const { message } = _event;

      return _addEvent({ ..._event, ...props, message: translate(message) });
    }
  };

  _log.action('Render', 'Context', 'Event')

  return (
    <EventContext.Provider value={Event}>
      {children}
      {(() => {
        if (item) {
          return (
            <Snackbar key={`${item.event}`} onClose={() => setItem()} {...item}>
              {item.message}
            </Snackbar>
          );
        }
      })()}
    </EventContext.Provider>
  );
}

export {
  EventContext,
  EventContextProvider
}