let canvas;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

document.getElementById("ClickCat").onclick = Cat;
document.getElementById("ClickUser").onclick = User;
document.getElementById("ClickUS").onclick = USpopulation;
document.getElementById("ClickBitcoin").onclick = Bitcoin;
document.getElementById("ClickDog").onclick = Dog;



let data;

async function getData(URL){
    const response = await fetch(URL);
    data = await response.json();
    console.log(data);
    render(URL);
}

function Cat(){
    getData("https://catfact.ninja/fact");
    render();
}

function User(){
    getData("https://randomuser.me/api/");
    render();
}

function USpopulation(){
    getData("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
    render();
}


function Bitcoin(){
    getData("https://api.coindesk.com/v1/bpi/currentprice.json");
    render();
}


function Dog(){
    getData("https://dog.ceo/api/breeds/image/random");
    render();
}



function render(URL) {
    document.getElementById("render").innerHTML = '';
    const render = document.createElement('div');
    if(URL == "https://catfact.ninja/fact"){
        render.innerHTML = `<h3>Aprende algo nuevo sobre los gatitos</h3> <br> <p>${data.fact}</p>`;
    }
    if(URL == "https://randomuser.me/api/"){
        render.innerHTML = `<h3>Usuario random</h3> <br> <img class="ImagenR" src="${data.results[0].picture.large}"> <p>Nombre: ${data.results[0].name.first} ${data.results[0].name.last}</p> <p>Genero: ${data.results[0].gender}</p> <p>Edad: ${data.results[0].dob.age}</p> <p>Vive en: ${data.results[0].location.country}</p> `;
    }
    if(URL == "https://datausa.io/api/data?drilldowns=Nation&measures=Population"){
        render.innerHTML = `<p>${data.data[0].Year}: ${data.data[0].Population}</p> <p>${data.data[1].Year}: ${data.data[1].Population}</p> <p>${data.data[2].Year}: ${data.data[2].Population}</p>`;
    }
    if(URL == "https://api.coindesk.com/v1/bpi/currentprice.json"){
        render.innerHTML = `<h3>Precio del bitcoin</h3> <br> <p>${data.bpi.USD.code}: ${data.bpi.USD.rate} <br> <p>${data.bpi.EUR.code}: ${data.bpi.EUR.rate} <br> ${data.bpi.EUR.description}</p>`;
    }
    if(URL == "https://dog.ceo/api/breeds/image/random"){
        render.innerHTML = `<h3>PERRITOOOO :3</h3> <br> <img class="somePic" src="${data.message}">`;
    }
    document.getElementById("render").appendChild(render);
}