
window.onload = function () {
    loadLogin();
    document.getElementById('login-btn').onclick = function (event) {
        event.preventDefault();
        logUser();
    }
    document.getElementById('search-btn').onclick = function (event) {
        event.preventDefault();
        let keyword= document.getElementById('search').value;
        document.getElementById('recomeded-h2').innerHTML="results for "+keyword
        searchSongs(keyword);
    }
}

async function loadLogin() {
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-btn').style.display = 'none';
    document.getElementById('user-list').style.display = 'none';
    document.getElementById('music-list').style.display = 'none';
}

async function loadHome() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('search').style.display = 'block';
    document.getElementById('search-btn').style.display = 'block';
    document.getElementById('user-list').style.display = 'block';
    document.getElementById('music-list').style.display = 'block';
}

async function getAllSongs() {
    let isok = false;
    let songs = await fetch("http://localhost:3000/songs/", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });
    renderSongs(songs);
}
async function searchSongs(keyword) {

    let isok = false;
    let songs = await fetch("http://localhost:3000/songs/search?keyword="+keyword, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });
    renderSongs(songs);
}

function renderSongs(songs) {
    let table = document.getElementById("songs-table");
    for (let i = 0; i < songs.length; i++) {
        let row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = songs[i].songTitle;
        row.insertCell(2).innerHTML = songs[i].rleaseDate;
        row.insertCell(3).innerHTML = "+";
    }
}

function renderPlaylist(songs) {
    let table = document.getElementById("list-table");
    for (let i = 0; i < songs.length; i++) {
        let row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = songs[i].songTitle;
        row.insertCell(3).innerHTML = "-     >";
    }
}

async function logUser() {
    let isok = false;
    let user = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }),
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });

    if (!isok) {
        document.getElementById('login').innerHTML = 'incorrcet username or password';
    }
    else {
        sessionStorage.setItem("token", user.token);
        //document.getElementById('login').innerHTML='Welcome'+user.username;
        loadHome();
        getAllSongs();
    }
}

/*
window.onload = function() {
    getBooks();

    document.getElementById('nav-home').onclick = function(event) {
        event.preventDefault();
        getProducts();
    }

    // add/update product
    document.getElementById('product-btn').onclick = function(event) {
        event.preventDefault();
        if (!document.getElementById('product-btn').dataset.id) {
            addProduct();
        } else {
            editProduct();
        }
    }
}

async function getBooks() {
    let books = await fetch('http://localhost:3000/books/').then(response => response.json());
    books.forEach(book => renderBook(book));
}

function renderBook(book) {
    const div = document.createElement('div');
    div.classList = 'col-lg-4';
    div.id = book.id;
    div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
    <title>Placeholder</title>
    <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
        dy=".3em">140x140</text>
    </svg>`;

    const h2 = document.createElement('h2');
    h2.textContent = book.title;

    const ISBN = document.createElement('p');
    ISBN.textContent = book.ISBN;

    const publishedDate = document.createElement('p');
    publishedDate.textContent = book.publishedDate;

    const author = document.createElement('p');
    author.textContent = book.author;

    div.appendChild(h2);
    div.appendChild(ISBN);
    div.appendChild(publishedDate);
    div.appendChild(author);

    const actions = document.createElement('p');
    const updateBtn = document.createElement('a');
    updateBtn.classList = 'btn btn-secondary';
    updateBtn.textContent = 'UPDATE';
    updateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('book-heading').textContent = 'Edit book';
        document.getElementById('title').value = book.title;
        document.getElementById('ISBN').value = book.ISBN;
        document.getElementById('publishedDate').value = book.publishedDate;
        document.getElementById('author').value = book.author;
        document.getElementById('book-btn').dataset.id = book.id;
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'btn btn-secondary';
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault();

        fetch('http://localhost:3000/books/' + prod.id, {
            method: 'DELETE',
        }).then(response => {
            alert('Delete Successfully!');
            div.remove();
        });
    });

    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('books').appendChild(div);
}


async function addProduct() {
    let result = await fetch('http://localhost:3000/books/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value
        })
    }).then(res => res.json());
    document.getElementById('product-form').reset();
    renderBook(result);
}

function editBook() {
    const bookId = document.getElementById('product-btn').dataset.id;
    const title = document.getElementById('title').value;
    const ISBN = document.getElementById('ISBN').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const author = document.getElementById('author').value;
    fetch('http://localhost:3000/books/' + bookId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                ISBN: ISBN,
                publishedDate: publishedDate,
                author: author
            })
        }).then(response => response.json())
        .then(jsonObj => {
            const bookDiv = document.getElementById(bookId);
            bookDiv.querySelector('h2').textContent = title;
            const paragraphArr = bookDiv.querySelectorAll('p');
            paragraphArr[0].textContent = ISBN;
            paragraphArr[1].textContent = publishedDate;
            paragraphArr[2].textContent = author;

            document.getElementById('book-heading').textContent = 'Add a new book';
            document.getElementById('book-btn').dataset.id = '';
            document.getElementById('book-form').reset();
        });
}
*/