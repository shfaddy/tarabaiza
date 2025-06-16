export const controller = { key: 60 };

export const mix = true;

export const body = `

aNote = 0

iEnvelope init 1 / 2^2

if p3 < iEnvelope then

iEnvelope init p3

endif

iAttack init iEnvelope / 2^1
iDecay init iEnvelope / 2^3
iRelease init p3 - iAttack - iDecay

iSustain init 1

kAmplitude adsr iAttack, iDecay, iSustain, iRelease

iAmplitude init .99
iAmplitudeError init .01

kAmplitudeError rspline iAmplitude - iAmplitudeError, iAmplitude + iAmplitudeError, 0, p3

iAttack init iAttack / 2^13
iDecay init p3 - iAttack - iEnvelope / 2^9
iRelease init p3 - iAttack - iDecay

iShift init 240
iFrequency init cpsmidinn ( iPKey )

kFrequency linseg cpsmidinn ( iPKey + iShift ), iAttack, cpsmidinn ( iPKey ), iDecay, cpsmidinn ( iPKey ), iRelease, cpsmidinn ( iPKey + .1 )

kDetune rspline -.25, .25, 0, p3

kFrequency *= cent ( kDetune )

iPressure init 5
iPressureError init .01
; 1 - 5
kPressure rspline iPressure - iPressureError, iPressure + iPressureError, 0, p3

iPosition init .18
iPositionError init .001
; .025 - .23
kPosition rspline iPosition - iPositionError, iPosition + iPositionError, 0, p3

iVibratoFrequency init 1 / 2^8
iVibratoFrequencyError init 1 / 2^10
; 0 - 12
kVibratoFrequency rspline iVibratoFrequency - iVibratoFrequencyError, iVibratoFrequency + iVibratoFrequencyError, 0, p3

iVibratoAmplitude init .025
iVibratoAmplitudeError init .01
kVibratoAmplitude rspline iVibratoAmplitude - iVibratoAmplitudeError, iVibratoAmplitude + iVibratoAmplitudeError, 0, p3

aBody wgbow kAmplitude, iFrequency, kPressure, kPosition, kVibratoFrequency, kVibratoAmplitude

aNote += aBody

aZz vco2 kAmplitude, kFrequency, 6

aZz butterlp aZz, kFrequency * 2^0

kFilter linseg 2^13, iAttack, 2^0

aZz butterhp aZz, kFrequency * kFilter / 2^1

aNote += aZz

`;
