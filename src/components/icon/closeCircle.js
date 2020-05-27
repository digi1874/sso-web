export const iconCloseCircle = {
  tagName: 'i',
  class: 'icon icon-close-circle',
  child: {
    tagName: 'svg',
    viewBox: '0 0 100 100',
    stroke: 'currentColor',
    child: [
      {
        tagName: 'circle',
        cx: '50',
        cy: '50',
        r: '40',
        fill: 'none',
        'stroke-width': '10'
      },
      {
        tagName: 'line',
        x1: '40',
        y1: '40',
        x2: '60',
        y2: '60',
        'stroke-width': '10',
        'stroke-linecap': 'round'
      },
      {
        tagName: 'line',
        x1: '60',
        y1: '40',
        x2: '40',
        y2: '60',
        'stroke-width': '10',
        'stroke-linecap': 'round'
      }
    ]
  }
}