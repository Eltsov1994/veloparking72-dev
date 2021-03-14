<?php
class ControllerCommonHome extends Controller {
	public function index() {
		$this->document->setTitle($this->config->get('config_meta_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));
		$this->document->setKeywords($this->config->get('config_meta_keyword'));

		if (isset($this->request->get['route'])) {
			$canonical = $this->url->link('common/home');
			if ($this->config->get('config_seo_pro') && !$this->config->get('config_seopro_addslash')) {
				$canonical = rtrim($canonical, '/');
			}
			$this->document->addLink($canonical, 'canonical');
		}

		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');
		$data['name'] = $this->config->get('config_name');
		$data['description'] = $this->document->getDescription();


		//Баннеры
		$this->load->model('design/banner');
		$data['banners'] = $this->model_design_banner->getBanner(7);

		// Производители

		$this->load->model('catalog/category');
		$this->load->model('catalog/product');

		$results = $this->model_catalog_category->getCategories(100);
		foreach ($results as $result) {
			$filter_data = array(
				'filter_category_id'  => $result['category_id'],
				'filter_sub_category' => true
			);

			$data['categories'][] = array(
				'name' => $result['name'] . ($this->config->get('config_product_count') ? ' (' . $this->model_catalog_product->getTotalProducts($filter_data) . ')' : ''),
				'count' => $this->config->get('config_product_count') ?  (int)$this->model_catalog_product->getTotalProducts($filter_data) : '',
				'image' => 'image/'. $result['image'],
				'href' => $this->url->link('product/category', 'path=' . 100 . '_' . $result['category_id'])
			);
		}

		usort($data['categories'], function($a, $b){
			return ($b['count'] - $a['count']);
		});



		$this->response->setOutput($this->load->view('common/home', $data));
	}
}