import * as React from 'react';

import { getRelativeAngle, pipe, toRad } from './utils';

const getPointCoordString = (r: number, angle: number) => {
  const x = Math.cos(toRad(angle)) * r * 100;
  const y = - Math.sin(toRad(angle)) * r * 100;
  return `${x}px ${y}px`;
}
const getPointCoord = (r: number, angle: number, width: number):{x: number, y: number} => {
  const x = Math.cos(toRad(angle)) * (r - width/2) + r ;
  const y = - Math.sin(toRad(angle)) * (r - width/2) + r ;
  return {x, y};
}
const Arc = ({r, angle, initialAngle, width, color, onSelect, text, textColor}:
     { r: number, angle: number, initialAngle: number, width: number, color?: string, onSelect?: any, text?:string, textColor?: string}) => {
  const relativeAngle = getRelativeAngle(angle, initialAngle) 
  const center = `${r}px ${r}px`;
  const start = getPointCoordString(r, initialAngle);
  const end = getPointCoordString(r, angle);

  
  const extraPoint1 = pipe(
    getRelativeAngle(45, initialAngle), 
    (a: any) => getPointCoordString(r, a));
  const extraPoint2 = pipe(
    getRelativeAngle(135, initialAngle),
    (a: any) => getPointCoordString(r, a));
  const extraPoint3 = pipe(
    getRelativeAngle(225, initialAngle),
    (a: any) => getPointCoordString(r, a));
  
  const extra1 = (relativeAngle > 90) ? `, ${extraPoint1}` : '';
  const extra2 = (relativeAngle > 180) ? `, ${extraPoint2}` : '';
  const extra3 = (relativeAngle > 270) ? `, ${extraPoint3}` : '';

  const posAngle = getRelativeAngle(initialAngle-(initialAngle- angle)/2, -90);
  let pos = getPointCoord(r,posAngle, width);
  if(angle > initialAngle){
    pos = getPointCoord(r,getRelativeAngle(initialAngle-(initialAngle- angle)/2, 90), width);
  }

  const polygonString = `polygon(${center}, ${start}${extra1}${extra2}${extra3}, ${end})`;
  return (
    <div>
      <div id="arc"
        style={{
          border: `${width}px solid ${color}`,
          borderRadius: '100%',
          clipPath: polygonString,
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
        onSelect={(event) => onSelect(event)}
      />
      <div
      style={{
        position: 'absolute',
        top: pos.x,
        left: pos.y,
        userSelect: "none",
        msUserSelect: "none"
      }}
      >{text}</div>
    </div>
)}

export default Arc;