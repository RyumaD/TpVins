System.register("APIservice", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var APIService;
    return {
        setters: [],
        execute: function () {
            APIService = class APIService {
                constructor() {
                    this.url = "http://192.168.110.38:8888/Typescript/TpVins/API/";
                }
                static getService() {
                    if (!APIService.instance)
                        APIService.instance = new APIService();
                    return APIService.instance;
                }
                login(name, password) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "login",
                            dataType: "json",
                            method: "POST",
                            data: {
                                name: name,
                                password: password
                            },
                            success: (log) => {
                                resolve(log);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getCategorys(id) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "categorys/" + id,
                            dataType: "json",
                            method: "GET",
                            success: (categorys) => {
                                resolve(categorys);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getProducts(idcat, idvend) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "products/" + idcat + "/" + idvend,
                            dataType: "json",
                            method: "GET",
                            success: (products) => {
                                resolve(products);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getCategoryByName(name) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "category/" + name,
                            dataType: "json",
                            method: "GET",
                            success: (category) => {
                                resolve(category);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getProductByName(name) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "product/" + name,
                            dataType: "json",
                            method: "GET",
                            success: (product) => {
                                resolve(product);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
            };
            APIService.instance = null;
            exports_1("APIService", APIService);
        }
    };
});
System.register("Model", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
                get$Dom() {
                    return this.$dom;
                }
            };
            exports_2("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                getName() {
                    return this.name;
                }
                display($parent) {
                    let div = "<div class='container container-cat' id='" + this.name + "' data-category=" + this.id + " ></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_3("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = class Product extends Model_2.Model {
                constructor(id, name, category) {
                    super(id);
                    this.name = name;
                    this.category = category;
                }
                getCategory() {
                    return this.category;
                }
                display(parent) {
                    let category_name = this.category.getName();
                    let id = category_name + this.id;
                    let data_id = this.id;
                    let div = "<div id='" + id + "' class='item " + category_name + "' draggable data-product=" + this.id + " ></div>";
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
            };
            exports_4("Product", Product);
        }
    };
});
System.register("BDD", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_5("BDD", BDD = {
                categories: [
                    {
                        id: 1,
                        name: "rouge"
                    },
                    {
                        id: 2,
                        name: "rose"
                    },
                    {
                        id: 3,
                        name: "blanc"
                    },
                ],
                products: [
                    {
                        id: 1,
                        name: "bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "rivesalte",
                        categoryId: 2
                    },
                    {
                        id: 3,
                        name: "champagne",
                        categoryId: 3
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "Jeremy",
                        products: [2]
                    },
                    {
                        id: 3,
                        name: "Stephane",
                        products: [3]
                    }
                ]
            });
        }
    };
});
System.register("Vendor", ["Model"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = class Vendor extends Model_3.Model {
                constructor(id, name, products) {
                    super(id);
                    this.name = name;
                    this.products = products;
                }
                removeProductById(id) {
                    for (let key in this.products) {
                        let product = this.products[key];
                        if (product.getId() == id) {
                            let nkey = parseInt(key);
                            this.products.slice(nkey, 1);
                            return;
                        }
                    }
                }
                getProducts() {
                    return this.products;
                }
                addProduct(product) {
                    this.products.push(product);
                }
                removeProduct(product) {
                    for (let key in this.products) {
                        let vproduct = this.products[key];
                        if (vproduct.getId() == product.getId()) {
                            this.products.splice(parseInt(key), 1);
                        }
                        return;
                    }
                }
                display($parent) {
                    let div = "<div class='vendor' id='vendor" + this.id + "' data-vendor='" + this.id + "' >";
                    div += "<a href='detail'>";
                    div += this.name + "</a></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_6("Vendor", Vendor);
        }
    };
});
System.register("App", ["Product", "BDD", "Category", "Vendor", "APIservice"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Product_1, BDD_1, Category_1, Vendor_1, APIservice_1, App;
    return {
        setters: [
            function (Product_1_1) {
                Product_1 = Product_1_1;
            },
            function (BDD_1_1) {
                BDD_1 = BDD_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            },
            function (APIservice_1_1) {
                APIservice_1 = APIservice_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.$item = $(".item");
                    this.$item.prop("draggable", true);
                    this.$container = $(".container");
                    this.$category_container = $("#shop-list");
                    this.$all_vendors = $("#all-vendors");
                    this.$sented_container = $("#sended-products");
                    this.$form = $("#form");
                    this.$name = $("#name");
                    this.$password = $("#password");
                    this.$login = $("#login");
                    this.$categorie = $("#categorie");
                    this.$product = $("#product");
                    this.$infoprod = $("#infoprod");
                    this.$nav = $("nav");
                    this.$return = $("#return");
                    this.$logout = $("#logout");
                    this.$info = $("#info");
                    this.$produ = $("#produ");
                    this.$categori = $("#categori");
                    this.$submit = $("#submit");
                    this.categories = [];
                    this.all_products = [];
                    this.vendors = [];
                    this.getAllCategories();
                    this.getAllProducts();
                    this.getAllVendors();
                    this.displayCategories();
                    this.displayVendors();
                    if (this.vendors.length > 0) {
                        this.currentVendor = this.vendors[0];
                        this.displayProductsByVendor(this.currentVendor);
                    }
                }
                getCurrentVendor() {
                    return this.currentVendor;
                }
                setCurrentVendor(vendor) {
                    this.currentVendor = vendor;
                }
                getAllProducts() {
                    let products = BDD_1.BDD.products;
                    for (let product of products) {
                        let the_product = new Product_1.Product(product.id, product.name, this.getCategoryById(product.categoryId));
                        this.all_products.push(the_product);
                    }
                }
                getAllCategories() {
                    let categories = BDD_1.BDD.categories;
                    for (let category of categories) {
                        let the_category = new Category_1.Category(category.id, category.name);
                        this.categories.push(the_category);
                    }
                }
                getCategoryById(id) {
                    for (let category of this.categories) {
                        if (id == category.getId()) {
                            return category;
                        }
                    }
                    return null;
                }
                getAllVendors() {
                    let vendors = BDD_1.BDD.vendors;
                    for (let vendor of vendors) {
                        let vendors_products = [];
                        for (let product_id of vendor.products) {
                            let the_product = this.getProductById(product_id);
                            vendors_products.push(the_product);
                        }
                        let the_vendor = new Vendor_1.Vendor(vendor.id, vendor.name, vendors_products);
                        this.vendors.push(the_vendor);
                    }
                }
                getProductById(id) {
                    for (let product of this.all_products) {
                        if (id == product.getId()) {
                            return product;
                        }
                    }
                    return null;
                }
                displayCategories() {
                    for (let category of this.categories) {
                        category.display(this.$category_container);
                    }
                }
                displayVendors() {
                    for (let vendor of this.vendors) {
                        vendor.display(this.$all_vendors);
                    }
                }
                clearBoard() {
                    this.$sented_container.html("");
                    for (let category of this.categories) {
                        category.get$Dom().html("");
                    }
                }
                displayProductsByVendor(vendor) {
                    this.clearBoard();
                    for (let product of this.all_products) {
                        let flag = false;
                        for (let vproduct of vendor.getProducts()) {
                            if (vproduct.getId() == product.getId()) {
                                flag = true;
                            }
                        }
                        if (flag == true) {
                            product.display(this.$sented_container);
                        }
                        else {
                            let category = product.getCategory();
                            product.display(category.get$Dom());
                        }
                    }
                }
                getVendorById(id_vendor) {
                    for (let vendor of this.vendors) {
                        if (vendor.getId() == id_vendor) {
                            return vendor;
                        }
                    }
                    return null;
                }
                login(name, password) {
                    var api = APIservice_1.APIService.getService();
                    let logs = api.login(name, password);
                    logs
                        .then((log) => {
                        console.log(log);
                        this.actualuser = log;
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getCategorys(id) {
                    var api = APIservice_1.APIService.getService();
                    let categs = api.getCategorys(id);
                    categs
                        .then((categorys) => {
                        console.log(categorys);
                        this.usercategories = categorys;
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getProducts(idcat, idvend) {
                    var api = APIservice_1.APIService.getService();
                    let products = api.getProducts(idcat, idvend);
                    products
                        .then((products) => {
                        console.log(products);
                        this.userproducts = products;
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getCategoryByName(name) {
                    var api = APIservice_1.APIService.getService();
                    let categ = api.getCategoryByName(name);
                    categ
                        .then((category) => {
                        console.log(category);
                        this.actualcateg = category;
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getProductByName(name) {
                    var api = APIservice_1.APIService.getService();
                    let product = api.getProductByName(name);
                    product
                        .then((product) => {
                        console.log(product);
                        this.infoproduct = product;
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
            };
            exports_7("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.$form.submit(function (event) {
                event.preventDefault();
                app.$submit.prop("disabled", true);
                var name = app.$name.val();
                var password = app.$password.val();
                let div = "";
                let categos = [];
                app.login(name, password);
                setTimeout(() => {
                    if (app.actualuser.success != false) {
                        app.$login.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$login.css("display", "none");
                            app.$categorie.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        app.$nav.css("display", "flex");
                        app.getCategorys(app.actualuser.id.id);
                        setTimeout(() => {
                            for (let category of app.usercategories.categorys) {
                                if (categos.indexOf(category.name) === -1) {
                                    div += "<h3 id='" + category.name + "' class='categ'>" + category.name + "</h3>";
                                    categos.push(category.name);
                                }
                            }
                            app.$categori.html(div);
                        }, 1500);
                    }
                }, 1500);
            });
            $(document).on("click", ".categ", function () {
                var name = $(this).attr("id");
                app.getCategoryByName(name);
                app.$return.removeClass("cat");
                app.$return.addClass("pro");
                console.log(app.actualuser.id.id);
                let div = "";
                setTimeout(() => {
                    app.getProducts(app.actualcateg.category.id, app.actualuser.id.id);
                    app.$categorie.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                        app.$categorie.css("display", "none");
                        app.$product.css("display", "block").animate({ left: 0 }, 1500);
                    });
                    setTimeout(() => {
                        for (let produ of app.userproducts.products) {
                            div += "<div id='" + produ.name + "' class='prodct'><h3>" + produ.name + "</h3><img class='imgvin' src='Images/" + produ.image + "' alt=''></div>";
                        }
                        app.$produ.html(div);
                    }, 1500);
                }, 1500);
            });
            $(document).on("click", ".prodct", function () {
                var name = $(this).attr("id");
                app.getProductByName(name);
                app.$return.removeClass("pro");
                app.$return.addClass("inf");
                let div = "";
                setTimeout(() => {
                    app.$product.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                        app.$product.css("display", "none");
                        app.$infoprod.css("display", "block").animate({ left: 0 }, 1500);
                    });
                    app.$info.html("<h3>" + app.infoproduct.product.name + "</h3><div class='ajust'><div class='imgdrp'><img class='imgprd' src='Images/" + app.infoproduct.product.image + "' alt=''></div><p>" + app.infoproduct.product.description + "</p></div>");
                }, 1500);
            });
            app.$logout.on("click", function () {
                app.actualuser = "";
                app.$submit.prop("disabled", false);
                app.$nav.css("display", "none");
                switch (app.$return.attr("class")) {
                    case "cat": {
                        app.$categorie.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$categorie.css("display", "none");
                            app.$categori.children().remove();
                            app.$produ.children().remove();
                            app.$info.children().remove();
                            app.$login.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        break;
                    }
                    case "pro": {
                        app.$product.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$product.css("display", "none");
                            app.$categori.children().remove();
                            app.$produ.children().remove();
                            app.$info.children().remove();
                            app.$login.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        break;
                    }
                    case "inf": {
                        app.$infoprod.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$infoprod.css("display", "none");
                            app.$categori.children().remove();
                            app.$produ.children().remove();
                            app.$info.children().remove();
                            app.$login.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        break;
                    }
                }
            });
            app.$return.on("click", function () {
                switch (app.$return.attr("class")) {
                    case "cat": {
                        app.actualuser = "";
                        app.$submit.prop("disabled", false);
                        app.$categorie.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$categorie.css("display", "none");
                            app.$categori.children().remove();
                            app.$login.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        app.$nav.css("display", "none");
                        break;
                    }
                    case "pro": {
                        app.$return.removeClass("pro");
                        app.$return.addClass("cat");
                        app.$product.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$product.css("display", "none");
                            app.$produ.children().remove();
                            app.$categorie.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        break;
                    }
                    case "inf": {
                        app.$return.removeClass("inf");
                        app.$return.addClass("pro");
                        app.$infoprod.css("display", "block").animate({ left: -100 + "%" }, 1500, function () {
                            app.$infoprod.css("display", "none");
                            app.$info.children().remove();
                            app.$product.css("display", "block").animate({ left: 0 }, 1500);
                        });
                        break;
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=main.js.map