export default class Controller extends Map {

constructor ( details ) {

super ( typeof details ?.controls === 'object' ? Object .entries ( details .controls ) : undefined );

};

$_director ( { play: $ }, control, value ) {

if ( typeof control === 'symbol' )
return;

if ( control === undefined )
return [ ... this ] .map (

control => control .join ( ' = ' )

);

if ( ! this .has ( control ) )
throw "Unknown control";

if ( value !== undefined )
this .set ( control, value );

return this .get ( control );

};

$parameters () {

return [ ... this ] .map (

( [ control, value ] ) => isNaN ( `${ value }` [ 0 ] ) ? `"${ value }"` : `[${ value }]`

);

};

};
