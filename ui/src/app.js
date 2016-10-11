import 'jquery';
import 'bootstrap/dist/js/bootstrap';

require('./assets/app.css');
require('./assets/page.js');

$(document).ready(function() {
    $('.navbar-nav , .button-container, .bottom-navbar').hover(function() {
        $('.overlay').fadeIn();
    }, function() {
        $('.overlay').fadeOut();
    });
});