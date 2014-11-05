<?php 
    require_once dirname (dirname(dirname(dirname( __FILE__ ))))."/Global.php" ;
require_once $path_Moteur_de_Calcul;
//require_once dirname( __FILE__ )."/gestion_indicateur.php";
 

if (isset($_POST['reason'])) {
    if($_POST['reason'] == 'types'){


	$trace = new Trace($_POST['trace']);

	$types = $trace->getListOfTypes();
	
	$res = json_encode($types);
	echo $res;
}
}

if (isset($_POST['indicator'])){
 if($_POST['indicator'] == 'balance' ){
 	//$trace = new Trace($_POST['trace']);
 	//$user = $trace->getBaseName();
	//$manager = new Indicator_Manager($user);
 	$Ind = new Indicator($_POST['trace']);
 	$tA = str_replace(' ', '', $_POST['typeA']);
 	$tB = str_replace(' ', '', $_POST['typeB']);
	$TypeObsel = array($tA,$tB);
	if ((isset($_POST['after'])) && (isset($_POST['before'])))
	{$res = json_encode($Ind->balance($_POST['after'],$_POST['before'],$TypeObsel));}
	else 
	$res = json_encode($Ind->balance(null,null,$TypeObsel));

	echo $res;

 }
 }
if (isset($_POST['indicator'])){
 if($_POST['indicator'] == 'classification'){

 	if (isset($_POST['trace'])) {$Ind = new Indicator($_POST['trace']);}
if ((isset($_POST['after'])) && (isset($_POST['before'])))
	{$res = json_encode($Ind->classification($_POST['after'],$_POST['before']));}
else 
    $res = json_encode($Ind->classification(null,null));
	echo $res;
}
}


 

?>
