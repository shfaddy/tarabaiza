export const body = `

iAttack init p3 / 2^10
iDecay init p3 / 2
iRelease init p3 - iAttack - iDecay

iSustain init 1/2^3

kAmplitude adsr iAttack, iDecay, iSustain, iRelease

iShift init 7
iNote init p5

kFrequency linseg cpsmidinn ( iNote + iShift ), p3 / 2^8, cpsmidinn ( iNote )

aWave vco2 kAmplitude, kFrequency/2, 4, .05

shmix aWave

aWave vco2 kAmplitude, kFrequency * 2, 4, .95

shmix aWave / 2

aWave vco2 kAmplitude, kFrequency/2, 10, .5

shmix aWave / 2

aClip rspline 0, 1, 0, 4
aSkew rspline 0, 1, 0, 4

aWave squinewave a ( kFrequency * 2 ), aClip, aSkew

aWave *= kAmplitude

shmix aWave / 2

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iNote ), 0, 6

shmix aWave

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iNote ), 0, 1

shmix aWave

aWave pluck kAmplitude, kFrequency, cpsmidinn ( iNote ), 0, 2, 2

shmix aWave

/*
aNote butterlp aWave, kFrequency * 2^4

aNote butterhp aNote, kFrequency / 2^1

*/

`;
