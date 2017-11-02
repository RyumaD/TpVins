<?php
class Vendor extends Model implements JsonSerializable {

    private $name;
    private $password;

    function getName(){
        return $this->name;
    }

    function getPassword(){
        return $this->password;
    }

    function setName( $name ){
        $this->name = $name;
    }

    function setPassword( $password ){
        $this->password = $password;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "password" => $this->password
        ];
    }

}