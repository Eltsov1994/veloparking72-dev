<?php

class ControllerParserFunctions extends Controller {
	public function index() {

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

		function toNum($data) {
			$alphabet = array( 'a', 'b', 'c', 'd', 'e',
									'f', 'g', 'h', 'i', 'j',
									'k', 'l', 'm', 'n', 'o',
									'p', 'q', 'r', 's', 't',
									'u', 'v', 'w', 'x', 'y',
									'z','_'
									);
			$alpha_flip = array_flip($alphabet);
			$return_value = -1;
			$data = mb_strimwidth($data, 0, 6);
			if ( strlen($data) < 6 ){
				for ($i = 0; $i < ( 6 - strlen($data) ); $i++) {  $data = $data.'a'; }
			}
			$length = strlen($data);
			for ($i = 0; $i < $length; $i++) {
				$return_value +=
						($alpha_flip[$data[$i]] + 1) * pow(27, ($length - $i - 1));
			}
			return $return_value;
		}

      function searchParent($category_default, &$map_value, $i, $category_id, $this_arr){

			foreach ($category_default as $default_value) {
				if ( $map_value['id'] == $default_value['id'] ){

					$this_arr->db->query("INSERT INTO " . DB_PREFIX . "category_path SET 
					category_id = ". $category_id .", 
					path_id = ". $default_value['parentId'] .", 
					level = ". $i);

					$map_value['id'] = $default_value['parentId'];

				}
			}

		}

   }
}
