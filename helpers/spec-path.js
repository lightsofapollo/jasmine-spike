function SpecPath(spec){

  if(!spec.relativePath){
    throw TypeError("Must pass an instance of Spec");
  }

  //Ok this is ugly path generation
  return '/spec/' + spec.relativePath;
}

module.exports = exports = SpecPath;
