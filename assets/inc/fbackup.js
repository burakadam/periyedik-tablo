// JavaScript source code
$('#periodic-table__table').bind('wheel', function (e) {

    if (scrolling) return false;
    scrolling = true

    var b = $(this),
        p = $('#periodic-table__container'),
        tb = $('#periodic-table__table'),
        ratio = parseFloat('1.' + tableClosure),
        tw = tb.width() * ratio,
        x = e.pageX - b.offset().left,
        y = e.pageY - b.offset().top,
        res = 0;

    $body.addClass('scrolled');


    if (e.originalEvent.deltaY < 0) {

        tableClosure += 30;

        if (tableClosure < 99) {

            //b.css('transform-origin', Math.floor(x) + 'px ' + Math.floor(y) + 'px');
            //b.css('transform', 'scale(1.' + tableClosure + ')');
        } else {
            tableClosure = 90;
            scrolling = false
        }
    }
    else {

        tableClosure -= 30;
        if (tableClosure < 0) {
            tableClosure = 0;
        }
        //b.css('transform-origin', Math.floor(x) + 'px ' + Math.floor(y) + 'px');
        //b.css('transform', 'scale(1.' + tableClosure + ')');

    }



    ratio = parseFloat('1.' + tableClosure);
    tw = tb.width() * ratio;


    var leftAnim, topAnim;
    if (tw === b.width()) {
        leftAnim = 0;
        topAnim = 0;
        //b.css({
        //    left: 0,
        //    top: 0
        //});
        transform = { x: 0, y: 0 }
        scrolling = false
    } else {
        console.log('left')
        if (x < b.width() * 0.15) {
            //b.css({
            //    left: (((b.width() * ratio) - b.width()) / 2) + 6
            //});
            leftAnim = (((b.width() * ratio) - b.width()) / 2) + 6;
            transform.x = (((b.width() * ratio) - b.width()) / 2) + 6;
        } else if (x > b.width() * 0.85) {
            //b.css({
            //    left: -1 * (((b.width() * ratio) - b.width()))
            //});
            leftAnim = -1 * (((b.width() * ratio) - b.width()));
            transform.x = -1 * (((b.width() * ratio) - b.width()));
        } else {
            leftAnim = 0;
            //b.css({
            //    left: 0
            //});
            transform.x = 0;
        }

        if (y < b.height() * 0.35) {
            topAnim = (((b.height() * ratio) - b.height())) + 6;
            //b.css({
            //    top: (((b.height() * ratio) - b.height())) + 6
            //});
            transform.y = (((b.height() * ratio) - b.height())) + 6;
        } else if (y > b.height() * 0.65) {

            topAnim = ((((b.height() * ratio) - b.height())) * -1) - 6;
            //b.css({
            //    top: ((((b.height() * ratio) - b.height())) * -1) - 6
            //});
            transform.y = ((((b.height() * ratio) - b.height())) * -1) - 6;
        } else {
            topAnim = 0;
            //b.css({
            //    top: 0
            //});
            transform.y = 0;
        }

    }
    b.css('transform-origin', Math.floor(x) + 'px ' + Math.floor(y) + 'px');
    b.css({
        transform: 'scale(1.' + tableClosure + ')',

    });

    b.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
        scrolling = false;

        //b.css({

        //    left: leftAnim,
        //    top: topAnim
        //});
    });

});


$('#periodic-table__table').bind('wheel', function (e) {

    if (scrolling) return false;
    scrolling = true

    var b = $(this),
        p = $('#periodic-table__container'),
        tb = $('#periodic-table__table'),
        ratio = parseFloat('1.' + tableClosure),
        tw = tb.width() * ratio,
        x = e.pageX - b.offset().left,
        y = e.pageY - b.offset().top,
        res = 0;

    $body.addClass('scrolled');


    if (e.originalEvent.deltaY < 0) {

        tableClosure += 30;

        if (tableClosure < 99) {

            //b.css('transform-origin', Math.floor(x) + 'px ' + Math.floor(y) + 'px');
            //b.css('transform', 'scale(1.' + tableClosure + ')');
        } else {
            tableClosure = 90;
            scrolling = false
        }
    }
    else {

        tableClosure -= 30;
        if (tableClosure < 0) {
            tableClosure = 0;
        }
        //b.css('transform-origin', Math.floor(x) + 'px ' + Math.floor(y) + 'px');
        //b.css('transform', 'scale(1.' + tableClosure + ')');

    }



    ratio = parseFloat('1.' + tableClosure);
    tw = tb.width() * ratio;


    var leftAnim, topAnim;
    if (tw === b.width()) {
        leftAnim = 0;
        topAnim = 0;
        //b.css({
        //    left: 0,
        //    top: 0
        //});
        transform = { x: 0, y: 0 }
        scrolling = false
    } else {
        console.log('left')
        if (x < b.width() * 0.5) {
            //b.css({
            //    left: (((b.width() * ratio) - b.width()) / 2) + 6
            //});
            leftAnim = (((b.width() * ratio) - b.width()) / 2) + 6;
            transform.x = (((b.width() * ratio) - b.width()) / 2) + 6;
        } else if (x > b.width() * 0.5) {
            //b.css({
            //    left: -1 * (((b.width() * ratio) - b.width()))
            //});
            leftAnim = -1 * (((b.width() * ratio) - b.width()));
            transform.x = -1 * (((b.width() * ratio) - b.width()));
        } else {
            leftAnim = 0;
            //b.css({
            //    left: 0
            //});
            transform.x = 0;
        }

        if (y < b.height() * 0.5) {
            topAnim = (((b.height() * ratio) - b.height())) + 6;
            //b.css({
            //    top: (((b.height() * ratio) - b.height())) + 6
            //});
            transform.y = (((b.height() * ratio) - b.height())) + 6;
        } else if (y > b.height() * 0.5) {

            topAnim = ((((b.height() * ratio) - b.height())) * -1) - 6;
            //b.css({
            //    top: ((((b.height() * ratio) - b.height())) * -1) - 6
            //});
            transform.y = ((((b.height() * ratio) - b.height())) * -1) - 6;
        } else {
            topAnim = 0;
            //b.css({
            //    top: 0
            //});
            transform.y = 0;
        }

    }





    $('#periodic-table__table').bind('wheel', function (e) {

        if (scrolling) return false;
        scrolling = true

        var b = $(this),
            p = $('#periodic-table__container'),
            animLeft, animTop, scrollleft;
        tx = e.pageX - b.offset().left,
            ty = e.pageY - b.offset().top;

        var perX = (tx * 100) / (b.width() * (parseFloat('1.' + tableClosure))),
            perY = (ty * 100) / (b.height() * (parseFloat('1.' + tableClosure)));

        $body.addClass('scrolled');



        if (e.originalEvent.deltaY < 0) {

            tableClosure += 30;

            if (tableClosure < 99) {


                var ratio = parseFloat('1.' + tableClosure),
                    tw = b.width() * ratio,
                    th = b.height() * ratio,

                    x = e.pageX - b.offset().left,
                    y = e.pageY - b.offset().top,

                    px = e.pageX - p.offset().left,
                    py = e.pageY - p.offset().top,

                    ratio = parseFloat('1.' + tableClosure),

                    diffX = (tw - p.width()) / 2,
                    diffY = (th - p.height()) / 2;

                if (x * ratio < diffX) {
                    animLeft = 0;
                } else if ((tw * (perX / 100)) + b.offset().left > p.offset().left + p.width()) {
                    animLeft = (-2 * (tw - p.width())) - 12
                } else {
                    animLeft = 0 - diffX;
                }

                if (y * ratio < diffY) {
                    animTop = 0
                } else if ((th * (perY / 100)) + b.offset().top > p.offset().top + p.height()) {
                    animTop = (-2 * (th - p.height())) - 12
                } else {
                    animTop = 0 - diffY;
                }


            } else {
                tableClosure = 90;
                scrolling = false
                scrollleft = false
                animLeft = parseFloat(b.css('left'));
                animTop = parseFloat(b.css('top'));
            }
        }
        else {

            tableClosure -= 30;
            scrollleft = true;
            if (tableClosure < 0) {
                tableClosure = 0;
                scrolling = false;
                animLeft = parseFloat(b.css('left'));
                animTop = parseFloat(b.css('top'));
            }

            var ratio = parseFloat('1.' + tableClosure),
                tw = b.width() * ratio,
                th = b.height() * ratio,

                x = e.pageX - b.offset().left,
                y = e.pageY - b.offset().top,

                px = e.pageX - p.offset().left,
                py = e.pageY - p.offset().top,

                ratio = parseFloat('1.' + tableClosure),

                diffX = (tw - p.width()) / 2,
                diffY = (th - p.height()) / 2;

            if (tw + b.offset().left < p.offset().left + p.width()) {
                animLeft = (-2 * (tw - p.width())) - 12
            } else if ((tw * (perY / 100)) + b.offset().left < p.offset().left) {
                animLeft = 0;
            } else {
                animLeft = 0 - diffY
            }

            if (y * ratio < diffY) {
                animTop = 0
            } else if ((th * (perY / 100)) + b.offset().top > p.offset().top + p.height()) {
                animTop = (-2 * (th - p.height())) - 12
            } else {
                animTop = 0 - diffY;
            }
        }


        transform.x = animLeft;
        transform.y = animTop;
        var res = scrollleft === false ? parseFloat(b.css('left')) : animLeft;


        b.css({
            left: scrollleft === false ? parseFloat(b.css('left')) : animLeft,
            top: animTop,
            transform: 'scale(1.' + tableClosure + ')',
            transition: 'all 650ms ease-in-out'
        });



        b.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {

            scrolling = false;
        });



    });


    ////Tabloyu yakýnlaþtýrýr veya uzaklaþtýrýr
    //$('#periodic-table__table').bind('wheel', function (e) {

    //    if (scrolling) return false;
    //    scrolling = true

    //    var b = $(this),
    //        p = $('#periodic-table__container'),
    //        animLeft, animTop, scrollleft;
    //    tx = e.pageX - b.offset().left,
    //        ty = e.pageY - b.offset().top;

    //    var perX = (tx * 100) / (b.width() * (parseFloat('1.' + tableClosure))),
    //        perY = (ty * 100) / (b.height() * (parseFloat('1.' + tableClosure)));

    //    $body.addClass('scrolled');



    //    if (e.originalEvent.deltaY < 0) {

    //        tableClosure += 30;

    //        if (tableClosure < 99) {


    //            var ratio = parseFloat('1.' + tableClosure),
    //                tw = b.width() * ratio,
    //                th = b.height() * ratio,

    //                x = e.pageX - b.offset().left,
    //                y = e.pageY - b.offset().top,

    //                px = e.pageX - p.offset().left,
    //                py = e.pageY - p.offset().top,

    //                ratio = parseFloat('1.' + tableClosure),

    //                diffX = (tw - p.width()) / 2,
    //                diffY = (th - p.height()) / 2;

    //            if (x * ratio < diffX) {
    //                animLeft = 0;
    //            } else if ((tw * (perX / 100)) + b.offset().left > p.offset().left + p.width()) {
    //                animLeft = (-2 * (tw - p.width())) - 12
    //            } else {
    //                animLeft = 0 - diffX;
    //            }

    //            if (y * ratio < diffY) {
    //                animTop = 0
    //            } else if ((th * (perY / 100)) + b.offset().top > p.offset().top + p.height()) {
    //                animTop = (-2 * (th - p.height())) - 12
    //            } else {
    //                animTop = 0 - diffY;
    //            }


    //        } else {
    //            tableClosure = 90;
    //            scrolling = false
    //            scrollleft = false
    //            animLeft = parseFloat(b.css('left'));
    //            animTop = parseFloat(b.css('top'));
    //        }
    //    }
    //    else {

    //        tableClosure -= 30;
    //        scrollleft = true;
    //        if (tableClosure < 0) {
    //            tableClosure = 0;
    //            scrolling = false;
    //            animLeft = parseFloat(b.css('left'));
    //            animTop = parseFloat(b.css('top'));
    //        }

    //        var ratio = parseFloat('1.' + tableClosure),
    //            tw = b.width() * ratio,
    //            th = b.height() * ratio,

    //            x = e.pageX - b.offset().left,
    //            y = e.pageY - b.offset().top,

    //            px = e.pageX - p.offset().left,
    //            py = e.pageY - p.offset().top,

    //            ratio = parseFloat('1.' + tableClosure),

    //            diffX = (tw - p.width()) / 2,
    //            diffY = (th - p.height()) / 2;

    //        if (tw + b.offset().left < p.offset().left + p.width()) {
    //            animLeft = (-2 * (tw - p.width())) - 12
    //        } else if ((tw * (perY / 100)) + b.offset().left < p.offset().left) {
    //            animLeft = 0;
    //        } else {
    //            animLeft = 0 - diffY
    //        }

    //        if (y * ratio < diffY) {
    //            animTop = 0
    //        } else if ((th * (perY / 100)) + b.offset().top > p.offset().top + p.height()) {
    //            animTop = (-2 * (th - p.height())) - 12
    //        } else {
    //            animTop = 0 - diffY;
    //        }
    //    }


    //    transform.x = animLeft;
    //    transform.y = animTop;
    //    var res = scrollleft === false ? parseFloat(b.css('left')) : animLeft;


    //    b.css({
    //        left: scrollleft === false ? parseFloat(b.css('left')) : animLeft,
    //        top: animTop,
    //        transform: 'scale(1.' + tableClosure + ')',
    //        transition: 'all 450ms ease-in-out'
    //    });



    //    b.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {

    //        scrolling = false;
    //    });



    //});


    //Tabloyu drag yapar
    var lf, tp;
    //mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    //mc.on("panstart", function (e) {

    //    dragging = true;
    //    panMove = { x: e.center.x, y: e.center.y }
    //    $body.addClass('dragging');

    //}).on('panmove', function (e) {

    //    if (!dragging) return false;
    //    var d = e.direction,
    //        dSet = { x: transform.x, y: transform.y };


    //    lf = transform.x - (panMove.x - e.center.x),
    //        tp = transform.y - (panMove.y - e.center.y);


    //    //translate table
    //    $('#periodic-table__table').css({
    //        left: lf,
    //        top: tp,
    //        transition: 'all 350ms ease-in-out'
    //    })


    //}).on('panend', function () {
    //    dragging = false;
    //    $body.removeClass('dragging');
    //    transform = { x: lf, y: tp }
    //    $('#periodic-table__table').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    //        function (event) {
    //            checkTablePosition();
    //        });

    
        var canvas = document.getElementById('table-canvas');
    var ctx = canvas.getContext('2d');

    var pixelRatio = window.devicePixelRatio || 1;

    var par = $('#periodic-table__container');
    var doth = $table.width() < 910 ? 2 : 2.5;
    var wr = parseFloat($('.square').width());
    var hr = parseFloat($('.square').height());

    canvas.width = par.width();
    canvas.height = par.height();

    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= pixelRatio;
    canvas.height *= pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var gCount = 1,
        gTotal = 1,
        yCount = 0;


    for (i = 0; i < selectiveparent.length; i++) {
        var ef = selectiveparent[i];


        if (i + 1 != selectiveparent.length) {
            if ($(ef).position().top === $(selectiveparent[i + 1]).position().top) {
                gCount += 1;

                if (gCount > gTotal) {
                    gTotal = gCount
                }
            } else {
                gCount = 0;
                yCount += 1;
            }

        }
    }

    console.log(gTotal, yCount);

    var elemW = selectiveparent.width() * (1.3),
        elemH = selectiveparent.height() * (1.3),
        startX = (canvas.width - (elemW * gTotal)) / 2,
        startY = (canvas.height - (elemH * yCount)) / 2;

    ctx.fillStyle = $table.find('[data-parent=' + firstElem + ']').eq(0).css('background-color');

    for (j = 0; j < selectiveparent.length; j++) {
        ctx.beginPath();
        ctx.rect(startX, startY, elemW, elemH);
        ctx.fill();
        ctx.closePath();

        

    }
    
    
    
    
    
    
    function setCloseTable(tog) {

    var firstElem = $('#filters_fiters-box .filter').eq(firstClosureParent).attr('data-parent'),
        selectiveparent = $table.find('[data-parent=' + firstElem + ']').parent(),
        res= tog ? 1.3 : 1;

    $table.attr('style','');
    $table.find('.square').attr('style','').removeClass('active');
    
    $(selectiveparent).addClass('active')
    
    selectiveparent.css({
        opacity:1,
        visibility:'visible'
    })

  
      var yStart=$(selectiveparent).eq(0).position().left * res,
        yEnd=0,
          xCount=0;


    for (i = 0; i < selectiveparent.length; i++) {
        var ef = selectiveparent[i];


        if (i + 1 != selectiveparent.length) {
            
            if ($(ef).position().top === $(selectiveparent[i + 1]).position().top) {
              
            } else {
               
                xCount+=1;
            }

        }
        
        if( yEnd < $(ef).position().left * res){
            yEnd = ($(ef).position().left * res) + ($(ef).width() * res);
        }
        
        
    }
    
    console.log(xCount)
    var totalwidth=yEnd -yStart;
    
    var p = $('#periodic-table__container');
    
    var l = (p.width() / 2) - (  (($(selectiveparent).eq(0).position().left ) * res) + (totalwidth / 2) );
        t = (p.height() / 2) - ( (($(selectiveparent).eq(0).position().top ) * res) + ( (( $(selectiveparent).height() * res ) * (xCount+ 1) ) / 2));
    
    if(tog){
         $body.toggleClass('closure');
    }
   
   // $table.css({
     //   left:l + 'px',
       // top:t  + 'px'
    //})
}
