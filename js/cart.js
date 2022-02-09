let cart = {}; ///корзина

$.getJSON('goods.json', function(data) {
    let goods = data;
    checkCart();
    showCart(); //вывод товаров на страницу
    
    function showCart() {
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            let out = 'Корзина пуста';
            $('#my-cart').html(out);
        } else {
        let out ='';
        for(let key in cart) {
            out += '<button class = "delete"  data-art = "'+key+'">x</button>';
            out += '<img src = "'+goods[key].image+'" width = "48">';
            out += goods[key].name;
            out += '<button class = "minus"  data-art = "'+key+'">-</button>';
            out += cart[key];
            out += '<button class = "plus" data-art = "'+key+'">+</button>';
            out += cart[key] * goods[key].cost;
            out += '<br>';
        }
        $('#my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);

      }
  }

    function plusGoods() {
        let articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLs();
        showCart();
    }

    function minusGoods() {
        let articul = $(this).attr('data-art');
        if(cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLs();
        showCart();
    }

    function deleteGoods() {
        let articul = $(this).attr('data-art');
            delete cart[articul];
        saveCartToLs();
        showCart();
    }
});

function checkCart() {
    //проверяю наличие корзины в localStorage
    if(localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function saveCartToLs() {
    localStorage.setItem('cart', JSON.stringify(cart));
}