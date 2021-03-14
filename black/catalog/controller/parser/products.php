<?php

class ControllerParserProducts extends Controller {
	public function index($parser) {

      $category_default = $parser['category_default'];
      $offers_default = $parser['offers_default'];

		$date_added = date("Y-m-d H:i:s");
      $date_available = date("Y-m-d");


		/* Каталог =================================================================== */

		// oc_product
		$product_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "product")->rows;
		foreach ($offers_default as $default_key => $default_value) {

			foreach ($product_db as $db_value) { if ($db_value['product_id'] == $default_value['id']){

				// Обновляем существующие записи
				$this->db->query("UPDATE " . DB_PREFIX . "product SET
				price = ". trim($default_value -> {'price-0'}) .",
				quantity = 999
				WHERE product_id = ". $default_value['id'] );
				continue 2;

			} }

			// Добавляем новые записи
			//if ( $default_value['available'] == 'true'  ){ $quantity = 999; } else { $quantity = 0; }

			if ( isset( $default_value -> param ) ){
				foreach ( $default_value -> param as $key => $value) {
					if ( trim($value['name']) === 'Модельный год'){
						$model_year = trim($value);
						$date_available = date($model_year . "-m-d");
						$date_added = date($model_year . "-m-d H:i:s");
						break;
					}
				}
			} else {
				$model_year = '2020';
				$date_available = date($model_year . "-m-d");
				$date_added = date($model_year . "-m-d H:i:s");
			}


			$this->db->query("INSERT INTO " . DB_PREFIX . "product SET 
			product_id = ". trim($default_value['id']) .", 
			model = ". trim($default_value['id']) .", 
			quantity = 999, 
			stock_status_id = 5, 
			image = '". trim($default_value -> picture) ."',  
			manufacturer_id = ". trim($default_value -> categoryId) .",  
			shipping = 1,  
			price = ". trim($default_value -> {'price-0'}) .",  
			tax_class_id = 0,  
			weight_class_id = 1,  
			length_class_id = 1,  
			subtract = 0,  
			sort_order = 1,  
			status = 1,  
			date_available = '". $date_available ."',  
			date_added = '". $date_added ."',  
			date_modified = '". $date_added . "'");

		}

		// Нет в наличии
		foreach ($product_db as $db_value){
			foreach ($offers_default as $default_key => $default_value) {
				if ($db_value['product_id'] == $default_value['id']){
					continue 2;
				}
			}

			// Обновляем статус наличия у отсутсвующих товаров
			$this->db->query("UPDATE " . DB_PREFIX . "product SET
			quantity = 0 
			WHERE product_id = ". $db_value['product_id'] );
		}


		// oc_product_description
		$product_description_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_description")->rows;
		foreach ($offers_default as $default_key => $default_value) {

			foreach ($product_description_db as $db_value) { if ($db_value['product_id'] == $default_value['id']){ continue 2; } }

			// Добавляем новые записи
			$this->db->query("INSERT INTO " . DB_PREFIX . "product_description SET 
			product_id = ". trim($default_value['id']) .", 
			language_id = 1, 
			name = '". str_replace('"', '`', (str_replace("'", "`", trim($default_value -> name) ))) ."', 
			description = '". str_replace('"', '`', (str_replace("'", "`", trim($default_value -> description) ))) ."', 
			meta_h1 = '". str_replace('"', '`', (str_replace("'", "`", trim($default_value -> name) ))) ."'");

		}

		
		// oc_product_to_store
		$product_to_store_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_to_store")->rows;
		foreach ($offers_default as $default_key => $default_value) {

			foreach ($product_to_store_db as $db_value) { if ($db_value['product_id'] == $default_value['id']){ continue 2; } }

			// Добавляем новые записи
			$this->db->query("INSERT INTO " . DB_PREFIX . "product_to_store SET 
			product_id = ". trim($default_value['id']) );

		}


		// oc_product_to_layout
		$product_to_layout_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_to_layout")->rows;
		foreach ($offers_default as $default_key => $default_value) {

			foreach ($product_to_layout_db as $db_value) { if ($db_value['product_id'] == $default_value['id']){ continue 2; } }

			// Добавляем новые записи
			$this->db->query("INSERT INTO " . DB_PREFIX . "product_to_layout SET 
			product_id = ". trim($default_value['id']) .", 
			store_id = 0, 
			layout_id = 0");

		}


		// oc_product_to_category
		$product_to_category_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_to_category")->rows;
		foreach ($offers_default as $default_key => $default_value) {

			foreach ($product_to_category_db as $db_value) { if ($db_value['product_id'] == $default_value['id']){ continue 2; } }

			// Добавляем новые записи
			$this->db->query("INSERT INTO " . DB_PREFIX . "product_to_category SET 
			product_id = ". trim($default_value['id']) .", 
			category_id = ". trim($default_value -> categoryId) .", 
			main_category = 0");

		}
		/* Каталог =================================================================== */


		/* Опции товара ============================================================== */
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_option");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "option_value");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "option_value_description");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_option_value");

		foreach ($offers_default as $default_key => $default_value) {

			// oc_product_option
			$this->db->query("INSERT INTO " . DB_PREFIX . "product_option SET 
			product_option_id = ". trim($default_value['id']) .", 
			product_id = ". trim($default_value['id']) .", 
			option_id = 13, 
			required = 1");

			for ($i = 0; count($default_value->{'size-'.(string) $i}) > 0 ; $i++) {

				// oc_option_value
				$this->db->query("INSERT INTO " . DB_PREFIX . "option_value SET 
				option_value_id = ". $default_value['id'] . $i .", 
				option_id = 13,
				sort_order = 0");


				// Стоимость опции
				if ( $i !== 0 ){
					$pre_price = (int) trim($default_value->{'price-0'}) - (int) trim($default_value->{'price-'.(string) $i});
					$pre_price = -$pre_price;
					switch (gmp_sign($pre_price)) {
						case 0: $price_prefix = '+'; break;
						case 1: $price_prefix = '+'; break;
						case -1: $price_prefix = '-'; break;
					}
					$price = abs($pre_price);
				} else { $price = 0; $price_prefix = '+'; }

				// oc_product_option_value
				$this->db->query("INSERT INTO " . DB_PREFIX . "product_option_value SET 
				product_option_value_id = ". $default_value['id'] . $i .", 
				product_option_id = ". $default_value['id'] .", 
				product_id = ". $default_value['id'] .", 
				option_id = 13,
				option_value_id = ". $default_value['id'] . $i .", 
				quantity = 0,
				subtract = 0,
				price = ". $price .",
				price_prefix = '". $price_prefix ."',
				points = 0,
				points_prefix = '+',
				weight = 0,
				weight_prefix = '+'");

				if ( trim( $default_value->{'size-'.(string) $i} ) != '' ){

					// oc_option_value_description
					$this->db->query("INSERT INTO " . DB_PREFIX . "option_value_description SET 
					option_value_id = ". $default_value['id'] . $i .", 
					language_id = 1, 
					option_id = 13,
					name = '". str_replace('"', '`', (str_replace("'", "`", trim($default_value->{'size-'.(string) $i}) ))) ."'");

				} else {
					// oc_option_value_description
					$this->db->query("INSERT INTO " . DB_PREFIX . "option_value_description SET 
					option_value_id = ". $default_value['id'] . $i .", 
					language_id = 1, 
					option_id = 13,
					name = '". str_replace('"', '`', (str_replace("'", "`", trim($default_value->name) ))) ."'");
				}

      	}

		}
		/* Опции товара ============================================================== */



		/* Характеристики ============================================================ */
		foreach ($offers_default as $default_key => $default_value) {
			foreach ($default_value->param as $param_key => $param_value) {
				$param_keys[] = trim($param_value['name']); 
			}
		}
		$param_keys = array_values(array_unique($param_keys));


		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "attribute");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "attribute_description");
		for ($i = 1; $i <= count($param_keys); $i++) { 

			// oc_attribute
			$this->db->query("INSERT INTO " . DB_PREFIX . "attribute SET 
			attribute_id = ". $i .", 
			attribute_group_id = 8, 
			sort_order = 0");


			// oc_attribute_description
			$this->db->query("INSERT INTO " . DB_PREFIX . "attribute_description SET 
			attribute_id = ". $i .", 
			language_id = 1, 
			name = '". $param_keys[$i - 1] ."'");

		}

		//Записываем в товары
		$product_in_table = $this->db->query("SELECT * FROM " . DB_PREFIX . "product")->rows;

		$attribute_in_table = $this->db->query("SELECT *  FROM " . DB_PREFIX . "attribute_description")->rows;
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_attribute");

		foreach ($offers_default as $default_key => $default_value) {
			$params_arr = [];

			// Удаляем дубликаты
			foreach ($default_value->param as $param_value) { $params_arr[ trim($param_value['name']) ] = trim($param_value); }

			foreach ($params_arr as $param_key => $param_value) {
				foreach ($attribute_in_table as $attribute_key => $attribute_value) {
					if ($param_key === $attribute_value['name']){

						//oc_attribute
						$this->db->query("INSERT INTO " . DB_PREFIX . "product_attribute SET 
						product_id = ". trim($default_value['id']) .", 
						attribute_id = ". $attribute_value['attribute_id'] .", 
						language_id = 1, 
						text = '". str_replace('"', '`', (str_replace("'", "`", $param_value))) ."'");

					}

				}
			}

		}

		/* Характеристики ============================================================ */




		/* Похожие товары ============================================================ */

		// Велосипеды
		$oc_product_attribute = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE attribute_id = 7")->rows;
		foreach ($oc_product_attribute as $attribute_value) {
			foreach ($oc_product_attribute as $attribute_related_value) {
				if ( $attribute_value['text'] == $attribute_related_value['text'] ){

					foreach ($offers_default as $default_value) {
						if ( trim($default_value['id']) === trim($attribute_value['product_id']) ){
							$product_price = trim($default_value -> {'price-0'});
						}
						if ( trim($default_value['id']) === trim($attribute_related_value['product_id']) ){
							$related_price = trim($default_value -> {'price-0'});
						}
					}

					$related_arr[ trim($attribute_value['product_id']) ][] = array(
						'product_id' => trim($attribute_value['product_id']),
						'related_id' => trim($attribute_related_value['product_id']),
						'product_price' => $product_price,
						'related_price' => $related_price,
					); 
					
				}
			}
		}

		// Аксессуары для велосипедов + Запчасти
		$oc_category_path = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_path WHERE level = 1")->rows;
		foreach ($oc_category_path as $path_value) {
			if ( $path_value['category_id'] !== $path_value['path_id'] && $path_value['path_id'] != 1057 ){

				foreach ($offers_default as $default_value) {
					if ( trim($default_value -> categoryId) == $path_value['category_id'] ){ $no_bicycle[] = $default_value; }
				}

			}
		}

		foreach ($no_bicycle as $no_value) {
			foreach ($no_bicycle as $no_related_value) {

				if ( trim($no_value -> categoryId) == trim($no_related_value -> categoryId) ){

					$related_arr[ trim($no_value['id']) ][] = array(
						'product_id' => trim($no_value['id']),
						'related_id' => trim($no_related_value['id']),
						'product_price' => trim($no_value ->{'price-0'}),
						'related_price' => trim($no_related_value ->{'price-0'}),
					); 

				}

			}
		}


		foreach ($related_arr as $key => &$value) {
			usort($value, function(&$a, &$b){
				return (trim($a['related_price']) - trim($b['related_price']));
			});
		}

		foreach ($related_arr as $related_key => $related_value) {
			if (count($related_value) > 20){
				foreach ($related_value as $key_key => $value_value) {
					if ($value_value['product_id'] == $value_value['related_id']){

						$min_key = $key_key - 10;
						$max_key = $key_key + 10;

						if ($min_key <= 0) {
							$min_key = 0;
							$max_key = 20;
						}

						if ($max_key >= count($related_value)) {
							$min_key = count($related_value) - 20;
							$max_key = count($related_value);
						}


					}
				}

				foreach ($related_value as $key_key => $value_value) {
					if ($key_key >= $min_key && $max_key >= $key_key){
						$new_related_arr[] = $value_value;
					}
				}

			} else {
				$new_related_arr[] = $related_value;
			}
		}

		$new_related_arr = array_values(array_unique($new_related_arr, SORT_REGULAR));


		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_related");
		foreach ($new_related_arr as $related_key => $related_value) {

			if (isset($related_value['product_id']) && isset($related_value['related_id'])){
				
				if ( $related_value['product_id'] !== $related_value['related_id'] ){
					//oc_product_related
					$this->db->query("INSERT INTO " . DB_PREFIX . "product_related SET 
					product_id = ". $related_value['product_id'] .", 
					related_id = ". $related_value['related_id']);
				}

			}


		}

		/* Похожие товары ============================================================ */


		/* SEO товары ================================================================ */

		function clean_search_string($s) {
			$s = preg_replace('/[^a-zA-ZА-Яа-я0-9 ]/ui', '',$s );
			$s = preg_replace('/ /ui', '_',$s );
			return $s;
		}

		function translit($s) {
			$s = (string) $s; // преобразуем в строковое значение
			$s = trim($s); // убираем пробелы в начале и конце строки
			$s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
			$s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
			return $s; // возвращаем результат
		}

		
		function array_unique_key($array, $key) { 
			$tmp = $key_array = array(); 
			$i = 0; 
		
			foreach($array as $val) { 
				if (!in_array($val[$key], $key_array)) { 
					$key_array[$i] = $val[$key]; 
					$tmp[$i] = $val; 
				} 
				$i++; 
			} 
			return $tmp; 
		}

		foreach ($offers_default as $default_key => $default_value) {

			$name = trim($default_value -> name);
			$str = clean_search_string($name);
			$str = translit($str).'_'.trim($default_value['id']);
			$query = 'product_id=' . trim($default_value['id']);

			$seo_url_arr = $this->db->query("SELECT * FROM " . DB_PREFIX . "seo_url")->rows;

			foreach ($seo_url_arr as $seo_url_key => $seo_url_value) {
				if ($seo_url_value['query'] === $query){
					break 2;
				}
			}

			// oc_seo_url
			$this->db->query("INSERT INTO " . DB_PREFIX . "seo_url SET 
			store_id = 0, 
			language_id = 1, 
			query = '". $query ."', 
			keyword = '". $str ."'");
		}

		foreach ($category_default as $default_key => $default_value) {


			$name = trim($default_value['name']);
			$str = clean_search_string($name);
			$str = translit($str);
			$query = 'category_id=' . trim($default_value['id']);

			$seo_url_arr = $this->db->query("SELECT * FROM " . DB_PREFIX . "seo_url")->rows;

			foreach ($seo_url_arr as $seo_url_key => $seo_url_value) {
				if ($seo_url_value['query'] === $query){
					break 2;
				}
			}

			// oc_seo_url
			$this->db->query("INSERT INTO " . DB_PREFIX . "seo_url SET 
			store_id = 0, 
			language_id = 1, 
			query = '". $query ."', 
			keyword = '". $str ."'");
		}

		/* SEO товары ================================================================ */

	}
	
}