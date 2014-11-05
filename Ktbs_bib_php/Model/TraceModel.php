<?php

require_once dirname(dirname( __FILE__ ))."/Global.php" ;
require_once $path_RestfulHelper ;
        /* This class is used to Create a Trace Model.*/



class TraceModel {
	
	public $uri = null;
	public $name = null;
	public $label = null;
	public $base_uri = null;
	public $listOfTypes = array();
	

	function __construct(){

		$a = func_get_args();
		$i = func_num_args();

		if(method_exists($this, $f = '__construct'.$i)){

			call_user_func_array(array($this,$f), $a);

		}
	}

	function __construct2($base_uri, $name){

    
		if ($name[strlen($name)-1]=="/"){
			$name[strlen($name)-1] = "";
			$this->name = $name;
		}
		else{
			$this->name = $name;
		}

		if ($base_uri[strlen($base_uri)-1]=="/"){
			$this->base_uri = $base_uri;
		}
		else{
			$this->base_uri = $base_uri."/";
		}
		$this->uri = $this->base_uri.$name;
	}

	function __construct1($uri){

		if ($uri[strlen($uri)-1]=="/"){

			$uri[strlen($uri)-1] = "";
			$this->uri = $uri;
		}
		else{
			$this->uri = $uri;
		}

		$tab = explode('/', $this->uri);
		$n = sizeof($tab);
		$str = $tab[$n-1];
		$base = str_replace($str, '', $uri);

		$this->name = $str;
		$this->base_uri = $base;
	}

	function getUri(){

		return $this->uri;
	}

	function getBaseURi(){

		return $this->base_uri;
	}

	function getName(){

		return $this->name;
	}

	function getBaseName(){

		$tab = explode("/", $this->base_uri);
		return $tab[sizeof($tab)-2]."/";
	}

	function dump(){

		if(!$this->exist()){

		    $prefixes[] = "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.";
		    $prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#>.";	
		
		    $statements[] = "<> :contains <".$this->name.">.";
	        $statements[] = "<".$this->name."> a :TraceModel.";		
		    $statements[] = "<".$this->name."> rdfs:label ".'"'."An example model".'"'." .";		
		
		    $script = 	implode("\n", $prefixes)."\n".implode("\n", $statements);
		    RestfulHelper::post($this->base_uri, $script);	
		}
	}
	
	function exist(){

	    $this->exist = RestfulHelper::get($this->uri);
        return $this->exist;
	}

	function put ($script){

	    RestfulHelper::getEtagAndPut($this->uri, $script);
	}

	function getDefTypes(){

		$res = RestfulHelper::getInfo($this->uri.".ttl");
		$st = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .\n";
		$st = $st."@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n";
		$st = $st."@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n";
		$st = $st."@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n";
		$st = $st."@prefix xml: <http://www.w3.org/XML/1998/namespace> .\n";
		$st = $st."@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n";
		$st = $st."<".$this->base_uri."> :contains <> .\n";
		$res = str_replace($st, "", $res);
		$st = "<> a :TraceModel ;";
		$res = str_replace($st, "", $res);
		$st = ":hasUnit :millisecond .";
		$res = str_replace($st, "", $res);
		return $res;
	}
	
	function getData(){
	
		$res = RestfulHelper::getInfo($this->uri);
		$res = json_decode($res,true);
			
		return json_encode ($res["@graph"]);
	}

	function getListOfTypes(){

		$res = RestfulHelper::getInfo($this->uri);
		$res = json_decode($res,true);
		$def = $res["@graph"];
		$j = 0;
		$supertypes = array();
		for($i=1;$i<sizeof($def);$i++){

			$ty = $def[$i];
			if(in_array('hasSuperObselType', array_keys($ty))){
				foreach ($ty['hasSuperObselType'] as $key => $value) {

					if(!in_array($value, $supertypes)){

						$supertypes[] = $value;
				}
					
					}
					


			}
		}

		for($i=1;$i<sizeof($def);$i++){
			$ty = $def[$i];
			if(strripos($ty["@id"], "/") == false ){
				if(!in_array($ty["@id"], $supertypes)) {
					$this->listOfTypes[$j] = str_replace('#',"",$ty["@id"]);
					$j++;
				}
				

				
			}
			
		}
		return $this->listOfTypes;
	}
}
?>
