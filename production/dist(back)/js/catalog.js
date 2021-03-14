const delayTimeout = 300;
let item_id_filter = []; //Массив для фильтпрации
let selectFilters = []; //Массив для выбранных фильтров

//* После загрузки страницы
afterLoadPage();
function afterLoadPage() {
   pageNumberDefault(); //Задаём страницу по умолчанию
   getTitle(); //Заголовок
   getCaterorySelected(); //Фильтруем каталог по категориям
   getCountItems(); // Количество товаров
   getValueSelect(); //Получаем сортировку по умолчанию
   changeValueSelect(); // Следим за сортировкой (если выберут другую) 

   //Фильтры
   filterPrice(); //Настраиваем фильтр цены
   getParametres(); //Получаем все параметры
   buildFilters(); //Отрисовываем фильтры

   //Rebuild
   spollers(); //Перезарпускаем сборку Spoller
   radioBuild(); //Перезарпускаем сборку Radio
   radio(); //Перезарпускаем сборку Radio
   checkboxBuild(); //Перезарпускаем сборку CheckBox
   checkbox(); //Перезарпускаем сборку CheckBox

   listenClickFilters(); //Прослушиваем все фильтры и создаём отфильтрованный массив
   paginatorBuild(); //Paginator
   halfedPrice(); //Преобразование цены
   lazyLoad.revalidate();
}

//? Functions =======================================================================




//* Фильтруем каталог по категориям
function getCaterorySelected() {
   if ($_GET('category')) {
      let category = $_GET('category');
      let tempArr = [];

      for (let index = 0; index < item_id.length; index++) {
         const item_idItem = item_id[index];
         if (category === item_idItem['categoryId']) {
            tempArr.push(item_idItem);
         }
      }
      item_id = tempArr;
   }
}

//? Фильтр цены
function filterPrice() {
   if (item_id_pagging.length > 1) {
      let divArr = document.querySelector('.filters-catalogies__price').querySelectorAll('div');
      let inputArr = document.querySelector('.filters-catalogies__price').querySelectorAll('input');
      let tempArr = [];
      let countInputs = divArr.length - 1;

      for (let index = 0; index < item_id.length; index++) {
         const item_idItem = item_id[index];
         tempArr.push(parseInt(item_idItem['price'][0]));
      }

      let min = Math.ceil(Math.min.apply(null, tempArr) / 1000) * 1000;
      let max = Math.floor(Math.max.apply(null, tempArr) / 1000) * 1000;
      let stepPrice = (max - min) / countInputs;
      let stepPriceTMP = stepPrice;

      while (stepPriceTMP > 1) {
         stepPriceTMP = stepPriceTMP / 10;
      }

      stepPriceTMP = Math.ceil(stepPriceTMP * 10);

      while (stepPriceTMP < stepPrice) {
         stepPriceTMP = stepPriceTMP * 10;
      }

      stepPrice = stepPriceTMP


      for (let index = 1; index <= countInputs; index++) {
         let priceMax = stepPrice * index;
         let priceMin = priceMax - stepPrice;

         //Если последний
         if (index === countInputs) {
            let priceMaxTMP = max;
            while (priceMaxTMP > 1) {
               priceMaxTMP = priceMaxTMP / 10;
            }
            priceMaxTMP = Math.ceil(priceMaxTMP * 10);
            while (priceMaxTMP < priceMax) {
               priceMaxTMP = priceMaxTMP * 10;
            }
            priceMax = priceMaxTMP;
         }

         inputArr[index].setAttribute('data-min', priceMin);
         inputArr[index].setAttribute('data-max', priceMax);
         inputArr[index].setAttribute('data-label', `${priceMin} - ${priceMax} руб.`);
         inputArr[index].setAttribute('value', `${priceMin} - ${priceMax} руб.`);

         //Если первый
         if (index == 1) {
            inputArr[index].setAttribute('data-label', `Менее ${priceMax} руб.`);
         }
      }
   }
}

//? Получаем все параметры
function getParametres() {
   let bicycleCategory = [] //Категории типов велосипедов
   let frameTypeCategory = [] //Тип рамы
   let yearCategory = [] //Модельный год
   let frameMaterialCategory = [] //Материал рамы
   let breakCategory = [] //Тип тормозов
   let wheelCategory = [] //Диаметр колес

   let bicycleTMP = {};
   let frameTypeTMP = {};
   let yearTMP = {};
   let frameMaterialTMP = {};
   let breakTMP = {};
   let wheelTMP = {};

   //ПОЛУЧАЕМ ВСЕ КАТЕГОРИИ ТОВАРОВ
   //Собираем большой массив

   for (let index = 0; index < item_id.length; index++) {
      const item_idItem = item_id[index];
      getParams('Тип велосипеда', bicycleCategory); //ТИП ВЕЛОСИПЕДА
      getParams('Тип рамы', frameTypeCategory); //ТИП РАМЫ
      getParams('Модельный год', yearCategory); //МОДЕЛЬНЫЙ ГОД
      getParams('Материал рамы', frameMaterialCategory); //МАТЕРИАЛ РАМЫ
      getParams('Тип тормозов', breakCategory); //ТИП ТОРМОЗОВ
      getParams('Диаметр колес', wheelCategory); //ДИАМЕТР КОЛЕС

      //ФУНКЦИЯ ДЛЯ ПОИСКА ПАРАМЕТРОВ
      function getParams(search, per) {
         let param = item_idItem['param'][search];
         if (param) {
            per.push(param);
         }
      }
   }

   groupArr(yearCategory, yearTMP, 'Модельный год'); //ГРУППИРУЕМ МАССИВЫ
   groupArr(wheelCategory, wheelTMP, 'Диаметр колес'); //ГРУППИРУЕМ МАССИВЫ

   groupArr(bicycleCategory, bicycleTMP, 'Тип велосипеда'); //ГРУППИРУЕМ МАССИВЫ
   groupArr(frameTypeCategory, frameTypeTMP, 'Тип рамы'); //ГРУППИРУЕМ МАССИВЫ
   groupArr(frameMaterialCategory, frameMaterialTMP, 'Материал рамы'); //ГРУППИРУЕМ МАССИВЫ
   groupArr(breakCategory, breakTMP, 'Тип тормозов'); //ГРУППИРУЕМ МАССИВЫ

   bicycleCategory = sortObject(bicycleTMP);
   frameTypeCategory = sortObject(frameTypeTMP);
   yearCategory = sortObject(yearTMP);
   wheelCategory = sortObject(wheelTMP);
   frameMaterialCategory = sortObject(frameMaterialTMP);
   breakCategory = sortObject(breakTMP);

   //Соединяем всё в один массив
   item_id_filter.push('Тип велосипеда', 'Тип рамы', 'Модельный год', 'Диаметр колес', 'Материал рамы', 'Тип тормозов');
   for (let index = 0; index < item_id_filter.length; index++) {
      const item_id_filterItem = item_id_filter[index];
      item_id_filter[item_id_filterItem] = [];
   }
   item_id_filter['Тип велосипеда'].push(bicycleCategory);
   item_id_filter['Тип рамы'].push(frameTypeCategory);
   item_id_filter['Модельный год'].push(yearCategory);
   item_id_filter['Диаметр колес'].push(wheelCategory);
   item_id_filter['Материал рамы'].push(frameMaterialCategory);
   item_id_filter['Тип тормозов'].push(breakCategory);
   //? Functions

   //Группируем массивы по категориям
   function groupArr(arrCategory, arrCategoryTMP, search) {
      for (let index = 0; index < arrCategory.length; index++) {
         const arrCategoryItem = arrCategory[index];
         let arrItem = arrCategoryItem.replace(/,/, '.');
         arrCategoryTMP[arrItem] = [];

         for (let index = 0; index < item_id.length; index++) {
            const item_idItem = item_id[index];
            let param = item_idItem['param'][search];
            if (param == arrCategoryItem) {
               arrCategoryTMP[arrItem].push(item_idItem);
            }
         }

      }

   }

   //СОРТИРОВКА ОБЪЕКТОВ
   function sortObject(data) {
      return Object.keys(data).sort((a, b) => data[b].length - data[a].length).reduce((acc, ele) => { acc[ele] = data[ele]; return acc; }, {});
   }
}


//* Добавляем фильтры на страницу
function buildFilters() {
   let filters_catalogies = document.querySelector('.filters-catalogies');
   let appendBefore = document.querySelector('.filters-catalogies__footer');


   item_id_filter.forEach(element => {
      let filtersCatalogies__item = document.createElement('div');
      filtersCatalogies__item.classList.add('filters-catalogies__item');
      filters_catalogies.insertBefore(filtersCatalogies__item, appendBefore);


      let Itemname = element;
      let elementItem = item_id_filter[element][0];

      buildFiltersItem(filtersCatalogies__item, Itemname);

      for (let element__element in elementItem) {
         let categoryName = element__element;
         let categoryCount = elementItem[element__element].length;

         buildFiltersItem__Item(filtersCatalogies__item, categoryName, categoryCount, Itemname);
      }
   });

   //* Добавляем пунктты
   function buildFiltersItem(filtersCatalogies__item, Itemname) {
      filtersCatalogies__item.innerHTML = `
                        <div class="filters-catalogies__title _spoller">
                           <label class="filters-catalogies__label">${Itemname}</label>
                           <span class="filters-catalogies__decor"></span>
                        </div>
                        <div class="filters-catalogies__body">
 
                        </div>`;
   }

   //* Добавляем подпунктты
   function buildFiltersItem__Item(filtersCatalogies__item, categoryName, categoryCount, parent) {
      let filtersCatalogies__item_body = filtersCatalogies__item.querySelector('.filters-catalogies__body');
      let input = document.createElement('input');

      function setAttributes(el, options) {
         Object.keys(options).forEach(function (attr) {
            el.setAttribute(attr, options[attr]);
         })
      }
      setAttributes(input, { 'type': 'checkbox', 'data-label': categoryName, 'data-sublabel': `(${categoryCount})`, 'value': categoryName, 'data-parent': parent });
      filtersCatalogies__item_body.appendChild(input);
   }
}


//* Прослушиваем клики по фильтрам и создаём массив
function listenClickFilters() {
   let inputArr = document.querySelector('.catalogies__filters').querySelectorAll('input');
   let item_id_filterTMP_price = [];
   let item_id_filterTMP_checkbox = [];
   for (let index = 0; index < inputArr.length; index++) {
      const inputArrItem = inputArr[index];
      let inputButton = inputArrItem.closest('div');
      inputButton.addEventListener('click', function () {
         let inputType = inputArrItem.getAttribute('type');

         switch (inputType) {
            case 'radio':
               radio();
               break;

            case 'checkbox':
               checkBox();
               break;

            default:
               break;
         }

         unification();
         buildBage(inputButton);

         function checkBox() {
            let checkboxActive = document.querySelector('.catalogies__filters').querySelectorAll('._checkbox._active');
            item_id_filterTMP_checkbox = [];
            for (let index = 0; index < checkboxActive.length; index++) {
               const checkboxActiveItem = checkboxActive[index];
               let value = checkboxActiveItem.querySelector('input').getAttribute('value');
               let parent = checkboxActiveItem.querySelector('input').getAttribute('data-parent');

               for (let index = 0; index < item_id.length; index++) {
                  const item_idItem = item_id[index];
                  let param = item_idItem['param'][parent];
                  if (param == value) {
                     item_id_filterTMP_checkbox.push(item_idItem);
                  }
               }
            }
         }

         function radio() {
            let radioWrappers = document.querySelectorAll('._radio');
            item_id_filterTMP_price = [];
            for (let index = 0; index < radioWrappers.length; index++) {
               const radioWrappersItem = radioWrappers[index];
               let radioButton = radioWrappersItem.querySelector('._radio-item._active');
               let min = parseInt(radioButton.querySelector('input').getAttribute('data-min'));
               let max = parseInt(radioButton.querySelector('input').getAttribute('data-max'));

               for (let index = 0; index < item_id.length; index++) {
                  const item_idItem = item_id[index];
                  let price = parseInt(item_idItem['price'][0]);
                  if (min < price && price < max) {
                     item_id_filterTMP_price.push(item_idItem);
                  }
               }
            }
         }

         function unification() {
            item_id_filterTMP = [];

            let priceLength = item_id_filterTMP_price.length;
            let checkLength = item_id_filterTMP_checkbox.length;

            if (priceLength && checkLength) {

               for (let index = 0; index < item_id_filterTMP_price.length; index++) {
                  const priceItem = item_id_filterTMP_price[index];
                  let priceVendor = priceItem['vendorCode'];

                  for (let index = 0; index < item_id_filterTMP_checkbox.length; index++) {
                     const checkboxItem = item_id_filterTMP_checkbox[index];
                     let checkVendor = checkboxItem['vendorCode'];

                     if (checkVendor == priceVendor) {
                        item_id_filterTMP.push(checkboxItem);
                     }

                  }
               }

            }

            if (!priceLength && checkLength) { item_id_filterTMP = item_id_filterTMP_checkbox }

            if (priceLength && !checkLength) { item_id_filterTMP = item_id_filterTMP_price }

         }

      });
   }

}


//* Применяем фильтры (зависимость от listenClickFilters)
function filterApply() {
   setTimeout(() => {
      let applyButton = document.querySelector('.filters-catalogies__apply');
      let applyBage = document.querySelector('.filters-catalogies__bage');

      if (item_id_filterTMP.length) {
         applyButton.classList.remove('_disable');
         clickApply(applyButton);
         clickApply(applyBage);

      } else {
         applyButton.classList.add('_disable');
         pagingArr(item_id); //Делим каталог на страницы
         appendItem(item_id_pagging); //Отрисовываем товары
         document.querySelector('.bages-filter').innerHTML = ''; //Удаляем бэйджи в шапке
         paginatorBuild() //Paginator
         halfedPrice(); //Преобразование цены
         lazyLoad.revalidate();
      }
   }, delayTimeout);

}


//! Клик по кнопкам "Применить"
function clickApply(button) {
   button.addEventListener('click', () => {
      listTaskFilters();
   });
}

// Техническая функция для применения фильтров
function listTaskFilters() {
   goToPage(1); //Переходим на первую страницу
   getValueSelect(); //Получаем значение выбранного SELECT
   pagingArr(item_id_filterTMP); //Делим каталог на страницы
   appendItem(item_id_pagging); //Отрисовываем товары
   setAttrSelect('item_id_filterTMP'); //Меняем массив для Select
   destroyBage(); // Удаляем все бэйджи
   scrollTo(0, 400); // Скролл наверх
   getSelectFilters(); // Получаем выбранные фильтры
   buildHeaderBage(); //Создаём бэджи в шапке
   resetFilters(); //Сбрасываем фильтры (запоминаем новые кнопки)
   closeMobileFilters();
   getCountItems();
   delSelectFiltersHeader(); //Удаляем фильтры по одному
   paginatorBuild() //Paginator
   halfedPrice(); //Преобразование цены
   lazyLoad.revalidate();
}

function closeMobileFilters() {
   document.querySelector('.catalogies__filters').classList.remove('_active');
   document.querySelector('body').classList.remove('_lock');
}

//* Создаём бэйдж
function buildBage(el) {
   let parent = el.closest('.filters-catalogies__item');

   //Удаляем старые бэйджи
   destroyBage();

   //Создаём новый бэйдж
   let bageItem = document.createElement('button');
   let filtersLength = item_id_filterTMP.length;
   if (filtersLength) {
      bageItem.classList.add('filters-catalogies__bage');
      bageItem.innerHTML = `Показать ${filtersLength}`;
      parent.appendChild(bageItem);
      setTimeout(() => {
         bageItem.classList.add('_active');
      }, 1);
   }
   filterApply(); //
}

//* Удаляем все бэйджи
function destroyBage() {
   let oldBage = document.querySelector('.filters-catalogies').querySelectorAll('.filters-catalogies__bage');
   //Удаляем старые бэйджи
   if (oldBage.length) {
      for (let index = 0; index < oldBage.length; index++) {
         const element = oldBage[index];
         element.classList.remove('_active');
         setTimeout(() => {
            element.remove();
         }, delayTimeout);
      }
   }
}

//? Задаём Select название массива по которому сортируем
function setAttrSelect(attr) {
   let options = document.querySelector('.catalogies__sort').querySelectorAll('option');
   for (let index = 0; index < options.length; index++) {
      const optionsItem = options[index];
      let arrName = optionsItem.setAttribute('data-arr', attr);
   }
}


//* Получаем выбранные фильтры
function getSelectFilters() {
   selectFilters = [];
   let inputs = document.querySelector('.filters-catalogies').querySelectorAll('input');
   for (let index = 0; index < inputs.length; index++) {
      const inputsItem = inputs[index];
      let parent = inputsItem.closest('div');
      if (parent.classList.contains('_active')) {
         let value = inputsItem.getAttribute('value');
         if (value !== '0') {
            selectFilters.push(value);
         }

      }
   }

}

//*Создаём бэджи в шапке
function buildHeaderBage() {
   let wrapper = document.querySelector('.bages-filter');
   wrapper.innerHTML = '';

   if (selectFilters.length) {

      let resetButton = document.createElement('div');
      resetButton.classList.add('bages-filter__item');
      resetButton.classList.add('bages-filter__item-reset');
      resetButton.innerHTML = '<span class="bages-filter__name">Сбросить фильтры</span>';
      wrapper.appendChild(resetButton);


      for (let index = 0; index < selectFilters.length; index++) {
         const selectFiltersItem = selectFilters[index];
         let bage = document.createElement('div');
         bage.classList.add('bages-filter__item');
         bage.innerHTML = `
                        <span class="bages-filter__name">${selectFiltersItem}</span>
                        <span class="bages-filter__close _icon-close"></span>
      `;
         wrapper.appendChild(bage);
      }

   }

}

//* Сбрасываем фильтры
function resetFilters() {
   let buttonDown = document.querySelector('.filters-catalogies__cancel');
   let buttonHeader = document.querySelector('.bages-filter__item-reset');

   if (buttonHeader) { reset(buttonHeader) }
   reset(buttonDown);

   function reset(button) {
      button.addEventListener('click', () => {
         resetFiltersTech();
      })
   }

}

// Техническая функция для сброса фильтров
function resetFiltersTech() {
   item_id_filterTMP = [];
   document.querySelector('.bages-filter').innerHTML = ''; //Удаляем бэйджи в шапке
   cleanActiveInput(); //Удаляем бэйджи в шапке
   goToPage(1); //Переходим на первую страницу
   getValueSelect(); //Получаем значение выбранного SELECT
   pagingArr(item_id); //Делим каталог на страницы
   appendItem(item_id_pagging); //Отрисовываем товары
   setAttrSelect('item_id'); //Задаём основной массив
   scrollTo(0, 400); // Скролл наверх
   getCountItems();
   paginatorBuild() //Paginator
   halfedPrice(); //Преобразование цены
   lazyLoad.revalidate();

   function cleanActiveInput() {
      let inputs = document.querySelector('.filters-catalogies').querySelectorAll('input');
      for (let index = 0; index < inputs.length; index++) {
         const inputsItem = inputs[index];
         let parent = inputsItem.closest('div');
         parent.classList.remove('_active');
      }
   }

}


//* Удаляем фильтры по одному (в шапке)
function delSelectFiltersHeader() {
   let bagesArr = document.querySelector('.bages-filter').querySelectorAll('.bages-filter__item');
   let inputArr = document.querySelector('.filters-catalogies').querySelectorAll('input');
   let tmpArr = [];

   for (let index = 0; index < bagesArr.length; index++) {
      const bagesArrItem = bagesArr[index];

      if (!bagesArrItem.classList.contains('bages-filter__item-reset')) {
         bagesArrItem.addEventListener('click', () => {
            let name = bagesArrItem.querySelector('.bages-filter__name').innerHTML;

            for (let index = 0; index < inputArr.length; index++) {
               const inputArrItem = inputArr[index];
               let val = inputArrItem.getAttribute('value')
               let parentFilter = inputArrItem.getAttribute('data-parent')

               if (val == name) {
                  inputArrItem.closest('div').classList.remove('_active');

                  for (let index = 0; index < item_id_filterTMP.length; index++) {
                     const filterItem = item_id_filterTMP[index];
                     if (filterItem['param'][parentFilter] !== name) {
                        tmpArr.push(filterItem);
                     }
                  }
               }
            }

            item_id_filterTMP = tmpArr;
            if (item_id_filterTMP.length) { listTaskFilters() } else { resetFiltersTech() }

         });
      }

   }

}

//*Задаём заголовок
function getTitle() {
   let name;
   let title;

   if ($_GET('category')) {
      name = parent_id[$_GET('category')][0];
      title = document.querySelector('.catalogies__title').querySelector('h1');
      title.innerHTML = `Велосипеды ${name}`;
   } else {
      title = document.querySelector('.catalogies__title').querySelector('h1');
      title.innerHTML = `Все велосипеды`;
   }
}

//* Пишем количество товаров
function getCountItems() {
   let count;
   let titleCounter = document.querySelector('.catalogies__title').querySelector('span');

   if (item_id_filterTMP.length) { count = item_id_filterTMP.length } else { count = item_id.length }

   titleCounter.innerHTML = `Найдено: ${count} ${num2str(count, ['товар', 'товара', 'товаров'])}`;
}

//* Склоняем числа
function num2str(n, text_forms) {
   n = Math.abs(n) % 100; var n1 = n % 10;
   if (n > 10 && n < 20) { return text_forms[2]; }
   if (n1 > 1 && n1 < 5) { return text_forms[1]; }
   if (n1 == 1) { return text_forms[0]; }
   return text_forms[2];
}




//==========================================================================