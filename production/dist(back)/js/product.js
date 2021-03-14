let specialsArr = []; //Массив для похожих товаров

let brand = item_result['param']['Бренд'];
let type = item_result['param']['Тип велосипеда'];
let year = item_result['param']['Модельный год'];
let frame = item_result['param']['Материал рамы'];
let vendorCode = item_result['vendorCode'];
let price = item_result['price'][0];

let select;

specialsParser(); //* Собираем похожие товары в массив specialsArr
buildSpecials(); //* Строим похожие товары
buildCharacter(); //? Строим тело POPUP для выбора характеристик
listenSelectOption(); //? Прослушиваем выбор SELECT
addToCart(); //? Прослушиваем подтверждение в POPUP
checkInsertCart(); //? Проверяем содержимое корзины





//* Собираем похожие товары в массив specialsArr
function specialsParser() {
   let maxSpecials = 20; //Максимальное количество похожих товаров 

   let tmpArr = [];
   item_id.sort(ASC);

   //Собираем все велосипеды
   specialsArr = item_id;


   //Собираем совпадения по ТИПУ ВЕЛОСИИЕДА
   if (specialsArr.length > maxSpecials) {
      tmpArr = [];

      for (let index = 0; index < specialsArr.length; index++) {
         const specialsArrItem = specialsArr[index];

         if (specialsArrItem['param']['Тип велосипеда'] == type) {
            tmpArr.push(specialsArrItem);
         }
      }
      specialsArr = tmpArr;
   }


   //Собираем совпадения по ЦЕНЕ
   if (specialsArr.length > maxSpecials) {
      tmpArr = [];
      tmpCounter = [];
      let INDEX;


      //Получаем Index активного элемента
      for (let index = 0; index < specialsArr.length; index++) {
         const specialsArrItem = specialsArr[index];
         if (specialsArrItem['vendorCode'] == vendorCode) {
            INDEX = index;
         }
      }

      //Получаем индексы похожих элементов
      let countMin = INDEX - (maxSpecials / 2);
      let countMax = INDEX + (maxSpecials / 2);

      //Минимум
      if (countMin < 0) {
         countMax = countMax + (countMin * -1);
      }

      //Максимум
      if (countMax > specialsArr.length) {
         countMin = (countMin - (countMax - specialsArr.length)) - 1;
      }


      for (let index = 0; index < specialsArr.length; index++) {
         const specialsArrItem = specialsArr[index];
         if (index >= countMin && index <= countMax && index != INDEX) {
            tmpArr.push(specialsArrItem);
         }
      }

      specialsArr = tmpArr;

   }

}

//* Строим похожие товары
function buildSpecials() {
   let body = document.querySelector('.specials-product');
   body.innerHTML = '';
   for (let index = 0; index < specialsArr.length; index++) {
      const specialsArrItem = specialsArr[index];
      let
         vendorCode = specialsArrItem['vendorCode'],
         picture = specialsArrItem['picture'],
         name = specialsArrItem['name'],
         price = specialsArrItem['price'][0];

      let wrapper = document.createElement('div');
      wrapper.classList.add('specials-product__item');
      wrapper.innerHTML = `
                        <div class="catalog-item">
                           <div class="catalog-item__img img-catalog">
                              <div class="img-catalog__wrapper">
                                 <a class="img-catalog__link" href="?route=veloparking/product&amp;id=${vendorCode}">
                                    <img class="img-catalog__img swiper-lazy" src="${lazyImage}" data-src="${picture}" alt="">
                                    <div class="img-catalog__stickers stickers">
                                    </div>
                                 </a>
                              </div>
                           </div>
                           <div class="catalog-item__info info-catalog">
                              <div class="info-catalog__line">
                                 <a href="?route=veloparking/product&amp;id=${vendorCode}" class="info-catalog__name">${name}</a>
                              </div>
                              <div class="info-catalog__line">
                                 <div class="info-catalog__price _price">${price} <span class="_rub"></span></div>
                                 <a href="?route=veloparking/product&amp;id=${vendorCode}" class="info-catalog__link main__button">Подробнее</a>
                              </div>
                           </div>
                        </div>
      `;
      for (key in stickers) {
         stickers[key].forEach(element => {
            if (element == vendorCode) {
               let stickersWrapper = wrapper.querySelector('.img-catalog__stickers');
               let sticker = document.createElement('div');
               sticker.classList.add('stickers__sticker');
               sticker.classList.add(`stickers__${key}`);
               stickersWrapper.appendChild(sticker);
            }
         });
      }
      body.appendChild(wrapper);
   }
   swiperBuild(); //Перестраиваем slider
   specialsInit(); //Инициализируем
   halfedPrice(); //Преобразование цены
}



//? Строим тело POPUP для выбора характеристик
function buildCharacter() {
   let body = document.querySelector('.character__body');
   let button = document.createElement('button');
   button.classList.add('main__button');
   button.classList.add('character__submit');
   button.classList.add('_popup-close__user');
   button.innerHTML = 'Подтвердить';
   body.innerHTML = `
                     <div class="popup__close _icon-close"></div>
                     <h2 class="character__title">Выберите характеристику товара</h2>
                     <select>
                        <option value="0" selected="selected">Не выбрано</option>
                     </select>`;


   for (let index = 0; index < item_result['size'].length; index++) {
      const size = item_result['size'][index];
      let option = document.createElement('option');
      option.setAttribute('value', size);
      option.innerHTML = size;
      body.querySelector('select').appendChild(option);
   }
   selectInit();
   popupInit();
   body.appendChild(button);
}

//? Прослушиваем выбор SELECT
function listenSelectOption() {
   let button = document.querySelector('.character__submit');
   checkAddToCard();
   document.querySelector('.character').addEventListener('click', () => {
      checkAddToCard();
   });

   function checkAddToCard() {
      let options = document.querySelector('.character').querySelectorAll('option');
      for (let index = 0; index < options.length; index++) {
         const optionsItem = options[index];
         if (optionsItem.selected) {
            if (optionsItem.getAttribute('value') !== '0') { button.classList.remove('_disable'); select = optionsItem.getAttribute('value'); } else { button.classList.add('_disable') }
         }
      }
   }
}


//? Прослушиваем подтверждение в POPUP
function addToCart() {
   let button = document.querySelector('.character__submit');
   let options = document.querySelector('.character').querySelectorAll('option');

   for (let index = 0; index < options.length; index++) {
      const optionsItem = options[index];
      if (optionsItem.selected) {
         select = optionsItem.getAttribute('value');
      }
   }

   button.addEventListener('click', () => {
      //Закрываем POPUP
      button.closest('.popup').classList.remove('_active');
      history.pushState('', '', window.location.href.split('#')[0]);
      body_lock_remove(500);

      saveToCart(vendorCode, select);
      checkInsertCart();
      syncStorageSQL();
   });
}

//? Проверяем содержимое корзины
function checkInsertCart() {
   if (localStorage['cart']) {
      let button = document.querySelector('._popup_character__open');
      let parent = button.closest('.product-item__row');
      let LocalStorage = JSON.parse(localStorage.getItem('cart'));
      let LocalStorageArr = Object.keys(LocalStorage);

      for (let index = 1; index <= LocalStorageArr.length; index++) {
         const LocalStorageArrItem = Object.keys(LocalStorage[index])[0];

         if (vendorCode == LocalStorageArrItem) {
            parent.classList.add('product-item__to-cart');
            modifyButton();
            bageCart();
         }
      }
   }
}

//? Изменяем кнопку в зависимости от наполненности корзины
function modifyButton() {
   let parent = document.querySelector('.product-item__to-cart');
   let LocalStorage = JSON.parse(localStorage.getItem('cart'));
   let LocalStorageArr = Object.keys(LocalStorage);
   let counter = 0;

   for (let index = 1; index <= LocalStorageArr.length; index++) {
      const LocalStorageArrItem = Object.keys(LocalStorage[index])[0];

      if (vendorCode == LocalStorageArrItem) {
         counter++;
      }
   }

   parent.innerHTML = '';
   let link = document.createElement('a');
   link.classList.add('product-item__link');
   link.classList.add('_popup-link');
   link.setAttribute('href', 'cart');
   link.innerHTML = `В корзине ${counter} шт.
                     <span>Перейти в корзину</span>`
   let newButton = document.createElement('a');
   newButton.classList.add('product-item__count');
   newButton.classList.add('_popup-link');
   newButton.classList.add('_popup_character__open');
   newButton.setAttribute('href', '#character');
   newButton.innerHTML = '+1 шт.'
   parent.appendChild(link);
   parent.appendChild(newButton);
   popupInit();
}

