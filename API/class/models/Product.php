<?php
class Product extends Model implements JsonSerializable {

    private $name;
    private $category;

    function getName(){
        return $this->name;
    }

    function getCategory(){
        return $this->category;
    }

    function setName( $name ){
        $this->name = $name;
    }

    function setCategory( $category ){
        $this->category = $category;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "category" => $this->category
        ];
    }

}