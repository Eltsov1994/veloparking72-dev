let searchArr = [];

searchFocus();
//? INPUT SEARCH
function searchFocus() {
   let body = document.querySelector('.search-header__input').closest('.header__line');
   let search = document.querySelector('.search-header__input');
   let close = document.querySelector('.search-header__close');
   let icon = document.querySelector('.search-header__icon');

   search.onfocus = function () {
      search.parentElement.classList.add('_active');
      close.classList.add('_active');
      body.classList.add('_active-search');

      document.addEventListener('keypress', (e) => {
         if (e.key == "Enter") {

            if (search.value)
               document.location.href = `${document.location.origin}/search.php?q=${search.value}`;
         }
      });

   }
   search.onblur = function () {
      if (search.value == '') {
         search.parentElement.classList.remove('_active');
         close.classList.remove('_active');
         body.classList.remove('_active-search');
      }
   }

   close.addEventListener('click', () => {
      search.value = '';
      search.parentElement.classList.remove('_active');
      close.classList.remove('_active');
      body.classList.remove('_active-search');
      removeSearch();
   });

   icon.addEventListener('click', () => {
      search.focus();
      search.parentElement.classList.add('_active');
      close.classList.add('_active');
      body.classList.add('_active-search');
      if (search.value) {
         document.location.href = `${document.location.origin}/search.php?q=${search.value}`;
      }
   });
}


searchInit();
function searchInit() {

   const input = document.querySelector('.search-header__input');

   //Focus
   input.addEventListener('focus', () => {
      inFocus();
      document.addEventListener('keyup', (e) => {
         const key = e.key.toLowerCase(); // Значение нажатой клавиши
         const valueSearch = input.value.toUpperCase(); // Значение INPUT
         searchArr = [];

         //Отсекаем ненужные клавиши
         if (key.length !== 1) {
            if (key != 'backspace' && key != ' ') { return; }
         }


         item_id_reserve.forEach(element => {
            const elementName = element['name'].toUpperCase(); // Имя элемента

            if (elementName.indexOf(valueSearch) != -1) {
               searchArr.push(element);
            }
         });
         buildSearch();

      });
   });


   //Unfocus
   input.addEventListener('focusout', (e) => {
      document.addEventListener('click', check);

      function check(e) {
         const target = e.target.closest('.search-header__wrapper');
         if (!target) {
            unFocus();
            document.removeEventListener('click', check);
         }
      }
      // let target = e.target.closest('.search-header').querySelector('.search-header__wrapper');
      // if (target) {
      //    target.addEventListener('click', () => {
      //       return 777;
      //    });
      // }

      // console.log(listen);

   });

}




function buildSearch() {
   let body = document.querySelector('.search-header');
   let oldWrapper = document.querySelector('.search-header__wrapper');

   //Удаляем старый wrapper
   if (oldWrapper) { oldWrapper.remove() }

   let wrapper = document.createElement('div');
   wrapper.classList.add('search-header__wrapper');

   for (let index = 0; index < searchArr.length; index++) {
      if (index > 50) { break }
      const searchArrItem = searchArr[index];
      let item = document.createElement('a');
      item.setAttribute('href', `?route=veloparking/product&id=${searchArrItem['vendorCode']}`);
      item.classList.add('search-header__item');
      item.innerHTML = `
         <div class="search-header__img">
            <img class="b-lazy" src="${lazyImage}" data-src="${searchArrItem['picture']}" alt="${searchArrItem['name']}">
         </div>
         <div class="search-header__description">
            <div class="search-header__name">${searchArrItem['name']}</div>
            <div class="search-header__price _price _rub">${searchArrItem['price'][0]}</div>
         </div>
      `;
      wrapper.appendChild(item);
   }

   body.appendChild(wrapper);
   halfedPrice();
   scrollSearch();
   lazyLoad.revalidate();
}


// LazyLoad при скролле
scrollSearch();
function scrollSearch() {
   let wrapper = document.querySelector('.search-header__wrapper');
   if (wrapper) {
      wrapper.addEventListener('scroll', () => {
         lazyLoad.revalidate();
      });
   }
}



function removeSearch() {
   let wrapper = document.querySelector('.search-header__wrapper');
   //Удаляем старый wrapper
   wrapper.remove();
   body_lock_remove(500);
}



// Из фокуса
function unFocus() {
   let wrapper = document.querySelector('.search-header__wrapper');
   if (wrapper) { _slideUp(wrapper, 300) }


   let matchMedia = window.matchMedia('(min-width:991.98px)');

   if (matchMedia.matches) {
      setTimeout(() => { body_lock_remove(300) }, 300);
   } else {
      document.querySelector('.menu__body').style.overflow = 'auto';
   }
}



// В фокусе
function inFocus() {
   let wrapper = document.querySelector('.search-header__wrapper');
   if (wrapper) {
      _slideDown(wrapper, 300);
   }

   let matchMedia = window.matchMedia('(min-width:991.98px)');

   if (matchMedia.matches) {
      setTimeout(() => { body_lock_add(300) }, 300);
   } else {
      document.querySelector('.menu__body').style.overflow = 'hidden';
   }
}



