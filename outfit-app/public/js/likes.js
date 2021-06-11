const likeButtons = document.querySelectorAll("#like");

async function likesChecker(event) {
  // event.preventDefault();

  const outfitId = event.target.dataset.id;
  console.log(outfitId, "outfit");

  const response = await fetch(`/api/outfits/${outfitId}/like`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response, "likes");
}

likeButtons.forEach((button) => {
  button.addEventListener("click", likesChecker);
});
