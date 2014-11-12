
 Module-SparqlTransf
========
This module allows you to create a computed trace with a SPARQL query.

## SparqlGenerate
This class is mainly used to generate a CONSTRUCT sparql query.

Methods :

##### String generatePrefix()
This method generate the prefixes of the query and return it as a string.

##### String generateALLSELECT()
This method generate the select part of the query to select all atributes and return as a string.

##### String generateConditionFiltreALL($ModelURL, $AttributeCondition, $TypeObsel, $condAttr)

This method generate the filter part of the query and retun it as a string
the arguments variables are the same as described in the ComputedTrace class.

##### String generateSELECT($ModelURL, $Attribute)
This medhod generate the select part of the query to select the attributes contained in the array
$Attribute, and return as a string.


## CreateComputedTrace

##### __construct ($BaseURI,$TraceName,$TraceSourceName,$ModelURI)
The constructor for the CreateComputedTrace Object.
  - *$BaseURI* : URI of the Base 
  - *$TraceName* : the Trace's name
  - *$TraceSourceName* : the Trace source's name
  - *$ModelURI* : URI of the Model

#####  CreateComputedTrace_sparql($TypeObsel,$AttributeCond,$condition)

This methode used to create a computed trace using a SPARQL construct query which allows to build obsels keeping all attributes obsels sources

#####  CreateComputedTrace_sparql2($TypeObsel,$AttributeCond,$condition)

This methode used to create a computed trace using a SPARQL construct query which allows to build obsels by filtering attributes.
