<?php

require_once dirname(dirname( __FILE__ ))."/Global.php" ;
require_once $path_RestfulHelper ;
         /* This class is used to Create a new base in the ktbs root.*/
class Base{

	public $Base_name = null;
	public $uri = null;
	public $root = null;
	public $listOfTrace = array();
	public $listOfModel = array();

	function __construct(){

		$a = func_get_args();
		$i = func_num_args();

		if(method_exists($this, $f = '__construct'.$i)){

			call_user_func_array(array($this,$f), $a);

		}
	}

	function __construct2($root,$name){
	    if($name[strlen($name)-1] == "/")
		{
			$this->Base_name = $name;
		}
		else {
			$this->Base_name = $name."/";
		}

		$this->root = $root;

		$this->uri = $this->root.$this->Base_name;
	}

	function __construct1($uri){
		if($uri[strlen($uri)-1] == "/"){
			$this->uri = $uri;
		}
		else{
			$uri = $uri."/";
			$this->uri = $uri;
		}
		if($this->exist()){
			$tab = explode('/', $uri);
			$this->Base_name = $tab[sizeof($tab)-2]."/";
			$this->root = str_replace($this->Base_name, "", $uri);
		}
	}

	function exist(){
        
        $this->exist = RestfulHelper::get($this->uri);
		return $this->exist;
	}
	
	function dump(){
		/* this method create the base if it is new */

		if (!$this->exist()){

			$prefixes[] = "@prefix ktbs: <http://liris.cnrs.fr/silex/2009/ktbs#>.";
			$prefixes[] = "@prefix owl: <http://www.w3.org/2002/07/owl#>.";
			$prefixes[] = "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.";
			$prefixes[] = "@prefix rdfrest: <http://liris.cnrs.fr/silex/2009/rdfrest#>.";
			$prefixes[] = "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.";
			$prefixes[] = "@prefix xml: <http://www.w3.org/XML/1998/namespace>.";
			$prefixes[] = "@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.";
					
			$statements[] = "<> ktbs:hasBase <".$this->Base_name."> .";
			$statements[] = "<".$this->Base_name."> a ktbs:Base .";		
			$statements[] = "<".$this->Base_name."> rdfs:label ".'"'."Transform base".'"'." .";		
			
			$script = 	implode("\n", $prefixes)."\n".implode("\n", $statements);
			
			$req = RestfulHelper::post($this->root, $script);
			if($req == true){

				return true;

			}
			else{

				return false;

			}	
		}

		else{

			return false;

		}
	}

	function getListOfTraces(){
		/*This method return the list of traces in this base.*/
		$listOfTrace = array();
		if ($this->exist() == true){
			$responce = RestfulHelper::getInfo($this->uri);
			$json_responce = json_decode($responce,true);
			$contains = $json_responce['contains'];
			foreach (array_keys($contains) as $key) {
				$val = $contains[$key]["@id"];
				$val = str_replace('./', '', $val);
				if ($val[strlen($val)-1] == '/') {
					$listOfTrace[] = $val;
				}
			}
			$this->listOfTrace = $listOfTrace;
			return $this->listOfTrace;
		}
		else{
			return false;
		}
	}

	function getListOfModels(){
		/*This method return the list of models in this base.*/

		$listOfModel = array();
		if ($this->exist() == true){
			$responce = RestfulHelper::getInfo($this->uri);
			$json_responce = json_decode($responce,true);
			$contains = $json_responce['contains'];
			foreach (array_keys($contains) as $key) {
				$val = $contains[$key]["@id"];
				$val = str_replace('./', '', $val);
				if ($val[strlen($val)-1] != '/') {
					$listOfModel[] = $val;
				}
			}
			$this->listOfModel = $listOfModel;
			return $this->listOfModel;
		}
		else{

			return false;
		}
	}

	function getUri(){

		return $this->uri;
	}

	function bringTrace($trace,$model_uri){
		/*This method allow to bring one trace and change it's model
		use : 
		$Base->bringTrace(Trace_Object,uri_of_new_model);
		if you don't want to change the model 
		$Base->bringTrace(Trace_Object,Trace_Object->getModel);*/

		if(is_object($trace) && get_class($trace) == "Trace"){

			$Tr = new Trace($this->uri,$model_uri,"From_".$trace->getBaseName()."_".$trace->getName());
			$Tr->dump();
			$t = $Tr->getUri();
			$obs = $trace->getObsel();
			RestfulHelper::json_post($t,json_encode($obs));
			$Tr->setNewOrigin($trace->getOrigin());
			$Tr->setNewModel($model_uri);

		}
	}

	function bringListOfTraces($Traces,$modelname){
		/* This method allow to bring a list of traces in this base and a create a global model for all traces
		if the model exists already, it will be updated. 
		use : 
			$Base->bringListOfTraces(array_of_Trace_Object,model_Name);
		 */

		$model = new TraceModel($this->uri,$modelname);
		if ($model->exist()){

			$s = $model->getDefTypes();
		}
		else{

			$model->dump();
			$s = "";	
		}
		 
		if(is_array($Traces)){

			foreach ($Traces as $trace) {
			$rrr = $trace->getModel();
			$m = new TraceModel($rrr);
			$s = $s.$m->getDefTypes();

			}
		}
		$prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";  
		$prefixes[] = "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .";
		$prefixes[] = "@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .";
		$statements[] = "<".$this->uri."> :contains <> .";
		$statements[] = "<> a :TraceModel .";
		$script =   implode("\n", $prefixes)."\n".implode("\n", $statements)."\n".$s;
		$model->put($script);
		$model_uri = $model->getUri();
		if(is_array($Traces)){

			foreach ($Traces as $trace) {
			$this->bringTrace($trace,$model_uri);
			}
		}
	}
}
?>