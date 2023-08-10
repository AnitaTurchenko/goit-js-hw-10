import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'

const selectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
let storedBreeds = [];

selectEl.addEventListener("change", onChange);
loaderEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');


fetchBreeds().
then(data => {
    storedBreeds = data;
    // console.log("hello", storedBreeds);
    let markup = storedBreeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
    });
    selectEl.innerHTML = markup;
    new SlimSelect({
        select: '.breed-select'
      })
}).
catch(console.log);

function onChange(e) {
    e.preventDefault();
    errorEl.classList.add('is-hidden');
    selectEl.classList.add('is-hidden');
    loaderEl.classList.remove('is-hidden');
    catInfoEl.classList.add('is-hidden');
    const selectedBreed = e.target.value;
    console.log(selectedBreed);
    fetchCatByBreed(selectedBreed)
    .then(data => {
        console.log(data);
        errorEl.classList.add('is-hidden');
        selectEl.classList.remove('is-hidden');
        loaderEl.classList.add('is-hidden');
        catInfoEl.classList.remove('is-hidden');
        const catData = data[0];
        if(catData) {
            const {name, url, temperament, description} = catData;
            let markup = `
            <img src="${data[0].url}" alt="${data[0].breeds[0].name}" />
            <div class="cat-info-text">
                <h2>${data[0].breeds[0].name}</h2>
                <p>${data[0].breeds[0].description}</p>
                <p><span>Temperament: </span>${data[0].breeds[0].temperament}</p>
            </div>`;
        catInfoEl.innerHTML = markup;
        } else {
            catInfoEl.innerHTML = "No data available for this breed.";
        }
    })

    .catch(error => {
        // errorEl.classList.remove('is-hidden');
        catInfoEl.classList.add('is-hidden');
        console.error(error)
});
}
