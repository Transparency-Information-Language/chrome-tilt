var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';

function getSchemaUrl() {
  return 'https://raw.githubusercontent.com/Transparency-Information-Language/schema/master/tilt-schema.json'
}

async function getDocumentUrl() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if(url[url.length-1] != '/')
        url += '/'
      url += 'tilt.json'
      resolve(url)
    });
  })
}

function getSchema() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', getSchemaUrl(), true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var response = JSON.parse(xhr.responseText);
      document.getElementById('schema').textContent = response.$id;
      document.getElementById('schemaId').textContent = response.$schema;
      document.getElementById('schemaUrl').textContent = getSchemaUrl();
      document.getElementById('timestamp').textContent = new Date(Number(new Date()));
    }
  }
  xhr.send();

}

async function getDocument() {
  var xhr = new XMLHttpRequest();
  var url = await getDocumentUrl();
  console.log(url);
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var tilt = JSON.parse(xhr.responseText);
      document.getElementById('controller').textContent = tilt.controller.name;
      document.getElementById('dpo').textContent = tilt.dataProtectionOfficer.name;
      document.getElementById('dataDisclosedCount').textContent = tilt.dataDisclosed.length;

      var aD = document.getElementById('automatedDec');
      if (tilt.automatedDecisionMaking.inUse) {
        aD.textContent = 'in use';
        aD.className = 'badge badge-danger';
      } else {
        aD.textContent = 'not in use';
        aD.className = 'badge badge-success';
      }

      var thirdCountries = tilt.thirdCountryTransfers;
      for (var i = 0, l = thirdCountries.length; i < l; i++) {
        var transfer = thirdCountries[i];

        var flag = document.createElement('img');
        flag.id = transfer.country.toLowerCase();
        flag.src = 'https://www.countryflags.io/' + transfer.country.toLowerCase() + '/shiny/24.png';
        document.getElementById('thirdCountry').appendChild(flag);
      };

      var fullJson = document.getElementById('fullJson');
      fullJson.innerText = xhr.responseText;
      document.getElementById('learnMore').addEventListener('click', function () {
        this.setAttribute('class', 'collapse');
      });

      // document.getElementById('transparencyInformation').style.visibility = 'visible';

    }
  }
  xhr.send();

}

/**

function validateDocument(schema, doc) {


  var xhr = new XMLHttpRequest();
  xhr.open('GET', getSchemaUrl(), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var tiltSchema = JSON.parse(xhr.responseText);

      var xhr2 = new XMLHttpRequest();
      xhr2.open('GET', getDocumentUrl(), true);
      xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
          var tiltDocument = JSON.parse(xhr2.responseText);
    
          
          var ajv = new Ajv({ allErrors: true });
          console.log(tiltSchema);
          console.log(tiltDocument);
          var validate = ajv.compile(tiltSchema);
        
          var badge = document.getElementById('status');
        
          var valid = validate(tiltDocument);
          if (!valid) {
              badge.innerText = 'failed';
              badge.className = 'badge badge-success';
          } else {
            badge.innerText = 'successful';
            badge.className = 'badge badge-danger';
          }
          
        
        }
      }
      xhr2.send();
  
    }
  }
  xhr.send();

}
*/

async function fireWhenDOMContentIsLoaded() {
  getSchema();
  getDocument();
  validateDocument();
}

document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);