var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';

function getSchema() {
  var schemaUrl = 'https://raw.githubusercontent.com/Transparency-Information-Language/schema/master/tilt-schema.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', schemaUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      document.getElementById('schema').textContent = JSON.parse(xhr.responseText).$id;
      document.getElementById('schemaId').textContent = JSON.parse(xhr.responseText).$schema;
      document.getElementById('schemaUrl').textContent = schemaUrl;
      document.getElementById('timestamp').textContent = new Date(Number(new Date()));
    }
  }
  xhr.send();
}

function getDocument() {
  var documentUrl =  'https://eliasgruenewald.de/tilt.json';
  document.getElementById('learnMore').onclick = function() {
    location.href = documentUrl;
};

  var xhr = new XMLHttpRequest();
  xhr.open('GET', documentUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var tilt = JSON.parse(xhr.responseText);
      document.getElementById('controller').textContent         = tilt .controller.name;
      document.getElementById('dpo').textContent                = tilt.dataProtectionOfficer.name;
      document.getElementById('dataDisclosedCount').textContent = tilt.dataDisclosed.length;

      var aD = document.getElementById('automatedDec');
      if(tilt.automatedDecisionMaking.inUse) {
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

    }
  }
  xhr.send();

  
}

function fireWhenDOMContentIsLoaded() {
  getSchema();
  getDocument();  
}



document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);