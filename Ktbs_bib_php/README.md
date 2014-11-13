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
The variable *$root_uri* is a string variable which contains the URI of the KTBS

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
- with the Base uri as argument *($base_uri)* ,
- or with Root uri and the Base name as argument *( $root_uri, $name)*.

The variables *$root_uri*, *$base_uri* and $name are strings variables which contains the URI of
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
 *$Base->bringTrace(Trace_Object,uri_of_new_model);
if you don't want to change the model
  $Base->bringTrace(Trace_Object,Trace_Object->getModel)*;


##### bringListOfTraces(Array $Traces, $modelname)

This method allow to bring a list of traces in this base and a create a global model for all traces
if the model exists already, it will be updated.
use :

*$Base->bringListOfTraces(array_of_Trace_Object,model_Name);*

Trace
====================== 

This class is used mainly used to create a Stored Trace in the Ktbs.
Methods :

##### __construct($Trace_uri)
##### __construct($base_uri,$model_uri,$trace_name)

The constructor of this class can be called in two manner : 
  - with the Trace uri as argument *($trace_uri)* , 
  - or with Base uri , the model uri and the trace's name as argument *( $base_uri,$model_uri,  $trace_name)*
  

The variables *$trace_uri*, *$base_uri*, *$model_uri*, and *$trace_name* are strings variables which contains the URI of the Trace , URI of the Base , URI of the Model and the Trace's name

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

*This method brings you the result only if the Object is created using the Trace_Uri.
Creating the Trace object with the base URI , model URI and the trace name argument is mainly used to create a
non exiting trace.*

#####  setNewModel($newmodeluri)

This method allows to set a new model to the trace ( delete the old one and replace it with the
new one ). 

*$newmodeluri* is a string variable which contains the new Model's URI.



TraceModel
====================== 

This class is used mainly to create a Trace model.

Methods :
#####   __construct($base_uri, $name)
#####  __construct($model_uri)
The constructor of this class can be called in 2 manner.
*$base_uri*, *$name* and *$model_uri* are string variable which contains the Base'uri , name of the model
and model's RUI.

#####  Bool exist()
This method verify if the model exists of not.
It returns True if it exist and False if not.

#####  dump()
This method create the Model in the Base if it doesn't exist before.
#####  Delete()
this method delete the Model from KTBS.
#####  String getUri()
This method return a string which contains the URI of the Model.
#####  String getBaseURi()
This method return a string which contains the Base's URI where the Model is.
#####  String getName()
This method return a string which contains the Model's name.
#####  String getBaseName()
This method return a string which contains the Base's name where the Model is.
#####  Array getLIstOfTypes()
This method return an Array which contains all the types existing in the Model.
#####  put($script)
This method updates the model.
*$script* is a string variable which contains the types definitions and relations between them.
The definition of types and relations is written in turtle.
This method is used mainly by the class GenerateModel which generate the model of a trace from the trace itself.


ComputedTrace
====================== 


A computed trace is a Trace created with Transformation method that KTBS offers which are ( Filter
method , Sparql method and Fusion method).This class is used mainly to create computed Traces using the transformation method of the KTBS.


Methods :

##### __construct($Trace_uri)
##### __construct($base_uri, $trace_name)
##### __construct($base_uri, $trace_name, $model_uri)
The constructor of this class can be called in three manner : 
  - with the Trace uri as argument *($trace_uri)* , 
  - or with Base uri and the trace's name as argument *( $base_uri, $trace_name)* , 
  - or with Base uri , the model uri and the trace's name as argument *( $base_uri, $trace_name, $model_uri)*

The variables *$trace_uri*, *$base_uri*, *$model_uri*, and *$trace_name* are strings variables which
contains the URI of the Trace , URI of the Base , URI of the Model and the Trace's name.
 
##### Bool exist()

This method verify if the trace exist of not.
It returns True if it exist and False if not.

##### Delete()
This method delete the Trace from KTBS.

##### Array getObsels()
This method return an Array which contains Obsels of the Trace.
##### String getUri()
This method return a string which contains the URI of the Trace.
##### String getModel()
This method return a string which contains the Model's URI of the Trace.
##### String getOrigin()
This method return a string which contains the origin date of the Trace.

##### Array getSource()
This method return an Array which contains all the traces names which are the sources of this computed trace.

*This method brings you the result only if the Object is created using the Trace_Uri
Creating the Trace object with the base URI , model URI and the trace name argument is mainly used to create a
non exiting trace*.
##### config($method,$sources)
This method is used to configure the transformation method you want to use.

  - *$method* is a string variable which contains the transformation method it can have only three
values : 'sparql' or 'fusion' or 'filter'
  - *$sources* is an array which contains the trace objects needed to the transformation

*For filter and sparql method the array $rouces must have only one trace object.
For fusion method the array $sources must have two or more trace objects.*

##### setFilterParameter($after,$before,$otypes)
This method is used to set the filter parameter which are :
 - *$after* and *$before* are to dates ( strings or int ) if you want to filter the trace between
two dates.
 - *$otypes* is an array which contains the obsels types you want to keep them on the
computed trace.
 

*Use* :

*if you want only a filter using $otypes you have to call the method like this : setFilterParameter(null,null,$otypes); in fact if there are an argument you don't want to uses, put it at null.*

##### filter()
This method is used after using config() and setFilterParameter() to configure the filter
transformation method, to create the computed trace.
##### fusion()
This method is used after using config() to configure the fusion transformation method, to
create the computed trace.
##### SetSparqlParameter($TypeObsel,$AttributeCond,$condition)
This method is used to set the filter parameter which are :
 - *$TypeObsel* is an array which contains the obsels types you want to keep them on the
computed trace.
 -  *$AttributeCond* is an array which contains the attributes of obsels that you will have
conditions on them.
 -  *$condition* is an array which contains conditions on attributes
  
*Use* :

  *here is an example of a use:*

If we want to make a filter on these obsels type : *#resource-icap_blog-configure* and *#Click-Configurer-options* and we have two conditions on these attributes : *resource-create/hasTool_ResourceType* and *resourceread/hasTool_ResourceType* here is how you can manage to set the sparql parameters :

```sh
  $TypeObsel = array ("#resource-icap_blog-configure","#Click-Configurer-options
  $AttributeCond = array ("resource-create/hasTool_ResourceType","resource-read/hasTool_ResourceType");
  $attributeCondition1[]=array('index'=>'1','value'=>'icap_blog');
  $condition[]=array ('type'=>'#resource-create','attribute'=>$attributeCondition1);
  $attributeCondition2[]=array('index'=>'2','value'=>'icap_blog');
  $condition[]=array ('type'=>'#resource-read','attribute'=>$attributeCondition2);
```

*In fact if there are an argument you don't want to uses, put it at null.This method uses a class named SparqlGenerate.*




##### sparql()
This method is used after using config() and setSpaqlParameter to configure the sparql
transformation method, to create the computed trace.
##### Array getParameter()
this method return an Array which contains the parameters used to create the computed trace.
##### String getMethod()
this method return a string which contains the method used to create the computed trace.




