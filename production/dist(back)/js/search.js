//=======================================================
//Search Page
//=======================================================


//Подзаголовок
subTitle();
function subTitle() {
   let target = document.querySelector('.catalogies__title span');
   target.innerHTML = `Вы искали: «${$_GET('q')}»`;
}



// Результат поиска в item_id_filterTMP
searchMain();
function searchMain() {
   item_id_filterTMP = [];
   let valueSearch = $_GET('q').toUpperCase();
   item_id.forEach(element => {
      const elementName = element['name'].toUpperCase(); // Имя элемента

      if (elementName.indexOf(valueSearch) != -1) {
         item_id_filterTMP.push(element);
      }
   });
}


item_id_filterTMP.sort(ASC);
pageNumberDefault() //Задаём страницу поумолчанию
getValueSelect(); //Получаем значение выбранного SELECT
changeValueSelect(); // Следим за сортировкой (если выберут другую) 
pagingArr(item_id_filterTMP); //Делим каталог на страницы
appendItem(item_id_pagging); //Отрисовываем товары
paginatorBuild() //Paginator
halfedPrice(); //Преобразование цены