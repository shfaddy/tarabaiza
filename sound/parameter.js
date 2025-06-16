export default class Parameter {

value = '0';

$_director ( _, value = this .value ) {

if ( isNaN ( value [ 0 ] ) )
throw "Parameter value is required to be a number";

return this .value = value;

};

};
