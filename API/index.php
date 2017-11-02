<?php

header("Access-Control-Allow-Origin:*",false);
require "flight/Flight.php"; 
require "autoload.php";

//Enregistrer en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());
Flight::route("/", function(){
    echo "hello";
});

Flight::route("GET /categorys/@id", function($id){
    
    $status = [
        "success" => false,
        "categorys" => false
    ];

    $vendor = new Vendor();
    $vendor->setId( $id );

    $bddManager = Flight::get("BddManager");
    $vendo = $bddManager->getVendorRepository();
    $categor = $bddManager->getCategoryRepository();
    $productrepo = $bddManager->getProductRepository();
    $product = $vendo->getProductByIdVendor( $vendor );
    $div = [];
    foreach ($product as $prod) {
        $recup = $productrepo->getProductById($prod["product_id"]);
        $prodt = new Product();
        $prodt->setId($recup["id"]);
        $prodt->setName($recup["name"]);
        $prodt->setCategory($recup["category"]);
        array_push($div, $categor->getCategoryByProduct($prodt));
    }
    if( $div != false ){
        $status["success"] = true;
        $status["categorys"] = $div;
    }

    echo json_encode( $status );

});

Flight::route("GET /category/@name", function($name){
    $status = [
        "success" => false,
        "category" => false
    ];

    $bddManager = Flight::get("BddManager");
    $categor = $bddManager->getCategoryRepository();
    $result = $categor->getCategoryByName($name);

    if( $result != false ){
        $status["success"] = true;
        $status["category"] = $result;
    }

    echo json_encode( $status );
});


Flight::route("GET /products/@idcat/@idvend", function($idcat,$idvend){
    
    $status = [
        "success" => false,
        "products" => false
    ];

    $vendor = new Vendor();
    $vendor->setId( $idvend );

    $category = new Category();
    $category->setId( $idcat );
    $div = [];
    $bddManager = Flight::get("BddManager");
    $vendo = $bddManager->getVendorRepository();
    $productrepo = $bddManager->getProductRepository();
    $prodcatego = $productrepo->getProductByCategory($category);
    $prodvendor = $vendo->getProductByIdVendor($vendor);
    foreach ($prodvendor as $provend) {
        foreach ($prodcatego as $prodcat) {
            if($prodcat["id"] == $provend["product_id"]){
                array_push($div, $prodcat);
            }
        }
        
    }
    if( $div != false ){
        $status["success"] = true;
        $status["products"] = $div;
    }

    echo json_encode( $status );

});

Flight::route("GET /product/@name", function($name){
    
    $status = [
        "success" => false,
        "product" => false
    ];
    
    $bddManager = Flight::get("BddManager");
    $productrepo = $bddManager->getProductRepository();
    $prodinfo = $productrepo->getProductByName($name);


    if( $prodinfo != false ){
        $status["success"] = true;
        $status["product"] = $prodinfo;
    }

    echo json_encode( $status );

});

Flight::route("POST /login", function(){

    $name = Flight::request()->data["name"];
    $password = Flight::request()->data["password"];

    $status = [
        "success" => false,
        "id" => 0
    ];
    if( strlen( $name ) > 0 && strlen( $password ) > 0 ) {
        $vendor = new Vendor();
        $vendor->setName( $name );
        $vendor->setPassword( $password );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getVendorRepository();
        $id = $repo->login( $vendor );

        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }
    }
    
    echo json_encode( $status ); 
    
});

Flight::start();