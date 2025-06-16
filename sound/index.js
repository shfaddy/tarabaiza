import Instrument from './instrument.js';
import Option from './option.js';
import format from './data/format.js';
import type from './data/type.js';
import Channels from './channels.js';
import ZeroDBFS from './0dbfs.js';
import Score from './score.js';
import { writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

export default class Sound extends Map {

constructor ( details ) {

super ();

this .details = details;

};

async $play ( { ticket, play: $, interrupt }, save ) {

if ( this .constructor .sound )
throw "Sound is already playing";

const path = 'work.csd';

await writeFile ( path, await $ ( 'document', save ), 'utf8' );

this .constructor .sound = spawn ( 'csound', [

path,
`--omacro:directory=${ process .cwd () }`,

], {

stdio: 'inherit'

} );

interrupt .then (

() => this .constructor .sound .kill ( 'SIGKILL' )

);

return await new Promise ( ( resolve, reject ) => {

this .constructor .sound .on ( 'exit', ( ... status ) => {

status = status .filter ( status => status !== null );

delete this .constructor .sound;

if ( status === 0 )
resolve ( true );

else
reject ( "Playing synthesizer is interrupted" );

} );

} );

};

async $options ( { play: $ }, save = false ) {

const options = [];
const output = [];
const sample = [];
const file = save === true ? await $ ( '--direction' ) : 'dac';
const format = await $ ( 'format' );
const type = await $ ( 'type' );

if ( file !== undefined )
output .push ( file );

if ( format !== undefined )
output .push ( format ),
sample .push ( format );

if ( type !== undefined )
sample .push ( type );

if ( output .length )
options .push (

`-o ${ output .join ( '.' ) }`,
`--logfile=${ output [ 0 ] }.csl`

);

if ( sample .length )
options .push ( '--format=' + sample .join ( ':' ) );

return options .join ( '\n' );

};

async $orchestra ( { play: $ } ) {

return [

[

`sr = ${ await $ ( 'rate' ) }`,
`ksmps = ${ await $ ( 'control' ) }`,
`nchnls = ${ await $ ( 'channels' ) }`,
`0dbfs = ${ await $ ( '0dbfs' ) }`,

] .join ( '\n' ),

'gaNote [] init nchnls',

new Array (( 'channels' ) ) .fill ( true ) .map ( ( _, channel, mixer ) => {

mixer .instance = (

mixer .instance = mixer .instance === undefined ? 0 : ++mixer .instance

) % 10 === 0 ? ++mixer .instance : mixer .instance;

return `alwayson 1.${ mixer .instance }, ${ channel }`;

} ) .join ( '\n' ),

`instr 1

aNote clip gaNote [ p4 ], 1, 0dbfs

outch p4 + 1, aNote

gaNote [ p4 ] = 0

endin`,

... this .code

] .join ( '\n\n' );

};

$format = new Option ( format );

$type = new Option ( type );

rate = 48000;

$rate ( _, rate = this .rate ) {

if ( isNaN ( rate ) || rate < 0 )
throw "Sample rate must be a positive number";

return this .rate = parseFloat ( rate );

};

control = 32;

$control ( _, control = this .control ) {

if ( isNaN ( control ) || ( control = parseInt ( control ) ) < 0 )
throw "Number of Samples in Control Period must be a positive integer";

return this .control = control;

};

$channels = new Channels;

$0dbfs = new ZeroDBFS;

$score = new Score;

async $document ( { play: $ }, save ) {

return [

'<CsoundSynthesizer>',

'<CsOptions>',

await $ ( 'options', save ),

'</CsOptions>',

'<CsInstruments>',

await $ ( 'orchestra' ),

'</CsInstruments>',

'<CsScore>',

await $ ( 'score' ),

'</CsScore>',

'</CsoundSynthesizer>'

] .join ( '\n\n' );

};

code = [];

async get ( instrument ) {

if ( ! this .has ( instrument ) )
await this .set ( instrument );

return super .get ( instrument ) .produce ();

};

async set ( instrument ) {

const { default: kit } = await import ( '@shfaddy/maqamist/kit' );

if ( ! kit [ instrument ] )
throw `${ instrument } could not be found in the instruments kit`;

let { controller, header, body, mix } = await import ( kit [ instrument ] );
const code = [];
const name = instrument .replace ( '/', '_' );
const number = this .code .length + 2;

if ( typeof header === 'string' && ( header = header .trim () ) .length )
code .push ( header );

code .push ( `instr ${ number }, ${ name }` );

if ( mix === true && typeof controller === 'object' )
controller = Object .assign ( {

channel: 0,
amplitude: '1/4'

}, controller );

if ( typeof controller === 'object' && Object .keys ( controller ) .length )
code .push ( Object .keys ( controller ) .map (

( control, index ) => `iP${ control [ 0 ] .toUpperCase () + control .slice ( 1 ) } init p ( ${ index + 4 } )`

) .join ( '\n' ) );

if ( typeof body === 'string' && ( body = body .trim () ) .length )
code .push ( body );

if ( mix === true )
code .push ( this .constructor .mixer );

code .push ( 'endin' );

this .code .push ( code .join ( '\n\n' ) );

return super .set ( instrument, new Instrument ( {

name,
number,
controller

} ) );

};

static mixer = `

aNote clip aNote, 1, 0dbfs

gaNote [ p4 ] = gaNote [ p4 ] + aNote * iPAmplitude

` .trim ();

};
