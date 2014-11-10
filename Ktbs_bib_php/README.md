KTBS BIB PHP
========

The KTBS_BIB_PHP is a PHP package used to communicate with [KTBS](https://kernel-for-trace-based-systems.readthedocs.org/en/latest/) ( Kernel of Trace Based Systems ) and use almost of its functionality.


It contains essentially 5 classes which are : KtbsRoot, Base, Trace, TraceModel, ComputedTrace.


We will present all these classes in this documents and all of the classes methods.

KtbsRoot
====================== 
This class is used mainly to identify the KTBS using his URI.


Methods :
##### __construct($root_uri):
The constructor for a KtbsRoot Object.
The variable $root_uri is a string variable which contains the URI of the KTBS

##### Bool exist() :

This method verify if the Ktbs exist of not.It returns True if it exist and False if not.

##### Array getListOfBases() :

This method return an Array which contains all existing base in the KTBS.

Base
====================== 
This class is used mainly used to create a base in the Ktbs.


Methods :
##### __construct($base_uri)
##### __construct($root_uri,$name)
The constructor of this class can be called in two manner : 
- with the Base uri as argument ($base_uri) ,
- or with Root uri and the Base name as argument ( $root_uri, $name).

The variables $root_uri, $base_uri and $name are strings variables which contains the URI of
the KTBS , URI of the Base and the Base's name

##### Bool exist()
This method verify if the Base exist of not. It returns True if it exist and False if not.

##### Bool dump()

This method create the base in the KTBS if it doesn't exist before.
It return True if the creation was successful and return False if not.

##### Array getListOfTraces()

This method return an Array which contains all existing Traces in the Base.

##### Array getListOfModels()

This method return an Array which contains all existing Trace Models in the Base.

##### String getUri()

This method return a string which contains the URI of the base.

##### BringTrace( Trace $trace, $model_uri)

This method allow to bring one trace and change it's model
use :
- $Base->bringTrace(Trace_Object,uri_of_new_model) : if you don't want to change the model
- $Base->bringTrace(Trace_Object,Trace_Object->getModel);


##### bringListOfTraces(Array $Traces, $modelname)

This method allow to bring a list of traces in this base and a create a global model for all traces
if the model exists already, it will be updated.
use :
$Base->bringListOfTraces(array_of_Trace_Object,model_Name);

Trace
====================== 

This class is used mainly used to create a Stored Trace in the Ktbs.
Methods :

##### __construct($Trace_uri)
##### __construct($base_uri,$model_uri,$trace_name)

The constructor of this class can be called in two manner : 
  - with the Trace uri as argument ($trace_uri) , 
  - or with Base uri , the model uri and the trace's name as argument ( $base_uri,$model_uri,  $trace_name)
  

The variables $trace_uri, $base_uri,$model_uri, and $trace_name are strings variables which contains the URI of the Trace , URI of the Base , URI of the Model and the Trace's name

##### Bool exist()

This method verify if the trace exist of not.
It returns True if it exist and False if not.

##### dump()

This method create the Trace in the KTBS if it doesn't exist before.
#####  Delete()

This method delete the Trace from KTBS.

#####  Array getObsels()
This method return an Array which contains Obsels of the Trace.

##### Array getLIstOfTypes()
This method return an Array which contains all the Obsels's types existing in the trace.

#####  String getUri()

This method return a string which contains the URI of the Trace.

##### String getModel()
This method return a string which contains the Model's URI of the Trace.

##### String getOrigin()
This method return a string which contains the origin date of the Trace.

##### String getBaseURI()
this method return a string which contains the Base's URI where the Trace is.

##### String getBaseName()
This method return a string which contains the Base's name where the Trace is.

#####  Array getIsSOurce
This method return an Array which contains all the computed traces names which are created
using this trace.

This method brings you the result only if the Object is created using the Trace_Uri.

Creating the Trace object with the base URI , model URI and the trace name argument is mainly used to create a
non exiting trace.

#####  setNewModel($newmodeluri)

This method allows to set a new model to the trace ( delete the old one and replace it with the
new one ). $newmodeluri is a string variable which contains the new Model's URI.
A computed trace is a Trace cre


TraceModel
====================== 

This class is used mainly to create a Trace model.
Methods :
#####   __construct($base_uri, $name)
#####  __construct($model_uri)
The constructor of this class can be called in 2 manner.
$base_uri, $name and $model_uri are string variable which contains the Base'uri , name of the model
and model's RUI.

#####  Bool exist()
this method verify if the model exists of not.
It returns True if it exist and False if not.

#####  dump()
this method create the Model in the Base if it doesn't exist before.
#####  Delete()
this method delete the Model from KTBS.
#####  String getUri()
this method return a string which contains the URI of the Model.
#####  String getBaseURi()
this method return a string which contains the Base's URI where the Model is.
#####  String getName()
this method return a string which contains the Model's name.
#####  String getBaseName()
this method return a string which contains the Base's name where the Model is.
#####  Array getLIstOfTypes()
this method return an Array which contains all the types existing in the Model.
#####  put($script)
this method updates the model.
#####  $script is a string variable which contains the types definitions and relations between them.
The definition of types and relations is written in turtle.
This method is used mainly by the class GenerateModel which generate the model of a trace from the trace itself.


ComputedTrace
====================== 



