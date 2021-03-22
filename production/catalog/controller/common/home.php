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

		// Категории

		$this->load->model('catalog/category');
		$this->load->model('catalog/product');

		$results = $this->model_catalog_category->getCategories();
		foreach ($results as $result) {
			$data['categories'][] = [
				'name' => $result['name'],
				'id' => $result['category_id'],
				'sort' => $result['sort_order'],
			];
		}

		usort($data['categories'], function($a, $b){
			return ($a['sort'] - $b['sort']);
		});

		foreach ($data['categories'] as $categories_key => &$categories_value) {

			$sub_categories = $this->model_catalog_category->getCategories($categories_value['id']);
			foreach ($sub_categories as $sub_categories_key => $sub_categories_value) {

				$filter_data = array(
					'filter_category_id'  => $sub_categories_value['category_id'],
					'filter_sub_category' => true
				);

				$total_product = $this->model_catalog_product->getTotalProducts($filter_data);

				if ( $total_product ){
					$categories_value['sub_category'][] = [
						'name' => $sub_categories_value['name'],
						'image' => $sub_categories_value['image'],
						'href'  => $this->url->link('product/category', 'path=' . $categories_value['id'] . '_' . $sub_categories_value['category_id'])
					];
				}
			}

		}




		$this->response->setOutput($this->load->view('common/home', $data));
	}
}