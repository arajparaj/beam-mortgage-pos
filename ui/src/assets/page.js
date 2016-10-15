import page from 'page';

$(document).ready(function() {
    let bodyContainer = $('#container-body');
    let loadingIcon = $('.loading-overlay,.cssload-thecube');

    function loadPage(url) {
        //do some animation
        loadingIcon.fadeIn();
        bodyContainer.load(url, function() {
            loadingIcon.fadeOut();
        });

    }
    page('/', function() {
        page.redirect('/mortgage');
    });

    page('/mortgage', function() {
        $('.navbar-nav a').each(function() {
            this.href = this.baseURI + this.pathname;
        });
    });


    page('/mortgage/buy/residential', function() {
        loadPage('/pages/mortgage/buy/residential/home.html');
    });

    page('/mortgage/buy/commercial', function() {
        loadPage('/pages/mortgage/buy/commercial/home.html');
    });

    page('/mortgage/sell/residential', function() {
        loadPage('/pages/mortgage/sell/residential/home.html');
    });

    page('/mortgage/sell/commercial', function() {
        loadPage('/pages/mortgage/sell/commercial/home.html');
    });

    page('/mortgage/about', function() {
        loadPage('/pages/mortgage/about.html');
    });

    page('/mortgage/agents', function() {
        loadPage('/pages/mortgage/agents.html');
    });

    // page('*', function() {
    //     page.redirect('/mortgage');
    // })

    page();
});
