
const section = document.getElementById("section");
const section_meteo = document.getElementById("sectionMeteo");
const section_covid = document.getElementById("sectionCovid");
const preferiti = document.getElementById("preferiti");
preferiti.classList.add("hidden");



const apiCovidKey = "217d94abcdmsh7f937b1ced12479p1f40a9jsn1071e498a32a";
const apiCovidHost = "covid-193.p.rapidapi.com";




function createPadri(){
	
	
	var numeroElementi = contenuti.length;
	
	var padriNecessari = Math.ceil(numeroElementi/3);
	
	
	for(let numeroPadre = 0; numeroPadre < padriNecessari;numeroPadre++){
		
		
		var padre = document.createElement("div");
		
		padre.setAttribute("id","contenitorePadre"+numeroPadre);
		
		padre.classList.add("box");
		
		
		var inizio = 0 + (numeroPadre * 3);
		var fine = inizio + 3;
		
		createChild(padre,inizio,fine,numeroElementi);
		section.appendChild(padre);
	}
}





function createChild(divPadre,inizio,fine,numeroElementi){
	
	
	for(let i = inizio; i < fine; i++){
		
		if(i < numeroElementi){
			
			
			
			const figlio = document.createElement("div");
			figlio.setAttribute("id","divFiglio"+i);
			
			const img = createImg(contenuti[i].immagine,"immagine"+i, 400,400);
			figlio.appendChild(img);
			
			
			const divTitolo = document.createElement("div");
			divTitolo.setAttribute("id","divTitolo"+i);
			const h1 = createTitolo(contenuti[i].titolo,"titolo"+i);
			const button = createButtonPreferiti(i);
			divTitolo.appendChild(h1);
			divTitolo.appendChild(button);
			figlio.appendChild(divTitolo);
			

			

			
			const p = createDescrizione(contenuti[i].descrizione,i);
			figlio.appendChild(p);
			
			const dettagli = createDettagli(i);
			figlio.appendChild(dettagli);
			
			divPadre.appendChild(figlio);
		}
	}
	console.log(divPadre);
	
}




var elementiPreferiti = 0;

function createButtonPreferiti(i){
	
	
	const button = document.createElement("button");
	
	button.setAttribute("id","preferiti"+i);
	
	button.innerHTML="Preferiti";
	
	
	button.addEventListener("click", event=> {
		
		
		const oggettoPreferito = {
			titolo: contenuti[i].titolo,
			immagine: contenuti[i].immagine,
		}
		
		elementiPreferiti++;
		
		
		const divPadre = document.createElement("div");
		
		divPadre.setAttribute("id","divPadre");
		
		
		const img = createImg(oggettoPreferito.immagine,"immaginePreferiti"+i,400,400);
		
		const titolo = document.createElement("h1");
		titolo.innerHTML = oggettoPreferito.titolo;
		
	
		const buttonRemovePreferiti = document.createElement("button");
		buttonRemovePreferiti.innerHTML = "Rimuovi";
		
		buttonRemovePreferiti.addEventListener("click", event=>{
			
			divPadre.removeChild(img);
			divPadre.removeChild(titolo);
			elementiPreferiti--;
			
			if(elementiPreferiti==0){
				preferiti.classList.add("hidden");
			}
			
			buttonRemovePreferiti.classList.add("hidden");
			
			button.classList.remove("hidden");
		});
		
		
		divPadre.appendChild(img);
		divPadre.appendChild(buttonRemovePreferiti);
		divPadre.appendChild(titolo);
		
		preferiti.appendChild(divPadre);
		
		preferiti.classList.remove("hidden");
		
		button.classList.add("hidden");
	});
	
	return button;
}

function createDettagli(i){
	const p = document.createElement("p");
	p.innerText="Mostra dettagli";
	
	
	p.addEventListener("click",event =>{
		
		var descrizione = document.getElementById("descrizione"+i);
		
		
		if(descrizione.classList.contains("hidden")){ 
			descrizione.classList.remove("hidden");
			p.innerHTML="Nascondi dettagli";
		}
		
		else {
			descrizione.classList.add("hidden");
			p.innerHTML="Mostra dettagli";
		}
		
	});
	return p;
	
}


function createDescrizione(testo,i){
	const p = document.createElement("p");
	p.innerHTML = testo;
	
	
	p.setAttribute("id","descrizione"+i);
	
	p.classList.add("hidden");
	
	return p;
}

function createTitolo(testo,id){
	const h1 = document.createElement("h1");
	h1.innerHTML = testo;

	h1.setAttribute("id", id);
	
	return h1;
	
}

function createImg(src,id,width,height){
	const img = document.createElement("img");
	img.setAttribute("src",src);
	img.setAttribute("height",height);
	img.setAttribute("width",width);
	img.setAttribute("id", id);
	
	return img;
}


const searchBar = document.getElementById("searchBar");


searchBar.addEventListener("keyup", event => {
  
  var filtro = searchBar.value.toUpperCase();
  
  
  for(let i=0; i<contenuti.length; i++){
	  
	  
	  var titolo = document.getElementById("titolo"+i);
	  
	  var divFiglio = document.getElementById("divFiglio"+i);
	  
	  
	  if(filtro == ""){
		divFiglio.classList.remove("hidden");
	  }
	  
	  else if(titolo.innerHTML.toUpperCase().indexOf(filtro) > -1){
		divFiglio.classList.remove("hidden");
	  }
	  
	  else{
		divFiglio.classList.add("hidden");
	  }
	  
  }
});


createPadri();





const searchBarMeteo = document.getElementById("searchBarMeteo");
const buttonMeteo = document.getElementById("buttonMeteo");

buttonMeteo.addEventListener("click", event =>{
	meteoApi();
});

searchBarMeteo.addEventListener("keyup", event =>{
	if(searchBarMeteo.value==null || searchBarMeteo.value ==""){
		cancellaMeteo();
	}
});


function meteoApi(){
	var location = searchBarMeteo.value.toLowerCase();
	fetch('https://goweather.herokuapp.com/weather/'+location,{
		method:'get'
	}).then(onSuccess,onFail);
}


function onSuccess(response) {
	response.json().then(creaElementiMeteo);
}
function onFail(response) {
	console.log("failure");
}


function creaElementiMeteo(json){
	
	
	cancellaMeteo();
	
	
	var meteo = document.createElement("div");
	meteo.setAttribute("id","meteo");
	section_meteo.appendChild(meteo);
	
	var description = json.description;
	var temperature =  json.temperature;
	var h1 = document.createElement("h1");
	var h2 = document.createElement("h2");
	h1.setAttribute("id","descrizioneMeteo");
	h2.setAttribute("id","temperaturaMeteo");
	h1.innerHTML = description;
	h2.innerHTML = temperature;
	meteo.appendChild(h1);
	meteo.appendChild(h2);
}

function cancellaMeteo(){
	var div = document.getElementById("meteo");
	
	if(div!=null){
		div.remove();
	}
}






const buttonCovid = document.getElementById("buttonCovid");

buttonCovid.addEventListener("click", event =>{
	covidApi();
});

function covidApi() {
	fetch("https://covid-193.p.rapidapi.com/statistics?country=malta", {
	 "method": "GET",
	 "headers": {
	  "x-rapidapi-key": apiCovidKey,
	  "x-rapidapi-host": apiCovidHost
	 }
	}
	).then(covidSuccess,covidFail); 
}

function covidSuccess(response){
	response.json().then(creaElementiCovid);
}


function covidFail(){
	console.log("failure");
}

function creaElementiCovid(json){
	eliminaElementiCovid();
	var div = document.createElement("div");
	div.setAttribute("id","divCovid");
	div.classList.add("boxCovid");
	
	
	var casiAttiviText = document.createElement("h1");
	casiAttiviText.innerHTML = "Casi attivi: ";
	var casiAttiviValue = document.createElement("h2");
	casiAttiviValue.innerHTML = json.response[0].cases.active;
	div.appendChild(casiAttiviText);
	div.appendChild(casiAttiviValue);
	
	
	
	var nuoviCasiText = document.createElement("h1");
	nuoviCasiText.innerHTML = "Nuovi casi: ";
	var nuoviCasiValue = document.createElement("h2");
	nuoviCasiValue.innerHTML = json.response[0].cases.new;
	div.appendChild(nuoviCasiText);
	div.appendChild(nuoviCasiValue);
	
	
	
	var ricoveratiText = document.createElement("h1");
	ricoveratiText.innerHTML = "Ricoverati: ";
	var ricoveratiValue = document.createElement("h2");
	ricoveratiValue.innerHTML = json.response[0].cases.recovered;
	div.appendChild(ricoveratiText);
	div.appendChild(ricoveratiValue);
	
	
	var totaleText = document.createElement("h1");
	totaleText.innerHTML = "Totale casi: ";
	var totaleValue = document.createElement("h2");
	totaleValue.innerHTML = json.response[0].cases.total;
	div.appendChild(totaleText);
	div.appendChild(totaleValue);
	
	section_covid.appendChild(div);
}


function eliminaElementiCovid(){
	var div = document.getElementById("divCovid");
	if(div!=null){
		div.remove();
	}
}

