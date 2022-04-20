const songs = 
[{"songId":1,"songTitle":"Toba ll ragol","rleaseDate":"2006-01-01"},
{"songId":2,"songTitle":"Lmaza kasort el omam","rleaseDate":"2006-01-01"},
{"songId":3,"songTitle":"Yarab lmaza","rleaseDate":"2006-01-01"},
{"songId":4,"songTitle":"Ez dawt estagabt","rleaseDate":"2006-01-01"},
{"songId":5,"songTitle":"Ansat Ya Rab","rleaseDate":"2006-01-01"},
{"songId":6,"songTitle":"Yarab la tobktny","rleaseDate":"2006-01-01"},
{"songId":7,"songTitle":"Ayoha al Rab Rabna","rleaseDate":"2006-01-01"}
];

module.exports = class song {
    static fetchAll() {
        return songs;
    }
    static findById(id) {

        const index = songs.findIndex(song => song.songId == id);
        if (index > -1) {
            return songs[index];
        } else {
            throw new Error('NOT Found');
        }
    }
    static find(keyword) {
        let res=songs.filter(song =>song.songTitle.toLowerCase().includes(keyword.toLowerCase()));
        return res;
    }
    /*
    static getList(idsList){
        return idsList.map(c=>songsfind(s=>s.songId==c));
    }
    */
}