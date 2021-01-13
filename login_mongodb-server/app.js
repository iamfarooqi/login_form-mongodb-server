///SignUP

function signup() {

    let userName = (document.getElementById("name").value);
    let userEmail = (document.getElementById("email").value);
    let userPassword = (document.getElementById("password").value);
    let userPhone = (document.getElementById("phone").value);

    axios({
        method: 'post',
        url: 'localhost:5000/signup',
        data: {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userPhone: userPhone

        }
    })
    return false;
}





///Login