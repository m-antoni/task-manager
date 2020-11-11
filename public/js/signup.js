
const form = document.querySelector('#form-signup');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(password.value != confirm_password.value){
        return alert('Password and Confirm password do not match');
    }

    const data = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    try {
        const res = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        })

        console.log(res);
        clearValues();
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