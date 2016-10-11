$(document).ready(function() {
    $('.list-inline , .button-container, .bottom-navbar').hover(function() {
        $('.overlay').fadeIn();
    }, function() {
        $('.overlay').fadeOut();
    });
});
