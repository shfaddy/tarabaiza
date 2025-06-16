export default class Score extends Array {

$_director ( { play: $ }, ... argv ) {

switch ( argv .length ) {

case 0:

return this .join ( '\n\n' );

default:

this .push ( argv .join ( ' ' ) );

return $ ();

}

};

$clear ( { play: $ } ) {

this .splice ( 0 );

return $ ();

};

};
