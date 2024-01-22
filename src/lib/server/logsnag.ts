import { LOGSNAG_API_KEY } from '$env/static/private';
import { LogSnag } from 'logsnag';

export const logsnag = new LogSnag({
  token: LOGSNAG_API_KEY,
  project: 'snippetry'
});
