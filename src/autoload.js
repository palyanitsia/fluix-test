import {addLazyLoad} from "./lib/lazy-loading";
import {Accordion} from "../src/assets/js/accordion";

class AutoLoad {
  constructor() {
	this.accordions = document.querySelectorAll('.flx-accordion');

	this.init();
	addLazyLoad();
  }

  init() {
	document.addEventListener('DOMContentLoaded', () => {
	  this.accordions.forEach(accordion => {
		new Accordion(accordion);
	  })
	})
  }
}

new AutoLoad();
