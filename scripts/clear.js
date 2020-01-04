
Inputs = function(className){
   
inputType = document.getElementsByClassName(className);
    for(var i = 0; i < inputType.length; i++){
        inputType[i].value = '';
    }

}

module.exports = {
    Inputs: Inputs
}