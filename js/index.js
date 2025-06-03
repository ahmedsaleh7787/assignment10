
var siteName = document.getElementById("SiteName");
var siteURL = document.getElementById("SiteURL");
var wrongInputs = document.getElementById("lightBox");
var closeBtn = document.getElementById("closeBtn");
var lightBox = document.getElementById("lightBox");
var sitesLocalStorageKey = "allSites";

var sitesList = [];


if (JSON.parse(localStorage.getItem(sitesLocalStorageKey))) {

    sitesList = JSON.parse(localStorage.getItem(sitesLocalStorageKey));
    displaySites(sitesList);

}


function addsitesToLocalStorage() {
    localStorage.setItem(sitesLocalStorageKey, JSON.stringify(sitesList));

}


function addNewSite() {

    if (validationFormInputs(siteName) &&
        validationFormInputs(siteURL)
    ) {

        var newsite = {
            name: siteName.value,
            url: siteURL.value
        }

        sitesList.push(newsite);

        addsitesToLocalStorage();

        displaySites(sitesList);

        clearForm();

    } else {
        wrongInputs.classList.replace('d-none', 'd-flex');
    }

}


function clearForm() {
    siteName.value="";
    siteURL.value="";

    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");


}


function deleteFromList(deleteIndex) {

    sitesList.splice(deleteIndex, 1);

    addsitesToLocalStorage();

    displaySites(sitesList);
}


function displaySites(list) {
    var blackBox = ``;

    for (var i = 0; i < list.length; i++) {
        blackBox += `


          <tr class="BorderBlackSec">
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>

              <a href="${list[i].url.startsWith('http') ? list[i].url : `https://`+list[i].url}" target="_blank" class="btn btn-success text-white text-decoration-none"
                role="button">
                <i class="fas fa-eye me-1"></i>Visit
              </a>

            </td>
            <td><button onclick="deleteFromList(${i})" type="button" class="btn btn-danger"> <i
                  class="fas fa-trash-alt"></i> Delete</button></td>
          </tr>

    `
    }

    document.getElementById("addSites").innerHTML = blackBox;
}


function validationFormInputs(element) {



    var regex = {
        SiteName: /^[A-Za-z0-9 ]{3,}$/,
        // resrorse :
        // https://stackoverflow.com/questions/42618872/regex-for-website-or-url-validation
        SiteURL: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,

    }


    var isValid = regex[element.id].test(element.value);


    if (isValid) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");

    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");

    }


    return isValid;
}


closeBtn.addEventListener('click',closeLightBox);
lightBox.addEventListener('click',closeLightBox);

function closeLightBox() {
 wrongInputs.classList.replace('d-flex', 'd-none');

}


document.addEventListener('keydown',function (e) {
   if (e.key =='Escape') {
    closeLightBox();
   }
    
})