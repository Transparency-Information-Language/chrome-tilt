var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';

function getSchema() {
  var schemaUrl = 'https://raw.githubusercontent.com/Transparency-Information-Language/schema/master/tilt-schema.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', schemaUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var schema = JSON.parse(xhr.responseText).$id;
      document.getElementById('schema').textContent = schema;
    }
  }
  xhr.send();
}

function getDocument() {
  var documentUrl =  'https://eliasgruenewald.de/tilt.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', documentUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var name = JSON.parse(xhr.responseText).meta.name;
      document.getElementById('document').textContent = name;
    }
  }
  xhr.send();
}

function fireWhenDOMContentIsLoaded() {
  getSchema();
  getDocument();  
}



document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);