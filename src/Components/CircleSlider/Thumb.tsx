import * as React from 'react';

const ThumbImage = ({ diameter, color, borderWidth, borderColor, rotate }:
    { diameter: number, color?: string, borderWidth?: number, borderColor?: string, rotate: number}) => (
  <div id="thumb-image"
    style={{
      width: diameter,
      height: diameter/4,
      backgroundColor: '#ac956a',
      borderStyle: `solid `,
      borderColor: '#ac956a',
      borderWidth: `0px ${borderWidth}px ${borderWidth}px ${borderWidth}px`,
      borderRadius: '10%',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) rotate(${-rotate}deg)`,
      position: 'absolute'
    }}
  />
)

const Thumb = ({ diameter, color, borderWidth, borderColor, position, handleSelect, rotate }:{
    diameter: number, color?: string, borderWidth?: number, borderColor?: string, position?: any, handleSelect?: any, rotate: number
}) => (
  <div id="thumb"
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      
    }}
    draggable={false}
    onTouchStart={() => handleSelect()}
    onMouseDown={() => handleSelect()}
  >
    <ThumbImage 
      diameter={diameter}
      color={color}
      borderWidth={borderWidth}
      borderColor={borderColor}
      rotate={rotate}
    />
  </div>);

export default Thumb;