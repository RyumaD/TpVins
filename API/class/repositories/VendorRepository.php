<?php 
class VendorRepository extends Repository {

    

    function login( Vendor $vendor ){

        $query = "SELECT * FROM Vendors WHERE name=:name AND password=:password";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "name" => $vendor->getName(),
            "password" => $vendor->getPassword()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
        
    }

    function getProductByIdVendor(Vendor $vendor){
        $query = "SELECT * FROM ProductByVendor WHERE vendors_id=:vendors_id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "vendors_id" => $vendor->getId()
        ]);
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
    }
}