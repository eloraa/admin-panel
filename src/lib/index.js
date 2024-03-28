/**
 * Adds scroll to a child element.
 *
 * @param {HTMLElement} childElement the element to add scroll to
 * @return {boolean | number} `height` if the child element is scrollable
 */
export const addScroll = childElement => {
  const parent = childElement.parentElement;
  const exceeds = childElement.scrollWidth > parent.clientWidth;
  const leftButton = parent.querySelector('.left');
  const rightButton = parent.querySelector('.right');
  let bindEvent;

  const isScrollable = childElement.scrollWidth > childElement.clientWidth;

  if (exceeds && isScrollable) {
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    const handleDrag = e => {
      if (!isMouseDown) return;
      const x = e.pageX - startX;
      childElement.scrollLeft = scrollLeft - x;
      updateButtonVisibility();
    };

    const handleMouseUp = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
      childElement.style.removeProperty('cursor');
      childElement.style.removeProperty('user-select');
    };
    bindEvent = e => {
      isMouseDown = true;
      startX = e.pageX;
      scrollLeft = childElement.scrollLeft;

      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleMouseUp);
      childElement.style.cursor = 'grabbing';
      childElement.style.userSelect = 'none';
    };

    childElement.addEventListener('mousedown', bindEvent);

    leftButton.addEventListener('click', () => {
      childElement.scrollBy({
        left: -60,
        behavior: 'smooth',
      });
      updateButtonVisibility();
    });

    rightButton.addEventListener('click', () => {
      childElement.scrollBy({
        left: 60,
        behavior: 'smooth',
      });
      updateButtonVisibility();
    });

    const updateButtonVisibility = () => {
      const maxScroll = childElement.scrollWidth - childElement.clientWidth;

      leftButton.style.opacity = childElement.scrollLeft > 0 ? 1 : 0;
      rightButton.style.opacity = childElement.scrollLeft < maxScroll ? 1 : 0;

      leftButton.style.pointerEvents = childElement.scrollLeft > 0 ? 'auto' : 'none';
      rightButton.style.pointerEvents = childElement.scrollLeft < maxScroll ? 'auto' : 'none';
    };

    updateButtonVisibility();
  }

  if (!isScrollable) {
    childElement.removeEventListener('mousedown', bindEvent);
    leftButton.style.opacity = 0;
    leftButton.style.pointerEvents = 'none';
    rightButton.style.opacity = 0;
    rightButton.style.pointerEvents = 'none';
  } else {
    rightButton.parentElement && (rightButton.parentElement.parentElement.height = childElement.clientHeight);
    rightButton.style.opacity = 1;
    rightButton.style.pointerEvents = 'auto';
  }

  window.addEventListener('resize', () => addScroll(childElement), { once: true });

  return isScrollable ? childElement.clientHeight : false;
};
export const stringEndWith = (string, value) => {
  if (typeof value === 'string') return string.endsWith(value);
  if (Array.isArray(value)) return value.some(v => string.endsWith(v));
  return false;
};

export const copyToClipboard = text => {
  return new Promise(async resolve => {
    try {
      await navigator.clipboard.writeText(text);
      resolve(true);
    } catch {
      resolve(false);
    }
  });
};
