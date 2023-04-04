/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/accordion.js":
/*!************************************!*\
  !*** ./src/assets/js/accordion.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accordion": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  constructor(element) {
    this.element = element;
    this.items = this.element.querySelectorAll('.flx-accordion__item');
    this.collapsed = this.element.getAttribute('data-collapsed');
    this.init();
    window.addEventListener('orientationchange', () => {
      this.reset();
    });
  }
  init() {
    this.items.forEach(item => {
      const button = item.querySelector('.flx-accordion__button');
      const collapse = item.querySelector('.flx-accordion__collapse');
      this.resetItemState(item, button, collapse);
      button.addEventListener('click', () => {
        this.toggleItemState(item, button, collapse);
      });
    });
  }
  resetItemState(item, button, collapse) {
    button.setAttribute('aria-expanded', 'false');
    collapse.classList.remove('show');
    item.classList.remove('show');
    collapse.style.height = null;
  }
  toggleItemState(item, button, collapse) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', `${!isExpanded}`);
    item.classList.toggle('show');
    collapse.classList.toggle('show');
    if (collapse.style.height) {
      collapse.style.height = null;
    } else {
      collapse.style.height = `${collapse.scrollHeight}px`;
    }
    if (this.collapsed === 'true') {
      this.collapseAllItems(item);
    }
  }
  collapseAllItems(currentItem) {
    this.items.forEach(item => {
      if (item !== currentItem) {
        const button = item.querySelector('.flx-accordion__button');
        const collapse = item.querySelector('.flx-accordion__collapse');
        this.resetItemState(item, button, collapse);
      }
    });
  }
  reset() {
    this.items.forEach(item => {
      const button = item.querySelector('.flx-accordion__button');
      const collapse = item.querySelector('.flx-accordion__collapse');
      this.resetItemState(item, button, collapse);
    });
  }
}

/***/ }),

/***/ "./src/lib/lazy-loading.js":
/*!*********************************!*\
  !*** ./src/lib/lazy-loading.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLazyLoad": () => (/* binding */ addLazyLoad)
/* harmony export */ });
const LAZY = 'lazy';
const lazyCssSelector = '.' + LAZY;
const LAZY_LOADED = 'lazy--loaded';
const LAZY_ANIMATED = 'lazy--animated';
const LAZY_FINISHED = 'lazy--finished';
const toPathName = url => {
  let result;
  try {
    result = new URL(url).pathname;
  } catch {
    result = url;
  }
  return result;
};
const loadingFinished = image => {
  image.classList.add(LAZY_FINISHED);
  image.classList.add(LAZY_ANIMATED);
  image.classList.add(LAZY_LOADED);
  image.classList.remove(LAZY);
  const onloadEvent = new CustomEvent('imageLazyLoaded', {
    detail: image
  });
  window.dispatchEvent(onloadEvent);
  image.classList.remove(LAZY_LOADED);
};
const animateLazyLoaded = lazyLoadedAnimationEvent => {
  const target = lazyLoadedAnimationEvent.target;
  if (!target.classList.contains(LAZY_ANIMATED)) {
    return;
  }
  setTimeout(() => {
    target.classList.remove(LAZY_FINISHED);
  }, 10);
  target.classList.remove(LAZY_ANIMATED);
};
const hasElementParameter = (element, parameter) => {
  const source = element.querySelector('source');
  if (source) {
    return source.hasAttribute(parameter);
  }
  return element.hasAttribute(parameter);
};
const getElementParameter = (element, parameter) => {
  const source = element.querySelector('source');
  if (source) {
    return source.getAttribute(parameter);
  }
  return element.getAttribute(parameter);
};
const onLoadEventEmitter = onloadEvent => {
  const target = onloadEvent.target;
  const pathNameBySrc = toPathName(getElementParameter(target, 'src'));
  const pathNameByDataSrc = toPathName(getElementParameter(target, 'data-src'));
  const targetSrcset = getElementParameter(target, 'srcset');
  const targetDataSrcset = getElementParameter(target, 'data-srcset');
  const isLoadedBySrc = hasElementParameter(target, 'data-src') && pathNameByDataSrc === pathNameBySrc;
  const isLoadedBySrcset = hasElementParameter(target, 'data-srcset') && targetDataSrcset === targetSrcset;
  const isNotLoaded = !(isLoadedBySrc || isLoadedBySrcset);
  if (isNotLoaded) {
    return;
  }
  loadingFinished(target);
};
const lazyLoadImages = image => {
  image.onload = onLoadEventEmitter;
  if (image.dataset.src) {
    image.src = image.dataset.src;
  }
  if (image.dataset.srcset) {
    image.srcset = image.dataset.srcset;
  }
  const video = image.closest('video');
  if (!video) {
    return;
  }
  for (let source in video.children) {
    const videoSource = video.children[source];
    if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
      videoSource.src = videoSource.dataset.src;
    }
  }
  video.onloadeddata = onLoadEventEmitter;
  video.load();
};
function addLazyLoad() {
  document.addEventListener('DOMContentLoaded', function () {
    // TODO: set to CustomEvent
    window.addEventListener('transitionend', animateLazyLoaded);
    const lazyloadImages = document.querySelectorAll(lazyCssSelector);
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        const image = entry.target;
        lazyLoadImages(image);
        imageObserver.unobserve(image);
      });
    }, {
      rootMargin: '30%'
    });
    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/autoload.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_lazy_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/lazy-loading */ "./src/lib/lazy-loading.js");
/* harmony import */ var _src_assets_js_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/assets/js/accordion */ "./src/assets/js/accordion.js");


class AutoLoad {
  constructor() {
    this.accordions = document.querySelectorAll('.flx-accordion');
    this.init();
    (0,_lib_lazy_loading__WEBPACK_IMPORTED_MODULE_0__.addLazyLoad)();
  }
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.accordions.forEach(accordion => {
        new _src_assets_js_accordion__WEBPACK_IMPORTED_MODULE_1__.Accordion(accordion);
      });
    });
  }
}
new AutoLoad();
})();

/******/ })()
;
//# sourceMappingURL=autoload.js.map