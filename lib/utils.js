var utils = {};

utils.merge = function(){
  var result = {}, 
      list = Array.prototype.slice.call(arguments),
      i, len;

  for(i = 0, len = list.length; i < len; i++){
    for(key in list[i]){
      if(!list[i].hasOwnProperty(key)){
        continue;
      }

      result[key] = list[i][key];
    }
  }

  return result;
};


module.exports = utils;
