async function editPostFormHandler(event) {
  event.preventDefault();

  const outfitName = document.querySelector("#outfit-name").value.trim();
  const price = document.querySelector("#price").value.trim();
  const brand = document.querySelector("#brand").value.trim();
  const location = document.querySelector("#location").value.trim();
  const occasion = document.querySelector("#occasion").value.trim();
  const colour = document.querySelector("#colour").value.trim();
  const gender = document.querySelector("#gender").value.trim();
  const notes = document.querySelector("#notes").value.trim();
  // TODO : implement actual file uplaod feature
  const image = document.querySelector("#image").files[0].name;
  console.log(image);

  if (
    outfitName &&
    price &&
    brand &&
    location &&
    occasion &&
    colour &&
    gender &&
    notes &&
    image
  ) {
    const response = await fetch("/api/outfits/${id}", {
      method: "PUT",
      body: JSON.stringify({
        outfitName,
        price,
        brand,
        location,
        occasion,
        colour,
        gender,
        notes,
        image,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response);
      alert(response.statusText, "Failed to upload outfit");
    }
  }
}

document
  .querySelector(".edit-outfit-form")
  .addEventListener("submit", editPostFormHandler);
