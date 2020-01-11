const boules = 'https://www.zeus2025.be/exe/boutique.xml';
let cart = 0;
let balls = [];


function addToCart() {
    if (itemStock > 0) {
        ajouter.disabled = false;
        ajouter.setAttribute('onclick', 'addToCart()');
        ajouter.textContent = "Ajouter au panier";
    } else {
        ajouter.disabled = true;
        ajouter.textContent = "Article non disponible";
    }
}

function domCreate () {
    readBoules();
    let collectionOfArticles = document.getElementById('articles');
    collectionOfArticles.length = 0;
    collectionOfArticles.selectedIndex = 0;
    let boule;
    for (let i = 0; i < balls.length; i++) {
        boule = document.createElement('div');
        boule.setAttribute("class", "article");
        let itemId = document.createElement('p');
        itemId.setAttribute("class", "idBoule");
        itemId = balls[i].id;
        let itemLib = document.createElement('p');
        itemLib.setAttribute("class", "libBoule");
        itemLib = balls[i].lib;
        let itemPrix = document.createElement('p');
        itemPrix.setAttribute("class", "prixBoule");
        itemPrix = balls[i].prix;
        let itemStock = document.createElement('p');
        itemStock.setAttribute("class", "libStock");
        itemStock = balls[i].stock;
        let itemImage = document.createElement('img');
        itemImage.setAttribute("class", "imageBoule");
        itemImage.src = balls[i].image;
        let ajouter = document.createElement('button');
        boule.append(itemImage);
        boule.append(itemLib);
        boule.append(itemPrix + " €");
        boule.append(itemStock + " pièces en stock");
        boule.append(ajouter);
        collectionOfArticles.append(boule);
    }

    console.log(collectionOfArticles);
}

function readBoules() {
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else { // POUR INTERNET EXPLORER
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.open("GET", boules, false);
    xmlHttp.send();
    xmlDoc = xmlHttp.responseXML;
    let countArticles = xmlDoc.getElementsByTagName('article').length;
    let oneBall;
    let id, lib, prix, stock, image;
    for (let i = 0; i < countArticles; i++) {
        id = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        lib = xmlDoc.getElementsByTagName("lib")[i].childNodes[0].nodeValue;
        prix = xmlDoc.getElementsByTagName("prix")[i].childNodes[0].nodeValue;
        stock = xmlDoc.getElementsByTagName("stock")[i].childNodes[0].nodeValue;
        image = xmlDoc.getElementsByTagName("image")[i].childNodes[0].nodeValue;
        oneBall = {
            id,
            lib,
            prix,
            stock,
            image
        }
        balls[i] = oneBall;
    }
    //console.log(balls);
}

