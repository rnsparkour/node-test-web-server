const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')


app.set('view engine', 'hbs');
app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log',log + '\n' , (err) =>{
		if (err){
			console.log('Unable to append to server.loh')
		}
	});
	next();
})

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs')
// })

app.get('/', (req,res) => {
	res.render('home.hbs' , {
		pageTitle:'Home PAge' ,
		welcomeMsg:'Welcome mate',
		currentYear: new Date().getFullYear()
	})
	
})

app.use(express.static(__dirname + '/public'))

app.get('/about',(req,res) => {

	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/projects',(req,res) => {

	res.render('portfolio.hbs',{
		pageTitle:'portfolio',
		currentYear: new Date().getFullYear(),
		welcomeMsg:'Hello Stupid Human'
	})
})

app.get('/bad',(req,res) => {

res.send({
	Error: 'Bad Request'
})

})
app.listen(3000);