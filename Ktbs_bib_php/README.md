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
The constructor of this class can be called in two manner : with the Base uri as argument
($base_uri) , or with Root uri and the Base name as argument ( $root_uri, $name).
The variables $root_uri, $base_uri and $name are strings variables which contains the URI of
the KTBS , URI of the Base and the Base's name

##### Bool exist()
This method verify if the Base exist of not. It returns True if it exist and False if not.

##### Bool dump()

this method create the base in the KTBS if it doesn't exist before.
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
$Base->bringTrace(Trace_Object,uri_of_new_model);
if you don't want to change the model
$Base->bringTrace(Trace_Object,Trace_Object->getModel);

##### bringListOfTraces(Array $Traces, $modelname)

This method allow to bring a list of traces in this base and a create a global model for all traces
if the model exists already, it will be updated.
use :
$Base->bringListOfTraces(array_of_Trace_Object,model_Name);

Trace
====================== 

TraceModel
====================== 

ComputedTrace
====================== 



