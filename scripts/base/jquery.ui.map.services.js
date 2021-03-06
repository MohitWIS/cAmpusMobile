/*!
 * jQuery UI Google Map 3.0-rc
 * http://code.google.com/p/jquery-ui-map/
 * Copyright (c) 2010 - 2012 Johan Säll Larsson
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Depends:
 *		jquery.ui.map.js
 */
(function($){$.extend($.ui.gmap.prototype,{displayDirections:function(directionsRequest,directionsRendererOptions,callback){var self=this;var directionService=this.get("services > DirectionsService",new google.maps.DirectionsService());var directionRenderer=this.get("services > DirectionsRenderer",new google.maps.DirectionsRenderer());if(directionsRendererOptions){directionRenderer.setOptions(directionsRendererOptions);}directionService.route(directionsRequest,function(results,status){if(status==="OK"){directionRenderer.setDirections(results);directionRenderer.setMap(self.get("map"));}else{directionRenderer.setMap(null);}callback(results,status);});},displayStreetView:function(panel,streetViewPanoramaOptions){this.get("map").setStreetView(this.get("services > StreetViewPanorama",new google.maps.StreetViewPanorama(this._unwrap(panel),streetViewPanoramaOptions)));},search:function(geocoderRequest,callback){this.get("services > Geocoder",new google.maps.Geocoder()).geocode(geocoderRequest,callback);}});}(jQuery));