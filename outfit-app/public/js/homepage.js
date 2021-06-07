import sortArray from './node_modules/sort-array/dist/index.mjs';

const sortOutfitsHandler = async (event) => {
  event.preventDefault();

  // serialises outfits data for handlebars template
  const outfits = sortArray(outfits, { order: 'number' })  
  console.log(outfitsData);
}

document.querySelector('#sort-outfits').addEventListener('change', sortOutfitsHandler);
