import { App } from "./App";
import { Product } from "./Product";
import { Vendor } from "./Vendor";

var app:App = new App();

app.$form.submit(function(event){
    event.preventDefault();
    app.$submit.prop("disabled", true);
    var name = app.$name.val();
    var password = app.$password.val();
    let div = "";
    let categos: Array<string> = [];
    app.login(name,password);
    setTimeout(() =>{
        if(app.actualuser.success != false){
            app.$login.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$login.css("display", "none");
                app.$categorie.css("display", "block").animate({left: 0}, 1500);
            });
            app.$nav.css("display","flex");
            app.getCategorys(app.actualuser.id.id);
            setTimeout(() =>{
                for(let category of app.usercategories.categorys){
                    if(categos.indexOf(category.name) === -1){
                        div += "<h3 id='"+category.name+"' class='categ'>"+category.name+"</h3>";
                        categos.push(category.name);
                    }
                }
                app.$categori.html(div);
            }, 1500);
        }
    }, 1500); 
});


$(document).on("click",".categ",function(){
    var name : string = $(this).attr("id");
    app.getCategoryByName(name);
    app.$return.removeClass("cat");
    app.$return.addClass("pro");
    console.log(app.actualuser.id.id);
    let div = "";
    setTimeout(() =>{
        app.getProducts(app.actualcateg.category.id,app.actualuser.id.id);
        app.$categorie.css("display", "block").animate({left: -100+"%"}, 1500,function(){
            app.$categorie.css("display", "none");
            app.$product.css("display", "block").animate({left: 0}, 1500);
        });
        setTimeout(() =>{
            for(let produ of app.userproducts.products){
                div += "<div id='"+produ.name+"' class='prodct'><h3>"+produ.name+"</h3><img class='imgvin' src='Images/"+produ.image+"' alt=''></div>";
            }
            app.$produ.html(div);
        }, 1500);
    }, 1500);
    
});

$(document).on("click",".prodct",function(){
    var name : string = $(this).attr("id");
    app.getProductByName(name); 
    app.$return.removeClass("pro");
    app.$return.addClass("inf");
    let div = "";
    setTimeout(() =>{
        app.$product.css("display", "block").animate({left: -100+"%"}, 1500,function(){
            app.$product.css("display", "none");
            app.$infoprod.css("display", "block").animate({left: 0}, 1500);
        });
        app.$info.html("<h3>"+app.infoproduct.product.name+"</h3><div class='ajust'><div class='imgdrp'><img class='imgprd' src='Images/"+app.infoproduct.product.image+"' alt=''></div><p>"+app.infoproduct.product.description +"</p></div>")
    }, 1500);
});

app.$logout.on("click",function(){
    app.actualuser = "";
    app.$submit.prop("disabled", false);
    app.$nav.css("display", "none");
    switch (app.$return.attr("class")) {
        case "cat":{
            app.$categorie.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$categorie.css("display","none");
                app.$categori.children().remove();
                app.$produ.children().remove();
                app.$info.children().remove();
                app.$login.css("display", "block").animate({left: 0}, 1500);
            });
            break;
        }
        case "pro":{
            app.$product.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$product.css("display","none");
                app.$categori.children().remove();
                app.$produ.children().remove();
                app.$info.children().remove();
                app.$login.css("display", "block").animate({left: 0}, 1500);
            });
            break;
        }
        case "inf":{
            app.$infoprod.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$infoprod.css("display","none");
                app.$categori.children().remove();
                app.$produ.children().remove();
                app.$info.children().remove();
                app.$login.css("display", "block").animate({left: 0}, 1500);
            });
            break;
        }
    }
});

app.$return.on("click",function(){
    switch (app.$return.attr("class")) {
        case "cat":{
            app.actualuser = "";
            app.$submit.prop("disabled", false);
            app.$categorie.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$categorie.css("display", "none");
                app.$categori.children().remove();
                app.$login.css("display", "block").animate({left: 0}, 1500);
            });
            app.$nav.css("display", "none");
            break;
        }
        case "pro":{
            app.$return.removeClass("pro");
            app.$return.addClass("cat");
            app.$product.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$product.css("display", "none");
                app.$produ.children().remove();
                app.$categorie.css("display", "block").animate({left: 0}, 1500);
            });
            break;
        }
        case "inf":{
            app.$return.removeClass("inf");
            app.$return.addClass("pro");
            app.$infoprod.css("display", "block").animate({left: -100+"%"}, 1500,function(){
                app.$infoprod.css("display", "none");
                app.$info.children().remove();
                app.$product.css("display", "block").animate({left: 0}, 1500);
            });
            break;
        }
    }
});