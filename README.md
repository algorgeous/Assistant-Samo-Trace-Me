SamoTrace-Me Assistant
========

SamoTrace-Me Assistant is a modular web application. One of the advantages of modularity is that you can replace or add any module without affecting the rest of the system.
Each module allows to offer a view of the traces and their exploitation.The traces are stored in the Trace-Based Systems [KTBS] (https://kernel-for-trace-based-systems.readthedocs.org/en/latest/).

The figure below describes the architecture of the assistant and the  relationship among modules:
 


![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/architotale.jpeg)

Samotrace-Me contains essentially three types of modules: 
- Self modules that can offer a way to exploit activity traces through their own interface ([Module SamoTrace-ME](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-SamoTraceMe/README.md),[Module ConfigVisuText](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-ConfigVisuText/README.md),  [Module Analytics] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Module-Analytics),  [Module-Actions](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-Actions/README.md),  [Module  Calcul et Gestion Indicateur](https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Calcul-et-Gestion-Indicateur) ).
- Library modules that allows the processing of data related to KTBS with javascript on the client side ([ ktbs_bib_JS](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/README.md)) and php on the server side ([Ktbs_bib_php] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Ktbs_bib_php/README.md)).
- Intermediate modules which facilitates communication between Self modules and Library modules :
    - [Ktbs_Proxy](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Ktbs_Proxy/README.md)
    - [Module-Generate-Model-ktbs] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-Generate-Model-ktbs/README.md)
    - [ Module-SparqlTransf] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-SparqlTransf/README.md)
  

