/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
	
	var inputs = document.getElementsByClassName('address_class');

	var options = {
	    componentRestrictions: { country: ["us", "ca"] },
		fields: ["address_components", "geometry"],
		types: ["address"],
	};

	var autocompletes = [];

	for (var i = 0; i < inputs.length; i++) {
	  var autocomplete = new google.maps.places.Autocomplete(inputs[i], options);
	  autocomplete.inputId = inputs[i].id;
	  autocomplete.addListener('place_changed', fillInAddress);
	  autocompletes.push(autocomplete);
	}
}
  
  
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  //autocomplete.addListener("place_changed", fillInAddress);

function fillInAddress() {
  // Get the place details from the autocomplete object.
  console.log(jQuery(this));

  const place = this.getPlace();
  let address1 = "";
  let address1_street = "";
  let postcode = "";
  let b1_address1_input = "";
  let b1_address2_input = "";
  let b1_city = "";
  let b1_state = "";
  let b1_country = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
		  console.log("street_number" + component);
        address1 = `${component.long_name} ${address1}`;
		//address1_street =  `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
		   console.log("route" + component.long_name);
        address1 = `${component.short_name}`;
		address1_street = `${component.long_name}`;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
		b1_city = component.long_name;
        //document.querySelector("#locality").value = component.long_name;
        break;
      case "administrative_area_level_1": {
		  b1_state = component.short_name;
       // document.querySelector("#state").value = component.short_name;
        break;
      }
      case "country":
		b1_country = component.long_name;
        //document.querySelector("#country").value = component.long_name;
        break;
    }
  }

  
  jQuery(this).val(address1_street);

  b1_address2_input = b1_city + " , " + b1_state + " , " + postcode + " , " + b1_country;

  
  jQuery('.' + this.inputId).parent().parent().parent().find('.address_data_2').val(b1_address2_input)

  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  

  jQuery('.' + this.inputId).parent().parent().parent().find('.address_next_focus').focus();
}

window.initAutocomplete = initAutocomplete;
