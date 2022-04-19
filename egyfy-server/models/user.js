let users=[{"userId":"1","username":"maher", "password":"0000"}];
module.exports= class user{
   static authonticate(usrename,password){
        const index = users.findIndex(u => u.username === usrename && u.password===password);
        console.log(index);
        if (index > -1) {
            let token= Math.random();
            let newUser= users[index];
            newUser.toke=token;
            newUser.creationDate=Date.now();
            users[index]=newUser;
            let obj={"token":token, "username":newUser.username, "userId":newUser.userId}
           console.log("hh");
            return obj;
        } else {
            throw new Error('NOT Found');
        }
    }
    addToPlaylist(id){
        const index = this.playlist.findIndex(s => s.id === id);
        if (index < 0) {
            this.playlist.push()
        }
        return this.playlist;
    }
    removeFromPlaylist(id){
        this.playlist=this.playlist.filter(s=>s.id !==id);
        return this.playlist;
    }
}