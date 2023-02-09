const movies = [
    {
        id: 1,
        rentId: 0,
        name: "Batman",
        genre: "Action",
        price: 4.55,
        countInStock: 5,
    },
    {
        id: 2,
        rentId: 0,
        name: "Babylon",
        genre: "Drama",
        price: 10.55,
        countInStock: 2
    },
    {
        id: 3,
        rentId: 0,
        name: "Black Adam",
        genre: "Action",
        price: 9.80,
        countInStock: 8
    },
    {
        id: 4,
        rentId: 0,
        name: "The Great Gatsby",
        genre: "Drama",
        price: 5.55,
        countInStock: 1
    },
    {
        id: 5,
        rentId: 0,
        name: "Elvis",
        genre: "Biography",
        price: 8.95,
        countInStock: 0
    },
    {
        id: 6,
        rentId: 0,
        name: "The Adam Project",
        genre: "Action",
        price: 6.65,
        countInStock: 7
    },
    {
        id: 7,
        rentId: 0,
        name: "Top Gun",
        genre: "Action",
        price: 5.55,
        countInStock: 2
    },
    {
        id: 8,
        rentId: 0,
        name: "Top Gun: Maverick",
        genre: "Action",
        price: 9.95,
        countInStock: 0
    }
]

let myMovies;
let moviesInStock;

generateMovieTable();
activateRentButtons();

function generateMovieTable() {

    if (localStorage.getItem("moviesInStock") === null) {
        localStorage.setItem("moviesInStock", JSON.stringify(movies));
    }
    moviesInStock = JSON.parse(localStorage.getItem("moviesInStock"));

    const movieTableHeader = `
    <tr>
    <th class="name-header">Name</th>
    <th class="genre-header">Genre</th>
    <th class="price-header">Price for 12h</th>
    <th id="instock-header">Is in stock</th>
    <th id="rent-header"></th>
    </tr>`;

    
    let movieTableRows = moviesInStock.map((movie) => 
    (`<tr>
    <td class="name-column">${movie.name}</td>
    <td class="genre-column">${movie.genre}</td>
    <td class="price-column">${movie.price.toFixed(2)}$</td>
    <td class="price-column">${movie.countInStock}</td>

    <td class="availability-column">${movie.countInStock > 0 ? `
        <img id="${movie.id}-availability" src='check.png' alt='available'></td>` : `
        <img id="${movie.id}-availability" src='del.png' alt='not available'></td>`}
        
    ${movie.countInStock > 0 ?
        `<td class="rent-column"><button class="rentButton" id=${movie.id}>Rent</button></td>` :
        `<td class="rent-column"><button class="rentButtonNotAvailable" id=${movie.id}>Rent</button></td>`
    }    
    </tr>`)).join(" ");

    let movieTable = movieTableHeader + movieTableRows;
    document.getElementById("movieTable").innerHTML = movieTable;
}

function activateRentButtons() {
    let rentButtons = document.getElementsByClassName("rentButton");
    for (let i = 0; i < rentButtons.length; i++) {
        let rentBtn = rentButtons[i];
        rentBtn.addEventListener("click", function() {
            console.log(rentBtn.id);
            addToMyMovies(rentBtn.id);
        });
    };
};

function getMyMovies() {
    if (localStorage.getItem("myMovies") === null) {
        localStorage.setItem("myMovies", JSON.stringify([]));
    }
    myMovies = JSON.parse(localStorage.getItem("myMovies"));
    return myMovies;
}

let rentId = 0;
function getUniqueId() {
  return Math.floor(Math.random() * 1000);
}

function addToMyMovies(id) {
    myMovies = getMyMovies();
    moviesInStock.forEach(movie => {
        if (String(movie.id) === id) {
            movie.rentId = getUniqueId();
            movie.rentTime = 12;

            myMovies.push(movie);
            localStorage.setItem("myMovies", JSON.stringify(myMovies));

            movie.countInStock--;
            localStorage.setItem("moviesInStock", JSON.stringify(moviesInStock));

            generateMovieTable();
            activateRentButtons();
        }
    });
}
