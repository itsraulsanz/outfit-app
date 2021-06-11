async function createOutfitFormHandler(event) {
  event.preventDefault();

  const outfitName = document.querySelector("#outfit-name").value.trim();
  const price = document.querySelector("#price").value.trim();
  const brand = document.querySelector("#brand").value.trim();
  const location = document.querySelector("#location").value.trim();

  const occasionElement = document.querySelector("#occasion");
  const occasion = occasionElement.value;

  const colourElement = document.querySelector("#colour");
  const colour = colourElement.value;

  const genderElement = document.querySelector("#gender");
  const gender = genderElement.value;

  const notes = document.querySelector("#notes").value.trim();
  const image = document.querySelector("#imageLink").value;
  console.log(image);
  console.log("occasion", occasion);
  console.log("colour", colour);
  console.log("gender", gender);

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
    const response = await fetch("/api/outfits/", {
      method: "POST",
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
  .querySelector(".new-outfit-form")
  .addEventListener("submit", createOutfitFormHandler);

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
