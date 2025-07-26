import blessed from 'blessed';

export function createEventList(screen) {
  const eventList = blessed.box({
    parent: screen,
    label: ' Events ',
    tags: true,
    scrollable: true,
    alwaysScroll: true,
    mouse: true,
    keys: true,
    vi: true,
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'cyan'
      },
      style: {
        inverse: true
      }
    },
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: 'cyan'
      },
      label: {
        fg: 'white',
        bold: true
      }
    },
    padding: {
      left: 1,
      right: 1
    }
  });

  // Enable mouse wheel scrolling
  eventList.on('wheeldown', () => {
    eventList.scroll(3);
    screen.render();
  });

  eventList.on('wheelup', () => {
    eventList.scroll(-3);
    screen.render();
  });

  // Focus handling for keyboard scrolling
  eventList.on('focus', () => {
    eventList.style.border.fg = 'yellow';
    screen.render();
  });

  eventList.on('blur', () => {
    eventList.style.border.fg = 'cyan';
    screen.render();
  });

  return eventList;
}