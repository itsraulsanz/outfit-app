const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/outfits/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Could not delete the Outfit");
  }
};

document
  .querySelector("#btn-delete")
  .addEventListener("click", deletePostHandler);
