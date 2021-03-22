
cartRequantity();
function cartRequantity(){
   if ( $('.dropdown-cart__quantity').length ){
        $('.dropdown-cart__quantity input').blur(()=>{ 
            var data = $("#form-cart-header").serialize();
            cartRefresh(data);
        });
   }
}

function cartRefresh(data){
    $.ajax({
    url: "index.php?route=checkout/cart/edit",
    type: "post",
    data: data,
    beforeSend: function () {
        // Добавляем лоадер
        popupLoaderAdd('popup-maincart__body');
    },
    complete: function () {
        // Удаляем лоадер
        popupLoaderClear();
    },
    success: function (html) {
        var page = $( $('<div></div>') ).html(html);
        var cart_button = $(page).find('.header__cart').children();
        var popup_content = $(page).find('.dropdown-cart').children();


        $('.header__cart').html(cart_button);
        $('.dropdown-cart').html(popup_content);

        halfedPrice();
        cartRequantity();
        cartQuanter();
        popupRefresh();
        reqInput();

        if ( $('#checkout-cart__input').length ){
            $('#checkout-cart__input').val( $('#header-cart__input').val() );
            reloadAll();
        }
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(
            thrownError +
                "\r\n" +
                xhr.statusText +
                "\r\n" +
                xhr.responseText
        );
    },
});
}

cartQuanter();
function cartQuanter(){
    for (let index = 0; index < $('.dropdown-cart__quantity a').length; index++) {
        const link = $('.dropdown-cart__quantity a')[index];

        $(link).click(function(event) {
            event.preventDefault();
            var input = $(this).parent().find('input');
            var valInput = Number( $(input).val() );
            ($(this).hasClass('dropdown-cart__minus')) ? valInput = valInput - 1 : valInput = valInput + 1;
            $(input).val(valInput);

            var data = $("#form-cart-header").serialize();
            cartRefresh(data);
        });
    }
}


// Добавляем Loader
function popupLoaderClear(){
    // Удаляем лоадер
    if ( $('.popup-loader').length ){
        for (let index = 0; index < $('.popup-loader').length; index++) {
            const loader = $('.popup-loader')[index];
            $(loader).remove();
        }
    }
}

// Удаляем Loader
function popupLoaderAdd(className){
    // Удаляем лоадер
    $(`.${className}`).append('<div class="popup-loader"></div>');
}

// Input Digital
reqInput();
function reqInput(){

    for (let index = 0; index < $('input._digital').length; index++) {
        const input = $('input._digital')[index];
        $(input).bind("change keyup input click keydown", function() {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });
    }

}