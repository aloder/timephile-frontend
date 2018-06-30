export const pipe = (...args: any[]) => args.reduce((prev, curr) => curr(prev))

export const getRelativeAngle = (angle: any, initialAngle: any) => (360 - angle + initialAngle) % 360

export const toDeg = (angle:number) => angle * (180 / Math.PI)

export const toRad = (angle:number) => angle * (Math.PI / 180)