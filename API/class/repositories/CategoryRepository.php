<?php 
class CategoryRepository extends Repository {

    function getCategoryByProduct( Product $product ){

        $query = "SELECT * FROM Categorys WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $product->getCategory()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
    }

    function getCategoryByName($name){
        $query = "SELECT * FROM Categorys WHERE name=:name";
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