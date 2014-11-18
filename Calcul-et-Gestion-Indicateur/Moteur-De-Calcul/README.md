Module to calculate indicators
========

This is where the calculations of indicators take place. The indicator model is the input of the module. The program parses the model and starts all operations declared in the model (transform traces, send sparql queries to KTBS, calculate the equation ..) and finally sends the result to display it or to save it.

The figure below shows the class diagram of this module : 


![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/arch%20detaiMoteurDeCalcul.jpeg)

Indicator is the main class of this module. It uses the Trace class and ComputedTrace class to transform the traces, the EvalMath class to calculate the equation, and IndicatorManager class in order to store the indicator model in the database.


The activity diagram below describes the steps to calculate an indicator defined by his model

![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/DiagActiviteMoteurDeCalcul.png)
