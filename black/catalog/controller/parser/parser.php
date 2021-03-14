<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
class ControllerParserParser extends Controller {

	public function index() {
		header('Content-Type: text/html; charset=UTF-8');

		//==============================================
		$URLnovasport = $_SERVER['DOCUMENT_ROOT'].'/catalog/controller/service/bicycle.xml';

		$XML = new XMLReader;
		$XML->open($URLnovasport);
		$doc = new DOMDocument;

		
		/* Собираем всю информацию из XML и раскладываем в массивы $offers_default && $category_default */

		while($XML->read()) {
			if($XML->nodeType === XMLReader::ELEMENT) {

				//Собираем категории
				if($XML->localName === 'category') {
					$node = simplexml_import_dom($doc->importNode($XML->expand(), true));
					if ( !isset( $node['parentId'] ) ){

						$category_default[] = array(
							'name' => trim($node),
							'parentId' => 0,
							'id' => trim($node['id']),
						);

					} else {

						$category_default[] = array(
							'name' => trim($node),
							'parentId' => trim($node['parentId']),
							'id' => trim($node['id']),
						);

					}
				}

				//Собираем товары
				if($XML->localName === 'offer') {
					$node = simplexml_import_dom($doc->importNode($XML->expand(), true));
					$offers_default[] = $node;
				}

			}
		}


		// Получаем иерархию 

		function getTree($category_default, &$arr) { // Передача аргумента по ссылке

			foreach ($arr as $arr_key => &$val) { // И в цикле тоже

				if ( is_array($val) ) {

					$inserter = [];
					foreach ($category_default as $default_key => $default_value) {

						if ( $default_value['parentId'] == $arr_key) { $inserter[$default_value['id']] = []; }

					}

					if (count($val) == 0) { $val = $inserter; }
					getTree($category_default, $val);
				}
			}

		}

		$category_tree[0] = [];
		getTree($category_default, $category_tree);
		
		function getMap(&$tree, $key_tree, &$category_map) {
			$key_tree++;
			foreach ($tree as $key => &$value) {
				
				if ( is_array($value) ) {

					$category_map[] = array(
						'id' => $key,
						'path' => $key_tree,
					);

					getMap($value, $key_tree, $category_map);

				}

			}




		}


		$category_map = [];
		$key_tree = -1;
		getMap($category_tree, $key_tree, $category_map);


		// echo '<pre>'; print_r($category_default); echo '<pre>'; // Категории
		// echo '<pre>'; print_r($offers_default); echo '<pre>';	// Товары
		// echo '<pre>'; print_r($category_tree); echo '<pre>'; // Категории иерархия (массив)
		// echo '<pre>'; print_r($category_map); echo '<pre>'; // Категории иерархия (карта)


		return [
			'category_default' => $category_default, 
			'offers_default' => $offers_default,
			'category_tree' => $category_tree,
			'category_map' => $category_map,
		];
	}
	
}
