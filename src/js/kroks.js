$(function() {
    $('.fancybox').fancybox({
        padding: 5,
        openEffect  : 'none',
        closeEffect : 'none',
        prevEffect : 'none',
        nextEffect : 'none',
        closeBtn		: true,
        helpers : {
            title: {
                type : 'inside'
            },
            buttons: {
                position : 'top'
            },
            thumbs : {
                width  : 50,
                height : 50
            },
            overlay : {
                locked : false
            }
        }
    });

    $('.fancybox-gal').fancybox({
        padding: 5,
        openEffect: 'none',
        closeEffect: 'none',
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: true,
        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {
                position: 'top'
            },
            thumbs: {
                width: 50,
                height: 50
            },
            overlay: {
                locked: false
            },
            media: {

            }
        }
    });

    $('.inline').fancybox({
        maxWidth	: 800,
        maxHeight	: 600,
        fitToView	: false,
        autoSize	: true,
        closeClick	: false,
        scrolling	: 'visible',
        openEffect	: 'none',
        closeEffect	: 'none',
        helpers : {
            overlay : {
                locked : false
            }
        }
    });

    /*/$('.add_comment_to_order').fancybox({
        maxWidth: 400,
        maxHeight: 300,
        fitToView: false,
        autoSize: true,
        closeClick: false,
        scrolling: 'visible',
        openEffect: 'none',
        closeEffect: 'none'
    });*/

    //jQuery.Autocomplete selectors
//	$.widget('ui.autocomplete', $.ui.dialog, {
//		_renderItem: function (ul, item) {
//			return $("<li>")
//					.attr("data-value", item.value)
//					.append(item.label)
//					.appendTo(ul);
//		}
//	});

    var autocompleteSearch = $('#search').autocomplete({
        source: '/search/?autocomplete=1',
//		delimiter: ',',
        minLength: 3,
//		autoFocus: true,
        select: function(event, ui){
            ui.item && (window.location.href = ui.item['link']);
        }
    })
        .data('ui-autocomplete');

    autocompleteSearch._renderItem = function (ul, item) {
        var $li = $('<li>'),
            $div = $('<div>').appendTo($li);

        item.image && $div.append(
            $('<img/>', { src: item.image, alt: item.value })
        );
        $div.append(item.label);

        return $li.appendTo(ul);
    };

    $("input[name='phone']").mask("+7 (999) 999-9999");

    lcart1 = $('.panel-fix').length
        ? $('#little_cart')
        : $('#g-panel-basket');

    lcart2 = $('#little_cart2');

    $(".product-viewer a").bind("click", function(e){
        var id = $(this).attr("id");
        $.post("/viewtype/", {"viewtype": id});
    });

    /*$('.item_quantity').change(function(){
        formRecount('checkout_form');
    });*/

    $("#enter_submit").click(function (e) {
        return EnterUser();
    });

    $("#user_login, #user_password").keypress(function(e)
    {
        if (e.which == 13)
        {
            //e.preventDefault();
            return EnterUser();
        }
    });

    $("#restore_pass_submit").click(function() {
        RestorePassword();
    });

    // Выбор модификации.
    $('input[name="prod-connector"]').change(function() {
        var jBtn = $('.prod-info .add_item_to_cart').data('id', $(this).val());
        var str_ = jBtn.attr('href');
        jBtn.attr('href', str_.substring(0, str_.indexOf('=') + 1) + $(this).val());
        jBtn.attr('data-id', $(this).val());
    });

    // Добавление в корзину.
    $(document).on('click', 'a.add_item_to_cart', function(e) {
        e.preventDefault();
        var item = $(this).data('id'),
            quan = parseInt($('#quantity').val()) || 1;

        a_add_to_cart = $(this);

        $.ajax({
            type: "GET",
            url: "/shop/cart/",
            dataType: "json",
            data: "add=" + item + "&count=" + quan + "&_=ok" + ($('.panel-fix').length ? '' : '&new=1'),
            success: function(data){
                if ($('.panel-fix').length)
                {
                    lcart1.html(data['lcart1']);
                    lcart2.html(data['lcart2']);

                    if (a_add_to_cart.hasClass("product_card"))
                    {
                        a_add_to_cart.html('<span class="v-cen"><span class="txt">товар в корзине</span><i class="diz"></i></span><i class="diz"><i class="bg green"></i><i class="bg h green"></i><i class="s"></i><i class="brd e"></i><i class="brd h"></i><img alt="" src="/images/buy-basket-ok.png"/></i>');
                    }
                    else
                    {
                        a_add_to_cart.html('<i class="diz"><i class="bg green"></i><i class="bg h green"></i><i class="s"></i><i class="brd e"></i><i class="brd h"></i><img alt="" src="/images/buy-basket-ok.png"/></xsl:when></i>');
                    }
                }
                else if ($('.g-panel').length)
                {
                    lcart1.html(data['lcart1']);

                    a_add_to_cart
                        .removeClass('g-btn_red')
                        .addClass('g-btn_green')
                        .find('> .g-btn__txt')
                        .each(function () {
                            $(this).data('in-cart') == 1
                                ? $(this).show()
                                : $(this).hide();
                        });
                }
            }
        });
    });

    //Добавление в сравнение
    var l_fav_compare = $('#little_fav_compare');
    $(document).on('click', '.do_compare', function(e) {
        e.preventDefault();
        var item = $(this).data('id');
        var comparePage = $('#comparePage');
        var on_page = '';
        if ($('#comparePage').length > 0)
        {
            on_page = '_';
        }
        $.ajax({
            type: "GET",
            url: "/shop/",
            dataType: "json",
            data: "compare=" + item + "&on_page=" + on_page,
            success: function(data){
                l_fav_compare.html(data['l_compare']);
                if (on_page != '')
                {
                    comparePage.html(data['page_compare']);
                }
            }
        });
    });

    //Добавление в избранное
    $(document).on('click', '.do_favorite', function(e) {
        e.preventDefault();
        var item = $(this).data('id');

        $.ajax({
            type: "GET",
            url: "/shop/",
            dataType: "json",
            data: "favorite=" + item,
            success: function(data){
                l_fav_compare.html(data['l_favorite']);
            }
        });
    });

    // Больше товаров.
    $('.catalog').on('click', 'a.goods-el_more__link', function () {
        var $this = $(this);
        var $filterForm = $('#filterForm');

        $.ajax({
            type: "GET",
            url: $filterForm.attr('action') + 'page-' + (parseInt($(this).data('page')) + 2) + '/?' + $filterForm.serialize(),
            dataType: "json",
            data: "from=" + $(this).data('showed') + "&_=ok",
            success: function(data) {
                $this.closest('.goods-el_more').after(data['items']).remove();

                // pagination
                var page = parseInt($('.pager .pager__link.current').removeClass('current').next('a').addClass('current')
                    .children('.pager__txt').eq(0).text());
                page && $('.pager__link.pager__link_next').attr('href', function (i, value) {
                    return value.replace(/page-\d+/, 'page-' + (page + 1));
                });
            }
        });

        return false;
    });

    $("a.where_to_buy").click( function(e) {

        e.preventDefault();
        var list_item_id = this.getAttribute('data-listitemid');

        GetDealer(list_item_id);
    });

    $('.hidden_text').hide();
    $('.show_text_btn').click(function(){
        $('.hidden_text', $(this).parent()).slideToggle('fast','linear');
        $('.show_text_btn').toggleClass('open');
    });

    $('#delivery').on('change', 'input[name = shop_delivery_condition_id]', function () {
        var delivery_id = $(this).data('delivery_id');

        $('#delivery').find('.cart-order-body__radio-field, .cart-order-body__radio-map-cont').hide();

        $address = $(this).closest('.radio').next().show();

        if ($(this).data('show_pvz')) {
            $('input[name = cdek_pvz_id]').removeAttr('checked');

            // Выводим ПВЗ.
            $address.html($('#delivery_pvz' + delivery_id).detach().show());

            // Устанавливаем высоту для карты.
            $('#cart-order-map' + delivery_id).css('height', $address.height());

            ymaps.ready(function () {
//				var myMap = $('#cart-order-map' + delivery_id).data('map');

//				myMap.setBounds(myMap.geoObjects.getBounds());
//				ymaps.geoQuery(myMap.geoObjects).applyBoundsToMap(myMap, {zoomMargin: 7});
                $address.find('input[name = cdek_pvz_id]').eq(0).click();
            });
        } else {
            var $address_template = $('#address_template');

            delivery_id == 18
                ? $address_template.find('.g-form-item_index').show()
                : $address_template.find('.g-form-item_index').hide();

            $address
                .html($address_template.detach().show())
                .find('input:visible')
                .filter(function () { return !$(this).val(); })
                .eq(0)
                .focus();
        }

//		$('#delivery_address, #delivery_pvz').hide();
//
//		if ($(this).data('show_pvz')) {
//			$('input[name="address"]').removeClass('required');
//			$('#delivery_pvz').show();
//		} else {
//			$('input[name="address"]').addClass('required');
//			$('#delivery_address').show();
//		}
    });

    $('#delivery').on('change', 'input[name = cdek_pvz_id]', function () {
        $('input[name = cdek_pvz_address]').val($(this).data('address'));
    });

    // Загрузка накладной в ЛК дилера
    $('#upload_invoice').find('input[type = "file"]').change(function () {
//		var filename = $(this).val().replace(/.*\\/, "");
//		$("#filename").html(filename);

        $(this.form).ajaxSubmit({
            dataType: 'json',
            success: function (response, status, xhr, $form) {
                var $invoce_exists = $form.find('#invoce_exists');
                if (response.success) {
                    $invoce_exists.html(response.html);
                } else {
                    $invoce_exists.html(response.error);
                }
            }
        });
    });

    // Удаление накладной
    $(document).on('click', '#delete_invoice', function () {
        if (confirm('Удалить загруженную накладную?'))
        {
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'json',
                success: function (response, status, xhr, $form) {
                    response.success && $('#invoce_exists').empty();
                }
            });
        }

        return false;
    });

//	$('#upload_invoice').ajaxForm(function() {
//		alert("Thank you for your upload!");
//	});

    // Кнопка "Изменить" свернутого блока корзины.
    $('.cart-order-title__btn').click(function () {
        var curr_block_digest = $(this).closest('.cart-order');
        curr_block_digest.stop().slideUp(300);
        curr_block_digest.prev('.cart-order').stop().slideDown(300);

        if (curr_block_digest.prev('.cart-order').data('step') == 2) {
            curr_block_digest.nextAll('.cart-order').hide();
        }

        return false;
    });

    // Переход к следующему блоку.
    $('.cart-order__list').on('click', '.g-btn_next', function () {
//		console.log(this, $(this).data('validate'))
        CheckStep(this);
        return false;
    });

    // Оформить заказ.
    $('.cart-total .g-btn_super').on('click', function () {
        if ($('#orderForm').valid()) {
            $('.g-btn_nor-super').is(':visible')
                ? $('.g-btn_nor-super').click()
                : $('#orderForm')
                    .find('.cart-order:visible')
                    .last()
                    .find('.g-btn_next')
                    .click();
        }

        return false;
    });

    $('.add_shop_items').fancybox({
        minWidth: 800,
        maxWidth	: 800,
        maxHeight	: 600,
        openEffect	: 'none',
        closeEffect	: 'none',
    });

    //Активация купона на скидку в корзине для розницы
    $(document).on('click', '#activate_coupon', function(e) {
        //e.preventDefault();

        var _coupon_text = $("#orderForm input[name='coupon_text']").val();
        if (_coupon_text == '') {
            $.fancybox('<p><strong>Купон на скидку должен быть заполнен для активации!</strong></p>');
        }
        else{
            $.ajax({
                type: "POST",
                url: "/shop/cart/",
                dataType: "json",
                data: 'coupon_text=' + _coupon_text + '&get_amount=1',
                success: function(data){
                    $('#orderForm .cart-goods__list').html($(data['cart']).filter('.cart-goods__list').html());

                    $('#couponAmount').attr('data-value', data['coupon_amount']);
                    $('#couponAmount').html(data['coupon_amount'] + '<span class="currency_rub">a</span>');

                    if (parseFloat(data['coupon_amount']) != 0)
                    {
                        $('#coupon_amount').css('display', 'block');
                    }

                    var iTotalSum = 0;
                    $('input.g-quan__num').each(function () {
                        iTotalSum += parseFloat($(this).data('amount'));
                    });

                    iDeliveryCost = parseFloat($('#deliveryCost').data('value')) || 0;

                    $('#subTotalWithDelivery, #subTotalWithDelivery__mob').each(function () {
                        $(this).html(
                            (iTotalSum + iDeliveryCost - Math.abs(data['coupon_amount']))
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '<span class="currency_rub">a</span>'
                        );
                    });

                },
                error:  function(xhr, str){
                    console.log('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }
        return false;
    });

});

function GetDealer(list_item_id)
{
    offices = $('#dealers_offices');

    $.ajax({
        type: "POST",
        url: "/where-to-buy/",
        dataType: "json",
        data: "list_item_id="+ list_item_id +"&show_dealers=1",
        success: function(data){
            offices.html(data['dealers_offices']);
        }
    });
}

function DeleteAll()
{
    lcart1 = $('#little_cart');
    lcart2 = $('#little_cart2');

    $.ajax({
        type: "GET",
        url: "/shop/cart/",
        dataType: "json",
        data: "delete_all="+ 1 +"&_=ok",
        success: function(data){
            lcart1.html(data['lcart1']);
            lcart2.html(data['lcart2']);
        }
    });
}

function DeleteOneItem(id_item)
{
    lcart1 = $('#little_cart');
    lcart2 = $('#little_cart2');

    $.ajax({
        type: "GET",
        url: "/shop/cart/",
        dataType: "json",
        data: "delete="+ id_item +"&_=ok",
        success: function(data){
            lcart1.html(data['lcart1']);
            lcart2.html(data['lcart2']);
        }
    });
}

function Send_Dev_Form(id_form)
{
    var aData = $('#form' + id_form).serialize();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: '/form-processing/',
        data: aData,
        success: function(data) {
            $("#divFancyError").empty();
            if (data['message'] == '')
            {
                $('#form' + id_form)[0].reset();
                $.fancybox({
                    'href': '#divFancy'
                });
                setTimeout("$.fancybox.close()", 3000);
            }
            else
            {
                $("#divFancyError").html("<div id='error'>" + data['message'] + "</div>");
                $.fancybox({
                    'href': '#divFancyError'
                });
            }
        },
        error: function(xhr, str){}
    });
}

function Send_Form(id_form)
{
    var $form = $('#form' + id_form),
        aData = $form.serialize(),
        url = $form.attr('action') && $form.attr('action') !== './' ? $form.attr('action') : '/form-processing/',
        $errorPlacement = $($form.data('errorPlacement'), $form.parent());

    if (!$form.valid()) { return false; }

    aData += '&_=' + Math.round(new Date().getTime());
    aData += '&url=' + window.location;

    if ($('input[type = "file"]', $form.get(0)).length) {
        var fData = new FormData($form.get(0));
        fData.append('_', Math.round(new Date().getTime()));
        fData.append('url', window.location);
        aData = fData;
    }

    var params = {
        type: 'POST',
        dataType: "json",
        url: url,
        data: aData,
        success: function(data) {
            $("#error").hide();
            $('.box_message').remove();

            if (data['message'] === '')
            {
                $form.before("<div class='box_message'>Данные успешно отправлены!</div>");
                $form[0].reset();
                $.fancybox.close();
                $errorPlacement.hide();
            }
            else
            {
                console.log($errorPlacement)
                $errorPlacement.length
                    ? $errorPlacement.html(data['message']).show()
                    : $form.before("<div id='error'>" + data['message'] + "</div>");
            }
        },
        error: function(xhr, str){}
    };

    if ($('input[type = "file"]', $form.get(0)).length) {
        params.contentType = false;
        params.processData = false;
    }

    $.ajax(params);

    return false;
}

/*function formRecount(form_name)
{
	table_prod_total = $('#table_prod_total');

//	setTimeout(function(){
			$('#' + form_name + ' #table_prod_total').append('<input type="hidden" name="recount" value="Пересчитать"/>');
			var aData  = $('#' + form_name).serialize();
			$.ajax({
				url: "/shop/cart/",
				dataType: "json",
				type: "POST",
				data: aData,
				success: function(data){
					if (data['empty'] == 1)
					{
						location.reload();
					}
					else
					{
						table_prod_total.html(data['res']);
						lcart1.html(data['lcart1']);
					}
				},
				error:  function(xhr, str){
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
//		}, 1000);
}*/

function RecountSubTotalWithDelivery(price)
{
    var delivery_price = parseFloat(price);
    var items_SubTotal = parseFloat($("#subTotal").text());
    var total_cost = items_SubTotal + delivery_price;
    $("#subTotalWithDelivery").text(total_cost);
}

function RecountSubTotalWithDelivery2()
{
    var delivery_price = parseFloat($("a.shop_delivery_type.on").attr("data-price"));
    var items_SubTotal = parseFloat($("#subTotal").text());
    var total_cost = items_SubTotal + delivery_price;
    $("#subTotalWithDelivery").text(total_cost);
}

function ChangeDeliveries(id_city)
{
    //изменить способы доставки при смене адреса
    var country = $('#shop_country_id').val();
    var area = $('#shop_country_location_id').val();
    var city = id_city;

    $.ajax({
        type: "POST",
        url: "/cart-processing/",
        dataType: "json",
        data: "country="+ country +"&area=" + area + "&city=" + city,
        success: function(data){
            $('#delivery').html(data['delivery']);
            ready_forms();
            RecountSubTotalWithDelivery2();
        }
    });

}

function CheckoutMinSumOrder()
{
    var items_SubTotal = parseFloat($("#subTotal").data('value'));
    var min_sum_order = parseFloat($("#minSumOrder").data('value'));
    if (items_SubTotal < min_sum_order)
    {
        $('#error').text('Минимальная сумма заказа - 1500 рублей!');
        $.fancybox('<p><strong>Минимальная сумма заказа - 1500 рублей!</strong></p>');
        return false;
    }
    else
    {
        $('#error').text('');
        CheckoutOrder('orderForm');
    }
}

function CheckoutOrder(form_id)
{
    $('.g-btn_super').click();
    return;

    var validate = '';
    var fio = $("#" + form_id + " input[name='name']").val();
    var phone = $("#" + form_id + " input[name='phone']").val();
    var email = $("#" + form_id + " input[name='email']").val();

    var city = $("#" + form_id + " input[name='city_name_input']").val();

    if (fio == '' || phone == '' || email == '')
    {
        validate = 'Заполните данные о контактном лице!<br />';
    }

    if (email != '')
    {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
        if (!filter.test(email))
        {
            validate += " Некорректный адрес электронной почты!<br />";
        }
    }

    if (phone != '')
    {
        var filter_phone = /^[\+\- ()0-9]+$/;
        if (!filter_phone.test(phone))
        {
            validate += " Некорректный номер телефона!<br />";
        }
    }

    if (city == '')
    {
        validate += " Заполните поле 'Город'!<br />";
    }

    var location = $( "#shop_country_location_id option:selected" ).val() ;
    var city = $( "#shop_country_location_city_id option:selected" ).val();
    var address = $("#" + form_id + " input[name='address']").val();

    /*if (address == '' && location > 0 && city > 0)
    {
        validate = 'Заполните данные об адресе доставки!';
        //$('#contact_person_address').html('<a href="#address" class="inline"><strong>' + validate + '</strong></a>');
        //$('#contact_person_address a').css('color', 'red');
    }*/

//	var pay = $("a.shop_payment_system").hasClass("on");
    var pay = $('input[name="shop_payment_system_id"]').val() > 0;
    if (pay != true)
    {
        validate += 'Выберите способ оплаты!<br />';
    }

    if (validate == '')
    {
        $("#" + form_id)
            .attr('action', '/shop/cart/?complete')
            .append('<input name="step" value="5" type="hidden" />')
            .submit();
    }
    else
    {
        $.fancybox('<p><strong>' + validate + '</strong></p>');
    }

    return false;
}

function EnterUser()
{
    var validate = '';
    var login = $("input#user_login").val();
    var pass = $("input#user_password").val();
    if (login == '' || pass == '')
    {
        validate = "Не заполнены логин и пароль!";
    }
    if (validate == '')
    {
        var aData  = $('#enter_form').serialize();
        $.ajax({
            url: "/users/",
            dataType: "json",
            type: "POST",
            data: aData,
            success: function(data){
                if (data['message'] == '')
                {
                    //location.reload();
                    window.location.href = '/users/';
                }
                else
                {
                    $('#login_message').text(data['message']);
                    $('#login_message').css('display', 'block');
                }
            },
            error:  function(xhr, str){
                console.log('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    }
    else
    {
        $('#login_message').text(validate);
        $('#login_message').css('display', 'block');
    }

    return false;
}

function RestorePassword()
{
    var validate = '';
    var email = $("input#user_email").val();
    if (email == '')
    {
        validate = "Не заполнено поле 'Электронная почта'!";
    }
    if (validate == '')
    {
        var aData  = $('#restore_password_form').serialize();
        $.ajax({
            url: "/users/",
            dataType: "json",
            type: "POST",
            data: aData,
            success: function(data){
                if (data['message'] == '')
                {
                    $.fancybox({ content: '<h1>Восстановление пароля прошло успешно</h1><p>В Ваш адрес отправлено письмо, содержащее Ваш новый пароль.</p>' });
                }
                else
                {
                    $('#login_message_r').text(data['message']);
                    $('#login_message_r').css('display', 'block');
                }
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    }
    else
    {
        $('#login_message_r').text(validate);
        $('#login_message_r').css('display', 'block');
        return false;
    }
}

function OpenPDF() //price-list
{
    var checked_groups_count = $("input.shop_groups_for_pdf:checkbox:checked").length;

    if (checked_groups_count > 0)
    {
        $('#all_groups_for_pdf').submit();
    }
    else
    {
        $.fancybox('<p><strong>Для формирования прайса необходимо выбрать группу (группы) магазина!</strong></p>');
        return false;
    }
}

function CancelOrder(order_id)
{
    if (confirm("Вы уверены, что хотите отменить заказ?"))
    {
        var order_div = $('.content-in.show_orders');
        var order_for_cancel = order_id;

        $.ajax({
            type: "POST",
            url: "/users/order/",
            dataType: "json",
            data: "cancel=" + order_for_cancel,
            success: function(data)
            {
                if (data['error'] == '')
                {
                    order_div.html(data['cancel']);
                }
                else
                {
                    $.fancybox('<p><strong>' + data['error'] + '</strong></p>');
                }
            }
        });
    }

    return false;
}

function RepeatOrder(order_id)
{
    var order_for_repeat = order_id;

    $.ajax({
        type: "POST",
        url: "/shop/cart/",
        dataType: "json",
        data: "repeat=" + order_for_repeat,
        success: function(data)
        {
            if (data['error'] == '')
            {
                lcart1.html(data['lcart1']);
                lcart2.html(data['lcart2']);
                $.fancybox('<p>Товар из заказа № ' + order_for_repeat + ' добавлен в корзину.<br/>Перейти в <a href="/shop/cart/">корзину</a> или продолжить <a href="/shop/">покупки</a></p>');
            }
            else
            {
                $.fancybox('<p><strong>' + data['error'] + '</strong></p>');
            }
        }
    });

    return false;
}

function DeleteFromOrder(order_id, shop_order_item_id)
{
    if (confirm("Вы уверены, что хотите удалить товар из заказа?"))
    {
//		var order_div = $('.content-in.show_orders');
        var order_div = $('.sidebar-content');
        var order_for_delete = order_id;
        var item_for_delete = shop_order_item_id;

        $.ajax({
            type: "POST",
            url: "/users/order/",
            dataType: "json",
            data: "delete_from_order=" + order_for_delete + "&item_for_delete=" + item_for_delete,
            success: function(data)
            {
                if (data['error'] === '')
                {
                    order_div.html(data['show']);
                }
                else
                {
                    $.fancybox('<p><strong>' + data['error'] + '</strong></p>');
                }
            }
        });
    }

    return false;
}

function GetShopItemsForGroup(group_id, order_id)
{
    var shop_group_td = $('#shop_group_' + group_id);

//	if (shop_group_td.children('.pc-product-wrap, .modal-acc__sub, .modal-good-item').length == 0)
    if ($('.cab-goods', shop_group_td).length == 0)
    {
        $.ajax({
            type: "POST",
            url: "/users/order/",
            dataType: "json",
            data: "get_shop_items_for_group=" + group_id + "&for_order_id=" + order_id,
            success: function(data)
            {
                $('.acc-panel__in', shop_group_td).append(data['show_items']);
//				if ($('.modal-acc-content').length)
//				{
//					shop_group_td.append(data['show_items']);
//				}
//				else
//				{
//					$('#get_shop_items_for_group_' + group_id).after(data['show_items']);
//				}
            }
        });
    }

    return false;
}

function AddShopItemToOrder(order_id, shop_item_id, quantity)
{
    $.ajax({
        type: "POST",
        url: "/users/order/",
        dataType: "json",
        data: "order_id=" + order_id + "&add_shop_item_id=" + shop_item_id + "&add_shop_item_q=" + quantity,
        success: function(data)
        {
            if (data['error'] == '')
            {
                var p_for_change = $('#p_' + shop_item_id);
                !p_for_change.data('name') && p_for_change.find('.g-btn__txt').text('Добавлен');
                p_for_change.removeClass('g-btn_red').addClass('g-btn_green g-btn_hover_off').attr('disabled', '');

                $('#added_shop_items')
                    .show()
                    .find(".cart-goods__list")
                    .append(data['adding_row']);
            }
        }
    });

    $('#added_shop_items').removeAttr('hidden');

    return false;
}

function RefreshOrder()
{
    //refresh_order
    $('#refresh_order').append('<input type="hidden" name="refresh_order" value="1"/>');
    var aData = $('#refresh_order').serialize();

    $.ajax({
        type: "POST",
        url: "/users/order/",
        dataType: "json",
        data: aData,
        success: function(data)
        {
//			var order_div = $('.content-in.show_orders');
            var order_div = $('.sidebar-content');
            order_div.html(data['show']);
        }
    });

    return false;
}

function RemoveAddingRow(id)
{
    $('#adding_shop_item_' + id).remove();
    if ($('#added_shop_items .cart-goods-el').length == 0)
    {
        $('#added_shop_items').attr('hidden', '');
    }

    var p_for_change = $('#p_' + id);
    p_for_change.find('.g-btn__txt').text(p_for_change.data('name') ? p_for_change.data('name') : 'Добавить к заказу');
    p_for_change.removeClass('g-btn_green g-btn_hover_off').addClass('g-btn_red').removeAttr('disabled');

    return false;
}

function RemoveAllAddingRows()
{
    $('#added_shop_items .cart-goods-el').each(function () {
        RemoveAddingRow($(this).data('shop_item_id'));
    });

    return false;
}

//new cart
function CheckStep(btn)
{
    var curr_block = $(btn).closest('.cart-order'),
        step_for_check = parseInt(curr_block.data('step')),
        next_step      = step_for_check + 1;

    if (step_for_check > 0)
    {
        var validator = $(btn.form).validate();
        var elements = validator.elements().filter(function () {
//			console.log('Field "%s": %s', this.name, $.contains(curr_block.get(0), this) ? 'to be validated' : 'ignored')
            return $.contains(curr_block.get(0), this);
        });
//		console.log('Elements to validate:', elements)

        if (elements.valid())
        {
            ShowStep(next_step);
        }
        else
        {
            validator.focusInvalid();

//			$(btn.form).validate().focusInvalid();
        }
    }
    else
    {
        ShowStep(next_step);
    }

    return false;
}

function CheckBackStep()
{
    step_for_check = parseInt($(".basket-order-nav.on").last().attr('data-step'));
    prev_step = step_for_check - 1;

    if (step_for_check >= 0)
    {
        // Убираем требоание обязательности полей при возврате на предыдущий шаг, предварительно сохранив его статус.
        $('#step_content_' + step_for_check).find('input.required, select.required, textarea.required')
            .each(function(){
                $(this).data('prev_state', { required: true }).removeClass('required');
            });

        ShowStep(prev_step);
    }
}

function ShowStep(step)
{
//	console.log(step)

    var next_block = $('#step_content_' + step),
        next_block_digest = next_block.next('.cart-order'),
        curr_block_digest = next_block.prev('.cart-order'),
        curr_block = curr_block_digest.prev('.cart-order')
    ;

    switch (step) {
        case 2:
            $('#cart-order-body-data_organ', curr_block_digest).html(
                $('input[name = company]', curr_block).val()
            ); // Организация
            $('#cart-order-body-data_name', curr_block_digest).html(
                $('input[name = name]', curr_block).val()
            ); // ФИО
            $('#cart-order-body-data_tel', curr_block_digest).html(
                $('input[name = phone]', curr_block).val()
            ); // Телефон
            $('#cart-order-body-data_mail', curr_block_digest).html(
                $('input[name = email]', curr_block).val()
            ); // Email
            $('#cart-order-body-data_com', curr_block_digest).html(
                $('textarea[name = description]', curr_block).val()
            ); // Комментарий к заказу

            break;
        case 3:
            var radio_block = $('.radio:has(input[name = shop_delivery_condition_id]:checked)', curr_block);

            var sDeliveryName = $('.radio__delivery-txt', radio_block).html(),
                sDeliveryTime = $('.radio__delivery-day', radio_block).length
                    ? $('.radio__delivery-day', radio_block).html()
                    : '',
                sDeliveryCost = $('.radio__delivery-cost', radio_block).length
                    ? $('.radio__delivery-cost', radio_block).html()
                    : 'Бесплатно',
                iDeliveryCost = parseFloat($('.radio__delivery-cost', radio_block).data('value')) || 0
            ;
            iCouponAmount = parseFloat($('#couponAmount').data('value')) || 0;

            $('.cart-order-body-delivery-name__txt', curr_block_digest).html(sDeliveryName); // Способ доставки
            $('.cart-order-body-delivery-name__dop', curr_block_digest).html(
                $('input[name = shop_delivery_condition_id]', radio_block).data('show_pvz') == 1
                    ? $('input[name = cdek_pvz_address]', curr_block).val()
                    : ($('input[name = postcode]', radio_block.next()).val() != '' ? $('input[name = postcode]', radio_block.next()).val() + ', ' : '') +
                    $('input[name = address]', radio_block.next()).val()
            ); // Адрес доставки или ПВЗ
            $('.cart-order-body-delivery__day', curr_block_digest).html(sDeliveryTime); // Время доставки
            $('.cart-order-body-delivery__cost', curr_block_digest).html(sDeliveryCost); // Стоимость доставки

            // Способ доставки в правый блок.
            $('#delivery_cost, #delivery_cost__mob')
                .find('#cart-order-total-delivery-name, #cart-order-total-delivery-name__mob').each(function () {
                $(this).html(sDeliveryName);
            }).end()
                .find('#cart-order-total-delivery-date, #cart-order-total-delivery-date__mob').each(function () {
                $(this).html(sDeliveryTime);
            }).end()
                .find('#deliveryCost, #deliveryCost__mob').each(function () {
                $(this).data('value', iDeliveryCost).html(sDeliveryCost);
            }).end()
                .show();

            // Всего к оплате.
            $('#subTotalWithDelivery, #subTotalWithDelivery__mob').each(function () {
                var totalSum = parseFloat($("#subTotal").data('value')) + iDeliveryCost + iCouponAmount;

                $(this).html(
                    totalSum
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '<span class="currency_rub">a</span>'
                );
            });

            // Обновляем способы оплаты.
            var curr_delivery_condition = $('input[name = shop_delivery_condition_id]:checked', curr_block).val();

            $.ajax({
                type: "POST",
                dataType: "json",
                data: "get_payment_methods=1&shop_delivery_condition_id=" + curr_delivery_condition,
                success: function(data)
                {
                    $('.cart-order-body', $('#step_content_3')).html(data['payment_methods']);
                }
            });

            break;
        case 4:
            $('.cart-order-body-pay-name__txt', curr_block_digest).html(
                $('input[name = shop_payment_system_id]:checked', curr_block).data('descr')
            ); // Название способа оплаты

            var imgEl = $('input[name = shop_payment_system_id]:checked', curr_block).nextAll('.g-vac__el').find('img.radio__pic'),
                digestImgEl = $('.cart-order-body-pay-name__pic', curr_block_digest);
            imgEl.length
                ? (
                    digestImgEl.attr({
                        src: imgEl.attr('src'),
                        alt: $('input[name = shop_payment_system_id]:checked', curr_block).data('descr')
                    }).show()
                )
                : digestImgEl.hide()
            ; // Изображение способа оплаты

            break;
    }

    curr_block_digest.stop().slideDown(300);
    curr_block.stop().slideUp(300);
    !next_block_digest.is(':visible') && next_block.slideDown(300)
        .find('input:visible')
        .filter(function () { return !$(this).val(); })
        .eq(0)
        .focus();
}

function GetCities()
{
    var curr_area = $("select[name = 'shop_country_location_id']").val();

    $("select[name = 'shop_country_location_city_id'] option[value != '0']").remove();
    $('#delivery').html('<p>Для отображения способов доставки выберите область и город!</p>');

    if (curr_area != '0')
    {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: "show_cities=1&shop_country_location_id=" + curr_area,
            success: function(data)
            {
                select_cities = $("select[name = 'shop_country_location_city_id']");
                select_cities.html(data['select']);

                ul_cities = $("#shop_country_location_city_id");
                ul_cities.html(data['ul']);

                ready_forms();
            }
        });
        return false;
    }
}

function GetDeliveries()
{
    var cdek_city = $("#cdek_city_id").val();

    $('#delivery_address, #delivery_pvz, #delivery_next').hide();
    $('#delivery').empty();

    if (/*curr_city || */cdek_city)
    {
        $.loadingScreen('show');

        $.ajax({
            type: "POST",
            dataType: "json",
            data: "get_deliveries=1&cdek_city_id=" + cdek_city,
//			data: "get_deliveries=1&shop_country_location_id=" + curr_area + '&shop_country_location_city_id=' + curr_city + '&cdek_city_id=' + cdek_city,
            success: function(data)
            {
                $('#delivery').html(data['delivery']).show();
                $('#delivery input[name=shop_delivery_condition_id]:checked').change();
                $('#delivery_next').show();

                $.loadingScreen('hide');
            },
            error: function()
            {
                $.loadingScreen('hide');
            }
        });

        return false;
    }
}

function NewRecount(form_name)
{
    basket_order_shop_items = $('#basket_order_shop_items');

    $('#' + form_name).append('<input type="hidden" name="new_recount" value="Пересчитать"/>');
    var aData  = $('#' + form_name).serialize();

    $.ajax({
        dataType: "json",
        type: "POST",
        data: aData,
        success: function(data){
            if (data['empty'] == 1)
            {
                location.reload();
            }
            else
            {
                basket_order_shop_items.html(data['res']);
                lcart1.html(data['lcart1']);
            }
        },
        error:  function(xhr, str){
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });

}

function NewCheckout()
{
    $('input[name="new_recount"]').remove();

    //проверка полей формы и минимальной суммы
    $("#checkout_form").validate({
        focusInvalid: true,
        errorClass: "input_error"
    });

    if ($("#checkout_form").valid())
    {
        var total_shop_items = parseFloat($("#subTotal").text());
        var min_sum_order = parseFloat($('#minSumOrder').text());
        if (total_shop_items >= min_sum_order)
        {
            $('#checkout_form').append('<input type="hidden" name="step" value="5" id="last_step"/>');
            $("#checkout_form").submit();
        }
    }
}

function ShowRegionInfo(region_name, city_name){

    $.ajax({
        type: "POST",
        url: "/about/addresses-of-shops/",
        dataType: "json",
        data: "region_name=" + region_name + "&city_name=" + city_name,
        success: function(data)
        {
            $('#header_tel2').html(data['header_tel2']);
        }
    });
}

function SaveCommentToOrder(id)
{
    var aData = $('#form_add_comment_to_order_' + id).serialize();

    $.ajax({
        type: "POST",
        url: "/users/order/",
        dataType: "json",
        data: aData,
        success: function (data)
        {
            if (data['error'] == '')
            {
                $('.modal').modal('hide');
                $('#cab-order_newcomment_' + id).text(data['answer']);
            }
        }
    });
    return false;
}
