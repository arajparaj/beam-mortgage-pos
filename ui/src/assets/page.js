var page = require('page');
$(document).ready(function() {
    page('/', function() {
        console.log('indexpage')
    });

    page('/hash', function() {
        console.log('hash page')
    });

    page();
});
