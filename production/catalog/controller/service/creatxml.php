<?

class ControllerServiceCreatxml extends Controller {
	public function index() {

    $parser = $this->load->controller('service/parser');
    $category_all = $parser['$category_all'];
    $offers_all = $parser['$offers_all'];


    $key_exception = [ 
			['Тип тормоза:', 'Тип тормоза'],
			['Тип обода:', 'Тип обода'],
			['Тип крепления:', 'Тип крепления'],
			['Цвет:', 'Цвет'],
			['Диаметр колеса', 'Диаметр колес'],
			['Диаметр колеса:', 'Диаметр колес'],
			['Вес:', 'Вес'],
    ];
    
    $val_exception = [ 
			['Шоссейные Велосипеды', 'Шоссейный'], 
			['Ободные (V-Brake)', 'V-brake (ободные)'], 
			['Ободные Механические', 'V-brake (ободные)'],
			['Ручной', 'V-brake (ободные)'],
			['Ободной (V-Brake)', 'V-brake (ободные)'],
			['V-Типа', 'V-brake (ободные)'],
			['Дисковые (Гидравл)', 'Дисковые гидравлические'], 
			['Передний Ручной, Задний Ножной', 'Ножной тормоз'], 
			['Ножные педальные', 'Ножной тормоз'], 
			['Ножной тормоз + ободные', 'Ножной тормоз'], 
			['Дисковые', 'Дисковые механические'], 
			['26 Дюймов', '26'], 
    ];
    
    if ($this->request->server['HTTPS']) {
			$server = $this->config->get('config_ssl');
		} else {
			$server = $this->config->get('config_url');
		}



    // Получаем иерархию 

    // Получаем дерево массив из категорий
		function getTree($category_default, &$arr) { 
			foreach ($arr as $arr_key => &$val) { 
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
	
    // Получаем массив карту из категорий ( получаем уровни )
		function getMap(&$tree, $key_tree, &$category_map) {
			$key_tree++;
			foreach ($tree as $key => &$value) {
				if ( is_array($value) ) {
          $category_map[] = ['id' => $key, 'path' => $key_tree];
					getMap($value, $key_tree, $category_map);
				}
			}
		}

    // Получаем массив карту из категорий ( получаем главную родительскую категорию )
    function searchParent($category_default, &$map_value, $i, $category_id, &$main_map){
			foreach ($category_default as $default_value) {
				if ( $map_value['id'] == $default_value['id'] ){
          if ( $i === 1 ){ $main_map[] = [ 'category_id' => $category_id, 'parent_id' => $default_value['parentId'] ]; }
					$map_value['id'] = $default_value['parentId'];
				}
			}

		}

    // Функция замены букв на цифры
    function replaceLetters($sData){
      $rgReplace = [
        'а' => 1, 'б' => 2, 'в' => 3, 
        'г' => 4, 'д' => 5, 'е' => 6,
        'ё' => 7, 'ж' => 8, 'з' => 9,

        'и' => 1, 'й' => 2, 'к' => 3, 
        'л' => 4, 'м' => 5, 'н' => 6,
        'о' => 7, 'п' => 8, 'р' => 9,

        'с' => 1, 'т' => 2, 'у' => 3, 
        'ф' => 4, 'х' => 5, 'ц' => 6,
        'ч' => 7, 'ш' => 8, 'щ' => 9,

        'ъ' => 1, 'ы' => 2, 'ь' => 3, 
        'э' => 4, 'ю' => 5, 'я' => 6,
        
        //==========================

        'a' => 1, 'b' => 2, 'c' => 3, 
        'd' => 4, 'e' => 5, 'f' => 6,
        'g' => 7, 'h' => 8, 'i' => 9,

        'j' => 1, 'k' => 2, 'l' => 3, 
        'm' => 4, 'n' => 5, 'o' => 6,
        'p' => 7, 'q' => 8, 'r' => 9,

        's' => 1, 't' => 2, 'u' => 3, 
        'v' => 4, 'w' => 5, 'x' => 6,
        'y' => 7, 'z' => 8, ' ' => 0

      ];
      //$rgConsonants = ['к'=>1,'ъ'=>1,'б'=>2,'л'=>2,'ф'=>2,'в'=>3,'м'=>3,'х'=>3,'г'=>4,'н'=>4, 'ц'=>4,'д'=>5,'ч'=>5,'п'=>6,'ш'=>6,'ж'=>7,'р'=>7,'щ'=>7,'з'=>8,'с'=>8,'ь'=>8,'й'=>9,'т'=>9];

      //$rgReplace = array_merge($rgVowels, $rgConsonants);
      return strtr($sData, $rgReplace);
    }

    
		$category_tree['1528'] = [];
		$category_map = [];
		$key_tree = -1;
    $main_map = [];
		

		getTree($category_all, $category_tree); getMap($category_tree, $key_tree, $category_map);


    // Получаем масссив $main_map 
		foreach ($category_all as $default_value) {

			foreach ($category_map as $map_key => $map_value) {

				if ( $map_value['id'] == $default_value['id']){
					$category_id = $map_value['id'];
					for ($i = $map_value['path']; $i > 0; $i--) { 
						if ( $i === $map_value['path'] ){ $path_id['id'] = $category_id;
						} else { searchParent($category_all, $path_id, $i, $category_id, $main_map); }
					}
				}

			}

		}

    
    // Категории велосипедов
    $category_bicycle[] = 1057;
    foreach ($main_map as $main_map_value) {
      if ( $main_map_value['parent_id'] == 1057 ){
        $category_bicycle[] = $main_map_value['category_id'];
      }
    }

    // Категории кроме велосипедов
    foreach ($main_map as $main_map_value) {
      if ( $main_map_value['parent_id'] != 1057 ){
        $category_other[] = $main_map_value['category_id'];
      }
    }
    
    // Получаем новые категории для велосипедов
    foreach ($category_bicycle as $bicycle_value) {
      foreach ($offers_all as $offers_value) {
        if ( $bicycle_value == trim($offers_value -> categoryId) ){
          foreach ($offers_value -> param as $param_value) {
            if ( trim($param_value['name']) == 'Тип велосипеда' ){

              $type_name = trim($param_value);

              foreach ($val_exception as $exception_key => $exception_value) {
                if ( mb_strtoupper($type_name) == mb_strtoupper($exception_value[0]) ){
                  $type_name = $exception_value[1];
                }
              }

              $retype_name = mb_strimwidth($type_name, 0, 5);
              $type_id = replaceLetters( mb_strtolower($retype_name) );

              // Добавляем к строке недостающие символы (0)
              if ( strlen($type_id) < 5 ){
                for ($i = 0; $i <= (5 - strlen($type_id)) ; $i++) { 
                  $type_id .= 0;
                }
              }

              $types_bicycle[$type_name] = [
                'name' => $type_name,
                'parentId' => 1057,
                'id' => $type_id,
              ];


              $offers_value->categoryId = $type_id;
              continue 2;
            }
          }
          // Велосипеды без категории
          $types_bicycle['Без категории'] = [
            'name' => 'Без категории',
            'parentId' => 1057,
            'id' => 50000,
          ];
          $offers_value->categoryId = 50000;

        }
      }
    }


    /* ********** Создаём новый массив с категориями ********** */

    // Добавляем родительские категории
    foreach ($category_all as $all_value) {
      if ( $all_value['parentId'] == 1528 ){ $newcategory_all[] = $all_value; }
    }

    // Добавляем велосипеды
    foreach ($types_bicycle as $bicycle_value) {
      $newcategory_all[] = $bicycle_value;
    }

    // Добавляем всё кроме велосипедов
    foreach ($category_other as $other_value) {
      foreach ($category_all as $all_value) {
        if ( $other_value == $all_value['id'] ){ $newcategory_all[] = $all_value; }
      }
    }

    $category_all = $newcategory_all;

     /* ********** Создаём новый массив с категориями ********** */

    //echo '<pre>'; print_r($category_all); echo '<pre>';

    //===========================================================================================
    
    $_name = "ВелоParking";
    $_company = "ВелоParking";
    $_url = $server;
    $_deliveryCost = 200;
    $_deliveryDays = 2;
    $_sale = 0.5;
    $_urlProduct = "?route=veloparking/product&amp;id=";
    //$_urlProduct = "?route=veloparking/product&id=";


    $dom = new domDocument("1.0", "UTF-8"); // Создаём XML-документ версии 1.0 с кодировкой utf-8
    $dom->formatOutput = true;


    //Создаем оболочку CATALOG
    $catalog = $dom->createElement("yml_catalog");
    $dom->appendChild($catalog);
    $catalog->setAttribute("date", date("Y-m-d H:i"));
    //$catalog->setAttribute("date", $DATEnovasport);


    //Создаем оболочку CATALOG -> SHOP
    $shop = $dom->createElement("shop");
    $catalog->appendChild($shop);


    //Создаем оболочку CATALOG -> SHOP -> NAME
    $name = $dom->createElement("name", $_name);
    $shop->appendChild($name);


    //Создаем оболочку CATALOG -> SHOP -> COMPANY
    $company = $dom->createElement("company", $_company);
    $shop->appendChild($company);


    //Создаем оболочку CATALOG -> SHOP -> URL
    $url = $dom->createElement("url", $_url);
    $shop->appendChild($url);


    //Создаем оболочку CATALOG -> SHOP -> CURRENCIES
    $currencies = $dom->createElement("currencies");
    $shop->appendChild($currencies);


    //Создаем оболочку CATALOG -> SHOP -> CURRENCIES -> CURRENCY
    $currency = $dom->createElement("currency");
    $currencies->appendChild($currency);
    $currency->setAttribute("id", "RUR");
    $currency->setAttribute("rate", "1");


    //Создаем оболочку CATALOG -> SHOP -> CATEGORIES
    $categories = $dom->createElement("categories");
    $shop->appendChild($categories);


    //Создаем оболочку CATALOG -> SHOP -> CATEGORIES - > CATEGORY // 1528 = Летние товары
    foreach ($category_all as $all_value) {
      $category  = $dom->createElement("category", $all_value['name']);
      $categories->appendChild($category);
      $category->setAttribute("id", $all_value['id']);
      if ($all_value['parentId'] !== '1528'){ $category->setAttribute("parentId", $all_value['parentId']); }
    }


    //Создаем оболочку CATALOG -> SHOP -> DELIVERY-OPTIONS
    $delivery_options = $dom->createElement("delivery-options");
    $shop->appendChild($delivery_options);


    //Создаем оболочку CATALOG -> SHOP -> DELIVERY-OPTIONS -> OPTION
    $option  = $dom->createElement("option");
    $delivery_options->appendChild($option);
    $option->setAttribute("cost", $_deliveryCost);
    $option->setAttribute("days", $_deliveryDays);


    //Создаем оболочку CATALOG -> SHOP -> OFFERS
    $offers = $dom->createElement("offers");
    $shop->appendChild($offers);


    //Создаем оболочку CATALOG -> SHOP -> OFFERS -> OFFER
    foreach ($offers_all as $offers_key => $offers_value) {

      $_id = trim($offers_value['id']);
      $_available = trim($offers_value['available']);
      $_vendorCode = trim($offers_value -> vendorCode);
      $_categoryId = trim($offers_value -> categoryId);
      $_url_unique = $_url.$_urlProduct.$_vendorCode;
      $_name = trim($offers_value -> name);
      $_picture = trim($offers_value -> picture);
      $_description = trim(str_replace(array("\r\n", "\r", "\n"),'',htmlspecialchars($offers_value->description)));


      //Создаем оболочку CATALOG -> SHOP -> OFFERS -> OFFER
      $offer  = $dom->createElement("offer");
      $offers->appendChild($offer);
      $offer->setAttribute("id", $_id);
      $offer->setAttribute("available", $_available);

        
        $url  = $dom->createElement("url", $_url_unique);
        $offer->appendChild($url);


        //Size
        for ($i = 0; count($offers_value->{'size-'.(string) $i}) > 0 ; $i++) { 
          $size  = $dom->createElement("size-".(string) $i, $offers_value->{'size-'.(string) $i});
          $offer->appendChild($size);
        }


         //Price
        for ($i=0; count($offers_value->{'price-'.(string) $i}) > 0 ; $i++) { 
              $priceItem = (int)($offers_value->{'price-'.(string) $i});
              $priceItemEdit = ceil ($priceItem - ( ($priceItem / 100) * $_sale ) );
              $priceItemEdit = ceil ($priceItemEdit / 10) * 10;
              $price  = $dom->createElement("price-".(string) $i, $priceItemEdit);
              $offer->appendChild($price);
        }

        //Stock
        for ($i = 0; count($offers_value->{'stock-'.(string) $i}) > 0 ; $i++) { 
          $stock  = $dom->createElement("stock-".(string) $i, $offers_value->{'stock-'.(string) $i});
          $offer->appendChild($stock);
        }


        $vendorCode  = $dom->createElement("vendorCode", $_vendorCode);
        $offer->appendChild($vendorCode);

        $categoryId  = $dom->createElement("categoryId", $_categoryId);
        $offer->appendChild($categoryId);

        $picture  = $dom->createElement("picture", $_picture);
        $offer->appendChild($picture);

        $name  = $dom->createElement("name", $_name);
        $offer->appendChild($name);

        $description  = $dom->createElement("description", $_description);
        $offer->appendChild($description);
        

        //Параметры
        foreach ($offers_value->param as $offers_key => $offers_param) {

          if ( ($offers_param{"name"} != 'Свободно') && ($offers_param{"name"} != 'Свободно под заказ') ){

            $param_key = $offers_param{"name"};
            $param_value = htmlspecialchars( $offers_param );

            foreach ($val_exception as $exception_value) {
              if ( mb_strtoupper($offers_param) == mb_strtoupper($exception_value[0]) ) {
                $param_value = htmlspecialchars( $exception_value[1] );
              }
            }

            foreach ($key_exception as $key_exception_value) {
              if ( mb_strtoupper(trim($offers_param{"name"})) == mb_strtoupper(trim($key_exception_value[0])) ){
                $param_key = htmlspecialchars( $key_exception_value[1] );
              }
            }

            $param  = $dom->createElement("param", $param_value);
            $param->setAttribute("name", $param_key);
            $offer->appendChild($param);

          }

        }

    }


    $dom->save($_SERVER['DOCUMENT_ROOT'] . '/catalog/controller/service/bicycle.xml'); // Сохраняем полученный XML-документ в файл

  }
}
