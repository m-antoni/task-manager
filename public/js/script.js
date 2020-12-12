const deleteBtn = document.querySelector('#deleteBtn');
const updateBtn = document.querySelector('#updateBtn');
const signUpBtn = document.querySelector('#signUpBtn');
const signInBtn = document.querySelector('#signInBtn');


// Sign In
if(signInBtn)
{
    signInBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const errors = document.querySelector('#errors');
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // reset errors
        errors.innerHTML = '';


        try {
            const res = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if(res.status == 200){
                location.assign(data.redirect)
            }

            if(res.status == 404){
                data.errors.innerHTML = '';

                data.errors.forEach(err => {
                    errors.innerHTML += 
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert"> 
                        ${err} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
                });
            }

        } catch (err) {
            console.log(err);
        }
    });

}


// Sign up
if(signUpBtn)
{
    signUpBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const errors = document.querySelector('#errors');
        const name = document.querySelector('#name').value;
        const email= document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirm_password = document.querySelector('#confirm_password').value;
        
        // reset errors
        errors.innerHTML = '';

        try {
            const res = await fetch('/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirm_password })
            });

            const data = await res.json();
            
            if(res.status == 201){
                location.assign(data.redirect)
            }

            if(res.status == 404){
                data.errors.innerHTML = '';

                data.errors.forEach(err => {
                    errors.innerHTML += 
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert"> 
                        ${err} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
                });
            }

        } catch (err) {
            console.log(err);
        }
    });
}


// Update Task
if(updateBtn)
{
    updateBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;

        const endpoint =`/home/update-task/${updateBtn.dataset.id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });

            const data = await res.json();

            if(res.status == 200){
                location.assign(data.redirect)
            }

        } catch (err) {
            console.log(err)
        }
    });
}


// Delete Task
if(deleteBtn)
{
    deleteBtn.addEventListener('click', async () => {

        const endpoint =`/home/delete-task/${deleteBtn.dataset.id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            if(res.status == 200){
                location.assign(data.redirect);
            }
            
        } catch (err) {
            console.log(err)
        }
    
    });
}




