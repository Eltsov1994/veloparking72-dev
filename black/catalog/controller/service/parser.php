<?

class ControllerServiceParser extends Controller {
	public function index() {
		header('Content-Type: text/html; charset=UTF-8');

		//==============================================
		$URLnovasport = $_SERVER['DOCUMENT_ROOT'].'/catalog/controller/service/novasport.xml';

		$XML = new XMLReader;
		$XML->open($URLnovasport);
		$doc = new DOMDocument;


		$exceptions = [
			[
				'comment' => 'DESNA',
				'id' => '2718',
			],
			[
				'comment' => 'HOGGER',
				'id' => '2721',
			],
		]; // Заготовка (не работает)

		$parentId = [
			[
				'name' => 'Велосипеды',
				'parentId' => '1528',
				'id' => '1057',
			],
			[
				'name' => 'Аксессуары для велосипедов',
				'parentId' => '1528',
				'id' => '1423',
			],
			[
				'name' => 'Велозапчасти',
				'parentId' => '1528',
				'id' => '1101',
			],
		];



		//=====================ПАРСИНГ=========================

		//--------------------------------------------------------------------
		//--------------------------------------------------------------------
		/* Собираем всю информацию из XML и раскладываем в массивы $offers_default && $category_default */

		while($XML->read()) {
			if($XML->nodeType === XMLReader::ELEMENT) {

				//Собираем категории
				if($XML->localName === 'category') {
					$node = simplexml_import_dom($doc->importNode($XML->expand(), true));
					if ( isset($node['id']) && isset($node['parentId']) ){
						$category_default[] = array(
							'name' => trim($node),
							'parentId' => trim($node['parentId']),
							'id' => trim($node['id']),
						);

					}
				}

				//Собираем товары
				if($XML->localName == 'offer') {
					$node = simplexml_import_dom($doc->importNode($XML->expand(), true));
					$offers_default[] = $node;
				}

			}
		}

		//--------------------------------------------------------------------
		
		//--------------------------------------------------------------------
		//--------------------------------------------------------------------
		//Собираем массив из дочерних parent_id относительно заданых категорий в переменную category_all



		function getCategories($arr, $category_default){

			$checked = $arr;

			foreach ($arr as $user_value) {

				foreach ($category_default as $default_value) {

					if ($default_value['parentId'] === $user_value['id']){

						$checked[] = $default_value;

					}
				}

			}

			$checked = array_unique($checked, SORT_REGULAR);
			$arr = array_unique($arr, SORT_REGULAR);


			if ($checked !== $arr) { 
				$arr = $checked;
				getCategories($arr, $category_default);
			} else {
				$GLOBALS['category_all'] = $arr;
			}


		}
		getCategories($parentId, $category_default);
		$category_all = $GLOBALS['category_all'];



		//--------------------------------------------------------------------
		//--------------------------------------------------------------------
		//Собираем массив всех товаров отобранных категорий в переменную offers_all

		function getOffers($offers_default){
			foreach ($offers_default as $default_key => $default_value) {
				$categoryId = trim($default_value -> categoryId);

				foreach ($GLOBALS['category_all'] as $all_key => $all_value) {
					
					if ( $categoryId === $all_value['parentId'] ){

						$GLOBALS['offers_all'][] = $default_value;
						break;

					}

				}

			}

		}
		getOffers($offers_default);
		$offers_all = $GLOBALS['offers_all'];


		return ['$category_all' => $category_all, '$offers_all' => $offers_all];
	}
}


?>