export class APIService {
    
        private static instance: APIService = null;
        private url:string = "http://192.168.110.38:8888/Typescript/TpVins/API/";
    
        static getService(): APIService {
    
            if( !APIService.instance )
                APIService.instance = new APIService();
    
            return APIService.instance;
        }
    
        private constructor(){}
    
        login(name: string,password:string): Promise<{}> {
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "login",
                    dataType:"json",
                    method : "POST",
                    data : {
                        name : name,
                        password : password
                    },
                    success: ( log: {} ) => {
                        resolve( log );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
    
        }

        getCategorys(id:number): Promise<{}> {
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "categorys/"+id,
                    dataType:"json",
                    method : "GET",
                    success: ( categorys: {} ) => {
                        resolve( categorys );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
        }
        getProducts(idcat:number,idvend:number): Promise<{}> {
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "products/"+idcat+"/"+idvend,
                    dataType:"json",
                    method : "GET",
                    success: ( products: {} ) => {
                        resolve( products );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
        }
        getCategoryByName(name:string): Promise<{}> {
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "category/"+name,
                    dataType:"json",
                    method : "GET",
                    success: ( category: {} ) => {
                        resolve( category );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
        }
        getProductByName(name:string): Promise<{}> {
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "product/"+name,
                    dataType:"json",
                    method : "GET",
                    success: ( product: {} ) => {
                        resolve( product );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
        }
    }