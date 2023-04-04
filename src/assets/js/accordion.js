export class Accordion {
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
