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
  const image = document.querySelector("#imageLink").value;
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

const imageNode = document.querySelector("#image");

const uploadFile = () => {
  const file = document.querySelector("#image").files[0];
  let formData = new FormData();

  formData.append("picture", file);
  fetch("/api/outfits/upload", {
    method: "POST",
    body: formData,
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      const imgContent = document.querySelector("#imageLink");
      imgContent.value = response.resp.eager[0].secure_url;
    });
};

imageNode.addEventListener("change", uploadFile, false);
