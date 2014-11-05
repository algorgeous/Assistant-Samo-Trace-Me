<?php
 require_once dirname(dirname( __FILE__ ))."/Global.php" ;
 require_once $path_RestfulHelper ;
// require_once DateTime ;
 //require_once DateTimeZone;
        /* This class is used to Create a Stored Trace.*/

class Trace{

	public $base_uri = null;
	public $model_uri = null;
	public $name = null;	
	public $hasOrigin = null;
	public $uri = null ;
	public $sourceOf = array();
	public $type = null;

	function __construct(){

		$a = func_get_args();
		$i = func_num_args();

		if(method_exists($this, $f = '__construct'.$i)){

			call_user_func_array(array($this,$f), $a);

		}
	}

	function __construct1($uri){

		if($uri[strlen($uri)-1] == "/")
		{

			$this->uri = $uri;

		}
		else {

			$uri = $uri."/";
			$this->uri = $uri;

		}

		if($this->exist()){

			$tab = explode('/', $this->uri);
			$n = sizeof($tab);
			$str = $tab[$n-2].'/';
			$base = str_replace($str, '', $uri);
			$this->name = $str;
			$this->base_uri = $base;

			$reponse = RestfulHelper::getInfo($this->uri);
			
	        if ($reponse){

		        $obj= json_decode($reponse,true) ;
		        $ModelURL = $obj['hasModel'];
		        $this->type = $obj["@type"];
		        $ModelURL = str_replace('../', '', $ModelURL);
		        $this->model_uri = $this->base_uri.$ModelURL;
		        $this->hasOrigin = $obj['origin'];

		        if(array_key_exists("isSourceOf", $obj)){

		        	$source = $obj['isSourceOf'];

			        for ($i=0; $i <sizeof($source) ; $i++) { 

			        	$source[$i] = str_replace('../', '', $source[$i]);
		        	}

		        	$this->sourceOf = $source;
		        }
		        

			}

		}
		else{

			return "Trace ".$this->uri." don't exist";
		}
	}

	function __construct3($base_uri,$model_uri,$trace_name){

		if($base_uri[strlen($base_uri)-1] == "/"){

			$this->base_uri = $base_uri;
		}
		else {

			$this->base_uri = $base_uri."/";
		}

		$this->hasOrigin = $this->getTime();

		if($trace_name[strlen($trace_name)-1] == "/"){

			$this->name = $trace_name;
		}
		else{

			$this->name = $trace_name."/";
		}

		$this->uri = $this->base_uri.$this->name ;

		$this->hasOrigin = $this->getTime();

		if ($model_uri[strlen($model_uri)-1]=="/"){

			$model_uri[strlen($model_uri)-1] = "";
			$this->model_uri = $model_uri;
		}
		else{
			$this->model_uri = $model_uri;
		}

		$this->type = "StoredTrace"; 
	}

	function getLIstOfTypes(){

		$mo = new TraceModel($this->model_uri);
		return $mo->getLIstOfTypes();
	}
	
	function exist(){
	    $this->exist = RestfulHelper::get($this->uri);
        return $this->exist;
	}

	function getObsels(){

		$reponse = RestfulHelper::getInfo($this->uri."@obsels");
        if ($reponse){
        $ob =json_decode($reponse,true);
        $obsels = $ob['obsels'];
        return $obsels;
    	}

	}

	function dump(){

		if(!$this->exist()){

			$prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";				
			
			$statements[] = "<> :contains <".$this->name."> .";
			$statements[] = "<".$this->name."> a :StoredTrace .";
			$statements[] = "<".$this->name."> :hasModel <".$this->model_uri."> .";		
			$statements[] = "<".$this->name."> :hasOrigin ".'"'.$this->hasOrigin.'"'." .";
			$statements[] = "<".$this->name."> :hasDefaultSubject ".'"'."trace for activity".'"'." .";
				
			$this->script = implode("\n", $prefixes)."\n".implode("\n", $statements);
			
			$this->result = RestfulHelper::post($this->base_uri, $this->script);
		}
	}

	function Delete(){

	 $reponse = RestfulHelper::getInfo($this->uri);
        RestfulHelper::Delete($this->uri,$reponse);
	}

	function getModel (){

        return $this->model_uri;
	}

	function getOrigin(){

	    return $this->hasOrigin;
	}

	function getBaseURI (){

	    return $this->base_uri;
	}

	function getBaseName(){

		$tab = explode("/", $this->base_uri);
		return $tab[sizeof($tab)-2];
	}

	function getName(){

		return $this->name;
	}

	function getUri(){

		return $this->uri;
	}

	function getIsSOurceOf(){

		return $this->sourceOf;
	}

	function getType(){

		return $this->type;
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

	function setNewModel($newmodeluri){

		if ($newmodeluri[strlen($newmodeluri)-1]=="/"){

			$newmodeluri[strlen($newmodeluri)-1] = "";
			$this->model_uri = $newmodeluri;
		}
		else{
			$this->model_uri = $newmodeluri;
		}

		$reponse = RestfulHelper::getInfo($this->uri);
		$obj= json_decode($reponse,true) ;
		$obj['hasModel'] = $this->model_uri;
		$query = json_encode($obj);
		RestfulHelper::json_getEtagAndPut($this->uri,$query);
	}

	function setNewOrigin($newOrigin){

		/*  Verify the format of the time */
		$this->hasOrigin = $newOrigin;
		$reponse = RestfulHelper::getInfo($this->uri);
		$obj= json_decode($reponse,true) ;
		$obj['origin'] = $this->hasOrigin;
		$query = json_encode($obj);
		RestfulHelper::json_getEtagAndPut($this->uri,$query);
	}
}


?>