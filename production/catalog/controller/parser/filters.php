<?php

class ControllerParserFilters extends Controller {
	public function index($parser) {

      $offers_default = $parser['offers_default'];


      /* Собираем только велосипеды  */
      $category_path = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_path")->rows;
      $product = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_to_category c LEFT JOIN " . DB_PREFIX . "product c2s ON c.product_id = c2s.product_id WHERE c2s.status = 1")->rows;
      $attribute = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute c LEFT JOIN " . DB_PREFIX . "attribute_description c2s ON c.attribute_id = c2s.attribute_id")->rows;


      // Собираем список категорий
      foreach ($category_path as $path_key => $path_value) {
         if ( $path_value['level'] == 1 && $path_value['path_id'] == 1057 ){ $category_bicycle[] =  $path_value['category_id']; }
      }

      // Все товары из собранных категорий
      foreach ($category_bicycle as $bicycle_value) {
         foreach ($product as $product_value) {
            if ( $bicycle_value == $product_value['category_id'] ){ $only_bicycle[] = $product_value['product_id']; }
         }
      }



       /* Собираем названия фильтров  */

      // oc_filter_group_description
		$filter_group_description = $this->db->query("SELECT * FROM " . DB_PREFIX . "filter_group_description")->rows;
      foreach ($filter_group_description as $filter_group_value) {
         $name = $filter_group_value['name'];
         $name = clean_search_string($name);
			$name = translit($name);
         $filters_name[$name]['name'] = $filter_group_value['name'];
         $filters_name[$name]['filter_group_id'] = $filter_group_value['filter_group_id'];
      }
      

      
      /* Собираем значения фильтров  */
      foreach ($attribute as $attribute_value) {
         foreach ($only_bicycle as $bicycle_value) {
            if ( $attribute_value['product_id'] == $bicycle_value ){

               foreach ($filters_name as $filters_key => $filters_value) {
                  if ( $filters_value['name'] == $attribute_value['name'] ){
                     $filters_values[$filters_key]['name'] = $attribute_value['name'];
                     $filters_values[$filters_key]['filter_group_id'] = $filters_value['filter_group_id'];
                     $filters_values[$filters_key]['values'][$attribute_value['text']][] = $attribute_value['product_id'];
                  }
               }

            }
         }
      }


      // Сортируем ( чем больше у фильтра значений, тем выше он )
      foreach ($filters_values as $values_key => &$values_value) {
         uasort($values_value['values'], function(&$a, &$b){
            return ( count($b) - count($a));
         });
      }


      $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "filter_description");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "filter");
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_filter");

      foreach ($filters_values as $filters_key => $filters_value) {
         $counter = 0;
         foreach ($filters_value['values'] as $filters_value_key => $filters_value_value) {

            // oc_filter_description
            $this->db->query("INSERT INTO " . DB_PREFIX . "filter_description SET 
            filter_id = ". $filters_value['filter_group_id'] . $counter .", 
            language_id = 1,
            filter_group_id = ". $filters_value['filter_group_id'] .",
            name = '". $filters_value_key ."'");

            // oc_filter
            $this->db->query("INSERT INTO " . DB_PREFIX . "filter SET 
            filter_id = ". $filters_value['filter_group_id'] . $counter .", 
            filter_group_id = ". $filters_value['filter_group_id'] .",
            sort_order = ". $counter);

            foreach ($filters_value_value as $product_value) {

               // oc_product_filter
               $this->db->query("INSERT INTO " . DB_PREFIX . "product_filter SET 
               product_id = ". $product_value .", 
               filter_id = ". $filters_value['filter_group_id'] . $counter);

            }

            $counter++;
         }
      }

      $filter_id_arr = $this->db->query("SELECT filter_id FROM " . DB_PREFIX . "filter")->rows;
		$category_id_arr = $this->db->query("SELECT category_id FROM " . DB_PREFIX . "category")->rows;
		$this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_filter");

		foreach ($category_bicycle as $parent_value) {
			foreach ($filter_id_arr as $key => $filter_id) {

				// oc_category_filter
				$this->db->query("INSERT INTO " . DB_PREFIX . "category_filter SET 
				category_id = ". $parent_value .", 
				filter_id = ". $filter_id['filter_id']);

			}
		}

      //echo '<pre>'; print_r($category_bicycle); echo '<pre>';

      
	}
	
}