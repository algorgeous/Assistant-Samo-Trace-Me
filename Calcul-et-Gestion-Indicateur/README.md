 
System to Calculate and Manage Indicators
========

This system provides several modules that makes  easier for a user to design and manage activity indicators.
The figure below describes the architecture of the system and the relationship among modules :

[image]


The system is composed of these modules :
 - [Module Indicateur FrontOffice] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice) : This Module Provides the interface that allows to display the value of the indicator, to delete or share an indicator.
 - [Module Indicateur BackOffice](https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice) : This module provides two types of interface: an interface for adding a new indicator and another interface that displays the indicator model.
 - [Module Indicateur Store](https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Calcul-et-Gestion-Indicateur/Module-Indicateur-Store) : This module allows users to share and download indicators
 - [Management Module]() : this module is used to define, manipulate, retrieve and manage indicators. It allows to store the indicators created by the user and  remove the stored indicators.
 - [Module to calculate indicators] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Calcul-et-Gestion-Indicateur/Moteur-De-Calcul) : This is where the calculations of indicators take place. The indicator model is the input of the module. The program parses the model and starts all operations declared in the model (transform traces, send sparql queries to KTBS, calculate the equation ..) and finally sends the result to display it or to save it.

