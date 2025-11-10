
$('#loginBtn').click(function(){
    const user = $('#username').val().trim();
    const pass = $('#password').val().trim();
    if(user ==="admin" && pass ==="admin"){
        $('#login-section').hide();
        $('#main-navbar').show();
        $('#dashboard-section').show();
        $('#loginError').hide();
        Swal.fire({
            title: "Successfully",
            text: "welcome to the Official Dashboard",
            icon: "success"
        });
    } else {
        $('#loginError').show();
    }
});