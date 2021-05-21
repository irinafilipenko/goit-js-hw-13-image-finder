import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function onFetchError() {
  error({
    text: 'Please enter a valid request',
  });
}

export { onFetchError };
