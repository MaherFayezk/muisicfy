
window.onload = function () {
    loadLogin();
    document.getElementById('login-btn').onclick = function (event) {
        event.preventDefault();
        logUser();
    }
    document.getElementById('search-btn').onclick = function (event) {
        event.preventDefault();
        let keyword = document.getElementById('search').value;
        document.getElementById('recomeded-h2').innerHTML = "results for " + keyword
        searchSongs(keyword);
    }
    document.getElementById('logout-btn').onclick = function (event) {
        event.preventDefault();
        logout();
    }
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
        loadHome();
        getAllSongs();
        getPlaylist();
    }
    else {
        loadLogin();
        document.getElementById('login-btn').onclick = function (event) {
            event.preventDefault();
            logUser();
        }
        document.getElementById('search-btn').onclick = function (event) {
            event.preventDefault();
            let keyword = document.getElementById('search').value;
            document.getElementById('recomeded-h2').innerHTML = "results for " + keyword
            searchSongs(keyword);
        }
        document.getElementById('logout-btn').onclick = function (event) {
            event.preventDefault();
            logout();
        }
    }

}

async function loadLogin() {
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-btn').style.display = 'none';
    document.getElementById('user-list').style.display = 'none';
    document.getElementById('music-list').style.display = 'none';
    document.getElementById('play').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login').style.display = 'block';
    document.getElementById('welcome').style.display = 'block';
}

async function loadHome() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('search').style.display = 'block';
    document.getElementById('search-btn').style.display = 'block';
    document.getElementById('user-list').style.display = 'block';
    document.getElementById('music-list').style.display = 'block';
    document.getElementById('play').style.display = 'block';
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
    let songs = await fetch("http://localhost:3000/songs/search?keyword=" + keyword, {
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
    let placeholder = document.getElementById('data-output');
    let out = "";
    console.log(songs);
    for (let i = 0; i < songs.length; i++) {
        out += `
        <tr>
          <td style="text-align: center">${i + 1}</td>
          <td>${songs[i].songTitle}</td>
          <td style="text-align: center">${songs[i].rleaseDate}</td>
          <td class="trButton"> <button type="submit" class="active" onclick='addtoList(${songs[i].songId})'>
          <i class="fa-solid fa-circle-plus" fa-3x"></i></td>
        </tr>
      `;
    }
    console.log(songs);
    placeholder.innerHTML = out;
}

async function removeFromList(sId) {
    let playlist = await fetch('http://localhost:3000/users/playlist/songs/' + sId, {
        method: "DELETE",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify({
            token: sessionStorage.getItem("token")
        }),
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });
    console.log("add");
    getPlaylist();
}

async function addtoList(sId) {
    let playlist = await fetch('http://localhost:3000/users/playlist/songs/' + sId, {
        method: "POST",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify({
            token: sessionStorage.getItem("token")
        }),
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });
    console.log("add");
    getPlaylist();
}

async function getPlaylist() {
    let playlist = await fetch('http://localhost:3000/users/playlist', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    }).then((res) => {
        isok = res.ok;
        return res.json();
    });
    renderPlaylist(playlist);
}

function renderPlaylist(songs) {
    let placeholder = document.getElementById('playlist-tbody');
    let out = "";
    for (let i = 0; i < songs.length; i++) {
        out += `
        <tr>
          <td style="text-align: center">${i + 1}</td>
          <td>${songs[i].songTitle}</td>
          <td class="trButton"> <button type="submit" class="active" onclick='removeFromList(${songs[i].songId})'>
          <i class="fa-solid fa-xmark"></i> </button>
          <button type="submit" class="active" onclick='playSong(${songs[i].songId})'>
          <i class="fa-solid fa-play"></i> </button>
          </td>
        </tr>
      `;
    }
    placeholder.innerHTML = out;
}

 function playSong(sid){
    let audio = document.getElementById("audio");
    let source = document.getElementById("audio-src");
    source.src = "./resources/songs/song"+sid+".mp3";
    audio.load(); 
    audio.play(); 
    }
 function logout(){
    console.log("indie logout");
    sessionStorage.clear();
    document.location.reload(true)
    //loadLogin();
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
        getPlaylist();
    }
}
