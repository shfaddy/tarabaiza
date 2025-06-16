export const controller = {

attack: '1/2^10',
decay: '1/2^1',
sustain: '1/2^3',

key: 60

};

export const mix = true;

export const body = `

aNote = 0

iPAttack init p3 * iPAttack
iPDecay init p3 * iPDecay

iRelease init p3 - iPAttack - iPDecay

iSustain init 1/2^3

kAmplitude adsr iPAttack, iPDecay, iSustain, iRelease

iShift init 7

kFrequency linseg cpsmidinn ( iPKey + iShift ), p3 / 2^8, cpsmidinn ( iPKey )

aWave vco2 kAmplitude, kFrequency/2, 4, .05

aNote += aWave

aWave vco2 kAmplitude, kFrequency * 2, 4, .95

aNote += aWave / 2

aWave vco2 kAmplitude, kFrequency/2, 10, .5

aNote += aWave / 2

aClip rspline 0, 1, 0, 4
aSkew rspline 0, 1, 0, 4

aWave squinewave a ( kFrequency * 2 ), aClip, aSkew

aWave *= kAmplitude

aNote += aWave / 2

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iPKey ), 0, 6

aNote += aWave

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iPKey ), 0, 1

aNote += aWave

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iPKey ), 0, 2, 2

aNote += aWave

aNote butterlp aNote, kFrequency * 2^4

aNote butterhp aNote, kFrequency / 2^1

`;
