import { Signale } from 'signale';

const dfOptions = {
  disabled: false,
  interactive: false,
  stream: process.stdout,
  scope: 'Express Boot',
  config: {
    displayDate: true,
    displayTimestamp: true,
    uppercaseLabel: true,
  },
  types: {
    remind: {
      badge: '**',
      color: 'yellow',
      label: 'reminder',
    },
    santa: {
      badge: '🎅',
      color: 'red',
      label: 'santa',
    },
  },
};

const log = new Signale(dfOptions);

export { log };
