$(document).ready(function() {
    $('.navbar-nav , .button-container, .bottom-navbar').hover(function() {
        $('.overlay').fadeIn();
    }, function() {
        $('.overlay').fadeOut();
    });
});
