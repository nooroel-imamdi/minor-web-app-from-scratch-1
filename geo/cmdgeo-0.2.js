"use strict";

(function() {
  var app = {

    gps: {
      SANDBOX: "SANDBOX",
      LINEAIR: "LINEAIR",
      GPS_AVAILABLE: "GPS_AVAILABLE",
      GPS_UNAVAILABLE: "GPS_UNAVAILABLE",
      POSITION_UPDATED: "POSITION_UPDATED",
      REFRESH_RATE: 1000,
      currentPosition: currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false,
      locatieRij: markerRij = []
      ET: new EventTarget():  
    },

    eventTarget: function() {
      this._listeners = {}
    },

    init: function() {
      debugMessage("Controleer of GPS beschikbaar is...");

      gps.ET.addListener(GPS_AVAILABLE, startInterval);
      gps.ET.addListener(GPS_UNAVAILABLE, function(){debugMessage('GPS is niet beschikbaar.')});

      (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
    },

    startInterval: function() {
      debugMessage("GPS is beschikbaar, vraag positie.");
      updatePosition();
      interval = self.setInterval(updatePosition, REFRESH_RATE);
      ET.addListener(POSITION_UPDATED, checkLocations);
    },

    updatePosition: function() {
      intervalCounter++;
      geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {enableHighAccuracy:true});
    },

    setPosition: function() {
      currentPosition = position;
      gps.ET.fire("POSITION_UPDATED");
      debugMessage(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
    },

    checkLocations: function() {
      // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
      for (var i = 0; i < locaties.length; i++) {
          locatie: {
            coords: {
              latitude: locaties[i][3],
              longitude: locaties[i][4]
            }
          };

          if(calculateDistance(locatie, currentPosition)<locaties[i][2]){

              // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
              if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
                  // Probeer local storage, als die bestaat incrementeer de locatie
                  try {
                      (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
                  } catch(error) {
                      debugMessage("Localstorage kan niet aangesproken worden: "+error);
                  }

  // TODO: Animeer de betreffende marker

                  window.location = locaties[i][1];
                  debugMessage("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
              }
          }
      }
    },

    calculateDistance: function() {
      positions: {
        pos1: new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude,
        pos2: new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude
      }
      return Math.round(google.maps.geometry.spherical.computeDistanceBetween(positions.pos1, positions.pos2), 0);
    },

    generateMap: function() {
      debugMessage("Genereer een Google Maps kaart en toon deze in #"+canvasId)
      map = new google.maps.Map(document.getElementById(canvasId), myOptions);

      var routeList = [];
      debugMessage("Locaties intekenen, tourtype is: "+tourType);
      for (var i = 0; i < locaties.length; i++) {
          try {
              (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
          } catch (error) {
              debugMessage("Localstorage kan niet aangesproken worden: "+error);
          }

          var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
          routeList.push(markerLatLng);

          markerRij[i] = {};
          for (var attr in locatieMarker) {
              markerRij[i][attr] = locatieMarker[attr];
          }
          markerRij[i].scale = locaties[i][2]/3;

          var marker = new google.maps.Marker({
              position: markerLatLng,
              map: map,
              icon: markerRij[i],
              title: locaties[i][0]
          });
      }

      if(tourType == LINEAIR){
          debugMessage("Route intekenen");
          var route = new google.maps.Polyline({
              clickable: false,
              map: map,
              path: routeList,
              strokeColor: 'Black',
              strokeOpacity: .6,
              strokeWeight: 3
          });

      }

      currentPositionMarker = new google.maps.Marker({
          position: kaartOpties.center,
          map: map,
          icon: positieMarker,
          title: 'U bevindt zich hier'
      });

      gps.ET.addListener(POSITION_UPDATED, updatePosition);
    },

    isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
    }

    geoErrorHandler: function(code, message) {
      debug_message('geo.js error '+code+': '+message);
    }

    debugMessage: function(event) {
      // use currentPosition to center the map
      var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
      map.setCenter(newPos);
      currentPositionMarker.setPosition(newPos);
    },

    setCustomDebugging: function() {
      debugId = this.debugId;
      customDebugging = true;
    }

  };
})