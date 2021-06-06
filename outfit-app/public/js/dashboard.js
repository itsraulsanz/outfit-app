
const deleteButton = document.querySelector('.btn-delete');

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttributes('data-id' && deleteButton)) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`api/outfits/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // successful request sends user back to dashboard page
            document.location.replace('/api/dashboard'); 
        } else {
            alert("Could not delete blog");
        }
    }
}

deleteButton.addEventListener("click", deleteButtonHandler);