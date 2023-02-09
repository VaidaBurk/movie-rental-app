function showRegisterCard () {
    document.getElementById("registerCard").style.display = "block";
    document.getElementById("showRegisterButton").style.display = "none";
}

function signIn() {
    let isFormValid = checkIsSignInFormValid();
    if (isFormValid === true)
    window.open("home.html", "_self");
}

function register() {
    let isFormValid = checkIsRegisterFormValid();
    if (isFormValid === true)
    window.open("home.html", "_self");
}

function checkIsSignInFormValid() {
    let email = document.getElementById("emailSigning").value;
    let password = document.getElementById("passwordSigning").value;

    if (email.length === 0 || !email.includes("@")) {
        document.getElementById("invalidEmailMessage").style.display = "block";
        return false;
    }
    if (password.length === 0 && password.length < 8) {
        document.getElementById("invalidPasswordMessage").style.display = "block";
        return false;
    }
    else {
        return true;
    }
}

function checkIsRegisterFormValid() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let emailAgain = document.getElementById("emailAgain").value;
    let password = document.getElementById("password").value;
    let passwordAgain = document.getElementById("passwordAgain").value;

    if (name.length < 2) {
        document.getElementById("invalidNameMessage").style.display = "block";
        return false;
    }
    if (surname.length < 2 && surname.length != 0) {
        document.getElementById("invalidSurnameMessage").style.display = "block";
        return false;
    }
    else if (email.length === 0 || !email.includes("@")) {
        document.getElementById("invalidRegisterEmailMessage").style.display = "block";
        return false;
    }
    else if (password.length === 0 && password.length < 8) {
        document.getElementById("invalidRegisterPasswordMessage").style.display = "block";
        return false;
    }
    else if (email !== emailAgain) {
        document.getElementById("emailDontMatchMessage").style.display = "block";
        return false;
    }
    else if (password !== passwordAgain) {
    }
    else {
        return true;
    }
}