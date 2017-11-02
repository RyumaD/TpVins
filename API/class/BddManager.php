<?php 
//BddManager va contenir les instances de nos repository
class BddManager {

    private $vendorRepository;
    private $categoryRepository;
    private $productRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->vendorRepository = new VendorRepository( $this->connection );
        $this->categoryRepository = new CategoryRepository( $this->connection );
        $this->productRepository = new ProductRepository( $this->connection );
    }

    function getVendorRepository(){
        return $this->vendorRepository;
    }

    function getCategoryRepository(){
        return $this->categoryRepository;
    }

    function getProductRepository(){
        return $this->productRepository;
    }

}