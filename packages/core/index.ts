import tinycolor from 'tinycolor2';

const terminalRegex: RegExp = /Android|webOS|iPhone|iPod|BlackBerry/i;
const defaultColor: string = '#202a31';

const calculateNthChildByColumn = (col: number) => `
.floating-ball-popover-item:nth-child(${col}n + ${col}) {
  margin-right: 0;
}
`;
const calculateNthLastChildByColumn = (
  last: number
) => `.floating-ball-popover-item:nth-last-child(-n + ${last}) {
    margin-bottom: 0;
  }`;
class FloatBall {
  private theme: tinycolor.Instance;
  private column: number;
  private terminalType: 'mobile' | 'computer';
  private viewContentW: number;
  private viewContentH: number;
  private floatingBallParentEl: HTMLElement | null;
  private floatingBallBoxEl: HTMLElement | null;
  private popoverEl: HTMLElement | null;
  private range: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  private data: { isShow: boolean };
  private position: string;
  private canMove: boolean;

  constructor(
    theme?: tinycolor.ColorInput,
    position?: string,
    column?: number,
    canMove?: boolean
  ) {
    this.theme = color2Rgba(theme);
    this.column = Math.min(column ?? 2, 4);
    this.canMove = canMove ?? true;
    this.terminalType = terminalRegex.test(navigator.userAgent)
      ? 'mobile'
      : 'computer';
    this.viewContentW = window.screen.width;
    this.viewContentH =
      this.terminalType === 'computer'
        ? window.screen.height - 100
        : window.screen.height;
    this.floatingBallParentEl = null;
    this.floatingBallBoxEl = null;
    this.popoverEl = null;
    this.range = {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    };
    this.data = { isShow: false };
    this.position = position || 'bottom right';

    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onDocumentMouseEnter = this.onDocumentMouseEnter.bind(this);
    this.onDocumentMouseLeave = this.onDocumentMouseLeave.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onDocumentTouchStart = this.onDocumentTouchStart.bind(this);
    this.onDocumentTouchMove = this.onDocumentTouchMove.bind(this);
    this.onDocumentTouchEnd = this.onDocumentTouchEnd.bind(this);
  }
  bindEvents() {
    const _self = this;
    const floatingBallBoxEl = this.floatingBallBoxEl;
    if (floatingBallBoxEl) {
      floatingBallBoxEl.addEventListener(
        'mousedown',
        _self.onDocumentMouseDown,
        false
      );
      floatingBallBoxEl.addEventListener(
        'mouseenter',
        _self.onDocumentMouseEnter,
        false
      );
      floatingBallBoxEl.addEventListener(
        'mouseleave',
        _self.onDocumentMouseLeave,
        false
      );
      floatingBallBoxEl.addEventListener(
        'touchstart',
        _self.onDocumentTouchStart,
        false
      );
      floatingBallBoxEl.addEventListener(
        'touchmove',
        _self.onDocumentTouchMove,
        false
      );
      floatingBallBoxEl.addEventListener(
        'touchend',
        _self.onDocumentTouchEnd,
        false
      );
    }
    return this;
  }
  removeEvents() {
    const floatingBallBoxEl = this.floatingBallBoxEl;
    if (floatingBallBoxEl) {
      floatingBallBoxEl.removeEventListener(
        'mousedown',
        this.onDocumentMouseDown,
        false
      );
      floatingBallBoxEl.removeEventListener(
        'mouseenter',
        this.onDocumentMouseEnter,
        false
      );
      floatingBallBoxEl.removeEventListener(
        'mouseleave',
        this.onDocumentMouseLeave,
        false
      );
      floatingBallBoxEl.removeEventListener(
        'touchstart',
        this.onDocumentTouchStart,
        false
      );
      floatingBallBoxEl.removeEventListener(
        'touchmove',
        this.onDocumentTouchMove,
        false
      );
      floatingBallBoxEl.removeEventListener(
        'touchend',
        this.onDocumentTouchEnd,
        false
      );
    }
    return this;
  }
  render() {
    this.removeEvents();
    this.bindEvents();
    this.floatingBallBoxEl?.appendChild(this.nodeToFragment('init'));
    this.initBallByPosition(this.position);
    const [row, col, children] = this.getRowAndCol();
    removeStyleElByID();
    injectCssByColumn(col, children);
    return this;
  }
  setTheme(theme: tinycolor.ColorInput) {
    this.theme = color2Rgba(theme);
    return this;
  }
  setPosition(position: string) {
    this.position = position;
    return this;
  }
  setColumn(column: number) {
    this.column = Math.min(column ?? this.column, 4);
    return this;
  }
  setCanMove(move: boolean) {
    this.canMove = move;
    return this;
  }
  getRowAndCol() {
    const popoverNode = this.popoverEl as HTMLElement;
    if (!popoverNode) {
      return [0, this.column, 0];
    }
    const popoverChildrenNum = popoverNode.children.length || 1;
    return [
      Math.ceil(popoverChildrenNum / this.column),
      this.column,
      popoverChildrenNum,
    ];
  }
  getRgbaColor(alpha?: number): string {
    this.theme.setAlpha(alpha ?? 0.7);
    return this.theme.toString();
  }
  setFloatingBallParentEl(floatingBallParentEl: HTMLElement | null) {
    this.floatingBallParentEl = floatingBallParentEl;
  }
  setFloatingBallBoxEl(floatingBallBoxEl: HTMLElement | null) {
    this.floatingBallBoxEl = floatingBallBoxEl;
  }
  setPopoverEl(popoverEl: HTMLElement | null) {
    this.popoverEl = popoverEl;
  }
  collectAllEls({
    floatingBallParentEl,
    floatingBallBoxEl,
    popoverEl,
  }: {
    floatingBallParentEl: HTMLElement | null;
    floatingBallBoxEl: HTMLElement | null;
    popoverEl: HTMLElement | null;
  }) {
    this.setFloatingBallParentEl(floatingBallParentEl);
    this.setFloatingBallBoxEl(floatingBallBoxEl);
    this.setPopoverEl(popoverEl);
    return this;
  }
  // 创建DocumentFragment
  private nodeToFragment(eventType: 'up' | 'down' | 'init'): DocumentFragment {
    const _self = this;
    let scaleValue = eventType === 'down' ? 'scale(1.2, 1.2)' : 'scale(1, 1)';
    let opacity = eventType === 'down' ? 0.3 : 0.1;
    let flag = document.createDocumentFragment();
    const node = this.floatingBallBoxEl as HTMLElement;
    let child = node.firstElementChild;

    while (child) {
      addStyle(child);
      flag.appendChild(child);
      child = node.firstElementChild;
    }

    function addStyle(node: Element) {
      // 判断节点类型
      if (node.nodeType === 1) {
        node.setAttribute(
          'style',
          `transform: ${scaleValue};background-color: ${_self.getRgbaColor(
            (opacity += 0.1)
          )}`
        );
      }
    }
    return flag;
  }
  private updateRange() {
    this.range = {
      minX: 0,
      maxX:
        this.viewContentW -
        ((this.floatingBallParentEl as HTMLElement)?.offsetWidth ?? 0),
      minY: 0,
      maxY:
        this.viewContentH -
        ((this.floatingBallParentEl as HTMLElement).offsetHeight ?? 0),
    };
  }
  // ballPopover当前位置
  private currentBallPopover() {
    const floatingballParent = this.floatingBallParentEl as HTMLElement;
    const popoverNode = this.popoverEl as HTMLElement;
    const range = this.range;
    const data = this.data;
    let nearThresholdY = this.viewContentH * 0.15;
    let nearThresholdX = this.viewContentW * 0.15;
    let [row, col] = this.getRowAndCol();
    const floatingBallW = 56;
    const floatingBallHalfW = floatingBallW / 2;
    const popoverBoxW = 24 + 60 * col + 32 * (col - 1);
    const popoverBoxHalfW = popoverBoxW / 2;
    const popoverBoxH = 24 + 76 * row + 4 * (row - 1);
    const popoverBoxHalfH = popoverBoxH / 2;
    const radiusOffset = (1 - 1 / Math.sqrt(2)) * (32 + floatingBallHalfW);

    if (data.isShow) {
      popoverNode.style.width = `${popoverBoxW - 24}px`;
      popoverNode.style.background = this.getRgbaColor(0.65);
    }
    popoverNode.style.transform = data.isShow ? 'scale(1, 1)' : 'scale(0, 0)';
    this.updateRange();

    let floatingballParentTop = removePX(floatingballParent.style.top);
    let floatingballParentLeft = removePX(floatingballParent.style.left);

    if (floatingballParentTop < range.minY + nearThresholdY) {
      if (
        floatingballParentLeft > range.minX + nearThresholdX &&
        floatingballParentLeft < range.maxX - nearThresholdX
      ) {
        popoverNode.style.top = `${floatingBallW}px`;
        popoverNode.style.left = `${-(popoverBoxHalfW - floatingBallHalfW)}px`;
        popoverNode.style.transformOrigin = '50% 0';
      } else if (floatingballParentLeft < range.minX + nearThresholdX) {
        popoverNode.style.top = `${floatingBallW - radiusOffset}px`;
        popoverNode.style.left = `${floatingBallW - radiusOffset}px`;
        popoverNode.style.transformOrigin = '0 0';
      } else {
        popoverNode.style.top = `${floatingBallW - radiusOffset}px`;
        popoverNode.style.left = `${-(popoverBoxW - radiusOffset)}px`;
        popoverNode.style.transformOrigin = '100% 0';
      }
    }
    if (floatingballParentTop > range.maxY - nearThresholdY) {
      if (
        floatingballParentLeft > range.minX + nearThresholdX &&
        floatingballParentLeft < range.maxX - nearThresholdX
      ) {
        popoverNode.style.top = `${-popoverBoxH}px`;
        popoverNode.style.left = `${-(popoverBoxHalfW - floatingBallHalfW)}px`;
        popoverNode.style.transformOrigin = '50% 100%';
      } else if (floatingballParentLeft < range.minX + nearThresholdX) {
        popoverNode.style.top = `${-(popoverBoxH - radiusOffset)}px`;
        popoverNode.style.left = `${floatingBallW - radiusOffset}px`;
        popoverNode.style.transformOrigin = '0 100%';
      } else {
        popoverNode.style.top = `${-(popoverBoxH - radiusOffset)}px`;
        popoverNode.style.left = `${-(popoverBoxW - radiusOffset)}px`;
        popoverNode.style.transformOrigin = '100% 100%';
      }
    }
    if (
      floatingballParentTop > range.minY + nearThresholdY &&
      floatingballParentTop < range.maxY - nearThresholdY
    ) {
      if (floatingballParentLeft < range.minX + nearThresholdX) {
        popoverNode.style.top = `${-(popoverBoxHalfH - floatingBallHalfW)}px`;
        popoverNode.style.left = `${floatingBallW}px`;
        popoverNode.style.transformOrigin = '0 50%';
      } else if (floatingballParentLeft > range.maxX - nearThresholdX) {
        popoverNode.style.top = `${-(popoverBoxHalfH - floatingBallHalfW)}px`;
        popoverNode.style.left = `${-popoverBoxW}px`;
        popoverNode.style.transformOrigin = '100% 50%';
      } else {
        popoverNode.style.top = `${-(popoverBoxHalfH - floatingBallHalfW)}px`;
        popoverNode.style.left = `${floatingBallW}px`;
        popoverNode.style.transformOrigin = '0 50%';
      }
    }
  }
  // 初始化位置
  private initBallByPosition(position: string) {
    this.updateRange();
    const { minX, maxX, minY, maxY } = this.range;
    const floatingballParent = this.floatingBallParentEl as HTMLElement;
    const viewContentW = this.viewContentW;
    const viewContentH = this.viewContentH;
    let positionArr = position.split(' ');
    let defaultOffsetMinX = minX + 7 + 'px';
    let defaultOffsetMaxX = maxX - 7 + 'px';
    let defaultOffsetMinY = minY + 7 + 'px';
    let defaultOffsetMaxY = maxY - 7 + 'px';

    for (let i = 0; i < positionArr.length; i++) {
      switch (positionArr[i]) {
        case 'top':
          floatingballParent.style.top = defaultOffsetMinY;
          break;
        case 'bottom':
          floatingballParent.style.top = defaultOffsetMaxY;
          break;
        case 'left':
          floatingballParent.style.left = defaultOffsetMinX;
          break;
        case 'right':
          floatingballParent.style.left = defaultOffsetMaxX;
          break;
        default:
          handleNumber(i, positionArr[i]);
      }
    }

    function handleNumber(index: number, positionNum: any) {
      let halfBoxWidth = floatingballParent.offsetWidth / 2;
      let halfBoxHeight = floatingballParent.offsetHeight / 2;

      positionNum = Number(positionNum);
      if (index === 0) {
        if (positionNum > 0 && positionNum < 95) {
          floatingballParent.style.top =
            (viewContentH * positionNum) / 100 - halfBoxHeight + 'px';
        } else if (positionNum <= 0) {
          floatingballParent.style.top = defaultOffsetMinY;
        } else {
          floatingballParent.style.top = defaultOffsetMaxY;
        }
      } else {
        if (positionNum > 0 && positionNum < 95) {
          floatingballParent.style.left =
            (viewContentW * positionNum) / 100 - halfBoxWidth + 'px';
        } else if (positionNum <= 0) {
          floatingballParent.style.left = defaultOffsetMinX;
        } else {
          floatingballParent.style.left = defaultOffsetMaxX;
        }
      }
    }

    this.currentBallPopover();
  }
  // 获取最新坐标
  private getPresentPosition(event: MouseEvent | Touch) {
    const floatingBallParentEl = this.floatingBallParentEl as HTMLElement;
    let presentX = event.clientX - floatingBallParentEl.offsetWidth / 2;
    let presentY = event.clientY - floatingBallParentEl.offsetHeight / 2;

    this.updateRange();

    if (event.clientX <= this.range.minX) {
      presentX = this.range.minX;
    }
    if (event.clientX >= this.range.maxX) {
      presentX = this.range.maxX;
    }
    if (event.clientY <= this.range.minY) {
      presentY = this.range.minY;
    }
    if (event.clientY >= this.range.maxY) {
      presentY = this.range.maxY;
    }

    return { presentX, presentY };
  }
  // 关闭popover
  close() {
    const data = this.data;
    const popoverEl = this.popoverEl as HTMLElement;
    data.isShow = ((popoverEl.style.transform = 'scale(0, 0)'), false);
    this.floatingBallBoxEl?.appendChild(this.nodeToFragment('up'));
  }

  // PC端
  onDocumentMouseDown(event: MouseEvent) {
    event?.preventDefault();
    const _self = this;
    _self.data.isShow = !_self.data.isShow;
    _self.currentBallPopover();

    _self.floatingBallBoxEl?.appendChild(_self.nodeToFragment('down'));

    _self.canMove &&
      document.addEventListener('mousemove', _self.onDocumentMouseMove, false);
    _self.floatingBallBoxEl?.addEventListener(
      'mouseup',
      _self.onDocumentMouseUp,
      false
    );
  }

  onDocumentMouseMove(event: MouseEvent) {
    event?.preventDefault();
    const _self = this;
    const data = _self.data;
    const popoverEl = _self.popoverEl as HTMLElement;
    const floatingBallParentEl = _self.floatingBallParentEl as HTMLElement;

    data.isShow = ((popoverEl.style.transform = 'scale(0, 0)'), false);
    let presentPosition = this.getPresentPosition(event);

    floatingBallParentEl.style.left = presentPosition.presentX + 'px';
    floatingBallParentEl.style.top = presentPosition.presentY + 'px';
  }

  onDocumentMouseEnter(event: MouseEvent) {
    event?.preventDefault();
    this.floatingBallBoxEl?.appendChild(this.nodeToFragment('down'));
  }

  onDocumentMouseLeave(event: MouseEvent) {
    event?.preventDefault();
    this.floatingBallBoxEl?.appendChild(this.nodeToFragment('up'));
  }

  onDocumentMouseUp(event: MouseEvent) {
    event?.preventDefault();
    const _self = this;
    _self.floatingBallBoxEl?.appendChild(_self.nodeToFragment('up'));
    _self.canMove &&
      document.removeEventListener(
        'mousemove',
        _self.onDocumentMouseMove,
        false
      );
    _self.floatingBallBoxEl?.removeEventListener(
      'mouseup',
      _self.onDocumentMouseUp,
      false
    );
  }

  // 移动端
  onDocumentTouchStart(event: TouchEvent) {
    event?.preventDefault();
    const _self = this;
    const data = _self.data;
    const floatingBallParentEl = _self.floatingBallParentEl as HTMLElement;

    data.isShow = !data.isShow;

    _self.currentBallPopover();

    _self.floatingBallBoxEl?.appendChild(_self.nodeToFragment('down'));

    if (_self.canMove) {
      let touch = event.touches[0];
      let presentPosition = _self.getPresentPosition(touch);

      floatingBallParentEl.style.left = presentPosition.presentX + 'px';
      floatingBallParentEl.style.top = presentPosition.presentY + 'px';
    }
  }

  onDocumentTouchMove(event: TouchEvent) {
    event?.preventDefault();
    const _self = this;
    const data = _self.data;
    const popoverEl = _self.popoverEl as HTMLElement;
    const floatingBallParentEl = _self.floatingBallParentEl as HTMLElement;

    data.isShow = ((popoverEl.style.transform = 'scale(0, 0)'), false);

    if (_self.canMove) {
      let touch = event.touches[0];
      let presentPosition = this.getPresentPosition(touch);

      floatingBallParentEl.style.left = presentPosition.presentX + 'px';
      floatingBallParentEl.style.top = presentPosition.presentY + 'px';
    }
  }

  onDocumentTouchEnd(event: TouchEvent) {
    event?.preventDefault();
    this.floatingBallBoxEl?.appendChild(this.nodeToFragment('up'));
  }
}

// 将16进制的颜色值转化为rgb的十进制格式，并返回十进制值
function color2Rgba(presentColor?: tinycolor.ColorInput): tinycolor.Instance {
  const color = tinycolor(presentColor);
  const validColor = color.isValid();
  if (!validColor) {
    return tinycolor(defaultColor);
  }
  return color;
}

function removePX(value: string) {
  return Number(value.replace(/px/, ''));
}

const StyleID = 'floatingball-POPOVER-style';
function styleInject(css: string) {
  if (!css || typeof document === 'undefined') {
    return;
  }

  let head = document.head || document.getElementsByTagName('head')[0];
  let style: any = document.createElement('style');
  style.type = 'text/css';
  style.id = StyleID;

  head.appendChild(style);
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return style;
}

function getStyleElByID(id: string = StyleID) {
  return document.getElementById(id);
}

function removeStyleElByID(id: string = StyleID) {
  const styleEl = getStyleElByID(id);
  if (styleEl) {
    styleEl.remove();
  }
}

function injectCssByColumn(column: number, children: number) {
  const css = `${calculateNthChildByColumn(
    column
  )}${calculateNthLastChildByColumn(children % column)}`;
  return styleInject(css);
}

export default FloatBall;
