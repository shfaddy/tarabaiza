export default class ZeroDBFS {

value = 1;

$_director ( _, input = this .value ) {

if ( isNaN ( input ) )
throw "0dbfs must be a number";

return this .value = parseFloat ( input );

};

};
