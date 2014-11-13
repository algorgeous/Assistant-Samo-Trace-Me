Module Actions
=========

This module allows users to view new traces (computed trace )that describes a particular activity (Forum action, Quiz action).
An activity is a collections of type d'obsels.
[Actions.js](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-Actions/JS/Actions.js) sent the information of trace (baseURI, TraceName) and the name of the activity selected by the user to [Actions.php] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-Actions/PHP/Actions.php).
This class uses [CreateComputedTrace class] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-SparqlTransf/CreateComputedTrace.php) to create the computed trace.


If you have a look at [this documentation] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/Module-SparqlTransf/README.md), you will see that this CreateComputedTrace class needs to be initialised with 3 parameters:

  - $TypeObsel is an array which contains the obsels types you want to keep them on the computed trace.
  - $AttributeCond is an array which contains the attributes of obsels that you will have conditions on them.
  - $condition is an array which contains conditions on attributes

These parameters are initialized by the class Actions.php according to the activitie.

For example, for the activity action in the forum, we need these types of obsels : "#Click-Lien-Categorie","#Click-Sur-Sujet","#resource-claroline_forum-create_message",
and the following condition for the attribute "resource-read/hasTool_ResourceType" : resource-read/hasTool_ResourceType=claroline_forum.

Here is how you can initialize the spaql parameters :

```sh
$TypeObsel = array ("#Click-Lien-Categorie","#Click-Sur-Sujet","#resource-claroline_forum-create_message");
$AttributeCond = array ("resource-read/hasTool_ResourceType");
$attributeCondition[]=array('index'=>'1','value'=>'claroline_forum');
$condition[]=array ('type'=>'#resource-read','attribute'=>$attributeCondition);

```


[image]




