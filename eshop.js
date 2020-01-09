const boules = 'https://www.zeus2025.be/exe/boutique.xml';

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
    let collectionOfArticles = document.getElementById('articles');
    collectionOfArticles.length = 0;
    collectionOfArticles.selectedIndex = 0;
    let row;
    let oneBall;
    for (let i = 0; i < countArticles; i++) {
        oneBall = document.createElement('td');
        oneBall.setAttribute("class", "article");
        let itemId = document.createElement('p');
        itemId.setAttribute("class", "idBoule");
        itemId.innerText = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        let itemLib = document.createElement('p');
        itemLib.setAttribute("class", "libBoule");
        itemLib = xmlDoc.getElementsByTagName("lib")[i].childNodes[0].nodeValue;
        let itemPrix = document.createElement('p');
        itemPrix.setAttribute("class", "prixBoule");
        itemPrix = xmlDoc.getElementsByTagName("prix")[i].childNodes[0].nodeValue;
        let itemStock = document.createElement('p');
        itemStock.setAttribute("class", "libStock");
        itemStock = xmlDoc.getElementsByTagName("stock")[i].childNodes[0].nodeValue;
        let itemImage = document.createElement('img');
        itemImage.setAttribute("class", "imageBoule");
        itemImage.src = xmlDoc.getElementsByTagName("image")[i].childNodes[0].nodeValue;
        oneBall.append(itemImage);
        oneBall.append(itemLib);
        oneBall.append("\r" + itemPrix + " €");
        oneBall.append("\r" + itemStock + " pièces en stock");
        collectionOfArticles.append(oneBall);
    }
}

