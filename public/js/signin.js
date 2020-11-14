
const form = document.querySelector('#form-signin');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signin_error = document.querySelector('.signin-error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const params = { email: email.value, password: password.value };

    try {
        
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({ email: params.email, password: params.password })
        })

        const data = await res.json();
       
        if(data.errors)
        {
            signin_error.textContent = data.errors.signin;
        }

        if(data.user)
        {
            location.assign('/users/home')
        }

    } catch (e) {
        console.log(e)
    }
  
});
