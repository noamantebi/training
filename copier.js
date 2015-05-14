function copier(){
  var threshold = 2;
    this.copy = function(obj)
    {
      if (null === obj || "object" != typeof(obj))
        return obj;
      if (obj.copied){
        if (obj.copied === threshold)
          throw new Error("Maximum copied accured");
          //return null;
        obj.copied++;
      }
      else if (threshold > 0){
        obj.copied = 1;
        obj.getThreshold = function(){ return threshold; };
        obj.getNumOfCopies = function() {return this.copied; };
      }
      else
        throw new Error("Maximum copied accured")
      //return null;
      
      
      var copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr) && attr != "copied") {
          copy[attr] = obj[attr];
        }
      }
      return copy; 
      
    }
}

function Person(name, age){
  this.name = name;
  this.age = age;
  
  this.getName  = function(){ return this.name; }
    this.getAge  = function(){ return this.age; }
}

try{
  var copyObj = new copier();
  var obj1 = new Person("noam",27);
  var obj2 = copyObj.copy(obj1);
  //console.log("obj1 num of copies:  ", obj1.getNumOfCopies())
  var obj3 = copyObj.copy(obj1);

  //console.log("obj1 Threshold: ", obj1.getThreshold())
  //console.log("obj1 num of copies: ",obj1.getNumOfCopies())
  //console.log("obj3 Threshold: ", obj3.getThreshold())
  //console.log("obj3 num of copies: ",obj3.getNumOfCopies())
  console.log(obj1 === obj2);
  console.log(obj2 === obj3);

  var obj4 = copyObj.copy(obj1);
  console.log(obj4 === null);

  var obj5 = new Person("Daniel", 28);
  var obj6 = copyObj.copy(obj5);
  console.log(obj6 === null);
}
catch(err){
  console.log(err);
}
