var express     =     require("express"),cors=require('cors');
var mysql       =     require("mysql");
var bodyParser  =	  require("body-parser");
var app         =     express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



/*
* Configure MySQL parameters.
*/
var connection  =     mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "mydb"
});

/*Connecting to Database*/

connection.connect(function(error){
	if(error)
	{
		console.log("Problem with MySQL"+error);
	}
	else
	{
		console.log("Connected with Database");
	}
});



/*NUJNO!!!*/
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');     
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept');
    next();
});

/*Start the Server*/
app.listen(3000,function(){
	console.log("It's Started on PORT 3000");
});



/*
* Here we will call Database.
* Fetch data from table.
* Return it in JSON.
*/
app.get('/loadZaposleni',function(req,res){
	connection.query("SELECT * from zaposleni",function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});
app.get('/loadProjekti',function(req,res){
	connection.query("SELECT * from projekt",function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/dodajProjekt',function(req,res){
	if(!req.body.hasOwnProperty('avtor') || !req.body.hasOwnProperty('naziv')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	console.log("evo mene "+req.body.avtor);
	var query="INSERT INTO projekt (Naziv, Avtor) values ('"+req.body.naziv+"','"+req.body.avtor+"');";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/dodajZaposleni',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('Ime') || !req.body.hasOwnProperty('Priimek')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="INSERT INTO zaposleni (Ime, Priimek) values ('"+req.body.Ime+"','"+req.body.Priimek+"');";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/odstraniProjekt',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('id')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="DELETE FROM projekt WHERE idprojekt="+req.body.id+";";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/loadZaposleniNaProjektu',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('id')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="SELECT za.idzaposleni, za.Ime, za.Priimek "+
	"FROM zaposleni za JOIN task ta ON ta.zaposleni_idzaposleni = za.idzaposleni "+
	"JOIN projekt pr ON ta.projekt_idprojekt = pr.idprojekt	WHERE pr.idprojekt="+req.body.id+" GROUP BY za.idzaposleni;";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});



app.post('/loadProstiTaskiNaProjektu',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('id')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="SELECT * from task  where zaposleni_idzaposleni IS NULL AND projekt_idprojekt ="+req.body.id+";";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/createTask',function(req,res){
	var query="INSERT INTO task (Naziv, Opis, Cas_izvedbe,Prioriteta,projekt_idprojekt, zaposleni_idzaposleni) VALUES ('"+req.body.naziv+"','"+req.body.opis+"','"+req.body.casIzvedbe+"',"+req.body.prioriteta+","+req.body.idprojekt+",null);";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/getProjektNaziv',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('id')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="SELECT Naziv FROM projekt WHERE idprojekt="+req.body.id+";";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/addZapNaProjekt',function(req,res){
	console.log(JSON.stringify(req.body));
	var polje="(";
	if(!req.body.hasOwnProperty('idprojekt') || !req.body.hasOwnProperty('idzaposleni')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
  	var query="UPDATE task SET zaposleni_idzaposleni = CASE idtask ";
  	var idzap=req.body.idzaposleni;
  	for (var i = 0; i < req.body.taski.length; i++) {
  		polje=polje+req.body.taski[i].id;
  		if(i<req.body.length-1) polje=polje+",";
  		query=query+"WHEN "+req.body.taski[i].id+" THEN "+idzap+" ";
  	};
  	polje=polje+")";
  	query=query+"END WHERE projekt_idprojekt="+req.body.idprojekt+" AND idtask IN"+polje+";";

	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/potrdiSpremembe',function(req,res){
	console.log(JSON.stringify(req.body));
	var polje="(";
	if(!req.body.hasOwnProperty('idprojekt')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
  	var query="UPDATE task SET zaposleni_idzaposleni = CASE idtask ";
  	for (var i = 0; i < req.body.taski.length; i++) {
  		polje=polje+req.body.taski[i].idtask;
  		if(i<req.body.taski.length-1) polje=polje+",";
  		query=query+"WHEN "+req.body.taski[i].idtask+" THEN "+req.body.taski[i].idzap+" ";
  	};
  	polje=polje+")";
  	query=query+"END WHERE projekt_idprojekt="+req.body.idprojekt+" AND idtask IN"+polje+";";

	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/loadTaskiZaposlenegaNaProjektu',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('idprojekt') || !req.body.hasOwnProperty('idzaposleni')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="SELECT * FROM task where zaposleni_idzaposleni ="+req.body.idzaposleni+" AND projekt_idprojekt="+req.body.idprojekt+";";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/loadProstiTaskiNaProjektu',function(req,res){
	console.log("test");
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('id')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
	var query="SELECT * FROM task where projekt_idprojekt="+req.body.id+" AND zaposleni_idzaposleni IS NULL";
	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});

app.post('/odstraniZapIzProject',function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.hasOwnProperty('idprojekt')) {
    	res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
  	}
  	var query="UPDATE task SET zaposleni_idzaposleni = CASE projekt_idprojekt ";
  	query=query+"WHEN "+req.body.idprojekt+" THEN NULL ";
  	query=query+"END WHERE projekt_idprojekt="+req.body.idprojekt+" AND zaposleni_idzaposleni="+req.body.idzaposleni+";";

	console.log(query);
	connection.query(query,
		function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify(rows));
		}
	});
});
