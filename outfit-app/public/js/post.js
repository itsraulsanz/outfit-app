async function createOutfitFormHandler(event) {
  event.preventDefault();

  const outfitName = document.querySelector("#outfit-name").value.trim();
  const price = document.querySelector("#price").value.trim();
  const brand = document.querySelector("#brand").value.trim();
  const location = document.querySelector("#location").value.trim();
  const occasion = document.querySelector("#occasion").value.trim();
  const colour = document.querySelector("#colour").value.trim();
  const gender = document.querySelector("#gender").value.trim();
  const image = document.querySelector("#image").value.trim();


  if (outfitName && price && brand && location && occasion && colour && gender && image) {
    const response = await fetch("/api/outfits/addoutfit", {
      method: "POST",
      body: JSON.stringify({ outfitName, price, brand, location, occasion, colour, gender, image }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText, "Failed to upload outfit");
    }
  }
};

document
.querySelector(".new-outfit-form")
.addEventListener("submit", createOutfitFormHandler);