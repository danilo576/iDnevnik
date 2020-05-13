const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const User =     require('./models/User');
const LocalStratrgy = require("passport-local");
const cors = require('cors')

const path = require("path");

const flash = require('express-flash');

//dodaj cripto async i nodemailer
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

mongoose.connect("mongodb+srv://aleksandar:databasetest@cluster0-k3chi.mongodb.net/test?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });



const app = express();

app.use(express.static(path.join(__dirname, "/")));

app.use(cors());

app.use(flash());

app.use(bodyParser.urlencoded({extended:true}))

app.use(require("express-session")({
    secret: "Neki string",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratrgy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Ucenik1.create({
//     Ime: "Mario",
//     Prezime: "Kovacevic",
//     Jmbg: 1107998732469,
//     DatumRodjenja: "11.07.1998",
//     Adresa: "Djerdapska 55",
//     Email: "mario@gmail.com",
//     Razred: 4,
//     Odeljenje: 1,
//     Vladanje: 5,
//     Napomene: [{ Tekst: "Mario je doneo stetne lekove na casu istorije sa Danilom Terzicem", Datum: "22.11.2019." }, { Tekst: "Mario sutira milu mirovic", Datum: "1.6.2019." },{ Tekst: "Zdravko baca topovski u ucionicu", Datum: "1.6.2019." },{ Tekst: "Nikola maze sladoled po zidovima", Datum: "1.6.2019." },{ Tekst: "Zdravko maze krem po zidovima", Datum: "1.6.2019." }],
//     Dogadjaji: [{ Tekst: "Ptrebno je platiti djacki dinar u iznosu od 300rsd", Datum: "3.4.2020" }, { Tekst: "Potrebno je platiti djacki dinar u iznosu od 400rsd", Datum: "4.4.2019" }],
//     Raspored: [{ Dan: "Ponedeljak", Predmeti: ["Srpski", "Engleski", "Matematika", "Istorija", "Fizicko", "Hemija","Psihologija"] }, { Dan: "Utorak", Predmeti: ["Engleski", "Engleski", "Hemija", "Istorija", "Biologija", "Francuski"] }, { Dan: "Sreda", Predmeti: ["Informatika", "Informatika", "Matematika", "Istorija", "Fizicko"] }, { Dan: "Cetvrtak", Predmeti: ["Geografija", "Srpski", "Matematika", "Matematika", "Matematika"] }, { Dan: "Petak", Predmeti: ["BIologija", "Hemija", "Fizika", "Istorija", "Fizicko"] }], 
//     Izostanci: [{ Razred: 4, Polugodiste: "drugo", Tip: "Opravdani", Predmet: "Istorija", Datum: "19.2.2020" }, { Razred: 4, Polugodiste: "drugo", Tip: "Neopravdani", Predmet: "Hemija", Datum: "20.2.2020" },{ Razred: 4, Polugodiste: "drugo", Tip: "Neopravdani", Predmet: "Engleski", Datum: "20.2.2020" },{ Razred: 2, Polugodiste: "prvo", Tip: "Neopravdani", Predmet: "Fizika", Datum: "20.2.2020" },{ Razred: 4, Polugodiste: "drugo", Tip: "Na cekanju", Predmet: "Biologija", Datum: "20.2.2020" }],
//     Predmeti: [{ Naziv: "Istorija", Ocene: [{ Razred: 4, Polugodiste: "prvo", Vrednost: 5 }, { Razred: 4, Polugodiste: "prvo", Vrednost: 3 }]},{ Naziv: "Engleski", Ocene: [{ Razred: 4, Polugodiste: "prvo", Vrednost: 2 }, { Razred: 4, Polugodiste: "prvo", Vrednost: 3 }]},{ Naziv: "Informatika", Ocene: [{ Razred: 4, Polugodiste: "drugo", Vrednost: 5 }, { Razred: 4, Polugodiste: "prvo", Vrednost: 4 }]}],
//     Post: [{TipPosta:"Ostalo", Sadrzaj:"Prijava za ekskurziju obavice se u petak 22.5.2020.",Datum:"3.6.2020"},{TipPosta:"Domaci", Sadrzaj:"Potrebno je procitati devetu lekciju iz biologije",Datum:"3.6.2020"},{TipPosta:"Test", Sadrzaj:"Test iz engleskog bice odlozen za sledeci ponedeljak",Datum:"3.6.2020"},{TipPosta:"Domaci", Sadrzaj:"Potrebno je procitati prvu lekciju iz hemije",Datum:"3.6.2020"},{TipPosta:"Vannastavne", Sadrzaj:"Dodatna nastava za takmicenje iz fizike bice 2.2.2020.",Datum:"3.6.2020"}]
// }, function (err, ucenik) {
//     if (err)
//     console.log(err);
// else {
//     console.log("Novi ucenik dodat u bazu");
//     console.log(ucenik);
// }

// })


Roditelj.create({
    Ime: "Sonja",
    Prezime: "Jovanovic",
    Email: "slavica@gmail.com",
    Telefon: "0637676851",
    Deca: "5ea5a2780b12b62bc87a2d70"
}, function (err, rod) {
        if (err)
        console.log(err);
    else {
        console.log("Novi roditelj dodat u bazu");
       // console.log(ucenik);
    }
    
    })
    

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
   res.redirect("/");
}



app.get("/",(req,res)=>{
    req.flash('error_messages',"greskaaa");
    res.redirect("http://localhost:3000/login");
});


app.get("/greska",isLoggedIn,(req,res)=>{
    req.flash('error_messages',"greskaaa");
    res.redirect("http://localhost:3000/login");
});

app.post("/register",(req,res)=>{
 
User.register(new User({username: req.body.username,type: req.body.type}),req.body.password,(err,user)=>{
    if(err){
        console.log(err)
        res.send(err);
    }
    passport.authenticate("local")(req,res,()=>{
        res.redirect("http://localhost:3000/preview"); 
    })
})
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"http://localhost:3000/preview",
    failureRedirect:"/greska"
}),(req,res)=>{

})

app.get("/logout",(req,res)=>{
   req.logOut();
   res.redirect("http://localhost:3000/");
});

app.get("/api/current_user",(req,res)=>{
    res.send(req.user);
})


  const UcenikControl = require("./controllers/UcenikController");
app.get("/Zdravko", UcenikControl.all);
app.get("/Dete/:_id", UcenikControl.findById);
app.get("/DeteEmail/:Email", UcenikControl.findByEmail);
const RoditeljControl = require("./controllers/RoditeljController");
app.get("/Roditelj", RoditeljControl.all);

app.get("/forgot",function(req,res){
    res.redirect("http://localhost:3000/Forget");
})

app.post("/forgot",function(req,res,next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20,function(err,buf){
                const token = buf.toString('hex');
                done(err,token);
            });
        },
        function(token, done){
            User.findOne({username: req.body.username},function(err,user){
                if(!user){
                    console.log("ERROR");
                    return res.redirect("http://localhost:3000/Forget")
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; //1 sat

                user.save(function(err){
                    done(err,token,user);
                });
            });
        },
        function(token,user,done){
            const stmpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth:{
                    user:'aleksandar19981@gmail.com',
                    pass:'jaigramikariam.'
                }
            });
            const mailOptions = {
                to:user.username,
                from:'aleksandar19981@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            stmpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                console.log("POSLAT MAILL")
                done(err, 'done');
              });
        }
    ],function(err){
        if(err) return next(err);
        res.redirect("http://localhost:3000/Forget")
    })
})
app.get("/reset/:token",function(req,res){
    
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now() } }, function(err, user){
         if(!user){
             console.log("Greska je"+err);
             return res.redirect("http://localhost:3000/Forget")
         }
         res.redirect("http://localhost:3000/Reset/?token="+req.params.token);
    
    });
});

app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        console.log("Token je:"+req.params.token);
        console.log("Datum je:"+Date.now());
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
           console.log('Password reset token is invalid or has expired.');
            return res.redirect('http://localhost:3000/Forget');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
             console.log("Passwords do not match.");
              return res.redirect("http://localhost:3000/Forget");
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'aleksnadr19981@gmail.com',
            pass: 'jaigramikariam.'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'aleksandar19981@mail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });
  


const PORT = process.env.PORT || 5000;
app.listen(PORT);