export const controller = { swing: 0 };

export const mix = true;

export const body = `

aNote = 0

iSwing random 0, 127

if iSwing > iPSwing then

iClaps random 1, 4

SClaps sprintf "claps/%d.wav", int ( iClaps )

aLeft, aRight diskin2 SClaps


aNote = aLeft + aRight

p3 filelen SClaps

endif

`;
