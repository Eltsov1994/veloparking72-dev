

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

