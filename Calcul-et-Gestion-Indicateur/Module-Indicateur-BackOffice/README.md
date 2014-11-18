 Module Indicateur BackOffice
========

This module provides two types of interface: an interface for adding a new indicator and another interface that displays the indicator model.

[Indicator.js file] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/JS/indicatorBO.js) is responsible for managing user actions : 
  - In ordre to save an indicator, this module sends the data of  indicator as JSON to the management module.
  - To show the model of an indicator,  this module retrieves the model from the mangement module and sends it to the class [jsonviewer.php] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/jsonviewer.php) to display it.
  - To add an indicator, this module uses [SamoTrace] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/ktbs_bib_JS) for the graphic visualization of the model  trace and the [Module Spare LNC] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Module-Spare-LNC) to generate sparqls Requet for inputs

#### The graphical interface of BackOffice Indicateur Module

Fig.1 : Add an indicator
![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/Img9.png)

Fig.2 : Show an indicator

![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/Img10.png)
