// pristupanje elementima html-a
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const weather_el = document.querySelector('.weather');
const hilow = document.querySelector('.hi-low');

// kreiranje objekta api 
// koji treba da sadrzi API ka nasoj vremenskoj prognozi
// izgled API-a
// https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=3045dd712ffe6e702e3245525ac7fa38
// posto je nas API slozenije prirode
// kreiramo u objektu 2 kljuca, key i base
// key ima svoju vrednost koju uzimamo sa websajta koji nam omogucava koriscenje podataka o vremenskoj prognozi
// base je pocetak API-a koji je uvek isti
const api = {
    key: "3045dd712ffe6e702e3245525ac7fa38",
    base: "https://api.openweathermap.org/data/2.5/"
}

// kreiramo konstantu searchbox da bi smo pristupili input polju
const searchbox = document.querySelector('.search-box');

// za to input polje dodajemo osluskivac dogadjaja
searchbox.addEventListener('keypress', evt => {
    // proveravamo da li je pritisnuta enter tipka tastature
    if (evt.keyCode == 13) {
        //pozivamo funkciju getResults kojoj prosledjujemo vrednost inputa
        getResults(searchbox.value);
    }
});

// kreiramo strelicastu f-ju getResults
// koja ima jedan parametar query, koji je zapravo vrednost iz input polja kada pozovemo f-ju
const getResults = query => {
    // https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=3045dd712ffe6e702e3245525ac7fa38
    // api se sastoji iz vrednosti kljuca base, api objekta + weather?q= + vrednost iz inputa +
    // &units=metric&APPID= + vrednost kljuca key, api objekta
    // prvi then nas API string pretvara u objekat
    // u drugom then-u pozivamo definiciju funkcije displayResults
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => weather.json())
      .then(displayResults);
    // proveravamo izgled naseg api-a
    console.log(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
}

// kreiramo strelicastu f-ju displayResults
const displayResults = weather => {
    // upisujemo tekst u grad
    // teskst se sastoji od imena i drzave kao kljuceva name i country iz fetchovan-og objekta
    city.innerText = `${weather.name}, ${weather.sys.country}`; 
    // kreiramo novi datum 
    let now = new Date();  
    // upisujemo tekst u html element za vreme
    // vrednost je ono sto nam vraca metoda dateBuilder() kojoj je prosledjena vrednost 
    // promenljive now
    date.innerText = dateBuilder(now);
    // upisujemo tekst u html element za temperaturu 
    // tekst se sastoji iz kljuca temp iz objekta main iz fetchovan-og objekta
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    // upisujemo tekst u html element za opis vremena 
    // tekst se sastoji iz kljuca weather koji je niz koji ima objekta od 4 kljuca u sebi
    // i uzimamo vrednost main kljuca
    weather_el.innerText = weather.weather[0].main;
    // upisujemo tekst u html element za najmanju i najvecu temperaturu 
    // tekst se sastoji iz kljuceva temp_min i temp_max iz objekta main iz fetchovan-og objekta
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
  
// kreiramo strelicastu f-ju dateBuilder
// koja ima 1 parametar, a to je zapravo vreme koje treba da prosledimo
const dateBuilder = d => {
    // kreiramo promenljivu months koja je niz od 12 meseci
    let months = ["January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"];
    // kreiramo promenljivu days koja je niz od 7 dana
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    // kreiramo promenljivu day koja pristupa nizu days i uzima dan na osnovu
    // vrednosti koja je prosledjena za novi datum
    // metoda getDay()uzima datum
    let day = days[d.getDay()];
    // kreiramo promenljivu date koja uzima datum na osnovu
    // vrednosti koja je prosledjena za novi datum
    // metoda getDate()uzima datum
    let date = d.getDate();
    // kreiramo promenljivu month koja pristupa nizu days i uzima mesec na osnovu
    // vrednosti koja je prosledjena za novi datum
    // metoda getMonth()uzima mesec
    let month = months[d.getMonth()];
    // kreiramo promenljivu year koja uzima godinu na osnovu
    // vrednosti koja je prosledjena za novi datum
    // metoda getFullYear()uzima godinu
    let year = d.getFullYear();  
    // i na kraju nasa funkcija treba da vrati string sa danom, datumom, mesecom i godinom
    return `${day} ${date} ${month} ${year}`;
}