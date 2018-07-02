import * as React from 'react';

import { getRelativeAngle, pipe, toRad } from './utils';

const getPointCoordString = (r: number, angle: number) => {
  const x = Math.cos(toRad(angle)) * r * 100;
  const y = - Math.sin(toRad(angle)) * r * 100;
  return `${x}px ${y}px`;
}

const Arc = ({r, angle, initialAngle, width, color, onSelect}:
     { r: number, angle: number, initialAngle: number, width: number, color?: string, onSelect?: any}) => {
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

  const polygonString = `polygon(${center}, ${start}${extra1}${extra2}${extra3}, ${end})`;
  return (
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
)}

export default Arc;