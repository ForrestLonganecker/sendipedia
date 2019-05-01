module.exports = {
  fakeIt(app){
    let role, id, email, name;
  

    function middleware(req, res, next){
      role = req.body.role || role;
      id = req.body.userId || id;
      email = req.body.email || email;
      name = req.body.name || name;

      // console.log(id);
  
      if(id && id != 0){
        req.user = {
          "id": id,
          "email": email,
          "role": role,
          "name": name
        };
        res.locals.currentUser = req.user;
      } else if(id == 0){
        delete res.locals.currentUser;
        delete req.user;
      }
  
      if( next ){ next() }
    }


    function route(req, res){
      res.redirect('/')
    }

    app.use(middleware)
    app.get('/auth/fake', route)
  }
}

