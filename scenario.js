import Sound from './sound/index.js';

export default new class Tarabaiza {

constructor ( details = {} ) {

this .details = Object .assign ( details, { tarabaiza: this } );
this .$_director = this .$_sound = details .sound instanceof Sound ? details .sound : new Sound ( details );

};

storage = new Map;

async $put ( _, instrument ) {

if ( ! this .storage .has ( instrument ) )
this .storage .set ( instrument, this .$_sound .get ( instrument ) );

const details = await this .storage .get ( instrument );

this .instrument = details .instrument;
this .number = details .number;
this .$controller = details .controller;

return true;

};

get $instrument () {

return this .instrument;

};

get $number () {

return this .number;

};

measure = '4';

$measure ( _, measure = this .measure ) {

if ( isNaN ( measure [ 0 ] ) )
throw "Note measure is required to be a number";

return this .measure = measure;

};

async $play ( story, save ) {

const { play: $ } = story;

const score = await $ ( Symbol .for ( 'sound' ), 'score', '.' );

await score ( 'clear' );
await score ( await $ ( 'note' ) );

await $ ( story, Symbol .for ( 'sound' ), 'play', save );

return true;

};

section = [];

async $note ( { play: $ }, ... measure ) {

const note = [];

note .push ( [

`i ${ await $ ( 'number' ) }`,
0,
`[ ${ measure = [ ... measure, await $ ( 'measure' ) ] .join ( ' * ' ) } ]`,
... await $ ( 'controller', 'parameters' )

] .join ( ' ' ) );

const step = [ 0 ];

for ( const tarabaiza of this .section ) {

note .push ( await $ (

tarabaiza,
'note',
measure,
`( ${ step .join ( ' + ' ) } )`

) );

step .push ( await $ ( tarabaiza, 'measure' ) );

}

note .push ( `b ${ measure }` );

return note .join ( '\n' );

};

};
