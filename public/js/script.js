const BASE_URL = window.location.origin;
const signUpBtn = document.querySelector('#signUpBtn');
const signInBtn = document.querySelector('#signInBtn');
const signOutBtn = document.querySelector('#signOutBtn');
const createTaskBtn = document.querySelector('#createTaskBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const updateBtn = document.querySelector('#updateBtn');
const showDeleteModal = document.querySelector('#showDeleteModal');
const exportBtn = document.querySelector('#exportBtn');

const loadingBtn = document.querySelector('#loadingBtn');
const errors = document.querySelector('#errors');
const success_msg = document.querySelector('#success_msg');

new WOW().init();
/* AUTHENTICATION SCRIPT  */
// Sign In
if(signInBtn)
{
    signInBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        signInBtn.style.display = 'none';
        loadingBtn.style.display = 'block';

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        errors.innerHTML = '';

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if(res.status == 200){
                location.assign('/')
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

                signInBtn.style.display = 'block';
                loadingBtn.style.display = 'none';
            }

        } catch (err) {
            console.log(err);
            signInBtn.style.display = 'block';
            loadingBtn.style.display = 'none';
        }
    });
}


// Sign up
if(signUpBtn)
{
    signUpBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        signUpBtn.style.display = 'none';
        loadingBtn.style.display = 'block';

        const name = document.querySelector('#name').value;
        const email= document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirm_password = document.querySelector('#confirm_password').value;
        errors.innerHTML = '';
    
        try {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirm_password })
            });

            const data = await res.json();
            
            if(res.status == 201){
                location.assign('/')
            }

            if(res.status == 404){
                data.errors.forEach(err => {
                    errors.innerHTML += 
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert"> 
                        ${err} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
                });

                signUpBtn.style.display = 'block';
                loadingBtn.style.display = 'none';
            }

        } catch (err) {
            console.log(err);
            signUpBtn.style.display = 'block';
            loadingBtn.style.display = 'none';
        }
    });
}


/* TASK SCRIPT */

// Create Task
if(createTaskBtn)
{
    createTaskBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        createTaskBtn.style.display = 'none';
        loadingBtn.style.display = 'block';

        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        errors.innerHTML = '';

        try {
            const res = await fetch('/home/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });

            const data = await res.json();

            if(res.status == 201){
                location.assign(data.redirect)
            }

            if(res.status == 404){
                data.errors.forEach(err => {
                    errors.innerHTML += 
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert"> 
                        ${err} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
                });

                createTaskBtn.style.display = 'block';
                loadingBtn.style.display = 'none';
            }

        } catch (err) {
            console.log(err)
            createTaskBtn.style.display = 'block';
            loadingBtn.style.display = 'none';
        }
    });
}


// Update Task
if(updateBtn)
{
    updateBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        updateBtn.style.display = 'none';
        loadingBtn.style.display = 'block';

        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const completed = document.querySelector('#completed').checked;
        errors.innerHTML = '';
        const endpoint =`/home/update-task/${updateBtn.dataset.id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, completed })
            });

            const data = await res.json();

            if(res.status == 200){
                location.assign(data.redirect)
            }

            if(res.status == 404){
                data.errors.forEach(err => {
                    errors.innerHTML += 
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert"> 
                        ${err} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
                });
                updateBtn.style.display = 'block';
                loadingBtn.style.display = 'none';
            }

        } catch (err) {
            console.log(err)
            updateBtn.style.display = 'block';
            loadingBtn.style.display = 'none';
        }
    });
}


// Delete Task
if(showDeleteModal)
{
    const deleteAlert = document.querySelector('#deleteAlert');
    const deleteCancelBtn = document.querySelector('#deleteCancelBtn');

    showDeleteModal.addEventListener('click', async (e) => {
        e.preventDefault();
        deleteAlert.style.display = 'block'; 
    });

    deleteCancelBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        deleteAlert.style.display = 'none';
    })


    deleteBtn.addEventListener('click', async () => {

        const endpoint =`/home/delete-task/${deleteBtn.dataset.id}`;
        try 
        {
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



// Export Btn
if(exportBtn)
{
    console.log(BASE_URL)
    exportBtn.addEventListener('click', async () => {

        try {
        
            const res = await fetch(`${BASE_URL}/home/get-tasks`);
            const json = await res.json();
    
            const data = json.tasks.map(row => ({
                title: row.title,
                description: row.description,
                completed: row.completed == true ? 'Completed' : 'Pending',
                date: row.created_at
            }));

            // console.log(data);
            const csvData = await dataToCSV(data);
            downloadCSV(csvData);
    
        } catch (err) {
            console.log(err)
        }

    });
}


// Data to  CSV
const dataToCSV = async (data) => {
    const csvRows = [];
    // get the headers
    const headers = Object.keys(data[0]);
    console.log(headers)
    csvRows.push(headers.join(','));

    // loop over the rows
    for(const row of data){
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });

        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
};


// Create a tag to download
const downloadCSV = (data) => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `tasks-${today}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


