
$(document).ready (function () {

	list_indicators();
})

function LoadBalance(){
	// document.getElementById("LISTIND").innerHTML="";
	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("gest").innerHTML="";


	document.getElementById("B").innerHTML="";
	document.getElementById("C").innerHTML="";
	$('#B').load('Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/balance.html');

		$.ajax({
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/calculind.php",
			data : {
				reason : "types",
				trace : URL
			},
			success : function(response,status){
				var myJson = JSON.parse(JSON.stringify(response));
				// alert(myJson);
				var obj = eval("("+ myJson +")");
				for (var i = obj.length - 1; i >= 0; i--) {
					$('#typea').append('<option>'+obj[i]+'</option>')
					$('#typeb').append('<option>'+obj[i]+'</option>')
				};
			}
		})

}
function LoadClassification(){
	// document.getElementById("LISTIND").innerHTML="";
	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("gest").innerHTML="";

	document.getElementById("C").innerHTML="";
	document.getElementById("B").innerHTML="";
	$('#C').load('Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/classi.html');

}

function balance (){
	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("gest").innerHTML="";
	if ($('#typea').val() != $('#typeb').val()) {
		$.ajax(
			{
				beforeSend: function() {
                $("#waiting").show()
            },
            complete: function() {
                 $("#waiting").hide()
            },
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/calculind.php",
			data : {
				indicator : "balance",
				typeA : $('#typea').val(),
				typeB : $('#typeb').val(),
				trace : URL
			},
			success : function(response,status){
				var myJson = JSON.parse(JSON.stringify(response));
				var obj = eval("("+ myJson +")");
				$('#rep-Ind1').append('<center>');
				drowGauge('#rep-Ind1', obj.val, $('#typeb').val(), $('#typea').val());
				console.log(obj);
				$('#rep-Ind1').append('</center>');
			}
		})
	};
	if ($('#typea').val() == $('#typeb').val()) {
		alert("types must be different!");
	};

	

}



function classification(){
	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("B").innerHTML="";
	// document.getElementById("LISTIND").innerHTML="";
		document.getElementById("gest").innerHTML="";

	$.ajax(
		{
				beforeSend: function() {
                $("#waiting").show()
            },
            complete: function() {
                 $("#waiting").hide()
            },
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/calculind.php",
		data : {
			indicator : "classification",
			typeA : $('#typea').val(),
			typeB : $('#typeb').val(),
			trace : URL
		},
		success : function(response,status){

			
			var obj = eval("("+ response +")");
			var max = 0 
			for (var i = 0; i < obj.length; i++) {
				var k = obj[i];
				max = max + k.val;
			};
			
	drowBars('#rep-Ind1' ,obj,max);

}
	})
}

function list_indicators(){


	document.getElementById("B").innerHTML="";
	document.getElementById("C").innerHTML="";
	document.getElementById("LISTIND").innerHTML="";
	document.getElementById("listBOind").innerHTML="";
	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("gest").innerHTML="";
	// $('#B').load('balance.html');

		$.ajax({
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
			data : {
				reason : "list",
				trace : URL
			},
			success : function(response,status){
				var myJson = JSON.parse(JSON.stringify(response));
				//alert(myJson);
				var obj = eval("("+ myJson +")");
				//alert(obj);

				console.log(obj);
				for (var i = obj.length - 1; i >= 0; i--) {
					var k = obj[i];
					$('#LISTIND').append('<li class="active"><a href="#'+k['Name']+'" class="btn" onclick="drowind('+"'"+k['Name']+"'"+')">'+k['Name']+' </a></li>')
					$('#listBOind').append('<li class="active" ><a href="#'+k['Name']+'" class="btn" onclick="show('+"'"+k['Name']+"'"+')">'+k['Name']+' </a></li>')

				};

			}
		})

}



function drowind(name){

	document.getElementById("rep-Ind1").innerHTML="";
	document.getElementById("B").innerHTML="";
	document.getElementById("C").innerHTML="";
	

	$.ajax({
		beforeSend: function() {
    	$("#waiting").show()
        },
        complete: function() {
             $("#waiting").hide()
        },
				
		type : "POST",
		url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
		data : {
			reason : "getin",
			nameind : name,
			trace : URL
		},
		success : function(response,status){
			document.getElementById("rep-Ind1").innerHTML="";
			var myJson = JSON.parse(JSON.stringify(response));
			//alert(myJson);
			var obj = eval("("+ myJson +")");
			//alert(obj);
			//console.log(obj);
			
			$('#rep-Ind1').append('<center><div id="res"><h1>'+obj['val']+'</h1></div></center>')
			document.getElementById("gest").innerHTML="";
			// $('#gest').append('after: <input type="date" name="bday" id="hel" placeholder="dd-mm-yyy [hh:mm:ss]"> <br> before <input type="date" name="bday" placeholder="dd-mm-yyy [hh:mm:ss]">');

			$('#gest').append('<dl>');
			$('#gest').append('<dt>After</dt>');
			$('#gest').append('<dd><input type="date" name="bday" id="after" placeholder="dd/mm/yyyy"></dd> ');
			$('#gest').append('<dt>Before</dt>');
			$('#gest').append('<dd><input type="date" name="bday" id="before" placeholder="dd/mm/yyyy"></dd>');


			$('#gest').append('</dl> <br><br>');
			$('#gest').append('<button type="button" class="btn btn-sm btn-success btn-block"  onclick="refresh_ind('+"'"+name+"'"+')">Refresh</button>');
			$('#gest').append('<button type="button" class="btn btn-sm btn-danger btn-block"  onclick="deleteIndicator('+"'"+name+"'"+')">Delete</button>');
			// $('#gest').append(' <button type="button" class="btn btn-sm btn-block btn-warning disabled ">Update</button>');
			$('#gest').append('<button type="button" class="btn btn-sm btn-block btn-default" onclick="share('+"'"+name+"'"+')" >Share</button>');

							$.ajax({					
					type : "POST",
					url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
					data : {
						reason : "getInfo",
						nameind : name,
						trace : URL
					},
					success : function(response,status){
						
						var myJson = JSON.parse(JSON.stringify(response));
						//alert(myJson);
						var obj = eval("("+ myJson +")");
						//alert(obj);
						//console.log(obj);
						
						

		  
						// console.log(obj['Description']);
						$('#gest').append('<dl>');
						$('#gest').append('<dt>Name</dt>');
						$('#gest').append('<dd>'+obj['Name']+'</dd>');
						$('#gest').append('<dt>Author</dt>');
						$('#gest').append('<dd>'+obj['Author']+'</dd>');
						$('#gest').append('<dt>Description</dt>');
						$('#gest').append('<dd>'+obj['Description']+'</dd>');


						$('#gest').append('</dl>');
						
						
					}	
				})
			



			// console.log(response);
			
		
		}
	})

			
	
}

function refresh_ind(name){

	if(Date.parse($('#after').val())<Date.parse($('#before').val())){
		document.getElementById("rep-Ind1").innerHTML="";
	

		$.ajax({
			beforeSend: function() {
	    	$("#waiting").show()
	        },
	        complete: function() {
	             $("#waiting").hide()
	        },
					
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
			data : {
				reason : "refresh",
				before : $('#before').val(),
				after : $('#after').val(),
				nameind : name,
				trace : URL
			},
			success : function(response,status){
				document.getElementById("rep-Ind1").innerHTML="";
				var myJson = JSON.parse(JSON.stringify(response));
				//alert(myJson);
				var obj = eval("("+ myJson +")");
				//alert(obj);
				//console.log(obj);
				
				$('#rep-Ind1').append('<center><div id="res"><h1>'+obj['val']+'</h1></div></center>')
				


				// console.log(response);
				
			
			}
		})
	}
	else{

		alert("Before date must be up to after date");
	}



}

function share(name){

	$.ajax({
				beforeSend: function() {
                $("#waiting").show()
            },
            complete: function() {
                 $("#waiting").hide()
            },
					
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
			data : {
				reason : "share",
				nameind : name,
				trace : URL
			},
			success : function(response,status){
				var myJson = JSON.parse(JSON.stringify(response));
				var obj = eval("("+ myJson +")");
				console.log(obj);

				alert(obj.Mess);
				
				
			}
		})

}


function deleteIndicator(name){

	$.ajax({
				beforeSend: function() {
                $("#waiting").show()
            },
            complete: function() {
                 $("#waiting").hide()
            },
					
			type : "POST",
			url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
			data : {
				reason : "deleteInd",
				nameind : name,
				trace : URL
			},
			success : function(response,status){
				document.getElementById("rep-Ind1").innerHTML="";
				document.getElementById("gest").innerHTML="";
				list_indicators();
				
				
			}
		})



}

