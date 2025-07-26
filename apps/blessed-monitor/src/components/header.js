import blessed from 'blessed';

export function createHeader(screen) {
  const header = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: 'cyan'
      }
    },
    content: '{bold}{cyan-fg}Claude Monitor{/cyan-fg}{/bold}',
    align: 'center',
    valign: 'middle'
  });

  return header;
}