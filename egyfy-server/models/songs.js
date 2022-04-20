const songs = 
[{"songId":1,"songTitle":"gaya","rleaseDate":"2006-01-01"},
{"songId":2,"songTitle":"baya","rleaseDate":"2006-01-01"},
{"songId":3,"songTitle":"haya","rleaseDate":"2006-01-01"}
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