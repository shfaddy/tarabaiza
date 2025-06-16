export default class Channels {

value = 1;

$_director ( _, input = this .value ) {

switch ( input ) {

case 'mono':
case 'm':

return this .value = 1;

case 'stereo':
case 's':

return this .value = 2;

case 'quadraphonic':
case 'quad':
case 'q':

return this .value = 4;

default:

if ( isNaN ( input ) || ( input = parseInt ( input ) ) < 1 )
throw "Number of Channels must be a number greater than 1";

return this .value = input;

}

};

};
