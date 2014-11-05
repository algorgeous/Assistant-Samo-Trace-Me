<?php
    require_once dirname (dirname(dirname(dirname( __FILE__ ))))."/Global.php" ;
    require_once $path_Trace;
    require_once $path_ComputedTrace;
    require_once $path_TraceModel;
    require_once $path_GenerateModel;
    require_once $path_CreateComputedTrace;
    require_once $path_gestion_indicateur;

    
	

	class Indicator_Manager{

		// public $user = null;
		// public $indicatorDB = null;
		// public $BaseUri = null;
		// public $trace = null;

		function __construct($trace_uri){
			$trace = new Trace($trace_uri);
			$user = $trace->getBaseName();

			$this->BaseUri = $trace->getBaseUri();

			$this->user = $user;
			$this->trace = $trace;

			$system = new MongoClient();

			// sélection d'une base de données
			$database = $system->ManagmentSystem;

			// sélectionne une collection (analogue à une table de base de données relationnelle)
			$this->indicatorDB = $database->indicator;
			$this->history = $database->history;
		}

		function addHistory($name , $value){

			$data = array("_id" => uniqid(),'owner' => $this->user,"date" => $this->getTime(),"Name" => $name , "value" =>$value);

			$this->history->insert($data);
		}

		function getHistory($name){


			$cursor = $this->history->find(array("Name" => $name, "owner" => $this->user));

			$res = array();

			foreach ($cursor as $document){

			   $res[] =  array($document["date"] => intval($document["value"]));
			}

			return $res;
		}

		function getHistoryTD($name){


			$cursor = $this->history->find(array("Name" => $name, "owner" => $this->user));

			$res = array();

			foreach ($cursor as $document){

			   $res[] =  array("x" => strtotime($document["date"]), "y" => intval($document["value"]));
			}

			return $res;
		}

		function showall(){

			$cursor = $this->indicatorDB->find();
			$res = array();

			foreach ($cursor as $document){

			   $res[] =  $document;
			}

			return $res;
		}

		function cleanDB(){

			$this->indicatorDB->remove();
		}

		function getID($name){

			$ex = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $name));
			$res =  array('ID' => $ex['_id']);
			return $res;
		}

		function addIndicator($ind){

			/* check out if $ind is an indicator */
			/* discussion about necessairy attributes of $ind and optional ones */


			$ex = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $ind['Name']));
			if($ex == null){
				$ind["_id"] = uniqid();
				$ind["createdOn"] = $this->getTime();
				$ind["owner"] = $this->user;
				$this->indicatorDB->insert($ind);

				return true;
			}

			else{

				return false;
			}
		}

		function deleteall(){

			$names = $this->list_Names();
			foreach ($names as $key => $value) {
				$this->deleteIndicator($value);
			}
		}

		function deleteIndicator($name){


			$res = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $name));

			if($res != null){

				$transformation = $res["Transformation"];
				$s = sizeof($transformation) -1 ;
				for ($i=$s; $i>=0  ; $i--) { 
					$tname = str_replace(' ', '_', $name." $i");

					$t = new Trace($this->BaseUri.$tname);
					if($t->exist()){

						$t->Delete();
					}
					
				}

				$this->indicatorDB->remove(array('owner' => $this->user,'Name' => $name));
			}



			
			$res = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $name));
			if($res == null){

				return true;
			}
			else{

				return false;
			}
		}

		function updateIndicator($name, array $updata){

			$this->indicatorDB->update(array('Name' => $name), array('$set' => $updata));
		}

		function getIndicators(){

			$cursor = $this->indicatorDB->find(array('owner' => $this->user));
			$res = array();

			foreach ($cursor as $document){

			   $res[] =  $document;
			}

			return $res;
		}

		function getIndicator($name){

			$res = $this->indicatorDB->findOne(array('Name' => $name, 'owner' => $this->user));

			return $res;
		}

		function sendIndicatorTo($user,$name){ 

			/* This method allow the shearing of indicator between users :) */ 

			$owner = $this->indicatorDB->findOne(array('owner' => $user));
			$ind = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $name));

			if($owner != null && $ind != null){

				$ind['_id'] = uniqid();
				$ind['Name'] = $user;
				$this->indicatorDB->insert($ind);
			}
		}

		function getTime(){

			$datetime = new DateTime();
			$m = explode(' ',microtime());		
			$microSeconds = $m[0];
			$milliSeconds = (int)round($microSeconds*1000,3);
			$seconds = $m[1];
			$datetime->setTimezone(new DateTimeZone('UTC'));
			$now = $datetime->format('Y-m-d')."T".$datetime->format('H:i:s').".".str_pad($milliSeconds,3,"0",STR_PAD_LEFT)."Z";
			return $now;	
		}	

		function list_Names(){

			$cursor = $this->indicatorDB->find(array('owner' => $this->user));
			$res = array();

			foreach ($cursor as $document){
				if($document['Name'] != null){

					$res[] =  $document['Name'];
				}
			   
			}

			return $res;
		}

		function addFromStore($ind){

            
			$input = $ind["input"];
			$newInput = array();
			foreach ($input as $key => $value) {
				
				$sparql = $value['operation'];

				$s = urldecode($sparql);

				$value["operation"] = urlencode(str_replace('MODELREPLACE', $this->trace->getModel(), $s)); 

				$newInput[] = $value;


			}

			$ind["input"] = $newInput;

			$v = $ind['owner'];
//fatma
        $T = $ind["Transformation"];
        $name = $ind["Name"];
        $b = $this->trace->getBaseUri();
        $i = 0;
        if (!empty ($T))
		{
		foreach ($T as $key => $value) {
			$tname = str_replace(' ', '_', $name." $i");
			$value["ComputedTraceURI"] = $b.$tname;
			$T[$key] = $value;
			$i++;
		}
		}

		$ind["Transformation"]=	$T;
		

			// $this->addIndicator($ind);

			$ex = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $ind['Name']));
			if($ex == null){
				$ind['owner'] = $this->user;

				$ind['from'] = $v;
				
				
				$ind["_id"] = uniqid();
				$this->indicatorDB->insert($ind);

				return array('Mess' => 'Download Success');
			}

			else{

				return array('Mess' => 'You have it already');
			}


		}

		function getusername(){

			return $this->user;
		}


		function getIndicatorForView($name){


			$ind = $this->indicatorDB->findOne(array('Name' => $name, 'owner' => $this->user));

			unset($ind['_id']);
			unset($ind['owner']);
			unset($ind['oldId']);
			unset($ind['from']);
			unset($ind['createdOn']);

			$input = $ind["input"];
			$newInput = array();
			foreach ($input as $key => $value) {
				
				$sparql = $value['operation'];

				$s = urldecode($sparql);

				$value["operation"] = htmlentities($s); 

				$newInput[] = $value;


			}

			$ind["input"] = $newInput;



			return $ind;

		}

		function exist($name){

			$ex = $this->indicatorDB->findOne(array('owner' => $this->user,'Name' => $name));
			if($ex == null){

				return false;
			}
			else{

				return true;
			}

		}
	}


function test(){



	// $ind =  new Indicator_Manager('http://localhost:8001/Nice1/t03/');

	// $a = $ind->getIndicatorForView('Recherche Google');

	// $myFile = "testFile.json";
	// $fh = fopen($myFile, 'w') or die("can't open file");
	// fwrite($fh, json_encode($a));
	// fclose($fh);

	

}
// test();

?>
