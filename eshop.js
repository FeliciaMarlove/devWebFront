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
    let oneBall;
    for (let i = 0; i < countArticles; i++) {
        oneBall = document.createElement('li');
        itemId = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        itemLib = xmlDoc.getElementsByTagName("lib")[i].childNodes[0].nodeValue;
        itemPrix = xmlDoc.getElementsByTagName("prix")[i].childNodes[0].nodeValue;
        itemStock = xmlDoc.getElementsByTagName("stock")[i].childNodes[0].nodeValue;
        itemImage = xmlDoc.getElementsByTagName("image")[i].childNodes[0].nodeValue;
        oneBall.value = {
            itemId,
            itemLib,
            itemPrix,
            itemStock,
            itemImage
        }
        collectionOfArticles.append(oneBall);
    }
}

/*function readLocalities() {
    dropdown.append(defaultOption);
    dropdown.selectedIndex = 0;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            //console.log(data);
            //console.log(data.localites.length);
            let option;
            for (let i = 0; i < data.localites.length; i++) {
                option = document.createElement('option');
                option.innerText = data.localites[i].cp + ' ' + data.localites[i].ville;
                option.value = option.innerText;
                option.setAttribute("id", "local-option");
                dropdown.append(option);
            }
        };
    }
    xmlhttp.open("GET", localites, true);
    xmlhttp.send();
}*/



