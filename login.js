let nom = document.getElementById("name");
let motDePasse = document.getElementById("pwd");
let motDePasseVerif = document.getElementById("pwd2");
let email = document.getElementById("email");
let adresse = document.getElementById("address");
let localite = document.getElementById("local");
let pays = document.getElementById("country");
let conditions = document.getElementById("conditions");
let regexnom = /^([a-zA-Z]{2,})(\s)([a-zA-Z]{2,})/;
/*nom prénom = (au moins 2 lettres), espace, (au moins 2 lettres)*/
let regexmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; /*RFC 5322 Official Standard*/
/*REGEX qui accepte les @domain sans .com/be/fr... :
 /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
 */
let regexpwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; /*au moins 1 minuscule, 1 majuscule, 1 chifre, 1 caractère spécial, longueur de 8*/
let regexadress = /^[a-z0-9àáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s\-\/]+$/i;
/*seulement des lettres, des chiffres et espace, - et / autorisés ; i = case insensitive*/
//let bouton = document.getElementById("send");
let passwordsMatch = false;
const ok = '<img src="checked.png" alt="Ok" style="width:12px;height:12px;">';
const nok = '<img src="cancel.png" alt="Nok" style="width:12px;height:12px;">';
const localites = 'https://www.zeus2025.be/exe/localites.json';
let defautChoixLocalite = 'Choisissez votre localité dans la liste';

/*VALIDATION DU FORMULAIRE ENTIER -> BOUTON CLIQUABLE*/

function doValidateForm() {
    let allTips = document.getElementsByClassName("tip");
    for (let i = 0; i < allTips.length; i++) {
        allTips.item(i).innerHTML = '';
    }
    if (doCheckEmail() && doCheckName() && doCheckPwd() && doMockupLogin() && doCheckAddress() && doCheckConditions() && doCheckLocality()) {
        location.href='eshop.html';
    } else {
        showMistakes();
    }
}

function showMistakes() {
    if (!doCheckEmail()) {
        document.getElementById('tip-email').innerHTML = 'Veuillez entrer une adresse e-mail correcte';
    }
    if (!doCheckName()) {
        document.getElementById('tip-nom').innerHTML = 'Veuillez entrer votre nom et prénom séparés par un espace';
    }
    if (!doCheckPwd()) {
        document.getElementById('tip-pwd').innerHTML = 'Le mot de passe doit contenir au moins 8 caractères dont 1 minuscule, 1 majuscule, 1 caractère spécial et 1 chiffre';
    }
    if (!doCheckLocality()) {
        document.getElementById('tip-localite').innerHTML = 'Veuillez choisir votre localité';
    }
    if (!doCheckConditions()) {
        document.getElementById('tip-conditions').innerHTML = 'Vous devez accepter les conditions pour vous inscrire';
    }
    if (!doCheckAddress()) {
        document.getElementById('tip-adresse').innerHTML = 'Veuillez entrer votre adresse';
    }
    if (!doMockupLogin()) {
        document.getElementById('tip-pwd2').innerHTML = 'Le mot de passe doit être identique';
    }
}

/*FONCTIONS DE VERIFICATION*/

function doCheckEmail() {
    return regexmail.test(email.value);
}

function doCheckName() {
    return regexnom.test(nom.value);
}

function doCheckPwd() {
    return regexpwd.test(motDePasse.value);
}

function doCheckAddress() {
    return regexadress.test(adresse.value);
}

function doCheckLocality() {
    let selecteur = document.getElementById("local-dropdown");
    let selection = selecteur.options[selecteur.selectedIndex].value;
    return selection !== null && selection !== 0 && selection !== defautChoixLocalite;
}

function doCheckConditions () {
    return conditions.checked;
}

function doMockupLogin() {
    passwordsMatch = (motDePasse.value === motDePasseVerif.value);
    return passwordsMatch;
}

/*FONCTIONS D'AFFICHAGE OK / NOK (ICONES)*/

function doStateCheck(fonction, element) {
    if (fonction) {
        document.getElementById(element).innerHTML = ok;
    } else {
        document.getElementById(element).innerHTML = nok;
    }
}

function doStateMailCheck() {
    doStateCheck(doCheckEmail(), "stateEmail");
}

function doStatePasswordCheck() {
    doStateCheck(doCheckPwd(), "statePassword");
}

function doStatePassword2Check() {
    doStateCheck(doMockupLogin(), "statePassword2");
}

function doStateNomPrenomCheck() {
    doStateCheck(doCheckName(), "stateName");
}

function doStateAddressCheck() {
    doStateCheck(doCheckAddress(), "stateAddress");
}

function doStateLocalityCheck() {
    doStateCheck(doCheckLocality(), "stateLocality");
}

/*JSON LOCALITES*/

function readLocalities() {
    let dropdown = document.getElementById('local-dropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = defautChoixLocalite;
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
}
