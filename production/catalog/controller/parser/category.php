<?php

class ControllerParserCategory extends Controller {

	public function index($parser) {

      $category_default = $parser['category_default'];
      $category_map = $parser['category_map'];
      $offers_default = $parser['offers_default'];
		$date_added = date("Y-m-d H:i:s");
		$this_arr = $this;


		// oc_category
		$category_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "category")->rows;
		foreach ($category_default as $default_value) {

			foreach ($category_db as $db_value) { if ($db_value['category_id'] === $default_value['id']){ continue 2; } }

			if ( $default_value['parentId'] == 0 ){ $top = 1; } else { $top = 0; }

			//oc_category
			$this->db->query("INSERT INTO " . DB_PREFIX . "category SET 
			category_id = ". $default_value['id'] .", 
			image = '', 
			parent_id = ". $default_value['parentId'] .", 
			top = ". $top .", 
			sort_order = 0, 
			status = 1, 
			date_added = '". $date_added ."', 
			date_modified = '". $date_added ."', 
			noindex = 1");

		}


		// oc_category_description
		$category_description_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_description")->rows;
		foreach ($category_default as $default_value) {

			foreach ($category_description_db as $db_value) { if ($db_value['category_id'] === $default_value['id']){ continue 2; } }


			//oc_category_description
			$this->db->query("INSERT INTO " . DB_PREFIX . "category_description SET 
			category_id = ". $default_value['id'] .",
			language_id = 1, 
			name = '". str_replace('"', '`', (str_replace("'", "`", $default_value['name']))) ."', 
			meta_h1 = '". str_replace('"', '`', (str_replace("'", "`", $default_value['name']))) ."'");

		}

		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_path"); //!!!!!!!!!!!!!!
		
		// oc_category_path
		$category_path_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_path")->rows;

		foreach ($category_default as $default_value) {

			foreach ($category_path_db as $db_value) { if ($db_value['category_id'] === $default_value['id']){ continue 2; } }

			foreach ($category_map as $map_key => $map_value) {

				if ( $map_value['id'] == $default_value['id']){
					
					$category_id = $map_value['id'];

					for ($i = $map_value['path']; $i > 0; $i--) { 
						
						if ( $i === $map_value['path'] ){
							
							$this->db->query("INSERT INTO " . DB_PREFIX . "category_path SET 
							category_id = ". $category_id .", 
							path_id = ". $map_value['id'] .", 
							level = ". $i);

							$path_id['id'] = $category_id;

						} else { searchParent($category_default, $path_id, $i, $category_id, $this_arr); }
					}
					
				}

			}

		}


		// oc_category_to_layout
		$category_to_layout_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_to_layout")->rows;
		foreach ($category_default as $default_value) {

			foreach ($category_to_layout_db as $db_value) { if ($db_value['category_id'] === $default_value['id']){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "category_to_layout SET 
			category_id = ". $default_value['id'] .",
			store_id = 0, 
			layout_id = 0");

		}


		// oc_category_to_store
		$category_to_store_db = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_to_store")->rows;
		foreach ($category_default as $default_value) {

			foreach ($category_to_store_db as $db_value) { if ($db_value['category_id'] === $default_value['id']){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "category_to_store SET 
			category_id = ". $default_value['id'] .",
			store_id = 0");

		}

		/* ================================================================================================== */

		$oc_category_path = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_path")->rows;

		foreach ($offers_default as $default_value) {

			foreach ($oc_category_path as $path_value) {
				if ( $path_value['path_id'] == 1057 ){
					if ( $path_value['category_id'] == trim($default_value -> categoryId) ){

						if ( isset($default_value -> param) ){
							foreach ($default_value -> param as $param_key => $param_value) {
								if ( trim($param_value['name']) == 'Бренд' ){

									$name = trim($param_value);
									$str = clean_search_string($name);
									$str = translit($str);

									$manufactured_arr[ trim($param_value) ] = toNum($str); 
								}
							}

						}

					}
				}
			}
		}



		// oc_manufacturer
		$manufacturer = $this->db->query("SELECT * FROM " . DB_PREFIX . "manufacturer")->rows;
		foreach ($manufactured_arr as $manufactured_key => $manufactured_value) {

			foreach ($manufacturer as $db_value) {  if ( (int)$db_value['manufacturer_id'] === $manufactured_value){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "manufacturer SET 
			manufacturer_id = ". $manufactured_value .",
			name = '". $manufactured_key ."',
			sort_order = 0,
			noindex = 1");

		}

		// oc_manufacturer_description
		$manufacturer_description = $this->db->query("SELECT * FROM " . DB_PREFIX . "manufacturer_description")->rows;
		foreach ($manufactured_arr as $manufactured_key => $manufactured_value) {

			foreach ($manufacturer_description as $db_value) { if ( (int)$db_value['manufacturer_id'] === $manufactured_value){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "manufacturer_description SET 
			manufacturer_id = ". $manufactured_value .",
			language_id = 1,
			meta_h1 = '". $manufactured_key ."'");

		}

		// oc_manufacturer_to_layout
		$manufacturer_to_layout = $this->db->query("SELECT * FROM " . DB_PREFIX . "manufacturer_to_layout")->rows;
		foreach ($manufactured_arr as $manufactured_key => $manufactured_value) {

			foreach ($manufacturer_to_layout as $db_value) { if ( (int)$db_value['manufacturer_id'] === $manufactured_value){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "manufacturer_to_layout SET 
			manufacturer_id = ". $manufactured_value .",
			store_id = 0,
			layout_id = 0");

		}

		// oc_manufacturer_to_store
		$manufacturer_to_store = $this->db->query("SELECT * FROM " . DB_PREFIX . "manufacturer_to_store")->rows;
		foreach ($manufactured_arr as $manufactured_key => $manufactured_value) {

			foreach ($manufacturer_to_store as $db_value) { if ( (int)$db_value['manufacturer_id'] === $manufactured_value){ continue 2; } }

			$this->db->query("INSERT INTO " . DB_PREFIX . "manufacturer_to_store SET 
			manufacturer_id = ". $manufactured_value .",
			store_id = 0");

		}

	}
	
}