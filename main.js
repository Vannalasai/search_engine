import algoliasearch from "algoliasearch";

const client = algoliasearch("W6DD268N8D", "ce7dd39a2eb3804bdfbdec5fb4c04134");
const index = client.initIndex("Search");

let data = [];

let resultRootElements = document.querySelector('.results');
const searchInput = document.querySelector('#searchInput');

fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then(json => {
        data = json;
        // console.log(data)
    });

searchInput.addEventListener('keyup', () => {
    let searchTerm = searchInput.value;

    if (String(searchTerm).trim().length > 0) {
        index.search(searchTerm).then(response=>{
            renderProducts(response.hits);
        })
    } else {
        removeElements();
    }
});

function renderProducts(products) {
    removeElements();
    products.forEach(product => {
        renderSingleProduct(product);
    });
}

function renderSingleProduct(product) {
    let resultDiv = document.createElement("div");
    let resultImg = document.createElement('img');
    let resultTitle = document.createElement('h5');
    let resultPrice = document.createElement('p');
    let resultButton = document.createElement('button');

    resultDiv.className = 'result'; // Change this line to use 'result' instead of 'results'
    resultImg.src = product.image;
    resultTitle.innerText = product.title;
    resultPrice.innerText = product.price;
    resultButton.innerText = 'Purchase';

    resultDiv.appendChild(resultImg);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(resultButton);

    resultRootElements.appendChild(resultDiv);
}

function removeElements() {
    document.querySelectorAll('.result').forEach(pro => {
        pro.remove();
    });
}


function addNewProduct(){
    index.saveObject({
            objectID: 143,
            "id": 2,
            "title": "Vannala Business",
            "price": 22.3,
            "description": "sarees business in all over india in low costs",
            "category": "clothing",
            "image": "https://picsum.photos/200",
            "rating": {
                "rate": 4.9,
                "count": 259
            }
    }).then(response=>{
        // console.log(response)
    })
}

addNewProduct();
