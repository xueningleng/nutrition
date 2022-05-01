imgs_and_labels = {
    "Vegetable-Based Snacks": {
        "mini carrots": {
            "image": "https://static.onecms.io/wp-content/uploads/sites/19/2017/04/04/GettyImages-121088095-2000.jpg",
            "label": "https://www.crystalvalleyfoods.com/wp-content/uploads/2017/05/Baby-Carrots-Nutrition-Label.png"
        },
        "crunch dried veggies": {
            "image": "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/382df9245a0a225b-dpcS2YMa-large.jpg",
            "label": "https://m.media-amazon.com/images/I/71mDjaYJDJL._SL1500_.jpg"
        },
    },
    "Fruit-Based Snacks": {
        "fruits": {
            "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg",
            "label": "https://usapears.org/wp-content/uploads/2020/09/Nutrition-Facts-2020-340x533-1.png"
        },

        "fruit bites": {
            "image": "https://cdn.shopify.com/s/files/1/0048/8544/6759/files/Home_VeggieFruitBites-Hero_1800x.jpg?v=1642701183",
            "label": "https://cdn.shopify.com/s/files/1/0048/8544/6759/products/CherrySweetPotato_Nutrition_1400x.jpg?v=1642735223"
        },
        "fruit chips": {
            "image": "https://i5.walmartimages.com/asr/40173714-0d5c-4db4-9b03-2e02d0d0a500_2.e6a71418e7460e49afffccf196428098.jpeg",
            "label": "https://images-na.ssl-images-amazon.com/images/I/51R2aIQfJ4L.jpg"
        }
    },
    "High-Fiber Snacks": {
        "oats_with_protein_powder": {
            "image": "https://skinnyfitalicious.com/wp-content/uploads/2017/12/protein-oatmeal-img3.jpg",
            "label": "https://cdn.shopify.com/s/files/1/0052/6657/1334/files/Banana.png?v=1602691258"
        },
        "nuts": {
            "image": "https://www.verywellhealth.com/thmb/45PJfywZmkzbmoi3CpiA8aPlRS4=/2560x1920/smart/filters:no_upscale()/the-tree-nut-allergy-diet-guide-1324280-selects-25c863756406496d8796feacd58461c7.jpg",
            "label": "https://najlas.com/wp-content/uploads/2018/11/Gone-Nuts-4-oz-Nutrition-Label.jpg"
        },
        "oats bar": {
            "image": "https://marisamoore.com/wp-content/uploads/2020/04/GF-Vegan-Oat-Bars-Recipe-1.jpg",
            "label": "https://chocolatecoveredkatie.com/wp-content/uploads/2016/02/image-1.png"
        },
        "protein bar": {
            "   ": "https://m.media-amazon.com/images/I/71A7mTrAaRS._SL1500_.jpg",
            "label": "https://proteinpowder.com/wp-content/uploads/2019/02/PureBarChocPeaButt.png"
        }
    }
}

$(document).ready(function(){
    
    var url = window.location.href

    if (page_num == 0) {
        $(".prev_button").addClass("disappear")
    }
    if (page_num == 3) {
        $(".next_button").addClass("disappear")
    }
   
    var build_examples = "Examples: "
    for (var i = 0; i < j["hover_examples"].length; i++) {
        p = j["hover_examples"][i]
        if (i < j["hover_examples"].length-1) {
            p += ", "
        } else {
            p += "  "
        }
        var html_new = '<a class="hover-snacks">'+ p +'</a>'
        build_examples += html_new
    }
    $('.hover-examples').html(build_examples)

    $(".hover-snacks").each(function() {
        $(this).hover(
            function() {
                $( this ).addClass( "hover" );
                var s = $(this).text()
                s = s.substring(0, s.length - 2)
                console.log(s)
                var img_link = imgs_and_labels[j["header"]][s]["image"]
                var label_link = imgs_and_labels[j["header"]][s]["label"]
                console.log(img_link)
                $('.snack-image').html('<img src="' + img_link + '" id="snack-images" class="image-container">');
                $('.nutrition-label').html('<img src="' + label_link + '" id="snack-images" class="image-container">');

            }, function() {
              $( this ).removeClass( "hover" );
              var img_link = j['image_link']
              var label_link = j['image_link']
              $('.snack-image').html( ('<img src="' + img_link + '" id="snack-images" class="image-container">') );
              $('.nutrition-label').html('<img src="' + label_link + '" id="snack-images" class="image-container">');
            }
        );
    })
});