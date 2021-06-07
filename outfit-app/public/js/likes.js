async function likesChecker(event) {
    event.preventDefault();
  
    const likes = document.querySelector("#like").value.trim();
    const id = event.target.getAttribute("data-id");
  
    // If not liked (likes = false), add like
    if (!likes) {
      const response = await fetch(`/outfits/${id}`, {
        method: "POST",
        body: JSON.stringify({
          likes,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        console.log(response);
        alert(response.statusText, "Failed to add like to outfit");
      }
    }
        // If liked (likes = true), remove like
    if (likes) {
        const response = await fetch(`/outfits/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert(response.statusText,'Failed to unlike outfit');
          }
        }
  }
  
  document
    .querySelector(".like")
    .addEventListener("click", likesChecker);