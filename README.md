# SeaTable misc
Several usefull functions for SeaTable scripting

## output-table
This function tries to mimic the airtable output.table() function used to display arrays and objects.
You can test it with the following lines : 
```
var a = [1,{a:12,b:15},"a",[4,5,6]];
outputTable(a);

var b = {id:"JohnDoe",parentid:[1,2,3,4,5],isroot:false};
outputTable(b);

var c = [{id:"JohnDoe",parentid:[1,2,3,4,5],isroot:false},{id:"JaneDae",parentid:[5,3,1],isroot:true},[1,"a",3,4,5,6]];
outputTable(c);
```
