const deleteBtn = document.querySelector('#deleteBtn');
const updateBtn = document.querySelector('#updateBtn');


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




