users=[{"username":"maher","password":"0000"}];

module.exports= class user{
    authonticate(usrename,password){
        const index = users.findIndex(u => u.username === usrename && u.password===password);
        if (index > -1) {
            return users[index];
        } else {
            throw new Error('NOT Found');
        }
    }
    logout(){

    }
    addToPlaylist(){

    }
    removeFromPlaylist(){

    }
}