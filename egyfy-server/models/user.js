const song = require("./songs");

let users=[];
module.exports= class user{
    static load(){
        users.push(new user(1,"maher","0000"));
        users.push(new user(1,"geo","1234"));
        users.push(new user(1,"ta","0000"));
    };
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this .token =  Math.random();
    }
   static authonticate(usrename,password){
        const index = users.findIndex(u => u.username === usrename && u.password===password);
        console.log(index);
        if (index > -1) {
            let token= Math.random();
            let newUser= users[index];
            newUser.token=token;
            newUser.creationDate=Date.now();
            users[index]=newUser;
            let obj={"token":token, "username":newUser.username, "userId":newUser.userId}
            return obj;
        } else {
            throw new Error('NOT Found');
        }
    }
    addToPlaylist(id){
        let uindex=users.findIndex(u=>u.userId==this.userId);
        if(!this.playlist){
            this.playlist=[];}
            const index = this.playlist.findIndex(sid=>sid==id);
        if (index < 0) {
            this.playlist.push(id);
            users.splice(uindex,1,this);
        }
        return this.playlist;
    }
    removeFromPlaylist(id){
        console.log("now",id);
        let uindex=users.findIndex(u=>u.userId==this.userId);
        console.log("here",this);
        this.playlist=this.playlist.filter(sid=>sid !==id);
        
        console.log(this.playlist);
        users.splice(uindex,1,this);
        return this.playlist;
    }

    static getByToken(token){
        console.log(token, users);
        return users.find(u=>u.token==token);
    }
     getPlaylist(){
         console.log("getplaylist",this)
        let idsList = this.playlist;
        let songsList=[];
        for(let i=0;i<idsList.length;i++){
            songsList.push(song.findById(idsList[i]))
        }
       return songsList;
    }

}

