export const controller = {

swing: 0,

};

export const mix = true;

export const body = `

iSwing random 0, 127

if iSwing > iPSwing then

iRhythm random 3, 6
p3 /= 2^int ( iRhythm )

iDetune random 0, 25
iDetune init cent ( iDetune )

aNote tambourine 1, p3, 256, .5, .5, 2100 * iDetune, 5100 * iDetune, 7100 * iDetune

aNote clip aNote, 1, 0dbfs

endif

`;
