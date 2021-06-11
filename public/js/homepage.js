const selectElements = document.querySelectorAll("select");

const changeHandler = async (event) => {
  event.preventDefault();
  const value = event.target.value;
  const key = event.currentTarget.dataset.filter;
  insertParam(key, value);
};

selectElements.forEach((selectEl) => {
  selectEl.addEventListener("change", changeHandler);
});

function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split("&");
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join("=");
  }
  console.log(kvp);
  const filteredKvp = kvp.filter((el) => el.length > 0);
  console.log("filter", filteredKvp);
  // can return this or...
  let params = filteredKvp.join("&");

  // reload page with new params
  document.location.search = params;
}
