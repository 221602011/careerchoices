const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//form validations

//Register

UserSignUpform = document.getElementById('UserSignUpForm');
UserSignUpform.onclick = () =>
{
  var userName = document.getElementById('UserName');
  var userEmail = document.getElementById('UserEmail');
  var userPassword = document.getElementById('UserPassword');
  var userConfirmedPassword = document.getElementById('UserConfirmPassword');

  if (userName = '')
  {
    userName.nextElementSibling.textContent = "Name is empty";
  setTimeout(()=>{
    userName.nextElementSibling.textContent = "";
  }, 2000);
  }
  else if(userEmail = '')
  {
    userEmail.nextElementSibling.textContent = "Email is empty";
  setTimeout(()=>{
    userEmail.nextElementSibling.textContent = "";
  }, 2000);
  }
  else if(userPassword = '')
  {
    userPassword.nextElementSibling.textContent = "Password is empty";
  setTimeout(()=>{
    userPassword.nextElementSibling.textContent = "";
  }, 2000);
  }
  else if(userConfirmedPassword = '')
  {
    userConfirmedPassword.nextElementSibling.textContent = "Confirm is empty";
  setTimeout(()=>{
    userConfirmedPassword.nextElementSibling.textContent = "";
  }, 2000);
  }
  else
  {
    if(userPassword === userConfirmedPassword)
    {
      var saveUser = localStorage.setItem('name', userName)
       localStorage.setItem('email', userEmail)
       localStorage.setItem( 'password',userConfirmedPassword);
      console.log(saveUser)

      sessionStorage.setItem('LoggedInUser', userEmail);
    }
    else
    {
      userPassword.nextElementSibling.textContent = "Passwords do not match";
  setTimeout(()=>{
    userPassword.nextElementSibling.textContent = "";
  }, 2000);
    }

  }




}






window.onload = ()=>{
  this.sessionStorage.setItem('username', 'sakaos_user');
  this.sessionStorage.setItem('password', 'sakaos_password');
}

var input = document.getElementsByTagName('input');
var login = document.getElementById('log-in');
var form = document.querySelector('form');
form.onsubmit = ()=>{return false;}

login.onclick = ()=>{

if ((input[0].value != "") && (input[1].value != ""))
{
 if ((input[0].value == sessionStorage.getItem('username')) && (input[1].value == sessionStorage.getItem('password')))
  {
    form.onsubmit = ()=>{return 1;}
    document.cookie = "username="+input[0].value;
    document.cookie = "password="+input[1].value;
  }
  else
  {
    if ((input[0].value != sessionStorage.getItem('username')) )
    {
      input[0].nextElementSibling.textContent = "Username NOT match";
    setTimeout(()=>{
      input[0].nextElementSibling.textContent = "";
    }, 2000);

    }
    if ((input[1].value != sessionStorage.getItem('password')) )
    {
      input[1].nextElementSibling.textContent = "Password NOT match";
    setTimeout(()=>{
      input[1].nextElementSibling.textContent = "";
    }, 2000);

    }

  }

}
else
{
if (input[0].value == "")
{
  input[0].nextElementSibling.textContent = "Username is empty";
  setTimeout(()=>{
    input[0].nextElementSibling.textContent = "";
  }, 2000);
}
if (input[1].value == "")
{
  input[1].nextElementSibling.textContent = "Password is empty";
  setTimeout(()=>{
    input[1].nextElementSibling.textContent = "";
  }, 2000);
}
}
}
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const db = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML and CSS files

app.use(express.static(__dirname + '/public'));

app.post('/register', (req, res) => {
  const { username, useremail, password, userconfirmpassword } = req.body;

  if (password !== userconfirmpassword) {
    return res.status(400).send('Passwords do not match');
  }

  const user = {
    username,
    useremail,
    password,
  };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.error('Error registering user: ' + err);
      res.status(500).send('Error registering user');
    } else {
      res.send('User registered successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
