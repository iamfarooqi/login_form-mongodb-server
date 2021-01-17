///SignUP

const url = "http://localhost:5000"
function signup() {

    
    axios({
        method: 'post',
        url: "http://localhost:5000/signup",
        data: {
            userName : document.getElementById("name").value,
            userEmail: document.getElementById("email").value,
            userPassword: document.getElementById("password").value,
            userPhone: document.getElementById("phone").value


        }//, withCredentials: true

    }).then(function (response) {
        console.log(response.data.message);
        alert(response.data.message);
        window.location.href = "login.html"
    })

    .catch(function (error) {
        console.log(error);
        alert(response.message)
    });

    return false;
}

///Login

function login() {

    axios({
        method: 'post',
        url: "http://localhost:5000/login",
        data: {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value,
        }//, withCredentials: true

    }).then((response) => {
        console.log(response);
        alert(response.data.message)
        window.location.href = "index.html"
    }, (error) => {
        console.log(error);
        alert(error)
    });

    return false;
}