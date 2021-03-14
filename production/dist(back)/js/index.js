const parent_idReserve = parent_id;





//Сортируем parent_id
sortParent();
function sortParent() {
   let sortable = [];
   for (let key in parent_id) { sortable.push([key, parent_id[key]]) }
   sortable.sort(function (a, b) { return b[1][2] - a[1][2] });
   parent_id = sortable;
}


buildCategoryes();
function buildCategoryes() {
   const body = document.querySelector('.brands__body');
   body.innerHTML = `
   					<div class="brands__item main__card">
							<a href="?route=veloparking/catalog">
								<img src="/image/catalog/categories/all.jpg" alt="Все велосипеды">
								<p>ВСЕ ВЕЛОСИПЕДЫ<span>(265)</span></p>
							</a>
						</div>
   `;
   parent_id.forEach(element => {
      if (element[1][2]) {
         let wrapper = document.createElement('div');
         wrapper.classList.add('brands__item');
         wrapper.classList.add('main__card');
         wrapper.innerHTML = `
                     <a href="?route=veloparking/catalog&category=${element[0]}">
								<img src="${element[1][1].toLowerCase()}" alt="${element[1][0]}">
								<p>${element[1][0]}<span>(${element[1][2]})</span></p>
							</a>
      `;
         body.appendChild(wrapper);
      }
   });
}

//Даём класс active первому элементу таба
getActiveClass();
function getActiveClass() {
   let links = document.querySelectorAll('.tabs__link');
   let tabs = document.querySelectorAll('.tabs__item');
   if (links.length) { links[0].classList.add('_active') }
   if (tabs.length) { tabs[0].classList.add('_active') }
}


