let cart = {};  //корзина


$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data){
            out += '<div class= "single-goods">';
            out+='<h3>'+data[key]['name']+'</h3>';
            out+='<p>Цена: '+data[key]['cost']+'</p>';
            out+='<img src="'+ data[key].image + '">';
            out += '<button class="add-to-cart" data-art = "'+key+'"> Купить </buton>';
            out += '</div>';

        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}


function addToCart() {
    //добавляем товар в корзину
    let articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();
}

function checkCart() {
    //проверяю наличие корзины в localStorage
    if(localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    // показываем содержимое корзины
    let out ='';
    for(let w in cart) {
        out += w + '---' + cart[w] + '<br>';
    }
    $('#mini-cart').html(out);
}