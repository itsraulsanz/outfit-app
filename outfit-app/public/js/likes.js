const likeButtons = document.querySelectorAll("#like-toggle");

async function likesChecker(event) {
  event.preventDefault();
 
  const outfitId = event.target.dataset.id;
console.log(outfitId, "outfit");
  


// const likes = document.querySelector("#like:checked") ? true : false;
//   const id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

  const response = await fetch(`/api/outfits/${outfitId}/like`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response, "likes");

//   if (response.ok) {
//     document.location.replace(`/outfits/${id}`);
//   } else {
//     console.log(response);
//     alert(response.statusText, "Failed to add like to outfit");
//   }
}


likeButtons.forEach(button =>
  {
    button.addEventListener("click", likesChecker)
  });
