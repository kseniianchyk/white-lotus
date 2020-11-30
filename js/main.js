$(document).ready(() => {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('#masters-block').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        appendArrows: (".masters-arrow-content"),
        appendDots: (".masters-arrow-content"),
        dots: true,
        customPaging: function (slider, i) {
            let thumb = $(slider.$slides[i]).data();
            return '<a>' + (i + 1) + '</a>';
        },
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 579,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            }
        ]
    });


    $('#gallery-slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        appendArrows: (".arrows-content"),
        appendDots: (".arrows-content"),
        variableWidth: true
    });

    $('.magnific').magnificPopup({
        delegate: 'a',
        type: 'image'
    });

    $(function () {
        let icons = {
            header: "iconClosed",
            activeHeader: "iconOpen"
        };
        $("#questions-accordion").accordion({
            collapsible: true,
            heightStyle: "content",
            active: 0,
            icons: icons,
            header: '> .questions-accordion-info > .questions-accordion-title'
        });
    });

    $("#phone").mask("+7 (999) 99-99-999");
    $("#call-me").mask("+7 (999) 99-99-999");
    $("#date").mask("99/99/9999 99:99");

    $('.open-popup').click(() => {
        $('#popup').css('display', 'flex')
    });

    $('#cancel, #popup, #cancel-popup').click((e) => {
        if (e.target.id === 'popup' || e.target.id === 'cancel' || e.target.id === 'cancel-popup') {
            $('#popup').hide()
        }
    });
    $('#reserve-button > button').click(() => {
        $(".error").hide();
        $('input').css("border-color", "");
        $('select').css("border-color", "");

        let name = $('#name');
        let phone = $('#phone');
        let select = $('#select');
        let date = $('#date');
        let hasError = false;

        if (!name.val()) {
            name.siblings(".error").show()
            name.css("border-color", "red")
            hasError = true;
        }
        if (!phone.val()) {
            phone.siblings(".error").show();
            phone.css("border-color", "red")
            hasError = true;
        }
        if (select.val() === 'Выберите ритуал') {
            select.siblings(".error").show();
            select.css("border-color", "red")
            hasError = true;
        }
        if (!date.val()) {
            date.siblings(".error").show();
            date.css("border-color", "red")
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "mail.php",
                data: 'name=' + name.val() + '&phone=' + phone.val() + '&select=' + select.val() + '&date=' + date.val(),
                success: () => {
                    $('#popup-container').css({
                        'padding': '195px 130px',
                        'width': '532px'
                    });
                    $('#reserve-complete').show();
                    $('#reserve-content').hide();
                },
            });
            if ($(window).width() < 579) {
                $('#popup-container').css({
                    'padding': '60px',
                    'width': '315px'
                });
            } else {
                $('#popup-container').css({
                    'padding': '195px 130px',
                    'width': '532px'
                });
            }
            $('#reserve-complete').show();
            $('#reserve-content').hide();
        }
    });

    $('#call-me-btn').click(() => {
        $(".error").hide();
        $('input').css("border-color", "");

        let phone = $('#call-me');
        let hasError = false;

        if (!phone.val()) {
            phone.siblings(".error").show();
            phone.css("border-color", "red")
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "phone.php",
                data: 'phone=' + phone.val(),
                success: () => {
                    $('#call-us-complete').show();
                    $('#call-us-content').hide();
                },
            });
            $('#call-us-complete').show();
            $('#call-us-content').hide();
        }
    });

    $('#burger').click(() => {
        $('#header-container').toggleClass('menu-open');
    });

    $('#menu a').click(() => {
        $('#header-container').removeClass('menu-open');
    });

});