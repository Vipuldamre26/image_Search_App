let button = document.querySelector('button');
let text = document.querySelector('input');
let section2 = document.querySelector('.section2');
let showMore = document.querySelector('.showMore');
let pageNumber = 1;


showMore.style.display = 'none';

let apiUrl = 'https://api.unsplash.com/search/photos';
let accessKey = 'GBgi4fJ3qY6jRCF5wd9nuw8-BQnfVF6x0Ko0Zan5Xr0';


button.addEventListener('click', () => {
    section2.innerHTML = '';
    let query = text.value;
    // text.value = '';

    searchImage(query);
});

document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        let query = text.value;
        section2.innerHTML = ''
        // text.value = '';

        searchImage(query)
    }
})



// fetching images using pageNumber and query 

function searchImage(query) {

    fetch(`${apiUrl}?page=${pageNumber}&query=${query}`, {
        headers: {
            Authorization: `Client-ID ${accessKey}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .then(addImages)
        .catch(error => console.error(error))

}



// adding image to parent container by making child divs 
function addImages(data) {
    data.results.forEach(image => {
        let div = document.createElement('div');
        div.classList.add('card');
        let p = document.createElement('p');
        let img = document.createElement('img');
        img.setAttribute('src', image.urls.small);
        p.innerHTML = image.alt_description;

        div.append(img, p);
        section2.append(div);
        showMore.style.display = 'block';
    })

    console.log(data);
}




// show more images eventlistner 

showMore.addEventListener('click', () => {
    let query = text.value;
    pageNumber++;
    searchImage(query);
});