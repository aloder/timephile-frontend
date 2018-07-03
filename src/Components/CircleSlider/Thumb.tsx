import * as React from 'react';

const ThumbImage = ({ diameter, color, borderWidth, borderColor, rotate, show }:
    { diameter: number, color?: string, borderWidth?: number, borderColor?: string, rotate: number, show: boolean}) => (
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
      position: 'absolute',
      display: (show) ? 'block' : 'none'
    }}
  />
)

class Thumb extends React.Component<IThumbProps,{ isHovering: boolean }> {
  public constructor(props: IThumbProps){
    super(props);
    this.state = {
      isHovering: false
    }
  }
  public render(){
    const { diameter, color, borderWidth, borderColor, position, handleSelect, rotate } = this.props;
    return (
      <div id="thumb"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
        }}
        draggable={false}
        onTouchStart={() => { this.setState({ isHovering: true}); handleSelect()}}
        onMouseDown={() => { this.setState({ isHovering: true}); handleSelect()}}
      >
        <ThumbImage 
          diameter={diameter}
          color={color}
          borderWidth={borderWidth}
          borderColor={borderColor}
          rotate={rotate}
          show={this.state.isHovering}
        />
        <div
          style={
            {
              transform: `translate(-50%, -50%) rotate(${-rotate}deg)`,
              width: diameter,
              height: diameter/4,
              left: '50%',
              top: '50%',
              position: 'absolute',
            }
          }
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          onMouseOut={() => this.setState({ isHovering: false })}
        />
      </div>);
  }
}

interface IThumbProps{
  diameter: number;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
  position?: any;
  handleSelect?: any;
  rotate: number;
}



export default Thumb;