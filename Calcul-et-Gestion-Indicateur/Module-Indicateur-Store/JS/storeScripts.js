
$(document).ready (function () {

	refresh();
})


$('#SearchBy').on("change",function(){console.log($('#SearchBy').val())})



function refresh(){

	$.ajax({
		beforeSend: function() {
    	$("#waiting").show()
    	},
          complete: function() {
             $("#waiting").hide()
        },
				
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/PHP/interact.php",
		data : {
			reason : "listall",
			trace : URL
		},
		success : function(response,status){
			document.getElementById("whereToList").innerHTML="";
			document.getElementById("thead").innerHTML="";

			var myJson = JSON.parse(JSON.stringify(response));
				var obj = eval("("+ myJson +")");

				$("#thead").append('<tr><th>#</th><th>Indicator Name</th><th>Description</th><th>Author</th><th>Action</th></tr>');
				var ax = URL.split('/');
				var rang = ax.length -3 ; 
				var user = ax[rang];

				for (var i = 0; i <= obj.length - 1; i++) {
					var k = obj[i];
					var x = i+1;
					// $("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td></tr>');
					// $("#whereToList").append('<td>'+x+'</td>');
					// $("#whereToList").append('<td>'+k['Name']+'</td>');
					// $("#whereToList").append('<td>'+k['Description']+'</td>');
					// $("#whereToList").append('<td>'+k['Author']+'</td>');
					// $("#whereToList").append('<td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td>');
					if (k['got'] == 'no') {
						if(k['owner'] == user){
							$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td><td><button type="button" class="btn btn-xs btn-danger"  onclick="deleteFromStore('+"'"+k['_id']+"'"+')">Delete</button></td></tr>');
						}
						else{
							$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td></tr>');
						}
					}
					else{

						if(k['owner'] == user){
						$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-success disabled" >Got</button></td><td><button type="button" class="btn btn-xs btn-danger"  onclick="deleteFromStore('+"'"+k['_id']+"'"+')">Delete</button></td></tr>');
					}
					else{
						$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-success disabled" >Got</button></td></tr>');
					}
					}
					// $("#whereToList").append('</tr>');
					
				};		
		}
	})

	

						
						
}



$('#Lbutton').on("click",function(){refresh();})

$('#Sbutton').on("click",function(){

			$.ajax({
					beforeSend: function() {
			    	$("#waiting").show()
			    	},
			          complete: function() {
			             $("#waiting").hide()
			        },
							
					type : "POST",
					url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/PHP/interact.php",
					data : {
						reason : "search",
						field : $('#SearchBy').val(),
						Key : $('#searchind').val(),
						trace : URL
					},
					success : function(response,status){
						document.getElementById("whereToList").innerHTML="";
						document.getElementById("thead").innerHTML="";

						var myJson = JSON.parse(JSON.stringify(response));
							var obj = eval("("+ myJson +")");

							$("#thead").append('<tr><th>#</th><th>Indicator Name</th><th>Description</th><th>Author</th><th>Action</th></tr>');
							var ax = URL.split('/');
							var rang = ax.length -3 ; 
							var user = ax[rang];

							for (var i = 0; i <= obj.length - 1; i++) {
								var k = obj[i];
								var x = i+1;
								
								if(k['owner'] == user){
									$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td><td><button type="button" class="btn btn-xs btn-danger"  onclick="deleteFromStore('+"'"+k['_id']+"'"+')">Delete</button></td></tr>');
								}
								else{
									$("#whereToList").append('<tr><td>'+x+'</td><td>'+k['Name']+'</td><td>'+k['Description']+'</td><td>'+k['Author']+'</td><td><button id="modal-579093" href="#modal-container-579093" role="button" class="btn btn-xs" data-toggle="modal" onclick="showIndStore('+"'"+k['_id']+"'"+')">Show</button></td><td><button type="button" class="btn btn-xs btn-info"  onclick="getIndicator('+"'"+k['_id']+"'"+')">Get it</button></td></tr>');
								}

								
							};		
					}
				})

})


function deleteFromStore(idin){

	$.ajax({
		beforeSend: function() {
    	$("#waiting").show()
    	},
          complete: function() {
             $("#waiting").hide()
        },
				
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/PHP/interact.php",
		data : {
			reason : "deletefromstore",
			id : idin,
			trace : URL
		},
		success : function(response,status){
			refresh();
			
		
		}
	})

}

function showIndStore(idin){

		$.ajax({		
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/PHP/interact.php",
		data : {
			reason : "getToShow",
			id : idin,
			trace : URL
		},
		success : function(response,status){
			
			var myJson = JSON.parse(JSON.stringify(response));
			var obj = eval("("+ myJson +")");

			document.getElementById("indTitle").innerHTML="";
			$('#indTitle').append(obj['Name'])
			$.ajax({
            // beforeSend: function() {
            // $("#waiting").show()
            // },
            // complete: function() {
            // $("#waiting").hide()
            // },
                 type: 'POST',
                 url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/jsonviewer.php',
                 data: {data : JSON.stringify(obj)  },
                 success : function(data){
                        
                 	        $("#viewJson").html(data);
                            $("img.arrow").click(function(){
	                            if ($(this).attr('src') == "images/arrow.png") {
	                  			  	$(this).parent().find("ul:first").toggle();
	                            }
	           					$("html").animate({scrollTop: $(this).offset().top - 10 + 'px'}, { duration: 300});
               
       					 	});

            		$("#root, #first").show();
            	}	
            })
		
		}
	})

}


function getIndicator(idin){

		$.ajax({
		beforeSend: function() {
    	$("#waiting").show()
    	},
          complete: function() {
             $("#waiting").hide()
        },
				
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/PHP/interact.php",
		data : {
			reason : "getStore",
			id : idin,
			trace : URL
		},
		success : function(response,status){
			
			var myJson = JSON.parse(JSON.stringify(response));
			var obj = eval("("+ myJson +")");

			alert(obj.Mess);
		
		}
	})

}