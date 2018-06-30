import * as React from 'react';

const Track = ({ width, color, handleSelect }: { width: number, color?: string, handleSelect(event: React.MouseEvent<HTMLDivElement>): void }) => (
  <div id="track" 
    style={{
      border: `${width}px solid ${color}`,
      borderRadius: '100%',
      height: '100%',
      position: 'absolute',
      width: '100%',
    }}
    onMouseDown={(event) => handleSelect(event)}
  />);

export default Track;