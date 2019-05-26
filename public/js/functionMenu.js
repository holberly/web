/*
	RequestAnimationFrame Polyfill

	http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	by Erik Möller, fixes from Paul Irish and Tino Zijdel

	MIT license
 */

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if ( ! window.requestAnimationFrame ) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( ! window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());


(function(w,d,undefined){

    var el_html = d.documentElement,
        el_body = d.getElementsByTagName('body')[0],
        header = d.getElementById('header'),
        lastScroll = w.pageYOffset || el_body.scrollTop,
        menuIsStuck = function(triggerElement, wScrollTop, lastScroll) {


            var wScrollTop	= w.pageYOffset || el_body.scrollTop,
                regexp		= /(nav\-is\-stuck)/i,
                classFound	= el_html.className.match( regexp ),
                navHeight	= header.offsetHeight,
                bodyRect	= el_body.getBoundingClientRect(),
                scrollValue	= 600;

            // si le scroll est d'au moins 600 et
            // la class nav-is-stuck n'existe pas sur HTML
            if ( wScrollTop > scrollValFix && !classFound && wScrollTop < lastScroll )  {
                el_html.className = el_html.className + ' nav-is-stuck';
                el_body.style.paddingTop = navHeight + 'px';
            }

            // si le scroll est inférieur à 2 et
            // la class nav-is-stuck existe
            if ( classFound && wScrollTop > lastScroll )  {
                el_html.className = el_html.className.replace( regexp, '' );
                el_body.style.paddingTop = '0';
            }

        },

        onScrolling = function() {
            // on récupère la valeur du scroll maintenant
            var wScrollTop = w.pageYOffset || el_body.scrollTop;

            // on ajoute deux arguments, valeurs de scrolls
            menuIsStuck( d.getElementById('main'), wScrollTop, lastScroll );

            // on enregistre notre dernière valeur de scroll
            lastScroll = wScrollTop;

        };

    // quand on scroll
    w.addEventListener('scroll', function(){
        // on exécute la fonction onScrolling()
        w.requestAnimationFrame( onScrolling );
    });

}(window, document));


