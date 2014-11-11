GenerateModel
========

This class is used to generate the trace model from the trace itself.

Methods :

#####  __construct ($TraceURI,$ModelName)
The constructor of this class
*$TraceURI* is a string variable which contains the Trace URI which we want to create the Model.
*$ModelName* is a string variable which contains the Name of the model we want to create.

#####  PutModel()

This method get the trace's obsels and generate a description of all their types using turtle and
create the model with the generated description.
