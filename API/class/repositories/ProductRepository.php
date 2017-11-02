<?php 
class ProductRepository extends Repository {

    function getProductById( $id ){

        $query = "SELECT * FROM Products WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $id
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }  
    }

    function getProductByCategory(Category $category){
        $query = "SELECT * FROM Products WHERE category=:category";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "category" => $category->getId()
        ]);
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
    }

    function getProductByName($name){
        $query = "SELECT * FROM Products WHERE name=:name";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "name" => $name
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
    }
}