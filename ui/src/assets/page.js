import page from 'page';

$(document).ready(function() {
    let bodyContainer = $('#container-body');

    page('/', function() {
        // bodyContainer.load('/pages/mortgage/buy/residential/home.html');
        page.redirect('/mortgage');
    });

    page('/mortgage', function() {
        $('.dropdown-menu a').each(function() {
            this.href = this.baseURI + this.pathname;
        });
    });

    page('/mortgage/buy/residential', function() {
        bodyContainer.load('/pages/mortgage/buy/residential/home.html');
    });

    page('/mortgage/buy/commercial', function() {
        bodyContainer.load('/pages/mortgage/buy/commercial/home.html');
    });

    page('/mortgage/sell/residential', function() {
        bodyContainer.load('/pages/mortgage/sell/residential/home.html');
    });

    page('/mortgage/sell/commercial', function() {
        bodyContainer.load('/pages/mortgage/sell/commercial/home.html');
    });

    page('*', function() {
        page.redirect('/mortgage');
    })

    page();
});
