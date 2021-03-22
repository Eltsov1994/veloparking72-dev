function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};


//BildSlider

function swiperBuild() {
	let sliders = document.querySelectorAll('._swiper');
	if (sliders) {
		for (let index = 0; index < sliders.length; index++) {
			let slider = sliders[index];
			//if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
			//}
			if (slider.classList.contains('_gallery')) {
				//slider.data('lightGallery').destroy(true);
			}
		}
		sliders_bild_callback();
	}
}
swiperBuild();

//function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }


//РИСУЕМ DOTS
function paggingDots(classSlider, classDots) {
	let slider = document.querySelector('.' + classSlider);
	let dots = document.createElement('div');

	dots.classList.add(classDots);
	slider.appendChild(dots);
}

//РИСУЕМ ARROWS
function paggingArrows(classSlider) {
	let sliders = document.querySelectorAll('.' + classSlider);
	sliders.forEach(slider => {
		let arrowR = document.createElement('div');
		let arrowL = document.createElement('div');

		arrowR.classList.add('more__item_next');
		arrowR.classList.add('_icon-arrowright');
		arrowR.classList.add('more__item');
		arrowL.classList.add('more__item_prev');
		arrowL.classList.add('_icon-arrowleft');
		arrowL.classList.add('more__item');
		slider.appendChild(arrowR);
		slider.appendChild(arrowL);
	});
}


new Swiper('.sales__slider', {

	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.slider-pagging',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
		init: function () {
			paggingDots('sales__slider', 'slider-pagging');
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

new Swiper('.tabs__nav', {
	slidesPerView: 'auto',
	speed: 800,
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});


//НОВИНКИ, АКЦИИ и т.д.
indexSwiperInit();
function indexSwiperInit() {
	let sliders = document.querySelectorAll('.tabs__item');
	for (let index = 0; index < sliders.length; index++) {
		const slider = sliders[index];
		slider.classList.add(`slider-${index}`);


		new Swiper(slider, {
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 'auto',
			speed: 300,
			spaceBetween: 30,
			lazy: true,
			// Arrows
			navigation: {
				nextEl: `.slider-${index} .more__item_next`,
				prevEl: `.slider-${index} .more__item_prev`,
			},
			on: {
				lazyImageReady: function () {
					ibg();
				},
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				479.98: {
					slidesPerView: 'auto',
				},
				767.98: {
					slidesPerView: 2,
				},
				991.98: {
					slidesPerView: 3,
				},
				1182: {
					slidesPerView: 3.6,
				},
			},
		});
	}
}


//СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ
function specialsInit() {
	new Swiper('.specials-product', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		speed: 300,
		spaceBetween: 30,
		autoHeight: false,
		lazy: true,
		// Arrows
		navigation: {
			nextEl: '.specials-product .more__item_next',
			prevEl: '.specials-product .more__item_prev',
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
			init: function () {
				paggingArrows('specials-product');
			}
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			479.98: {
				slidesPerView: 'auto',
			},
			767.98: {
				slidesPerView: 2,
			},
			991.98: {
				slidesPerView: 3,
			},
			1182: {
				slidesPerView: 4,
			},
		},
	});
}



// ПРОИЗВОДИТЕЛИ
manufacturersInit();
function manufacturersInit() {
	let slider = document.querySelectorAll('.slider-manufacturers');
	if (slider.length){
		new Swiper('.slider-manufacturers', {
			observer: true,
			observeParents: true,
			slidesPerView: '7',
			speed: 300,
			spaceBetween: 30,
			autoHeight: false,
			lazy: true,
			// Arrows
			navigation: {
				nextEl: '.slider-manufacturers .more__item_next',
				prevEl: '.slider-manufacturers .more__item_prev',
			},

			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				479.98: {
					slidesPerView: 4,
				},
				767.98: {
					slidesPerView: 5,
				},
				991.98: {
					slidesPerView: 5,
				},
				1182: {
					slidesPerView: 7,
				},
			},
		});
	}
}

;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();;
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
// if (location.hash) {
// 	const hsh = location.hash.replace('#', '');
// 	if (document.querySelector('.popup_' + hsh)) {
// 		popup_open(hsh);
// 	} else if (document.querySelector('div.' + hsh)) {
// 		_goto(document.querySelector('.' + hsh), 500, '');
// 	}
// }
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
out_menu();
function out_menu(){
	let overlay = document.querySelector('.menu__overlay');
	overlay.addEventListener('click', ()=>{
		menu_close();
		body_lock_remove();
	});
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//Spollers
spollers();
function spollers() {
	let spollers = document.querySelectorAll("._spoller");
	let spollersGo = true;
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			spoller.addEventListener("click", function (e) {
				if (spollersGo) {
					spollersGo = false;
					if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
						return false;
					}
					if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
						return false;
					}
					if (spoller.closest('._spollers').classList.contains('_one')) {
						let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
						for (let i = 0; i < curent_spollers.length; i++) {
							let el = curent_spollers[i];
							if (el != spoller) {
								el.classList.remove('_active');
								_slideUp(el.nextElementSibling);
							}
						}
					}
					spoller.classList.toggle('_active');
					_slideToggle(spoller.nextElementSibling);

					setTimeout(function () {
						spoller.classList.toggle('_active-delay');
						spollersGo = true;
					}, 500);
				}
			});
		}
	}
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=================
//SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//Popups
function popupInit() {
	if (location.hash) {
		const hsh = location.hash.replace('#', '');
		if (document.querySelector('.popup_' + hsh)) {
			popup_open(hsh);
		} else if (document.querySelector('div.' + hsh)) {
			_goto(document.querySelector('.' + hsh), 500, '');
		}
	}

	let popup_link = document.querySelectorAll('._popup-link');
	let popups = document.querySelectorAll('.popup');
	for (let index = 0; index < popup_link.length; index++) {
		const el = popup_link[index];
		el.addEventListener('click', function (e) {
			if (unlock) {
				let item = el.getAttribute('href').replace('#', '');
				let video = el.getAttribute('data-video');
				popup_open(item, video);
			}
			e.preventDefault();
		})
	}
	for (let index = 0; index < popups.length; index++) {
		const popup = popups[index];
		popup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__body')) {
				popup_close(e.target.closest('.popup'));
			}
		});
	}
	function popup_open(item, video = '') {
		let activePopup = document.querySelectorAll('.popup._active');
		if (activePopup.length > 0) {
			popup_close('', false);
		}
		let curent_popup = document.querySelector('.popup_' + item);
		if (curent_popup && unlock) {
			if (video != '' && video != null) {
				let popup_video = document.querySelector('.popup_video');
				popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			if (!document.querySelector('.menu__body._active')) {
				body_lock_add(500);
			}
			curent_popup.classList.add('_active');
			const hrefURL = window.location.href;
			// console.log(hrefURL);
			history.pushState('123', '123', `${hrefURL}#${item}`);
		}
	}
	function popup_close(item, bodyUnlock = true) {
		if (unlock) {
			if (!item) {
				for (let index = 0; index < popups.length; index++) {
					const popup = popups[index];
					let video = popup.querySelector('.popup__video');
					if (video) {
						video.innerHTML = '';
					}
					popup.classList.remove('_active');
				}
			} else {
				let video = item.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				item.classList.remove('_active');
				let popup_remove = item.querySelectorAll('._popup-remove');
				if (popup_remove.length){
					setTimeout(()=>{
						item.remove();
					}, 500);
				}
			}
			if (!document.querySelector('.menu__body._active') && bodyUnlock) {
				body_lock_remove(500);
			}
			history.pushState('', '', window.location.href.split('#')[0]);
		}
	}
	let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
	if (popup_close_icon.length) {
		for (let index = 0; index < popup_close_icon.length; index++) {
			const el = popup_close_icon[index];
			el.addEventListener('click', function () {
				popup_close(el.closest('.popup'));
			})
		}
	}
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			popup_close();
		}
	});

}

function popup_open(item, video = '') {
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
			if (video != '' && video != null) {
				let popup_video = document.querySelector('.popup_video');
				popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			if (!document.querySelector('.menu__body._active')) {
				body_lock_add(500);
			}
			curent_popup.classList.add('_active');
			const hrefURL = window.location.href;
			// console.log(hrefURL);
			history.pushState('123', '123', `${hrefURL}#${item}`);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
			if (!item) {
				for (let index = 0; index < popups.length; index++) {
					const popup = popups[index];
					let video = popup.querySelector('.popup__video');
					if (video) {
							video.innerHTML = '';
					}
					popup.classList.remove('_active');
				}
			} else {
				let video = item.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				item.classList.remove('_active');
			}
			if (!document.querySelector('.menu__body._active') && bodyUnlock) {
				body_lock_remove(500);
			}
			history.pushState('', '', window.location.href.split('#')[0]);
	}
}


popupInit();


function popupBild(class_name, message){
	let popupBody = document.createElement('div');
	popupBody.classList.add('popup');
	popupBody.classList.add(`popup_popup-${class_name}`);
	popupBody.classList.add(`popup-${class_name}`);
	popupBody.innerHTML = `
		<div class="popup__content popup-${class_name}__content">
			<div class="popup__body popup-${class_name}__body">
				<div class="popup__close _icon-close _popup-remove"></div>
				<div class="popup-${class_name}__contented popup__contented">
					<img src="dist/img/login.svg" alt="">
					<p>${message}</p>
				</div>
			</div>
		</div>
	`;

	let mainBody = document.querySelector('body');
	mainBody.appendChild(popupBody);
}


function popupRefresh() {
	let popups = document.querySelectorAll('.popup._active');
	popups.forEach(popup => {
		let href = window.location.href;
		popup.classList.remove('_active');
		history.pushState('', '', window.location.href.split('#')[0]);
		popupInit();
		popup.classList.add('_active');
		history.pushState('', '', href);
	});
}

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	let minHeight = window.getComputedStyle(target).minHeight;
	if (minHeight != '0px') {
		target.style.minHeight = 0;
		window.setTimeout(() => {
			target.style.minHeight = minHeight;
		}, duration);
	}
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	let minHeight = window.getComputedStyle(target).minHeight;
	if (minHeight != '0px') {
		target.style.minHeight = 0;
		window.setTimeout(() => {
			target.style.minHeight = minHeight;
		}, duration);
	}
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================
//Animate
function animate({ timing, draw, duration }) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}
function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}
function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//================================================================================
function counter() {
	let counters = document.querySelectorAll('.counter');
	for (let index = 0; index < counters.length; index++) {
		const counter = counters[index];
		const asc = counter.querySelector('.counter__asc');
		const desc = counter.querySelector('.counter__desc');
		const count = counter.querySelector('.counter__count');

		asc.addEventListener('click', function () {
			let number = parseInt(count.innerHTML);
			number = number + 1;
			count.innerHTML = number;
		});

		desc.addEventListener('click', function () {
			let number = parseInt(count.innerHTML);
			if (number > 1) {
				number = number - 1;
				count.innerHTML = number;
			}
		});
	}
}

counter();;
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll("form");
if (forms.length > 0) {
  for (let index = 0; index < forms.length; index++) {
    const el = forms[index];
    el.addEventListener("submit", form_submit);
  }
}
async function form_submit(e) {
  let btn = e.target;
  let form = btn.closest("form");
  let error = form_validate(form);
  if (error == 0) {
    let formAction = form.getAttribute("action")
      ? form.getAttribute("action").trim()
      : "#";
    let formMethod = form.getAttribute("method")
      ? form.getAttribute("method").trim()
      : "GET";
    const message = form.getAttribute("data-message");
    const ajax = form.getAttribute("data-ajax");

    //SendForm
    if (ajax) {
      e.preventDefault();
      let formData = new FormData(form);
      form.classList.add("_sending");
      let response = await fetch(formAction, {
        method: formMethod,
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        form.classList.remove("_sending");
        if (message) {
          popup_open("_" + message + "-message");
        }
        form_clean(form);
      } else {
        alert("Ошибка");
        form.classList.remove("_sending");
      }
    }
  } else {
    let form_error = form.querySelectorAll("._error");
    if (form_error && form.classList.contains("_goto-error")) {
      _goto(form_error[0], 1000, 50);
    }
    e.preventDefault();
  }
}
function form_validate(form) {
  let error = 0;
  let form_req = form.querySelectorAll("._req");
  if (form_req.length > 0) {
    for (let index = 0; index < form_req.length; index++) {
      const el = form_req[index];
      if (!_is_hidden(el)) {
        error += form_validate_input(el);
      }
    }
  }
  return error;
}
function form_validate_input(input) {
  let error = 0;
  let input_g_value = input.getAttribute("data-value");

  if (
    input.getAttribute("name") == "email" ||
    input.classList.contains("_email")
  ) {
    if (input.value != input_g_value) {
      let em = input.value.replace(" ", "");
      input.value = em;
    }
    if (email_test(input) || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  } else if (
    input.getAttribute("type") == "checkbox" &&
    input.checked == false
  ) {
    form_add_error(input);
    error++;
  } else {
    if (input.value == "" || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  }
  return error;
}
function form_add_error(input) {
  input.classList.add("_error");
  input.parentElement.classList.add("_error");
  //input.closest('.popup__body').classList.add('_error');

  let input_error = input.parentElement.querySelector(".form__error");
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
  let input_error_text = input.getAttribute("data-error");
  if (input_error_text && input_error_text != "") {
    input.parentElement.insertAdjacentHTML(
      "beforeend",
      '<div class="form__error">' + input_error_text + "</div>"
    );
  }
}
function form_remove_error(input) {
  input.classList.remove("_error");
  input.parentElement.classList.remove("_error");
  //input.closest('.popup__body').classList.remove('_error');

  let input_error = input.parentElement.querySelector(".form__error");
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}
function form_clean(form) {
  let inputs = form.querySelectorAll("input,textarea");
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index];
    el.parentElement.classList.remove("_focus");
    el.classList.remove("_focus");
    el.value = el.getAttribute("data-value");
  }
  let checkboxes = form.querySelectorAll(".checkbox__input");
  if (checkboxes.length > 0) {
    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index];
      checkbox.checked = false;
    }
  }
  let selects = form.querySelectorAll("select");
  if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_default_value = select.getAttribute("data-default");
      select.value = select_default_value;
      select_item(select);
    }
  }
}

let viewPass = document.querySelectorAll(".form__viewpass");
for (let index = 0; index < viewPass.length; index++) {
  const element = viewPass[index];
  element.addEventListener("click", function (e) {
    if (element.classList.contains("_active")) {
      element.parentElement
        .querySelector("input")
        .setAttribute("type", "password");
    } else {
      element.parentElement.querySelector("input").setAttribute("type", "text");
    }
    element.classList.toggle("_active");
  });
}

//Select
//selectInit();

function selectInit() {
  let selects = document.getElementsByTagName("select");
  if (selects.length > 0) {
    selects_check();
    selects_init();
    clickSort("#input-sort");
    clickSort("#input-limit");
  }
  function selects_check() {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select__parent = select.parentElement;

      select__parent.classList.forEach((classItem) => {
        if (classItem == "select") {
          let parent = select__parent.parentElement;
          select__parent.parentElement.innerHTML = "";
          parent.appendChild(select);
        }
      });
    }
  }
  function selects_init() {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_init(select);
    }
    //select_callback();
    document.addEventListener("click", function (e) {
      selects_close(e);
    });
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        selects_close(e);
      }
    });
  }
  function selects_close(e) {
    const selects = document.querySelectorAll(".select");
    if (!e.target.closest(".select")) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_body_options = select.querySelector(".select__options");
        select.classList.remove("_active");
        _slideUp(select_body_options, 100);
      }
    }
  }
  function select_init(select) {
    const select_parent = select.parentElement;
    const select_modifikator = select.getAttribute("class");
    const select_selected_option = select.querySelector("option:checked");
    select.setAttribute("data-default", select_selected_option.value);
    select.style.display = "none";

    select_parent.insertAdjacentHTML(
      "beforeend",
      '<div class="select select_' + select_modifikator + '"></div>'
    );

    let new_select = select.parentElement.querySelector(".select");
    new_select.appendChild(select);
    select_item(select);
  }
  function select_item(select) {
    const select_parent = select.parentElement;
    const select_items = select_parent.innerHTML;
    const select_options = select.querySelectorAll("option");
    const select_selected_option = select.querySelector("option:checked");
    const select_selected_text = select_selected_option.text;
    const select_type = select.getAttribute("data-type");

    select_parent.innerHTML = "";
    select_parent.appendChild(select);

    let select_type_content = "";
    if (select_type == "input") {
      select_type_content =
        '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' +
        select_selected_text +
        '" data-error="Ошибка" data-value="' +
        select_selected_text +
        '" class="select__input"></div>';
    } else {
      select_type_content =
        '<div class="select__value icon-select-arrow"><span>' +
        select_selected_text +
        "</span></div>";
    }

    select_parent.insertAdjacentHTML(
      "beforeend",
      '<div class="select__item">' +
        '<div class="select__title">' +
        select_type_content +
        "</div>" +
        '<div class="select__options">' +
        select_get_options(select_options) +
        "</div>" +
        "</div></div>"
    );

    select_actions(select, select_parent);
  }
  function select_actions(original, select) {
    const select_item = select.querySelector(".select__item");
    const select_body_options = select.querySelector(".select__options");
    const select_options = select.querySelectorAll(".select__option");
    const select_type = original.getAttribute("data-type");
    const select_input = select.querySelector(".select__input");

    select_item.addEventListener("click", function () {
      let selects = document.querySelectorAll(".select");
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        const select_body_options = select.querySelector(".select__options");
        if (select != select_item.closest(".select")) {
          select.classList.remove("_active");
          _slideUp(select_body_options, 100);
        }
      }
      _slideToggle(select_body_options, 100);
      select.classList.toggle("_active");
    });

    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.getAttribute("data-value");
      const select_option_text = select_option.innerHTML;

      if (select_type == "input") {
        select_input.addEventListener("keyup", select_search);
      } else {
        if (select_option.getAttribute("data-value") == original.value) {
          select_option.style.display = "none";
        }
      }
      select_option.addEventListener("click", function () {
        for (let index = 0; index < select_options.length; index++) {
          const el = select_options[index];
          el.style.display = "block";
        }
        if (select_type == "input") {
          select_input.value = select_option_text;
          original.value = select_option_value;
        } else {
          select.querySelector(".select__value").innerHTML =
            "<span>" + select_option_text + "</span>";
          original.value = select_option_value;
          select_option.style.display = "none";
        }
      });
    }
  }
  function select_get_options(select_options) {
    if (select_options) {
      let select_options_content = "";
      for (let index = 0; index < select_options.length; index++) {
        const select_option = select_options[index];
        const select_option_value = select_option.value;
        if (select_option_value != "") {
          const select_option_text = select_option.text;
          select_options_content =
            select_options_content +
            '<div data-value="' +
            select_option_value +
            '" class="select__option">' +
            select_option_text +
            "</div>";
        }
      }
      return select_options_content;
    }
  }
  function select_search(e) {
    let select_block = e.target
      .closest(".select ")
      .querySelector(".select__options");
    let select_options = e.target
      .closest(".select ")
      .querySelectorAll(".select__option");
    let select_search_text = e.target.value.toUpperCase();

    for (let i = 0; i < select_options.length; i++) {
      let select_option = select_options[i];
      let select_txt_value =
        select_option.textContent || select_option.innerText;
      if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
        select_option.style.display = "";
      } else {
        select_option.style.display = "none";
      }
    }
  }
  function selects_update_all() {
    let selects = document.querySelectorAll("select");
    if (selects) {
      for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        select_item(select);
      }
    }
  }
}

//Placeholers
let inputs = document.querySelectorAll(
  "input[data-value],textarea[data-value]"
);
inputs_init(inputs);

function inputs_init(inputs) {
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const input_g_value = input.getAttribute("data-value");
      input_placeholder_add(input);
      if (input.value != "" && input.value != input_g_value) {
        input_focus_add(input);
      }
      input.addEventListener("focus", function (e) {
        if (input.value == input_g_value) {
          input_focus_add(input);
          input.value = "";
        }
        if (input.getAttribute("data-type") === "pass") {
          input.setAttribute("type", "password");
        }
        if (input.classList.contains("_date")) {
          /*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
        }
        if (input.classList.contains("_phone")) {
          //'+7(999) 999 9999'
          //'+38(999) 999 9999'
          //'+375(99)999-99-99'
          input.classList.add("_mask");
          Inputmask("+7(999) 999 9999", {
            //"placeholder": '',
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              input_clear_mask(input, input_g_value);
            },
          }).mask(input);
        }
        console.log(input);
        if (input.classList.contains("_digital")) {
          input.classList.add("_mask");
          Inputmask("9{1,}", {
            placeholder: "",
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              input_clear_mask(input, input_g_value);
            },
          }).mask(input);
        }
        form_remove_error(input);
      });
      input.addEventListener("blur", function (e) {
        if (input.value == "") {
          input.value = input_g_value;
          input_focus_remove(input);
          if (input.classList.contains("_mask")) {
            input_clear_mask(input, input_g_value);
          }
          if (input.getAttribute("data-type") === "pass") {
            input.setAttribute("type", "text");
          }
        }
      });
      if (input.classList.contains("_date")) {
        datepicker(input, {
          customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          customMonths: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value;
          },
          onSelect: function (input, instance, date) {
            input_focus_add(input.el);
          },
        });
      }
    }
  }
}
function input_placeholder_add(input) {
  const input_g_value = input.getAttribute("data-value");
  if (input.value == "" && input_g_value != "") {
    input.value = input_g_value;
  }
}
function input_focus_add(input) {
  input.classList.add("_focus");
  input.parentElement.classList.add("_focus");
}
function input_focus_remove(input) {
  input.classList.remove("_focus");
  input.parentElement.classList.remove("_focus");
}
function input_clear_mask(input, input_g_value) {
  input.inputmask.remove();
  input.value = input_g_value;
  input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0) {
  for (let index = 0; index < quantityButtons.length; index++) {
    const quantityButton = quantityButtons[index];
    quantityButton.addEventListener("click", function (e) {
      let value = parseInt(
        quantityButton.closest(".quantity").querySelector("input").value
      );
      if (quantityButton.classList.contains("quantity__button_plus")) {
        value++;
      } else {
        value = value - 1;
        if (value < 1) {
          value = 1;
        }
      }
      quantityButton.closest(".quantity").querySelector("input").value = value;
    });
  }
}

//RANGE
const priceSlider = document.querySelector(".price-filter__slider");
if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [0, 200000],
    connect: true,
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    range: {
      min: [0],
      max: [200000],
    },
  });

  const priceStart = document.getElementById("price-start");
  const priceEnd = document.getElementById("price-end");
  priceStart.addEventListener("change", setPriceValues);
  priceEnd.addEventListener("change", setPriceValues);

  function setPriceValues() {
    let priceStartValue;
    let priceEndValue;
    if (priceStart.value != "") {
      priceStartValue = priceStart.value;
    }
    if (priceEnd.value != "") {
      priceEndValue = priceEnd.value;
    }
    priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
  }
}

//==================================
//RADIO ============================

function radioBuild() {
  let radioes = document.querySelectorAll("._radio");
  for (let index = 0; index < radioes.length; index++) {
    const radio = radioes[index];
    const inputArr = radio.querySelectorAll('input[type="radio"]');
    radio.innerHTML = "";
    for (let index = 0; index < inputArr.length; index++) {
      const input = inputArr[index];
      radio.appendChild(input);
      const dataLabel = input.getAttribute("data-label");
      const dataActive = input.getAttribute("data-active");
      let div = document.createElement("div");
      div.classList.add("_radio-item");
      let label = document.createElement("span");
      if (dataActive) {
        div.classList.add("_active");
      }
      input.closest("._radio").appendChild(div);
      div.appendChild(label);
      div.appendChild(input);
      label.innerHTML = dataLabel;
    }
  }
}
radioBuild();

function radio() {
  let radioes = document.querySelectorAll("._radio");
  for (let index = 0; index < radioes.length; index++) {
    const radio = radioes[index];
    const inputArr = radio.querySelectorAll('input[type="radio"]');
    if (inputArr.length > 0) {
      let divActive = radio.querySelector("div._active");
      let divArr = radio.querySelectorAll("div");
      divActive.querySelector("input").checked = true;

      for (let index = 0; index < divArr.length; index++) {
        const div = divArr[index];

        div.addEventListener("click", function () {
          if (!this.classList.contains("disable")) {
            let divArr = this.closest("._radio").querySelectorAll("div");

            for (let index = 0; index < divArr.length; index++) {
              const div = divArr[index];
              div.classList.remove("_active");
            }
            this.classList.toggle("_active");
            this.checked = true;
          }
        });
      }
    }
  }
}
radio();

//RADIO ============================

//CHECKBOX ============================

function checkboxBuild() {
  let checkboxArr = document.querySelectorAll('input[type="checkbox"]');
  for (let index = 0; index < checkboxArr.length; index++) {
    const checkbox = checkboxArr[index];
    let wrapper = document.createElement("div");
    wrapper.classList.add("_checkbox");
    checkbox.parentElement.appendChild(wrapper);
    wrapper.appendChild(checkbox);

    let dataLabel = checkbox.getAttribute("data-label");
    let dataSubLabel = checkbox.getAttribute("data-sublabel");
    let label = document.createElement("span");
    if (dataSubLabel) {
      let subLabel = document.createElement("span");
      wrapper.appendChild(label);
      label.innerHTML = dataLabel;
      label.appendChild(subLabel);
      subLabel.innerHTML = dataSubLabel;
    } else {
      wrapper.appendChild(label);
      label.innerHTML = dataLabel;
    }
  }
}
checkboxBuild();

function checkbox() {
  let checkboxArr = document.querySelectorAll("._checkbox");
  for (let index = 0; index < checkboxArr.length; index++) {
    const checkbox = checkboxArr[index];
    if (checkbox.querySelector("input").checked == true) {
      checkbox.classList.add("_active");
    }

    checkbox.addEventListener("click", function (event) {
      if (!this.classList.contains("disable")) {
        this.classList.toggle("_active");
        if (this.classList.contains("_active")) {
          this.querySelector("input").checked = true;
        } else {
          this.querySelector("input").checked = false;
        }
      }
    });
  }
}
checkbox();

//CHECKBOX ============================
;
//=========files/========================
//Старый IBG
oldIbg();
function oldIbg() {
    let element = document.querySelectorAll("._oldibg");
    if (element.length) {
        for (let index = 0; index < element.length; index++) {
            const wrapper = element[index];
            let img = wrapper.querySelector("img");
            let src = img.getAttribute("src");
            wrapper.style.backgroundImage = `url("${src}")`;
        }
    }
}

//Админка
showAccount();
function showAccount() {
    buttonArr = document.querySelectorAll(".account-header__button");
    if (buttonArr.length) {
        buttonArr.forEach((button) => {
            let body = document.querySelector(".account-header__body");

            button.addEventListener("click", () => {
                body.classList.toggle("_active");
                _slideToggle(body);
            });

            document.addEventListener("mouseup", (e) => {
                if (body.classList.contains("_active")) {
                    let childrens = button.closest(".account-header")
                        .childNodes;
                    childrens.forEach((children) => {
                        if (e.target !== children && e.target !== button) {
                            _slideUp(body);
                            body.classList.remove("_active");
                        }
                    });
                }
            });
        });
    }
}

showCatalog();
function showCatalog() {
    body = document.querySelector(".menu__li-catalog ul");
    button = document.querySelector(".menu__li-catalog .menu__link");
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".menu__li-catalog")) {
            body.classList.add("_active");
        }
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".menu__li-catalog")) {
            //_slideUp(body);
            body.classList.remove("_active");
        }
    });
}

//Ленивая загрузка
blazy();
function blazy() {
    let lazyLoad = new Blazy({
        loadInvisible: true,
        container: ".products__specials",
    });
    const lazyImage =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}

//? FILTERS SHOW
function filtersShow() {
    let buttonFintersOpen = document.querySelector(".fixed__filters");
    let buttonFintersClose = document.querySelector(
        ".filters-catalogies__close"
    );

    if (buttonFintersOpen && buttonFintersClose) {
        buttonFintersOpen.addEventListener("click", () => {
            document
                .querySelector(".bf-panel-wrapper")
                .classList.add("_active");
            document.querySelector("body").classList.add("_lock");
        });
        buttonFintersClose.addEventListener("click", () => {
            document
                .querySelector(".bf-panel-wrapper")
                .classList.remove("_active");
            document.querySelector("body").classList.remove("_lock");
        });
    }
}

//* Велосипед
bicycleRoad();
function bicycleRoad() {
    let md2 = window.matchMedia("(max-width:991.98px)");
    function gsapRun() {
        if (!md2.matches) {
            gsapInit();
        } else {
            gsap.killTweensOf(".footer__bicycle");
            let item = document
                .querySelector(".footer__bicycle")
                .removeAttribute("style");
        }
    }
    gsapRun();
    md2.addListener(gsapRun);

    //================
    function gsapInit() {
        gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 1.7,
                ease: "none",
            },
        })
            .to(".footer__bicycle", {
                x: -300,
                duration: 0,
            })
            .to(".footer__bicycle", {
                x: 0,
                opacity: 1,
            })
            .to(".footer__bicycle", {
                rotate: -25,
                x: 30,
                y: -10,
                rotate: -35,
                duration: 0.3,
            })
            .to(".footer__bicycle", {
                x: 340,
                y: -165,
                duration: 3.5,
            })
            .to(".footer__bicycle", {
                x: 450,
                y: -125,
                rotate: -45,
                duration: 1,
            })
            .to(".footer__bicycle", {
                x: 550,
                y: -175,
                rotate: -60,
                duration: 1.5,
            })
            .to(".footer__bicycle", {
                x: 660,
                y: -330,
                rotate: -70,
                duration: 1.3,
            })
            .to(".footer__bicycle", {
                x: 740,
                y: -330,
                rotate: 0,
                duration: 0.7,
            })
            .to(".footer__bicycle", {
                x: 1000,
                y: -145,
                rotate: 45,
                duration: 2.0,
            })
            .to(".footer__bicycle", {
                x: 1150,
                y: -10,
                rotate: 40,
                duration: 1,
            })
            .to(".footer__bicycle", {
                x: 1200,
                y: 0,
                rotate: 0,
                duration: 0.3,
            })
            .to(".footer__bicycle", {
                x: 1500,
                y: 0,
                rotate: -60,
                opacity: 0,
            });
    }
}

//* Из числа в цену
halfedPrice();
function halfedPrice() {
    let priceArr = document.querySelectorAll("._price");
    for (let index = 0; index < priceArr.length; index++) {
        const priceArrItem = priceArr[index];
        let newPrice = priceArrItem.innerHTML.replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
        );
        priceArrItem.innerHTML = newPrice;
    }
}

// Скрываем Header по скроллу
headerHide();
function headerHide() {
    let line = document.querySelector("._header-hidden");
    let toggle = false;
    window.addEventListener("scroll", function () {
        if (this.scrollY >= 100 && toggle === false) {
            _slideUp(line, 300);
            toggle = true;
        }
        if (this.scrollY <= 100 && toggle === true) {
            _slideDown(line, 300);
            toggle = false;
        }
    });
}

// Прелоадер
preloader();
function preloader() {
    const delay = 700;

    body_lock_add(0);
    window.addEventListener("load", () => {
        let loader = document.querySelector(".loader");
        if (loader) {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = "none";
                body_lock_remove(0);
            }, delay);
        }
    });
}

//Всплывающие подсказки
tippyInit();
function tippyInit() {
    tippy("[data-tippy-content]");
}

//*Сортируем каталог (техническая)
//СОРТИРОВКА ПО ВОЗРАСТАНИЮ ЦЕНЫ
function ASC(a, b) {
    return a.price[0] - b.price[0];
}

//СОРТИРОВКА ПО УБЫВАНИЮ ЦЕНЫ
function DSC(a, b) {
    return b.price[0] - a.price[0];
}

//! Получаем данные из массива GET
function $_GET(key) {
    let p = window.location.search;
    p = p.match(new RegExp(key + "=([^&=]+)"));
    return p ? p[1] : false;
}

//=================================================================================================

// Редактируем фильтр

editBage();
async function editBage() {
    let checkFilters = document.querySelectorAll(".bf-panel-wrapper");
    if (checkFilters.length) {
        let promise = new Promise((resolve, reject) => {
            window.addEventListener("load", () => resolve(true));
        });
        await promise; // будет ждать, пока промис не выполнится (*)

        let body = document.querySelector(".bf-float-submit");
        let inner = body.innerHTML;

        // Wrapper
        let wrapper = document.createElement("div");
        wrapper.classList.add("bf-wrapper");
        wrapper.innerHTML = inner;
        body.innerHTML = "";
        body.appendChild(wrapper);

        let priceBody = document.querySelector(".bf-price-filter .bf-cur-symb");
        minInput = priceBody.querySelector(".bf-range-min");
        maxInput = priceBody.querySelector(".bf-range-max");
        let minDiv = document.createElement("div");
        let maxDiv = document.createElement("div");
        minDiv.classList.add("bf-pre-range");
        maxDiv.classList.add("bf-pre-range");
        minDiv.innerHTML = "от";
        maxDiv.innerHTML = "до";
        priceBody.insertBefore(minDiv, minInput);
        priceBody.insertBefore(maxDiv, maxInput);
    }
}

// Функция сброса фильтра
function defaultSort() {
    let bodyFilter = document.querySelector(".bf-panel-wrapper");
    let checkboxes = bodyFilter.querySelectorAll("._checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("_active");
    });

    let getArr = ["sort", "order", "limit", "bfilter"];
    function clearGET(paramArr) {
        let href = document.location.href;
        paramArr.map((param) => {
            const paramStr = `${param}=${$_GET(param)}`;
            href = href.replace(paramStr, "");
            href = href.replace("&&&&", "");
            href = href.replace("&&&", "");
            href = href.replace("&&", "");
        });
        return href;
    }
    document.location.href = clearGET(getArr);
}

// Клик по CheckBox
clickCheckBoxFilter();
function clickCheckBoxFilter() {
    let checkFilters = document.querySelectorAll(".bf-panel-wrapper");
    if (checkFilters.length) {
        checkFilters.forEach((checkFilter) => {
            let checkboxes = checkFilter.querySelectorAll("._checkbox");
            checkboxes.forEach((checkbox) => {
                let parentCheckbox = checkbox.closest(".bf-attr-filter");
                parentCheckbox.addEventListener("click", () => {
                    BrainyFilter.sendRequest();
                });
            });
        });
    }
}
;

cartRequantity();
function cartRequantity(){
   if ( $('.dropdown-cart__quantity').length ){
        $('.dropdown-cart__quantity input').blur(()=>{ 
            var data = $("#form-cart-header").serialize();
            cartRefresh(data);
        });
   }
}

function cartRefresh(data){
    $.ajax({
    url: "index.php?route=checkout/cart/edit",
    type: "post",
    data: data,
    beforeSend: function () {
        // Добавляем лоадер
        popupLoaderAdd('popup-maincart__body');
    },
    complete: function () {
        // Удаляем лоадер
        popupLoaderClear();
    },
    success: function (html) {
        var page = $( $('<div></div>') ).html(html);
        var cart_button = $(page).find('.header__cart').children();
        var popup_content = $(page).find('.dropdown-cart').children();


        $('.header__cart').html(cart_button);
        $('.dropdown-cart').html(popup_content);

        halfedPrice();
        cartRequantity();
        cartQuanter();
        popupRefresh();
        reqInput();

        if ( $('#checkout-cart__input').length ){
            $('#checkout-cart__input').val( $('#header-cart__input').val() );
            reloadAll();
        }
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(
            thrownError +
                "\r\n" +
                xhr.statusText +
                "\r\n" +
                xhr.responseText
        );
    },
});
}

cartQuanter();
function cartQuanter(){
    for (let index = 0; index < $('.dropdown-cart__quantity a').length; index++) {
        const link = $('.dropdown-cart__quantity a')[index];

        $(link).click(function(event) {
            event.preventDefault();
            var input = $(this).parent().find('input');
            var valInput = Number( $(input).val() );
            ($(this).hasClass('dropdown-cart__minus')) ? valInput = valInput - 1 : valInput = valInput + 1;
            $(input).val(valInput);

            var data = $("#form-cart-header").serialize();
            cartRefresh(data);
        });
    }
}


// Добавляем Loader
function popupLoaderClear(){
    // Удаляем лоадер
    if ( $('.popup-loader').length ){
        for (let index = 0; index < $('.popup-loader').length; index++) {
            const loader = $('.popup-loader')[index];
            $(loader).remove();
        }
    }
}

// Удаляем Loader
function popupLoaderAdd(className){
    // Удаляем лоадер
    $(`.${className}`).append('<div class="popup-loader"></div>');
}

// Input Digital
reqInput();
function reqInput(){

    for (let index = 0; index < $('input._digital').length; index++) {
        const input = $('input._digital')[index];
        $(input).bind("change keyup input click keydown", function() {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });
    }

};

//=========files/========================
/*
function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				//infowindow.setContent($('.contacts-map-item_' + cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}
*/

initMap();
function initMap() {
	// let mapWrap = document.querySelectorAll('.map');
	// if (mapWrap.length) {
	// 	let
	// 		geocode = document.querySelector('.geocode').innerHTML,
	// 		position = geocode.indexOf(','),
	// 		geocodeL = geocode.slice(0, position),
	// 		geocodeM = geocode.slice(position + 2),
	// 		mapId = ;
	// 	//map(1, geocodeL, geocodeM);
	// }
	let maps = document.querySelectorAll('.map');
	if ( maps.length ){
		for (let index = 0; index < maps.length; index++) {
			const map = maps[index];
			let parent = map.parentElement;
			let geocode = parent.querySelector('.geocode').innerHTML;
			let position = geocode.indexOf(',');
			let geocodeL = geocode.slice(0, position);
			let geocodeM = geocode.slice(position + 2);
			let map_id = map.getAttribute('id');

			mapCreate(map_id, geocodeL, geocodeM);
		}
	}
}

// YA
function mapCreate(map_id, geocodeL, geocodeM) {

	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map(map_id, {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [Number(geocodeL), Number(geocodeM)],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 16
		});

		let myPlacemark = new ymaps.Placemark([Number(geocodeL), Number(geocodeM)], {
		}, {
			// Опции.
			//balloonContentHeader: 'Mistoun',
			//balloonContentBody: 'Москва, Николоямская 40с1',
			//balloonContentFooter: '+ 7(495) 507-54 - 90',
			//hasBalloon: true,
			//hideIconOnBalloonOpen: true,

			hasBalloon: false,
			hideIconOnBalloonOpen: false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'dist/img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		});
		myMap.geoObjects.add(myPlacemark);

		// myMap.behaviors.disable('scrollZoom');
		// myMap.behaviors.disable('drag');
	}
}
;
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	let body = document.querySelector('body');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
			body.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
			body.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}

	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}

	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}

function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			// ВЫЧИСЛИТЬ!!!
			let current_scroll = pageYOffset;//parseInt(scr_body.getAttribute('data-scroll'));
			//
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			let block_pos;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_prev) {
					let current_block_prev_height = current_block_prev.offsetHeight;
					block_pos = offset(current_block_prev).top;
					if (current_block_height <= viewport_height) {
						if (current_block_prev_height >= viewport_height) {
							block_pos = block_pos + (current_block_prev_height - viewport_height);
							full_scroll_to_sector(block_pos);
						}
					} else {
						enableScroll();
						if (current_scroll <= current_block_pos) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pagestart();
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_next) {
					block_pos = offset(current_block_next).top;
					if (current_block_height <= viewport_height) {
						full_scroll_to_sector(block_pos);
					} else {
						enableScroll();
						if (current_scroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pageend();
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}
;
