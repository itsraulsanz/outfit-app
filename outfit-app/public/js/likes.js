async function likesChecker(event) {
  event.preventDefault();

  const likes = document.querySelector("#like:checked") ? true : false;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/outfits/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      likes,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response, "likes")

  if (response.ok) {
    document.location.replace(`/outfits/${id}`);
  } else {
    console.log(response);
    alert(response.statusText, "Failed to add like to outfit");
  }
}

document.querySelector(".like").addEventListener("submit", likesChecker);
