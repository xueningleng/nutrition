var imgs_and_labels = {
    "Vegetable-Based Snacks": {
        "Mini carrots": {
            "image": "https://static.onecms.io/wp-content/uploads/sites/19/2017/04/04/GettyImages-121088095-2000.jpg",
            "label": "https://www.crystalvalleyfoods.com/wp-content/uploads/2017/05/Baby-Carrots-Nutrition-Label.png"
        },
        "Crunch dried veggies": {
            "image": "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/382df9245a0a225b-dpcS2YMa-large.jpg",
            // "label": "https://m.media-amazon.com/images/I/71mDjaYJDJL._SL1500_.jpg"
            "label": "https://esha.com/wp-content/uploads/2015/07/label-blog2.png"
        },
    },
    "Fruit-Based Snacks": {
        "Fruits": {
            "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg",
            "label": "https://usapears.org/wp-content/uploads/2020/09/Nutrition-Facts-2020-340x533-1.png"
        },

        "Fruit bites": {
            "image": "https://cdn.shopify.com/s/files/1/0048/8544/6759/files/Home_VeggieFruitBites-Hero_1800x.jpg?v=1642701183",
            // "label": "https://cdn.shopify.com/s/files/1/0048/8544/6759/products/CherrySweetPotato_Nutrition_1400x.jpg?v=1642735223"
            "label": "https://welchsfruitsnacks.com/wp-content/uploads/2018/08/30g-4-320x550.png"
        },
        "Fruit chips": {
            "image": "https://i5.walmartimages.com/asr/40173714-0d5c-4db4-9b03-2e02d0d0a500_2.e6a71418e7460e49afffccf196428098.jpeg",
            // "label": "https://images-na.ssl-images-amazon.com/images/I/51R2aIQfJ4L.jpg"
            "label": "https://cdn.shopify.com/s/files/1/0087/6065/5938/products/fruit-snacks-nut_2000x.png?v=1616425468"
        }
    },
    "High-Fiber Snacks": {
        "Oats with protein powder": {
            "image": "https://skinnyfitalicious.com/wp-content/uploads/2017/12/protein-oatmeal-img3.jpg",
            "label": "https://cdn.shopify.com/s/files/1/0052/6657/1334/files/Banana.png?v=1602691258"
        },
        "Nuts": {
            "image": "https://www.verywellhealth.com/thmb/45PJfywZmkzbmoi3CpiA8aPlRS4=/2560x1920/smart/filters:no_upscale()/the-tree-nut-allergy-diet-guide-1324280-selects-25c863756406496d8796feacd58461c7.jpg",
            // "label": "https://najlas.com/wp-content/uploads/2018/11/Gone-Nuts-4-oz-Nutrition-Label.jpg"
            "label": "https://mocafeusa.com/wp-content/uploads/2019/07/Nuts-Seeds-Nutrition-Facts-Label.png"
        },
        "Oats bar": {
            "image": "https://marisamoore.com/wp-content/uploads/2020/04/GF-Vegan-Oat-Bars-Recipe-1.jpg",
            "label": "https://chocolatecoveredkatie.com/wp-content/uploads/2016/02/image-1.png"
        },
        "Protein bar": {
            "image": "https://m.media-amazon.com/images/I/71A7mTrAaRS._SL1500_.jpg",
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
        $("#next").html("");
        let next_btn = "<form action= '/quiz'>" +
                            "<button class='next_button'> Quiz </button>" +
                        "</form>"
        $("#next").html(next_btn);

    }
   
    let build_examples = "Examples: "
    for (let i = 0; i < j["hover_examples"].length; i++) {
        let p = j["hover_examples"][i]
        if (i < j["hover_examples"].length-1) {
            p += ", "
        } else {
            p += "  "
        }
        let html_new = '<a class="hover-snacks">'+ p +'</a>'
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
                $('#snack-image').empty()
                let ex_img = $("<div class=col-md-6 example-image>")
                $(ex_img).html('<img src="' + img_link + '" id="example-image" class="snack-image-container" alt="Example Snack Image">');
                let nut_lab = $("<div class=\"col-md-6 nutrition-label\">")
                $(nut_lab).html('<img src="' + label_link + '" id="nutrition-label" width="130%" class="snack-image-container" alt="Label for Example Snack Image">');
                $(ex_img).appendTo($('#snack-image'))
                $(nut_lab).appendTo($('#snack-image'))

            }, function() {
                $( this ).removeClass( "hover" );
                var img_link = j['image_link']
              // var label_link = j['image_link']
                $('#snack-image').empty()
                $('#snack-image').html( ('<img src="' + img_link + '" class="snack-image-container" alt="Snack Type Image">') );
              // $('.nutrition-label').html('<img src="' + label_link + '" id="nutrition-label" class="image-container">');
            }
        );
    })
});