
const title = document.querySelector('#title').value;
const description = document.querySelector('#description').value;

const deleteBtn = document.querySelector('#deleteBtn');
const updateBtn = document.querySelector('#updateBtn');

updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    console.log(title, description);
    const _id = updateBtn.dataset.id;
    const endpoint =`/home/update-task/${_id}`;
    
    try {
        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, description })
        });

        const data = await res.json();

        if(res.status == 200){
            location.assign(data.redirect);
        }
        

    } catch (err) {
        console.log(err)
    }

});


// Delete Task
deleteBtn.addEventListener('click', async () => {

    const _id = deleteBtn.dataset.id;
    const endpoint =`/home/delete-task/${_id}`;

    try {
        const res = await fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        if(res.status == 200){
            location.assign(data.redirect);
        }
        
    } catch (err) {
        console.log(err)
    }
   
});