
const form = document.querySelector('#form-signup');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');
const email_error = document.querySelector('.email-error');
const password_error = document.querySelector('.password-error');


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(password.value !== confirm_password.value){
        return password_error.textContent = 'Password and Confirm Password do not match';
    }

    const params = { name: name.value, email: email.value, password: password.value };

    try {
        
        const res = await fetch('/users/create', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({ name: params.name, email: params.email, password: params.password })
        })

        const data = await res.json();
        
        // errors
        if(data.errors)
        {
            email_error.textContent = data.errors.email;
            password_error.textContent = data.errors.password;
        }
        // success
        if(data.user)
        {
            location.assign('/users/home')
        }

    } catch (e) {
        console.log(e)
    }
  
});


const clearValues = () => {
    name.value = '';
    email.value = '';
    password.value = '';
    confirm_password.value = '';
} 