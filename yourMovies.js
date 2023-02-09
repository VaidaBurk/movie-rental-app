let myMovies = JSON.parse(localStorage.getItem("myMovies"));
let moviesInStock = JSON.parse(localStorage.getItem("moviesInStock"));

generateMovieTable();
activateRemoveButtons();
activateTimeButtons();

function generateMovieTable() {
    const movieTableHeader = `
    <tr>
    <th class="name-header">Name</th>
    <th class="genre-header">Genre</th>
    <th class="time-header">Time</th>
    <th id="price-header">Price</th>
    <th id="rent-header"></th>
    </tr>`;

    let movieTableRows = myMovies.map((movie) =>
    (`<tr>
    <td class="name-column">${movie.name}</td>
    <td class="genre-column">${movie.genre}</td>
    <td class="time-column">
        <button class="timeDecreaseBtn" id="timeDecreaseBtn-${movie.rentId}">&#60;</button>
        <input type="number" class="time" value=${movie.rentTime}>
        <button class="timeIncreaseBtn" id="timeIncreaseBtn-${movie.rentId}">&#62;</button>
    </td>
    <td class="price-column">${movie.price.toFixed(2)}$</td>
    <td class="remove-column"><button class="removeButton" id="removeBtn-${movie.rentId}">Remove</button></td>
</tr>`)).join(" ");

    let movieTable = movieTableHeader + movieTableRows;
    document.getElementById("movieTable").innerHTML = movieTable;
}

function activateRemoveButtons() {
    let removeButtons = document.getElementsByClassName("removeButton");
    for (let i = 0; i < removeButtons.length; i++) {
        let removeBtn = removeButtons[i];
        removeBtn.addEventListener("click", function() {
            removeFromMyMovies(removeBtn.id);
        });
    };
};

function activateTimeButtons() {
    let timeIncreaseButtons = document.getElementsByClassName("timeIncreaseBtn");
    for (let i = 0; i < timeIncreaseButtons.length; i++) {
        let timeIncreaseBtn = timeIncreaseButtons[i];
        timeIncreaseBtn.addEventListener("click", function() {
            increaseTime(timeIncreaseBtn.id);
        });
    };

    let timeDecreaseButtons = document.getElementsByClassName("timeDecreaseBtn");
    for (let i = 0; i < timeDecreaseButtons.length; i++) {
        let timeDecreaseBtn = timeDecreaseButtons[i];
        timeDecreaseBtn.addEventListener("click", function() {
            decreaseTime(timeDecreaseBtn.id);
        });
    };
};

function increaseTime(buttonId) {
    let movieRentId = buttonId.slice(16);
    let index = myMovies.findIndex(movie => movieRentId === String(movie.rentId));
    let chosenMovie = myMovies[index];
    if (chosenMovie.rentTime < 168) {
        myMovies[index].rentTime += 12;
    }
    localStorage.setItem("myMovies", JSON.stringify(myMovies));
    generateMovieTable();
    activateRemoveButtons();
    activateTimeButtons();
}

function decreaseTime(buttonId) {
    let movieRentId = buttonId.slice(16);
    let index = myMovies.findIndex(movie => movieRentId === String(movie.rentId));
    let chosenMovie = myMovies[index];
    if (chosenMovie.rentTime > 12) {
        myMovies[index].rentTime -= 12;
    }
    localStorage.setItem("myMovies", JSON.stringify(myMovies));
    generateMovieTable();
    activateRemoveButtons();
    activateTimeButtons();
}

function removeFromMyMovies(buttonId) {
    let movieRentId = buttonId.slice(10);
    let index = myMovies.findIndex(movie => movieRentId === String(movie.rentId));
    myMovies.splice(index, 1);
    localStorage.setItem("myMovies", JSON.stringify(myMovies));

    moviesInStock.forEach(movie => {
        if (String(movie.rentId) === movieRentId) {
            movie.countInStock++;
        }
    });
    localStorage.setItem("moviesInStock", JSON.stringify(moviesInStock));

    generateMovieTable();
    activateRemoveButtons();
}