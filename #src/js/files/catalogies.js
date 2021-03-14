const item_id_reserve = item_id; //Резервный массив для восстановления
let item_id_filterTMP = []; //Временный массив для фильтрации
let item_id_pagging = []; //Массив для товаров поделённых на страницы

//* Добавляем товары на страницу
function appendItem(arr) {
   //Получаем номер активной страницы
   let selectPage = $_GET('page') - 1;

   //Чистим контейнер
   document.querySelector('.catalogies__catalog').innerHTML = '';
   if (arr.length) {
      for (let index = 0; index < arr[selectPage].length; index++) {
         const catalogItem = arr[selectPage][index];

         let
            name = catalogItem['name'],
            picture = catalogItem['picture'],
            price = catalogItem['price'][0],
            vendorCode = catalogItem['vendorCode'],
            oldprice = catalogItem['oldprice'];


         buildItem();


         function buildItem() {
            let div = document.createElement('div');
            div.setAttribute('class', 'catalog-item catalog-catalogies__item')
            div.innerHTML = `<div class="catalog-item__img img-catalog">
                              <div class="img-catalog__wrapper">
                                 <a class="img-catalog__link" href="?route=veloparking/product&id=${vendorCode}">
                                    <img class="img-catalog__img b-lazy" src="${lazyImage}" data-src=" ${picture} " alt="">
                                    <div class="img-catalog__stickers stickers">
                                    </div>
                                 </a>
                              </div>
                           </div>
                           <div class="catalog-item__info info-catalog">
                              <div class="info-catalog__line">
                                 <a href="?route=veloparking/product&id=${vendorCode}" class="info-catalog__name"> ${name} </a>
                                 <div class="info-catalog__article">АРТИКУЛ: <span> ${vendorCode} </span></div>
                              </div>
                              <div class="info-catalog__line">
                                 <div class="info-catalog__price _price"> ${price} <span class="_rub"></span></div>
                                 <a href="?route=veloparking/product&id=${vendorCode}" class="info-catalog__link main__button">Подробнее</a>
                              </div>
                           </div>`;
            for (key in stickers) {
               stickers[key].forEach(element => {
                  if (element == vendorCode) {
                     let stickersWrapper = div.querySelector('.img-catalog__stickers');
                     let sticker = document.createElement('div');
                     sticker.classList.add('stickers__sticker');
                     sticker.classList.add(`stickers__${key}`);
                     stickersWrapper.appendChild(sticker);
                  }
               });
            }
            document.querySelector('.catalogies__catalog').appendChild(div);
            appemdOldPrice(div);
         }

         function appemdOldPrice(insertTo) {
            if (oldprice) {
               let priceContainer = insertTo.querySelector('.info-catalog__price').closest('.info-catalog__line');
               let div = document.createElement('div');
               let rub = document.createElement('span');
               div.classList.add('info-catalog__price-old');
               div.classList.add('info-catalog__price');
               div.classList.add('_price');
               rub.classList.add('_rub');
               div.innerHTML = oldprice[0];
               div.appendChild(rub);
               priceContainer.appendChild(div);
               priceContainer.querySelector('.info-catalog__price').classList.add('info-catalog__reprice');
            }
         }

      }
   }
}

//! Делим массив на страницы (default = 12)
function pagingArr(arr, count = 12) {
   item_id_pagging = [];
   let countPage = Math.ceil(arr.length / count);

   countPage: for (let index_1 = 0; index_1 < countPage; index_1++) {
      item_id_pagging.push(index_1);
      item_id_pagging[index_1] = [];
      item_id: for (let index_2 = 0; index_2 < arr.length; index_2++) {
         const item_idItem = arr[index_2];
         if (index_2 > ((index_1 + 1) * count - 1)) {
            break item_id;
         }
         if (index_1 * count <= index_2) {
            item_id_pagging[index_1].push(item_idItem);
         }
      }
   }
}

//*Сортируем каталог
function sortCatalog(arr, value) {
   let needlyArr;

   switch (arr) {
      case 'item_id':
         needlyArr = item_id;
         break;

      case 'item_id_filterTMP':
         needlyArr = item_id_filterTMP;
         break;

      default:
         needlyArr = item_id;
         break;
   }

   switch (value) {
      case 'asc':
         needlyArr.sort(ASC);
         pagingArr(needlyArr); //Делим каталог на страницы
         appendItem(item_id_pagging); //Отрисовываем товары
         break;
      case 'dsc':
         needlyArr.sort(DSC);
         pagingArr(needlyArr); //Делим каталог на страницы
         appendItem(item_id_pagging); //Отрисовываем товары
         break;
      default:
         needlyArr.sort(ASC);
         pagingArr(needlyArr); //Делим каталог на страницы
         appendItem(item_id_pagging); //Отрисовываем товары
         break;
   }

}

//* Получаем значение выбранного SELECT
function getValueSelect() {
   let options = document.querySelectorAll('option');
   for (let index = 0; index < options.length; index++) {
      const optionsItem = options[index];
      if (optionsItem.selected) {
         let value = optionsItem.getAttribute('value');
         let arr = optionsItem.getAttribute('data-attr');
         sortCatalog(arr, value);
      }
   }
}

//* Отслеживаем изменения SELECT
function changeValueSelect() {
   let selectsBody = document.querySelector('.catalogies__sort');
   let selects = selectsBody.querySelectorAll('.select__option');

   for (let index = 0; index < selects.length; index++) {
      const select = selects[index];

      select.addEventListener('click', (e) => {
         let options = document.querySelectorAll('option');
         for (let index = 0; index < options.length; index++) {
            const option = options[index];
            if (option.selected) {
               let value = option.getAttribute('value');
               let arr = option.getAttribute('data-arr');
               sortCatalog(arr, value); // Сортируем
            }
         }
         halfedPrice(); //Редактируем цену
         lazyLoad.revalidate();
      });
   }
}

//* Скролл до места
function scrollTo(to, duration = 700) {
   const
      element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t, b, c, d) {
         t /= d / 2;
         if (t < 1) return c / 2 * t * t + b;
         t--;
         return -c / 2 * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
         const currentDate = +new Date();
         const currentTime = currentDate - startDate;
         element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
         if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
         }
         else {
            element.scrollTop = to;
         }
      };
   animateScroll();
}


//* Переход на нужную страницу
function goToPage(page) {
   history.pushState({}, '', replaceGET(page));
   //Задаём номер страницы
   function replaceGET(key) {
      let href = window.location.search;
      href = href.replace("page=" + $_GET('page'), "page=" + key);
      return href;
   }
}

//! Если страница не указана
function pageNumberDefault() {
   if (!$_GET('page')) {
      history.pushState({}, '', setGET());
      //Задаём номер страницы
      function setGET() {
         let href = window.location.search;

         href.indexOf('?') + 1 ?
            href = href.replace("?", "?page=1&")
            : href = href.replace("", "?page=1");
         return href;
      }
   }
}




//* Строим Paginator
function paginatorBuild() {

   let countPage = item_id_pagging.length; // item_id_pagging.length

   let countPageMaxDesktop = 11; // Максимальное количество кнопок 
   let countPageMaxMobile = 5; // Максимальное количество кнопок 

   let body = document.querySelector('.paginator__body');
   let activePage = parseInt($_GET('page'));
   body.innerHTML = '';


   if (countPage > 1) {
      matchScreen(); //* Определяем разрешение экрана
      paginatorClick() // Слушаем клики
   }

   function matchDesktop() {
      if (countPage > countPageMaxDesktop) { buildNumbers(countPageMaxDesktop); buildArrows('full'); }
      if (countPage <= countPageMaxDesktop) { buildNumbers(countPage); buildArrows('partial'); }
   }

   function matchMobile() {
      if (countPage > countPageMaxMobile) { buildNumbers(countPageMaxMobile); buildArrows('full'); }
      if (countPage <= countPageMaxMobile) { buildNumbers(countPage); buildArrows('partial'); }
   }

   function matchScreen() {
      let md3 = window.matchMedia("(min-width: 767.98px)");
      function listenMD() { if (md3.matches) { matchDesktop() } else { matchMobile() } }
      listenMD();
      md3.addEventListener('change', listenMD);
   };

   //=============================

   function buildNumbers(counter) {
      let wrapper = document.createElement('div');
      wrapper.classList.add('paginator__numbers');

      for (let index = 0; index < counter; index++) {
         let span = document.createElement('span');
         let stepAround = Math.floor(counter / 2);
         let step = activePage - stepAround + index;
         let stepEnd = (countPage - counter) + (index + 1);

         //По середине
         if (activePage > stepAround && activePage < (countPage - stepAround)) {
            step == activePage ? span.classList.add('_active') : null;
            span.setAttribute('data-page', step);
            span.innerHTML = step;
         }

         //В конце
         if (activePage >= (countPage - stepAround)) {
            stepEnd == activePage ? span.classList.add('_active') : null;
            span.setAttribute('data-page', stepEnd);
            span.innerHTML = stepEnd;
         }

         //В начале
         if (activePage <= stepAround) {
            index == (activePage - 1) ? span.classList.add('_active') : null;
            span.setAttribute('data-page', index + 1);
            span.innerHTML = index + 1;
         }

         wrapper.appendChild(span);
      }

      body.appendChild(wrapper);
   }

   function buildArrows(key) {

      let wrapperLeft = document.createElement('div');
      wrapperLeft.classList.add('paginator__arrow-left');
      wrapperLeft.classList.add('paginator-left');

      let wrapperRight = document.createElement('div');
      wrapperRight.classList.add('paginator__arrow-right');
      wrapperRight.classList.add('paginator-right');

      let spanStart = document.createElement('span');
      spanStart.classList.add('paginator-left__start');
      spanStart.classList.add('_icon-double-arrowrleft');

      let spanPrev = document.createElement('span');
      spanPrev.classList.add('paginator-left__prev');
      spanPrev.classList.add('_icon-arrowleft');

      let spanEnd = document.createElement('span');
      spanEnd.classList.add('paginator-right__end');
      spanEnd.classList.add('_icon-double-arrowright');

      let spanNext = document.createElement('span');
      spanNext.classList.add('paginator-right__next');
      spanNext.classList.add('_icon-arrowright');

      if (activePage == 1) { spanPrev.classList.add('_disable'); spanStart.classList.add('_disable'); }
      if (activePage == countPage) { spanNext.classList.add('_disable'); spanEnd.classList.add('_disable'); }

      switch (key) {
         case 'full':
            wrapperLeft.appendChild(spanStart);
            wrapperLeft.appendChild(spanPrev);

            wrapperRight.appendChild(spanNext);
            wrapperRight.appendChild(spanEnd);
            break;

         case 'partial':
            wrapperLeft.appendChild(spanPrev);
            wrapperRight.appendChild(spanNext);
            break;

         default:
            break;
      }

      body.prepend(wrapperLeft);
      body.appendChild(wrapperRight);
   }
}

//* Отслеживаем click по Paginator
function paginatorClick() {
   let spanArr = document.querySelector('.paginator__body').querySelectorAll('span');
   let activePage = parseInt($_GET('page'));

   for (let index = 0; index < spanArr.length; index++) {
      const spanArrItem = spanArr[index];

      spanArrItem.addEventListener('click', () => {
         let prevClass = spanArrItem.classList.contains('paginator-left__prev');
         let nextClass = spanArrItem.classList.contains('paginator-right__next');
         let attr = spanArrItem.getAttribute('data-page');
         let end = spanArrItem.classList.contains('paginator-right__end');
         let start = spanArrItem.classList.contains('paginator-left__start');
         let disable = spanArrItem.classList.contains('_disable');

         if (!disable) {
            if (attr) { pagingMove(clickSpan('number')) }
            if (nextClass) { pagingMove(clickSpan('next')) }
            if (prevClass) { pagingMove(clickSpan('prev')) }
            if (start) { pagingMove(clickSpan('start')) }
            if (end) { pagingMove(clickSpan('end')) }
         }


         function clickSpan(key) {
            switch (key) {
               case 'number':
                  return attr;
                  break;
               case 'next':
                  return activePage + 1;
                  break;
               case 'prev':
                  return activePage - 1;
                  break;
               case 'start':
                  return 1;
                  break;
               case 'end':
                  return item_id_pagging.length;
                  break;

               default:
                  break;
            }
         }

         function pagingMove(page) {
            goToPage(page); //Переходим на первую страницу
            appendItem(item_id_pagging); //Отрисовываем товары
            scrollTo(0, 400); // Скролл наверх
            paginatorBuild() //Paginator
            halfedPrice(); //Преобразование цены
            lazyLoad.revalidate();
         }
      });
   }
}