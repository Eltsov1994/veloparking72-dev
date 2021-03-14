<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class ControllerParserMain extends Controller {
	public function index() {

      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_description");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_path");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_to_layout");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "category_to_store");

      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_description");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_to_store");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_to_layout");
      // $this->db->query("TRUNCATE TABLE " . DB_PREFIX . "product_to_category");
      

      $parser = $this->load->controller('parser/parser');
      //$this->load->controller('parser/category', $parser);
      $this->load->controller('parser/products', $parser);
      //$this->load->controller('parser/filters', $parser);

	}
	
}