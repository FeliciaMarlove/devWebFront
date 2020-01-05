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
let bouton = document.getElementById("send");
let passwordsMatch = false;
bouton.disabled = true;
const ok = '<img src="checked.png" alt="Ok" style="width:12px;height:12px;">';
const nok = '<img src="cancel.png" alt="Nok" style="width:12px;height:12px;">';
let element = '';
let fonction = '';

/*VALIDATION DU FORMULAIRE ENTIER -> BOUTON CLIQUABLE*/

function doShowButton() {
    if (doCheckEmail() && doCheckName() && doChekcPwd() && doMockupLogin() && doCheckAddress() && doCheckConditions() && doCheckLocality()) {
        bouton.disabled = false;
    } else {
        bouton.disabled = true;
    }
}

/*FONCTIONS DE VERIFICATION*/

function doCheckEmail() {
    return regexmail.test(email.value);
}

function doCheckName() {
    return regexnom.test(nom.value);
}

function doChekcPwd() {
    return regexpwd.test(motDePasse.value);
}

function doCheckAddress() {
    return regexadress.test(adresse.value);
}

function doCheckLocality() {
    return localite.value !== null && localite.value !== 0;
}

function doCheckConditions () {
    return conditions.checked;
}

function doMockupLogin() {
    passwordsMatch = (motDePasse.value === motDePasseVerif.value);
    return passwordsMatch;
}

/*FONCTIONS D'AFFICHAGE OK / NOK (ICONE)*/

function doStateCheck() {
    if (fonction) {
        document.getElementById(element).innerHTML = ok;
    } else {
        document.getElementById(element).innerHTML = nok;
    }
}

function doStateMailCheck() {
    element = "stateEmail";
    fonction = doCheckEmail();
    doStateCheck();
}

function doStatePasswordCheck() {
    element = "statePassword";
    fonction = doChekcPwd();
    doStateCheck();
}

function doStatePassword2Check() {
    element = "statePassword2";
    fonction = doMockupLogin();
    doStateCheck();
}

function doStateNomPrenomCheck() {
    element = "stateName";
    fonction = doCheckName();
    doStateCheck();
}

function doStateAddressCheck() {
    element = "stateAddress";
    fonction = doCheckAddress();
    doStateCheck();
}

function doStateLocalityCheck() {
    element = "stateLocality";
    fonction = doCheckLocality();
    doStateCheck();
}
