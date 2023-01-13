var borderleft = [0, 18, 36, 54, 72, 90, 108, 126, 144, 162],
    cornerDot = [17, 35, 53, 71, 89, 107, 125, 143, 179, 161, 196],
    wW = window.innerWidth,
    wH = window.innerHeight,
    $table = $('#periodic-table__table'),
    $html = $('html'),
    previousScreen,
    md = new MobileDetect(window.navigator.userAgent),
    dotAnimStartt = 1000,
    frt = 0,
    tableElementAnimation = false,
    $body = $('body'),
    isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) || navigator.userAgent.match(/(iPod|iPhone|iPad)/),
    isMobile = false,
    click = { x: 0, y: 0 },
    tableClosure = 0,
    elementList = [],
    xpos,
    ypos,
    timeout = false,
    delta = 200,
    transform = { x: 0, y: 0 },
    panMove = { x: 0, y: 0 },
    scrolling = false,
    dragging = false,
    el = document.querySelector("#periodic-table__table"),
    slideCount = 0,
    pageLoaded = false,
    landingPage = true,
    firstClosureParent = 2,
    elemAlign,
    watchAnimation='webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';



$(window).on('load', function () {
    setFonts();
    setElements();

});

$(window).resize(function () {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

$(function () {

    //Tablo kutularını ekler
    setPeriodicTableSquare();

    //svg elementlerinin yüklenmesini sağlar
    svg4everybody();

    //Footer nav sayfasını açar
    $(document).on("click", '.target-overlay', function () {
        var b = $(this);
        var target = b.attr('data-target');

        b.addClass('active').siblings().removeClass('active');
        $body.addClass('overlay');
        setPage(target, true);
    });

    $(document).on('click', '.connect-without-ys #landing-icon div#periodicTableLogo', function () {
        setPage('landing');
        landingPage = true;
        setCanvas(true);
    });

    //Gizlilik sekmeleri arası geçiş yapar
    $('.privacy__header__tab').on('click', function () {
        var b = $(this);

        b.addClass("selected").siblings().removeClass("selected");
        $(".privacy_content[data-target=" + b.attr("data-target") + "]").addClass("selected").siblings().removeClass("selected");
    });

    //checkboxları seçer
    $('#privacy__footer .checkbox').on('click', function () {

        $(this).toggleClass('selected');
    });

    //overlay sayfaları kapatır
    $('.close-overlay').on('click', function () {
        var b = $(this);
        var p = b.parent('.overlay-content');

        p.find('> *').css('opacity', '0');

        setTimeout(function () {
            p.css('height', '0');
            $body.removeClass('overlay');
        }, 100);

        setTimeout(function () {

            if (previousScreen === 'loading') {
                landingPage = true;
                setCanvas();
                setPage('landing');
                p.find('> *').attr('style', '');
                p.attr('style', '');
            } else {
                $html.removeClass(b.attr('data-target')).addClass(previousScreen);
                $('.target-overlay.active').removeClass('active');
                p.find('> *').attr('style', '');
                p.attr('style', '');
            }

        }, 600);
    });

    //Bağlanmadan kurcula ekranına geçer
    $('#connect-widthout-ys-box__button').on('click', function () {
        setPage('connect-without-ys', true);
        landingPage = false;
        setCanvas(true);
    });

    //Select element düzenler
    $("select").each(function () {
        $(".ph").show();
        if (!isMobile) {

            var $this = $(this),
                numberOfOptions = $(this).children("option").length;

            $this.addClass("s-hidden");
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="styledSelect"></div>');

            var $styledSelect = $this.next("div.styledSelect");

            $styledSelect.html("<p class='ph'>" + $this.attr("data-placeholder") + "</p>");

            var $list = $("<div />", {
                class: "options"
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $("<span />", {
                    text: $this.children("option").eq(i).text(),
                    rel: $this.children("option").eq(i).val()
                }).appendTo($list);
            }


            var $listItems = $list.children("span");
            var parent = this.parentNode;

            $styledSelect.click(function (e) {
                var arr = $(this).parent().siblings('.select-arrow');
                $('.select-arrow').removeClass('active');
                e.stopPropagation();
                $("div.styledSelect.active").each(function () {
                    $(this).removeClass("active").next("div.options").hide();

                });
                $(this).toggleClass("active").next("div.options").toggle();
                arr.addClass('active')

                if ($listItems.length > 5) {
                    var el = parent.querySelector('.options');
                    SimpleScrollbar.initEl(el);

                }

            });

            $listItems.click(function (e) {
                var arr = $this.parent().siblings('.select-arrow');
                arr.removeClass('active');
                e.stopPropagation();
                $this.parents(".formsection").removeClass("error");
                var txt = $(this).text().length < 2 ? $this.attr("data-placeholder") : $(this).text();
                $styledSelect.text(txt).removeClass("active");
                $this.val($(this).attr("rel"));
                $list.hide();

            });

            $(document).click(function () {
                $('.select-arrow').removeClass('active');
                $styledSelect.removeClass("active");
                $list.hide();
            });
        }
    });

    $("select").on("change", function () {
        var s = $(this);
        if (s.find("option:selected").val() !== "" && s.find("option:selected").text().length > 1) {
            s.parents(".formsection").find(".ph").hide();
            s.addClass("selected");
        } else {
            s.parents(".formsection").find(".ph").show();
            s.removeClass("selected");
        }

        if (s.find("option:selected").text() == "Other") {
            $(".otherTypeCoin").removeClass("hided");
        } else {
            $(".otherTypeCoin").addClass("hided");
        }


    });

    //Yemek sepeti ile bağlan
    $('#connect-with-ys-box').on('click', function () {

        setPage('periodic-table');
        landingPage = false;
    });

    //Bağlanmadan kurcala buton sonucu
    $('#connect-without-ys__btn').on('click', function () {

        setPage('periodic-table');
        landingPage = false;

        $body.addClass('unconnected-user')
    });

    //tablo filtreleri
    $('#filters_fiters-box .filter').on('click', function () {

        var b = $(this),
            type = "[data-parent=" + b.attr("data-parent") + "]";


        if ($body.hasClass('closure')) {
            firstClosureParent = b.index();
            b.attr("disabled", null);
            b.removeClass("disabled");
            b.siblings().attr('disabled', 'disabled').addClass('disabled');
            setCloseTable(false);

        } else {


            if (b.attr("disabled") == "disabled") return false;
            b.attr('disabled', 'disabled');

            b.toggleClass("disabled");

            var el = $table.find(".element" + type).eq(0);

            tableElementAnimation = true;
            setChangeOrder(el, type, frt, b.hasClass("disabled") ? true : false);


            $table.find(".element" + type).eq($table.find(".element" + type).length - 1).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                b.attr("disabled", null);
            });

            //if ($('#filters_fiters-box .filter.disabled').length) {
            //    $('#filter-box__select-all .checkbox').addClass('selected');
            //} else {
            //    $('#filter-box__select-all .checkbox').removeClass('selected');
            //}
        }




    });

    //yemediklerim
    $("#footer__filter-box .filter").on("click", function () {
        var b = $(this),
            type = "[data-eaten=eaten]";
        b.toggleClass("disabled");
        $table.find(type).toggleClass("eaten");
    });

    //Filtrelerin hepsini kapatır
    $('#filter-box__select-all p,#filter-box__select-all .checkbox').on('click', function () {

        if ($('#filter-box__select-all .checkbox').hasClass('selected')) {

            $('#filters_fiters-box .filter').addClass('disabled');
        
            $('#filter-box__select-all .checkbox').removeClass('selected');
            tableElementAnimation = false;
            $('#filters_fiters-box .filter').eq(0).one(watchAnimation, function () {
                $('#periodic-table__table .element,.bindElement').addClass('disabled');
            })
           

        } else {

            $('#filters_fiters-box .filter').removeClass('disabled');
            $('#filter-box__select-all .checkbox').addClass('selected');
            tableElementAnimation = false;
          
            $('#filters_fiters-box .filter').eq(0).one(watchAnimation, function () {
                $('#periodic-table__table .element,.bindElement').removeClass('disabled');
            })

        }
    });

    //Element detay penceresini açar
    $(document).on('click', '.periodic-table #periodic-table__table .element, #table-closure-box > div .element', function () {
        $body.addClass('element-detail');
        $('#element-detail').addClass('animated');
        tableClosure = 0;
        $('#periodic-table__table').css('transform', 'scale(1)');
        var elem = $("#element-detail__element-box"),
            b = $(this),
            attr = b[0].attributes;

        for (var i = 1, len = attr.length; i < len; i++) {
            var current = attr[i];
            elem.find(".element.big").attr(current.nodeName, current.nodeValue);
        }

        elem.css("background-color", b.css("background-color"));
        elem.find(".big .atomNo").text(b.find(".atomNo").text());
        elem.find(".big .shortName").text(b.find(".shortName").text());
        elem.find(".big .name").text(b.find(".name").text());

    });

    //Element detay penceresini kapatır
    $('#element-detail__close').on('click', function () {

        var p = $('#element-detail');
        p.removeClass('animated');

        setTimeout(function () {
            $body.removeClass('element-detail');
            //$('#element-detail__selected-count__selected-elements').text('');
            if ($('.filter-box__selection-box__element.added').length < 3) {
                p.removeClass('complete-order');
            }
        }, 350)
    });

    //Element detayda gösterilen elementi seçim kutusuna ekler
    $("#element-detail__add-btn button").on("click", function () {

        var elem = $("#element-detail__element-box .element.big"),
            trg = $(".filter-box__selection-box__element:not(.added)").eq(0),
            mTrg = $(".element-detail__selected:not(.added)").eq(0),
            selectedElements = $('#element-detail__order-box__order-shortnames'),
            sideElement = $("#element-detail__element-box .sideElement:not(.added)").eq(0),
            selectedShortName = $('#element-detail__selected-count__selected-elements'),
            elementNames = '',
            p = $('#element-detail');

        trg.append(elem.clone());
        mTrg.append(elem.clone());
        trg.addClass("added");
        mTrg.addClass("added");



        $(".selected-element,.element-detail__selected").removeClass("add-box");

        var selectedTexts = '';

        $('.filter-box__selection-box__element.added').each(function () {
            selectedTexts += $(this).find('.shortName').text();
        });

        selectedElements.text(selectedTexts)

        for (var i = 0; i < $(".filter-box__selection-box__element.added").length; i++) {
            var n = $(".filter-box__selection-box__element.added").eq(i).find('.shortName').text();
            elementNames += i == $(".filter-box__selection-box__element.added").length - 1 ? n : n + ' + ';
        }

        selectedShortName.text(elementNames)

        if ($(".filter-box__selection-box__element.added").length) {

            if ($(".filter-box__selection-box__element.added").length > 1) {
                $("#element-detail").addClass("complete-order");
            } else {
                p.removeClass('animated');
                setTimeout(function () {
                    $body.removeClass('element-detail');
                    //$('#element-detail__selected-count__selected-elements').text('');
                    if ($('.filter-box__selection-box__element.added').length < 3) {
                        p.removeClass('complete-order');
                    }
                }, 350)
            }
            $body.addClass('able-to-order able-to-delete');
        } else {
            p.removeClass('animated');
            setTimeout(function () {
                $body.removeClass('element-detail');
                //$('#element-detail__selected-count__selected-elements').text('');
                if ($('.filter-box__selection-box__element.added').length < 3) {
                    p.removeClass('complete-order');
                }
            }, 350)
        }


        var selectedText = $('.filter-box__selection-box__element.added').length > 1 ? 'seçimlerini' : 'seçimini';
        var selectedClass = $('.filter-box__selection-box__element.added').length > 1 ? 'multiple' : 'single';

        $('#element-detail__order-box__order-text').attr('class', '').addClass(selectedClass);

        $('.element-detail__selected-texture').text(selectedText);

        setTimeout(function () {
            sideElement.append(elem.clone().removeClass('big')).addClass('added');
        }, 900)

        $('.filter-box__selection-box__element.added').each(function () {

            $('#periodic-table__table .element[data-atomno=' + $(this).find('.element').attr('data-atomno') + '] , #table-closure-box .element[data-atomno=' + $(this).find('.element').attr('data-atomno') + ']').addClass('non-selectional ');
            
        })

       

    });

    //seçilmiş elementi listeden çıkarırı
    $(document).on("click", ".added .filter-box__element-delete", function () {

        var b = $(this),
            p = b.parent(),
            selectedShortName = $('#element-detail__selected-count__selected-elements'),
            elementNames = '',
            atomNo = p.find('.element').attr('data-atomno');

        $('#periodic-table__table .element[data-atomno=' + atomNo + '], #table-closure-box .element[data-atomno=' + atomNo + '] ').removeClass('non-selectional ');

        p.find(".element").remove();

        p.removeClass('added');

        $("#element-detail").removeClass("complete-order");

        $("#element-detail").remove("complete-order");
        $('.element-detail__selected.added').eq(p.index()).removeClass('added').find('.element').remove();
        $('#element-detail__element-box .sideElement > div').remove();
        $('#element-detail__element-box .sideElement').removeClass('added');

        $(".filter-box__selection-box__element.added").each(function () {
            var cl = $(this).find('.element').clone().removeClass('big');
            var trg = $('#element-detail__element-box .sideElement:not(.added)').eq(0);
            trg.addClass('added').append(cl);
        });

        if ($(".filter-box__selection-box__element.added").length < 1) {
            $body.removeClass('able-to-order able-to-delete');
        }

        for (var i = 0; i < $(".filter-box__selection-box__element.added").length; i++) {
            var n = $(".filter-box__selection-box__element.added").eq(i).find('.shortName').text();
            elementNames += i == $(".filter-box__selection-box__element.added").length - 1 ? n : n + ' + ';
        }

        selectedShortName.text(elementNames)
    });

    //Kullanıcı sayfasına yönlendirir
    $('#filter-box__taste-chemical').on('click', function () {
        setPage('user-profile');
        if (!$('#user-profile footer').length) {
            var fc = $('footer').clone();
            fc.find('#footer__filter-box').remove();
            $('#user-profile__district .safe').append(fc);
        }

        slideCount = 0;
        setUserFavorites(userFavorites[slideCount])
    });

    //Element-detay sayfasını açar
    $('#filter-box__selection-box__baloon p').on('click', function () {
        if ($('.filter-box__selection-box__element.added').length) {
            $body.addClass('element-detail filter-select');
            $('#element-detail').addClass('complete-order animated');

        }

        var selectedText = $('.filter-box__selection-box__element.added').length > 1 ? 'seçimlerini' : 'seçimini';
        var selectedClass = $('.filter-box__selection-box__element.added').length > 1 ? 'multiple' : 'single';

        $('#element-detail__order-box__order-text').attr('class', '').addClass(selectedClass);
        $('.element-detail__selected-texture').text(selectedText)
    });

    //Seçilmiş elementleri temizler
    $('#trash-can').on('click', function () {
        $('.filter-box__selection-box__element.added, .sideElement.added').removeClass('added');
        $('.filter-box__selection-box__element .element, .sideElement .element').remove();
        $('#element-detail').removeClass('complete-order');
        $('.element-detail__selected.added').removeClass('added').find('.element').remove();
        $('#periodic-table__table .element').removeClass('non-selectional');
        $body.removeClass('able-to-order able-to-delete');
    });

    //Kullanıcı favorileri sliderı çalıştırır
    $('.user-profile__favorite-content__favorite-compound__arrow').on('click', function () {

        var b = $(this);
        var n;
        if (b.hasClass('right')) {
            n = slideCount + 1 > userFavorites.length - 1 ? 0 : slideCount + 1;
        } else {
            n = slideCount - 1 < 0 ? userFavorites.length - 1 : slideCount - 1;
        }

        slideCount = n;
        console.log(n)
        setUserFavorites(userFavorites[n]);
    });

    //Kullanıcı sayfası favori element detay elementleri arası geçiş yapar
    $(document).on('click', '#user-profile__favorite-details .user-profile__favorite-details__element-container__elements__box:not(.active)', function () {
        var b = $(this).find('.element');
        $('#user-profile__favorite-details .user-profile__favorite-details__element-container__elements .active').removeClass('active');
        b.parent().addClass('active');
        $('#user-profile__favorite-details__element-container__detail h4').html(b.attr('data-groupname') + ' Favorin: ' + '<span>' + b.attr('data-name') + '</span>');

    });

    //Kullanıcı sayfasını kapatır
    $('#user-profile__header__back-to-table').on('click', function () {
        setPage('periodic-table', true);
    });

    //Nasıl çalışıyor
    $('#how-it-works').on('click', function () {
        setPage('how-it-works');
        var p = $('#how-it-works-container__box'),
            selected = $('#periodic-table__table .square').eq(3),
            element = selected.clone(),
            elementText = 'Elementini Seç',
            textBox = $('#how-it-works-container__box__texture');

        p.find('> *').not('#how-it-works-container__box__texture').remove();

        element.css({

            left: selected.offset().left,
            top: selected.offset().top,
            width: selected.width(),
            height: selected.height()
        });

        textBox.

            p.append(element);
        textBox.find('p').text(elementText);
    });

    $('#user-profile__timeline__line-box > div').on('click', function () {
        var b = $(this);
        b.addClass('active').siblings().removeClass('active');
        $('#user-profile__timeline__line-box > div').find('.user-profile__timeline__seperator').removeClass('active');
        b.find('.user-profile__timeline__seperator').addClass('active');
        b.prev().find('.user-profile__timeline__seperator').addClass('active');

        $('#user-profile__timeline__text h4 span,#user-profile__timeline__btn-box__element .element').removeClass('active');
        $('#user-profile__timeline__text h4 span[data-meal=' + b.attr('class').split(' ')[0] + '] , #user-profile__timeline__btn-box__element .element[data-meal=' + b.attr('class').split(' ')[0] + ']').addClass('active');

        $('#user-profile__timeline__text__slider > div').css({
            marginLeft: -100 * b.index() + '%'
        });

        $('#user-profile__timeline__text__slider > div > div').eq(b.index()).addClass('active').siblings().removeClass('active');
    });

    //tabloyu yakınlaştırıp uzaklaştırır
    $('#table-close-box').on('click', function () {
        $(this).toggleClass('active');
        firstClosureParent = 2;
        $('#filters_fiters-box .filter').attr('disabled', null).removeClass('disabled');
        $('#periodic-table__table .element,.bindElement').removeClass('disabled');
        $('#filter-box__select-all .checkbox').addClass('selected');
        tableElementAnimation = false;
        setCloseTable(true);
    });

    //yakınlaşmış tablonun elementleri arası geçiş yapar
    $('.periodic-table__arrow-box').on('click', function () {
        var total = $('#filters_fiters-box .filter').length - 1;

        if (!$(this).hasClass('right')) {
            if (firstClosureParent - 1 < 0) {
                firstClosureParent = total;
            } else {
                firstClosureParent -= 1;
            }

        } else {
            if (total < firstClosureParent + 1) {
                firstClosureParent = 0;
            } else {
                firstClosureParent += 1;
            }
        }

        setCloseTable(false);
    });

    $(document).on('click', '.unconnected-user #unconnected-user__filter-connect-ys button ', function () {
        $body.removeClass('unconnected-user');
    });

});



//tabloyu yakınlaştırıp uzaklaştırır
function setCloseTable(tog) {

    var firstElem = $('#filters_fiters-box .filter').eq(firstClosureParent).attr('data-parent'),
        selectiveparent = $table.find('[data-parent=' + firstElem + ']').parent(),
        res = 1.3;


    var trg = $('#table-closure-box > div'),
        btn = $('#table-close-box');


   
    if (!btn.hasClass('active')) {
        trg.addClass('hidden');
        $('#filters_fiters-box .filter').attr('disabled', null).removeClass('disabled');
        setTimeout(function () {
            $body.removeClass('closure');
            $('#periodic-table__table, #table-canvas').removeClass('bigger');
        }, 200)

        return false;
    }

    $('#filters_fiters-box .filter').addClass('disabled').eq(firstClosureParent).removeClass('disabled')

    trg.css('max-width', $(selectiveparent).width() * res * 10 + 20);

    trg.addClass('hidden');

    if (tog) {
        $('#periodic-table__table, #table-canvas').addClass('bigger');

    }

    trg.parent().find('> img').css('width', $(selectiveparent).width() * res * 15);



    setTimeout(function () {

        elemAlign = [
            { l: 0, t: 0 },
            { l: 0, t: 0 },
            { l: ($(selectiveparent).width() * res) * -1, t: 0 },
            { l: 0, t: ($(selectiveparent).height() * res * -1) },
            { l: ($(selectiveparent).width() * res), t: ($(selectiveparent).width() * res ) },
            { l: ($(selectiveparent).width() * res) * -1, t: 0 },
            { l: 0, t: 0 },
            { l: 0, t: 0 },
            { l: ($(selectiveparent).width() * res * -1) + 20, t: 0 },
            { l: ($(selectiveparent).width() * res * -1) + 20 , t: 0 }]


        if (window.navigator.userAgent.indexOf("Edge") > -1 || navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            elemAlign = [
                { l: 0, t: 0 },
                { l: 0, t: 0 },
                { l: ($(selectiveparent).width() * res) * -1, t: 0 },
                { l: 0, t: ($(selectiveparent).width() * res * -1) },
                { l: ($(selectiveparent).width() * res), t: ($(selectiveparent).width() * res) },
                { l: ($(selectiveparent).width() * res) * -1, t: 0 },
                { l: 0, t: 0 },
                { l: 0, t: 0 },
                { l: ($(selectiveparent).width() * res * -1) + 20, t: 0 },
                { l: ($(selectiveparent).width() * res) + 20, t: 0 }]
        }

        trg.find('.square').remove();
        for (i = 0; i < selectiveparent.length; i++) {
            var ef = selectiveparent[i],
                cln = $(ef).clone();

            cln.css({
                width: $(ef).width() * res,
                height: $(ef).height() * res
            });

            trg.css('margin-left', elemAlign[firstClosureParent].l + 'px');
            trg.css('margin-top', elemAlign[firstClosureParent].t + 'px');

            if (i != 0 && $(ef).prev().find('.element').attr('data-parent') != $(ef).find('.element').attr('data-parent') && $(selectiveparent[i - 1]).position().top != $(ef).position().top) {
                cln.addClass('clr')
            }

            if (i != 0 && $(selectiveparent[0]).position().left < $(ef).position().left && $(ef).prev().find('.element').attr('data-parent') != $(ef).find('.element').attr('data-parent') && $(selectiveparent[i - 1]).position().top != $(ef).position().top) {

                var diff = $(ef).position().left - $(selectiveparent[0]).position().left > $(ef).width() * 3 ? $(ef).width() * 3 : $(ef).position().left - $(selectiveparent[0]).position().left
                cln.css('margin-left', diff * res)
            }

            if (i != 0 && $(selectiveparent[0]).position().left < $(ef).position().left && $(ef).prev().find('.element').attr('data-parent') != $(ef).find('.element').attr('data-parent') && $(selectiveparent[i - 1]).position().top === $(ef).position().top) {

                var dif = $(ef).position().left - $(selectiveparent[i - 1]).position().left - $(ef).width() > $(ef).width() * 3 ? $(ef).width() * 3 : $(ef).position().left - $(selectiveparent[i - 1]).position().left - $(ef).width();

                cln.css('margin-left', dif * res)
            }

            trg.append(cln)

        }

        setTimeout(function () {
            trg.removeClass('hidden');
        }, 250);



        if (tog) {
            $body.toggleClass('closure');
            if (!$('#table-close-box').hasClass('active')) {
                $('#periodic-table__table, #table-canvas').removeClass('animated');
            }

        }

    }, 250);
}

//canvas çizgileri
function setCanvas(page) {
    var canvas = document.getElementById('table-canvas');
    var ctx = canvas.getContext('2d');

    var pixelRatio = window.devicePixelRatio || 1;

    var par = $('#periodic-table__container');
    var doth = $table.width() < 910 ? 2 : 2.5;
    var wr = parseFloat($('.square').width());
    var hr = parseFloat($('.square').height());

    canvas.width = landingPage || page ? par.width() + (2 * wr) : par.width();
    canvas.height = par.height();

    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= pixelRatio;
    canvas.height *= pixelRatio;


    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);



    var tbWidht = landingPage ? 0.83 : 0.75;
    var rowCount = landingPage || page ? 21 : 19;

    var wr = parseFloat($('.square').width());
    var hr = parseFloat($('.square').height());

    if ($body.hasClass('closure')) {
        wr = parseFloat($('.square').width()) * 1.3;
        hr = parseFloat($('.square').height()) * 1.3;
        rowCount = 18;

    }

    var startpointX = doth;
    var startpointY = doth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(238, 237, 237, .2)';

    for (i = 0; i < 11; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        ctx.lineCap = 'butt';

        ctx.moveTo(doth, startpointY);
        ctx.lineTo(((rowCount - 1) * wr), startpointY);
        ctx.stroke();
        ctx.closePath();

        startpointY += hr;
    }

    ctx.closePath();

    for (i = 0; i < rowCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        ctx.lineCap = 'butt';

        ctx.moveTo(startpointX, doth);
        ctx.lineTo(startpointX, 10 * hr);
        ctx.stroke();
        ctx.closePath();

        startpointX += wr;
    }

    var dotA = doth * 2;


    if (landingPage) {
        //landign header
        ctx.clearRect((3 * wr) + dotA, (2 * hr) + dotA, (14 * wr) - dotA, (2 * hr) - dotA);
        //landing text
        ctx.clearRect((5 * wr) + dotA, (4 * hr) + dotA, (11 * wr) - dotA, (2 * hr) - dotA);
        //ys ile bağlan button
        ctx.clearRect((7 * wr) + dotA, (7 * hr) + dotA, (6 * wr) - dotA, (hr) - dotA);
        //bağlanmadan kurcala
        ctx.clearRect((9 * wr) + dotA, (8 * hr) + dotA, (7 * wr) - dotA, (1 * hr) - dotA);

    } else if (page) {
        ctx.clearRect((6 * wr) + dotA, (2 * hr) + dotA, (10 * wr) - dotA, (hr) - dotA);
        ctx.clearRect((5 * wr) + dotA, (4 * hr) + dotA, (6 * wr) - dotA, (hr) - dotA);
        ctx.clearRect((10 * wr) + dotA, (6 * hr) + dotA, (6 * wr) - dotA, (hr) - dotA);
        ctx.clearRect((7 * wr) + dotA, (8 * hr) + dotA, (7 * wr) - dotA, (hr) - dotA);
    } else {
        ctx.clearRect((3 * wr) + dotA, dotA, (8 * wr) - dotA, (2 * hr) - dotA);
    }



    for (var t = 0; t < 11; t++) {

        var dottop = (((canvas.height / pixelRatio) - dotA) / 10) * t
        var dotleft = 0;
        for (var d = 0; d < rowCount; d++) {


            ctx.fillStyle = 'rgba(238, 237, 237, .2)';
            ctx.beginPath();
            ctx.rect(dotleft == 0 ? 0 : dotleft, dottop == 0 ? 0 : dottop, dotA, dotA);
            ctx.fill();
            dotleft += wr

        }

    }

    if (landingPage) {
        ctx.clearRect((3 * wr) + (dotA * 2), (2 * hr) + (dotA * 2), (14 * wr) - (dotA * 2), (2 * hr) - (dotA * 2));
        ctx.clearRect((5 * wr) + (dotA * 2), (4 * hr) + (dotA * 2), (11 * wr) - (dotA * 2), (2 * hr) - (dotA * 2));
    } else if (!page) {
        ctx.clearRect((3 * wr) + (dotA * 2), (dotA * 2), (8 * wr) - (dotA * 2), (2 * hr) - (dotA * 2));
    }


}

function periodicTable(pageId) {
    setMenuDragFilter();
    setPeriodicTableElements(pageId);

}

function setPeriodicTable(pageId) {
    var ft = 450;
    if (typeof previousScreen === 'undefined') {
        callPage(pageId);
        checkMinPrice(parseFloat($('#filter-product-price .handle').text()))
    } else {
        $('#landing > div').removeClass('animated');
        $('#periodic-table__table, #table-canvas').addClass('animated');

        $('#connect-without-ys > div').css({
            opacity: 0

        });

        $('#connect-without-ys > div').one(watchAnimation, function () {
            $html.removeClass('connect-without-ys');
        });

        setTimeout(function () {
            //callPage(pageId)
            $('.backgrounds__landing ').removeClass('animated');
            $('.backgrounds__table ').addClass('animated');
            $('#filter-box,#landing-icon div#periodicTableLogo,#ysLogo, .table-remained, #periodic-table').addClass('animated');
            setCanvas();
        }, ft);


    }

    $(' #periodicTableLogo').one(watchAnimation, function () {

        $body.addClass('elements-loaded')
        $('footer').removeClass('animated');
        for (j = 0; j < elementList.length; j++) {
            var e = elementList[j];
            $("#periodic-table__table > .square").eq(e.position).find(".element").remove();
            $("#periodic-table__table > .square").eq(e.position).append(e.element);
        }
        $('.landing-table').remove();
        callPage(pageId);
        checkMinPrice(parseFloat($('#filter-product-price .handle').text()))

    });

}

function landing(pageId) {
    var ft = 500;
    //$('#landing > div').each(function () {
    //    var b = $(this);
    //    var i = b.index();
    //    setTimeout(function () {
    //        b.addClass('animated');
    //    },i * ft + ft);
    //});
    $('.backgrounds__landing ').addClass('animated');
    setTimeout(function () {
        $('#landing > div').addClass('animated');
    }, ft, callPage(pageId));

}

function setPage(pageId, over) {

    var n = pageId;
    var ns = n.split('-');
    var fn = '';

    for (i = 0; i < ns.length; i++) {
        var e = i == 0 ? ns[i] : capitalizeFirstLetter(ns[i]);
        fn += e;
    }

    if (typeof window[fn] != 'function' || over) {
        var t = pageLoaded ? 0 : 350;
        setTimeout(function () {
            if ($html.attr('class')) {
                previousScreen = $('#' + $html.attr('class')).hasClass('overlay') ? previousScreen : $html.attr('class');
            }
            $html.attr('class', '').addClass(pageId);

        }, t);

    } else {


        //console.log(fn);
        window[fn](pageId);
    }

}

function userProfile(pageId) {
    callPage(pageId)
}

//Ekrana gelecek sayfayı, sayfanın id'sini html'e class atayarak çağırır
function callPage(pageId) {
    if ($html.attr('class')) {
        previousScreen = $('#' + $html.attr('class')).hasClass('overlay') ? previousScreen : $html.attr('class');
    }
    $html.attr('class', '').addClass(pageId);
}

//Kullanıcı favorilerini basar
function setUserFavorites(elem) {
    var slide = $('.user-profile__favorite-content__favorite-compound__slider__slide');
    var list = elem;
    var allText = '[';
    for (var i = 0; i < list.length; i++) {
        var p = slide.eq(i),
            e = list[i];


        p.find('.dot-box').addClass('update');

        p.find('.dot-box').attr('data-parent', e.parent);
        p.find('.atomNo').text(e.atomNo);
        p.find('.shortName').text(e.shortName);
        p.find('.name').text(e.name);
        allText += e.shortName;

    }

    allText += ']';
    $('#user-profile__favorite-content__favorite-compound h4').text(allText);

    $('.user-profile__favorite-content__favorite-compound__slider__slide').each(function () {

        var k = $(this)
        setTimeout(function () {
            k.find('.dot-box').removeClass('update')
        }, 200);

    });
}

//sürüklenen tablonun posizyonunu kontrol eder
function checkTablePosition(drag) {
    var tb = $('#periodic-table__table'),
        tw = tb.width() * parseFloat('1.' + tableClosure),
        p = $('#periodic-table__container'),
        origin = tb.css('transform-origin'),
        th = tb.height() * parseFloat('1.' + tableClosure);


    if (tw + tb.offset().left < p.width() + $('#filter-box').width()) {

        $('#periodic-table__table').css({
            left: (-2 * (tw - p.width())) - 12,
            transition: 'all 650ms ease-in-out'
        });

        transform.x = (-2 * (tw - p.width())) - 12;

    } else if (tb.offset().left > $('#filter-box').width() + (p.width() * (2.5 / 100))) {
        $('#periodic-table__table').css({
            left: 0,
            transition: 'all 650ms ease-in-out'
        });
        transform.x = 0;
    }


    if (tb.offset().top > p.offset().top) {
        $('#periodic-table__table').css({
            top: 0,
            transition: 'all 650ms ease-in-out'
        });

        transform.y = 0;

    } else if (tb.offset().top + th < p.offset().top + p.height()) {
        $('#periodic-table__table').css({
            top: (-2 * (th - p.height())) - 12,
            transition: 'all 650ms ease-in-out'
        });

        transform.y = (-2 * (th - p.height())) - 12;
    }
}

//window resize bittiğinde çağırılır
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        $table.one(watchAnimation, function () {
            setTimeout(function () {
                setElements();
                setFonts();
                setCanvas();
                setCloseTable(false);
            }, 350);
        })


    }
}

function setChangeOrder(el, typ, frt, disb) {

    var tm = 700 / ($table.find("> .square").find(".element" + typ).length + 1);
    var chc = disb ? $table.find("> .square").find(".element" + typ).not(".disabled").length : $table.find("> .square").find(".element.disabled" + typ).length;
    var dev = disb ? $table.find("> .square").find(".element" + typ).not(".disabled").eq(0) : $table.find("> .square").find(".element.disabled" + typ).eq(0);

    setTimeout(function () {

        if (!tableElementAnimation) return false;

        var sElem = el.parents(".square").index();
        var nxt = sElem + 15;

        if (disb) {
            el.addClass("disabled");

        } else {
            el.removeClass("disabled");
        }

        if ($table.find("> .square").eq(nxt).find(".element").attr("data-parent") == el.attr("data-parent") && typeof (el.attr("data-parent")) != "undefined") {
            frt = nxt;
            setChangeOrder($table.find("> .square").eq(nxt).find(".element"), typ, frt, disb);
        } else if (chc) {
            setChangeOrder(dev, typ, frt, disb);
        } else {
            return false;
        }
    }, tm)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Tablonun içine boş kutuları ekler
function setPeriodicTableSquare() {

    var squareCount = 126,
        sideTablesSquareCount = 10;



    for (var i = 0; i < squareCount; i++) {

        var addon = '',
            threeDots = '';


        if (i === 59) {
            addon += ' mainMealBox';
            threeDots = '<div class="bindElement"><p>...</p></div>';
        }

        if (i === 77) {
            addon += ' worldTasteBox';
            threeDots = '<div class="bindElement"><p>...</p></div>';
        }
        if (i == 1 || i == 5 || i == 14 || i == 59 || i == 77 || i == 83 || i == 86 || i == 88 || i == 89 || i == 90 || i == 107 || i == 108 || i == 106 || i == 124 || i == 125) {
            addon += ' gap'
        }
        var element = '<div class="square ' + addon + '">' + threeDots + '</div>';



        $table.append(element);
    }


    for (k = 0; k < sideTablesSquareCount; k++) {
        var element = '<div class="square ' + addon + '"><span class="table__dot"></span></div>';
    }



}

//yükseklik hesaplama
function setElements() {



    wH = window.innerHeight;
    var table = $table.height();

    $("#element-detail").css("min-height", wH - ((wH - table) / 2))
    $(".table-remained").css("height", (wH - table) / 2);
    $('#filter-box__select-all').css('min-height', (wH - table) / 2);
    setMenuDragFilter();



    if (navigator.platform === 'MacIntel' || navigator.platform === 'MacPPC') {
        $body.addClass('mac');
    }

}

//html font-size'ı sayfanın yüksekliğine göre belirler, text elementler font-size'larını buradan alır
function setFonts() {

    $("html").css("font-size", parseInt($table.height() / parseInt($("#container").attr("data-font"))) + "px");
    if (!pageLoaded) {
        setTimeout(function () {
            setPage(openingScreen);
            if (openingScreen != 'landing') {
                landingPage = false;
            }
            setCanvas();
            pageLoaded = true;
        }, 300)

    }
    if (!pageLoaded) {
        $('#container > *').attr('style', '');
    }


    //setDotAnimation();
}

//Nokta animasyonlarını set eder
function setDotAnimation() {

    var selectedDot = $("#periodic-table__table  > .square");

    setInterval(function () {

        var cls = ["moveBottom", "moveLeft", "moveRight"],
            randomClass = cls[Math.floor(Math.random() * 3)];

        do {
            var random = Math.floor(Math.random() * 179),
                dot = selectedDot.eq(random).find(".table__dot");
        }

        while (selectedDot.eq(random).is(".landingHeaderTop, .landingHeaderBottom, .periodicHeaderTop, .periodicHeaderBottom"));

        dot.removeClass("bounce")

        if (randomClass == "moveRight") {
            if (!checkDotPosition(random, cornerDot)) return false;
        }

        if (randomClass == "moveLeft") {
            if (!checkDotPosition(random, borderleft)) return false;
        }

        dot.addClass(randomClass + " animated");

        //setTimeout(function () {
        //    var elem = $("#table > .square .table__dot.animated").length;
        //    var randomDot = Math.floor(Math.random() * elem);

        //    $("#table > .square .table__dot.animated").eq(randomDot).removeClass("moveBottom moveLeft moveRight animated").addClass("bounce");
        //},1000)

    }, 500)

    setInterval(function () {
        var elem = $("#periodic-table__table  > .square .table__dot.animated").length;
        var randomDot = Math.floor(Math.random() * elem);

        $("#periodic-table__table  > .square .table__dot.animated").eq(randomDot).removeClass("moveBottom moveLeft moveRight animated").addClass("bounce");
        dotAnimStartt = 500;
    }, dotAnimStartt)

}

function checkDotPosition(rnd, list) {
    for (i = 0; i < list.length; i++) {
        if (rnd == list[i]) {
            return false;
        }
    }
    return true;
}

//menu drag sliderlar
function setMenuDragFilter() {
    new Dragdealer('filter-total-price', {
        slide: false,
        steps: 11,
        snap: true,
        x: 0.7,
        animationCallback: function (x, y) {

            var result,
                elem = $('#filter-total-price'),
                elemW = elem.width(),
                slideW = elemW * x;

            elem.find('> p').eq(0).css('width', slideW);
            if (x * 10 == 0) {
                result = "5 TL"
            } else if (x * 10 == 10) {
                result = "Hepsi"
            } else {
                result = x * 10 * 5 + " TL"
            }
            $("#filter-total-price .handle").text(result)

        }
    });

    new Dragdealer('filter-product-price', {
        slide: false,
        steps: 11,
        snap: true,
        x: 0.6,
        animationCallback: function (x, y) {

            var result,
                elem = $('#filter-product-price'),
                elemW = elem.width(),
                slideW = elemW * x;

            elem.find('> p').eq(0).css('width', slideW);

            if (x * 10 == 0) {
                result = "5 TL";

            } else if (x * 10 == 10) {
                result = "Hepsi"
            } else {
                result = x * 10 * 5 + " TL";
                checkMinPrice(x * 10 * 5);
            }
            $("#filter-product-price .handle").text(result);

        }
    });

}

//tabloya elementleri basar
function setPeriodicTableElements(pageId) {
    var elem = elements.DB;

    for (i = 0; i < elem.length; i++) {
        var element = elem[i];
        var eaten = typeof element.eaten == "undefined" ? "not-eaten" : "eaten";

        var dm = '<div class="element" data-atomNo="' + element.atomNo + '" data-group="' + element.group + '" data-groupNo="' + element.groupNo + '" data-name="' + element.name + '" data-parent="' + element.parent + '" data-periodicNo="' + element.periodicNo + '"  data-shortName="' + element.shortName + '" data-eaten="' + eaten + '" data-minPrice="' + element.minPrice + '"><p class="atomNo">' + element.atomNo + '</p><p class="shortName">' + element.shortName + '</p><p class="name">' + element.name + '</p></div>';

        var elemListItem = {};
        elemListItem.element = dm;
        elemListItem.position = element.tableNo - 1;

        elementList.push(elemListItem)

    }

    setPeriodicTable(pageId);

    //setTimeout(function () {
    //    $body.addClass('elements-loaded');

    //    for (j = 0; j < elementList.length; j++) {
    //        var e = elementList[j];
    //        $("#periodic-table__table > .square").eq(e.position).find(".element").remove();
    //        $("#periodic-table__table > .square").eq(e.position).append(e.element);
    //    }
    //    setPeriodicTable(pageId)


    //}, 500)


}

function checkMinPrice(p) {
    var price = p,
        elements = $('#periodic-table__table > .square .element');

    for (var i = 0; i < elements.length; i++) {
        var elem = elements[i],
            elementPrice = parseInt($(elem).attr('data-minPrice'));
        if (price < elementPrice) {
            $(elem).addClass('price-disabled');
        } else {
            $(elem).removeClass('price-disabled');
        }
    }

}