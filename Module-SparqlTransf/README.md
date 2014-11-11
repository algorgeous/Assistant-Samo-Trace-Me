
SparqlGenerate
========

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
