$('#nav-customer').click(function(){ showSection('customer'); });
$('#nav-item').click(function(){ showSection('item'); });
$('#nav-order').click(function(){ showSection('order'); });

function showSection(section) {
    $('.section').hide();
    $(`#${section}-section`).show();
}