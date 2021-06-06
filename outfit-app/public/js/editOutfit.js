const editPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (title && body) {
    const response = await fetch(`/api/outfits/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type:": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Could not update post");
    }
  }
};

document
  .querySelector("#update-outfit")
  .addEventListener("click", editPostFormHandler);
