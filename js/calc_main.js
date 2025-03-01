$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			let font = "";
			function printPDF_proposal() {
				printJS({
			  	printable: 'editor',
			    	type: 'html',
			    	style: "@import url('https://upgradeny.github.io/Contract-Proposal/fonts/Montserrat-VariableFont_wght.ttf')",
			    	font: 'Montserrat'
			  })
			}
	
			jQuery.validator.addMethod("phonenu", function (value, element) {
				if ( /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/.test(value)) {
					return true;
				} else {
					return false;
				};
			}, "Invalid phone number");
	

			$("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				c_price: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				main_date: {
					required: true,
				},
				delivery_contact: {
					required: true,
				},
				project_email: {
					required: true,
				},
				b_phone_1: {
					phonenu: true,
					required: true
				},
				s_phone_1: {
					phonenu: true,
					required: true
				},
				
			  }
			});
			
	
	
			var totalDueSum , amount1;
			 jQuery(".price_input_sum").change(function () {
				   totalDueSum = 0;
				   jQuery('.price_input_sum').each(function(i, obj) {
					    amount1 = this.nodeName.toLowerCase() === 'input' ? jQuery(this).val() : jQuery(this).find('option:selected').val();
						totalDueSum += Number(amount1);
						console.log(amount1 , totalDueSum);
					});
					
					totalDueSum += ( Number( jQuery('#counter_top').val() ) + Number( jQuery('#c_price').val() ) ) * Number( jQuery('#sales_tax option:selected').val() ) / 100
					
					jQuery('#totalDue').val(totalDueSum);
			   });
			   
			   
			    jQuery("#retainer_paid").change(function () {
					
					let fifty_input_due_1 =  ( Number( totalDueSum ) - Number( jQuery(this).val() ) ) / 2 ;
					jQuery('#fifty_due_1').val( fifty_input_due_1 );
					
					let fifty_input_remaining_1 = Number( totalDueSum ) - Number( jQuery(this).val() ) - fifty_input_due_1;

					jQuery('#fifty_remaining_1').val(fifty_input_remaining_1);
				
			   });
			
			// jQuery(".price_input_sum , #retainer_paid").trigger('change');
		
			 jQuery('input[type="text"]').each(function(i, obj) {
				 jQuery(this).val('');
			});
			
			defaultTax = 0.08375;
			const zipTax = new Proxy(zip_rate, {
				get: function (obj, prop) {
					return obj.hasOwnProperty(prop) ? obj[prop] : defaultTax;
				}
			});
			
			
			jQuery('#add_rooms_chkbox').change(function() {
				if (this.checked) {
					jQuery('#rooms_input_container').show(); // Show the full-width input
				} else {
					jQuery('#rooms_input_container').hide(); // Hide the full-width input
					jQuery('#input_rooms').val('')
				}
			});
						
			
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 
				

			//----------------------   Header ---------------------------

	
				var main_date = jQuery('#main_date').val();
				var delivery_contact = jQuery('#delivery_contact').val();
				var project_email = jQuery('#project_email').val();
				var kitchen_designer = jQuery('#kitchen_designer option:selected').val();


				jQuery('#pdf_main_date').text(main_date);
				jQuery('#pdf_delivery_contact').text(delivery_contact);
				jQuery('#pdf_project_email').text(project_email);
				jQuery('#pdf_kitchen_designer').text(kitchen_designer);
				jQuery('#pdf_main_date').text(main_date);
				
				
				
				var input_rooms = $('#input_rooms').val().trim(); 
				
				if (input_rooms != "") {
					jQuery('#pdf_add_room_div').show();
					jQuery('#pdf_input_rooms').text(input_rooms + " - See plans for specs");
				} else{
					
					jQuery('#pdf_add_room_div').hide();
					jQuery('#pdf_input_rooms').text(' ');
				}
				
				
				//----------------------   Cabinetry ---------------------------
				
				var c_vendor = jQuery('#c_vendor').val();
				var c_doorstyle = jQuery('#c_doorstyle').val();
				var c_finish = jQuery('#c_finish').val();
				var c_species = jQuery('#c_species').val();
				var c_overlay = jQuery('#c_overlay').val();
				var c_box_construction = jQuery('#c_box_construction').val();
				
				
				jQuery('#pdf_c_vendor').text(c_vendor);
				jQuery('#pdf_c_doorstyle').text(c_doorstyle);
				jQuery('#pdf_c_finish').text(c_finish);
				jQuery('#pdf_c_species').text(c_species);
				jQuery('#pdf_c_overlay').text(c_overlay);
				jQuery('#pdf_c_box_construction').text(c_box_construction);
				
				
				var c_box_style = jQuery('#c_box_style').val();
				var c_drawer_box = jQuery('#c_drawer_box').val();
				var c_hardware = jQuery('#c_hardware').val();
				var c_crown_molding = jQuery('#c_crown_molding').val();
				var c_under_cab_light = jQuery('#c_under_cab_light').val();
				var c_countertop = jQuery('#c_countertop').val();
				
				jQuery('#pdf_c_box_style').text(c_box_style);
				jQuery('#pdf_c_drawer_box').text(c_drawer_box);
				jQuery('#pdf_c_hardware').text(c_hardware);
				jQuery('#pdf_c_crown_molding').text(c_crown_molding);
				jQuery('#pdf_c_under_cab_light').text(c_under_cab_light);
				jQuery('#pdf_c_countertop').text(c_countertop);
				
				
				
				//--------------------  Bill To -----------------------------
				
				var b_name_1 = jQuery('#b_name_1').val();
				var b_address_1 = jQuery('#b_address_1').val();
				
				var b_address_city = jQuery('#b_address_city').val();
				var b_address_state = jQuery('#b_address_state').val();
				var b_address_zip = jQuery('#b_address_zip').val();
				
				
				var zip_rate_val = zipTax[b_address_zip];
				console.log(zip_rate_val)
				console.log('zip_rate_val' , b_address_zip , zip_rate_val);
				
				var b_address_2 = b_address_city + ' ' + b_address_state + ' ' + b_address_zip;
				var b_phone_1 = jQuery('#b_phone_1').val();
				
				jQuery('#pdf_b_name_1').text(b_name_1);
				jQuery('#pdf_b_address_1').text(b_address_1);
				jQuery('#pdf_b_address_2').text(b_address_2);
				jQuery('#pdf_b_phone_1').text(b_phone_1);
				
				
				//--------------------  Ship To -----------------------------
				
				var s_address_1 = jQuery('#s_address_1').val();
				var s_address_2 = jQuery('#s_address_2').val();
				var s_name_1 = jQuery('#s_name_1').val();
				var s_phone_1 = jQuery('#s_phone_1').val();
				
				jQuery('#pdf_s_address_1').text(s_address_1);
				jQuery('#pdf_s_address_2').text(s_address_2);
				jQuery('#pdf_s_name_1').text(s_name_1);
				jQuery('#pdf_s_phone_1').text(s_phone_1);
				
				
				
				//--------------------  Calculations -----------------------------
				
				var c_price = Number( jQuery('#c_price').val() );
				var sales_tax_inp = Number( jQuery('#sales_tax option:selected').val() ) / 100;
				if (sales_tax_inp > 0 ) { sales_tax_inp = zip_rate_val} 
				//sales_tax = c_price * sales_tax_inp;

				console.log("c_price" , c_price , "sales_tax_inp" , sales_tax_inp ,  "sales_tax" , sales_tax);

				var delivery = Number( jQuery('#delivery').val() );
				var installation = Number( jQuery('#installation').val() );
				
				var counter_top = Number( jQuery('#counter_top').val() );
				var pulls_knobs = Number( jQuery('#pulls_knobs').val() );
				
				
				sales_tax = round_2_digits( (c_price + counter_top + pulls_knobs ) * sales_tax_inp );
				
				var totalDue = round_2_digits ( c_price + sales_tax + delivery + installation + counter_top + pulls_knobs );
				
				jQuery('#pdf_c_price').text(`$ ${numberWithCommas ( round_2_digits( c_price ) )}`);
				jQuery('#pdf_sales_tax').text( `$ ${numberWithCommas ( round_2_digits( sales_tax ) )}`);
				
				
				delivery = delivery > 0 ? `$ ${numberWithCommas ( round_2_digits( delivery ) )}` : "INCLUDED" ;
				installation = installation > 0 ? `$ ${numberWithCommas ( round_2_digits( installation ) )}` : "N/A" ;
				counter_top = counter_top > 0 ? `$ ${numberWithCommas ( round_2_digits( counter_top ) )}` : "N/A" ;
				pulls_knobs = pulls_knobs > 0 ? `$ ${numberWithCommas ( round_2_digits( pulls_knobs ) )}` : "N/A" ;
				
				
				
				
				jQuery('#pdf_delivery').text(delivery);
				jQuery('#pdf_installation').text(installation);
				
				jQuery('#pdf_counter_top').text(counter_top);
				jQuery('#pdf_pulls_knobs').text(pulls_knobs);
				
				jQuery('#pdf_totalDue').text( `$ ${numberWithCommas ( round_2_digits( totalDue ) )}` );
				
				
				var retainer_paid = Number( jQuery('#retainer_paid').val() );
				//var retainer_paid_date =  jQuery('#retainer_paid_date').val() ;
				
				
				jQuery('#pdf_retainer_paid').text( `$ ${numberWithCommas ( round_2_digits( retainer_paid ) )}` );
				//jQuery('#pdf_retainer_paid_date').text(retainer_paid_date);
				
				var fifty_due_1 = (totalDue - retainer_paid ) / 2;
				fifty_due_1 = fifty_due_1 - (retainer_paid/2)
				//var fifty_due_1_date =  jQuery('#fifty_due_1_date').val() ;
				
				jQuery('#pdf_fifty_due_1').text( `$ ${numberWithCommas ( round_2_digits( fifty_due_1 ) )}` );
				//jQuery('#pdf_fifty_due_1_date').text(fifty_due_1_date);
				
				
				
				var fifty_remaining_1 =  ( round_2_digits( totalDue - retainer_paid - fifty_due_1 ) );
				
				//var fifty_remaining_1_date =  jQuery('#fifty_remaining_1_date').val() ;
				
				jQuery('#pdf_fifty_remaining_1').text( `$ ${numberWithCommas ( round_2_digits( fifty_remaining_1 ) )}`);
				//jQuery('#pdf_fifty_remaining_1_date').text(fifty_remaining_1_date);
				
				var lead_time = jQuery('#lead_time').val();
				jQuery('#pdf_lead_time').text(lead_time);
				
				printJS('editor', 'html');
				//setTimeout( function(){ printPDF_proposal() },1000);
				//setTimeout( function(){ printJS('editor', 'html') },1000);
				/*
					 printJS({
						 printable: 'editor',
    						type: 'html',
						 css: 'https://upgradeny.github.io/Contract-Proposal/css/css_fonts.css',
					 	 font: 'Montserrat' }) ;
	*/
					// )}, 1000);
	
				// printJS('editor', 'html');
				/*
				printJS({
					printable: 'editor',
					type: 'html',
					targetStyles: ['*'],
				 })
				 */
			/*
				printJS({
					printable: 'editor',
					type: 'html',
					css: 'css/style.css',
					scanStyles: false
				  })
				*/				
			});	
			
});
