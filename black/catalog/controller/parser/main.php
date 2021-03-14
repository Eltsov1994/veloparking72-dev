<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class ControllerParserMain extends Controller {
	public function index() {

      $parser = $this->load->controller('parser/parser');
      $this->load->controller('parser/category', $parser);
      $this->load->controller('parser/products', $parser);
      $this->load->controller('parser/filters', $parser);

	}
	
}