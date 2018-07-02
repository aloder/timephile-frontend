import * as React from 'react';

import Arc from './Arc';
import Thumb from './Thumb';
import Track from './Track';
import { getRelativeAngle, pipe, toDeg, toRad } from './utils';

class App extends React.Component<ICircleProps, IArc> {
  public static defaultProps: ICircleDefaultProps= {
    r: 200,
    initialAngle: 90,
    trackWidth: 50,
    trackColor: '#f5f5dc',
    arcColor: '#7985f1',
    thumbWidth: 55,
    thumbColor: 'white',
    thumbBorderWidth: 5,
    thumbBorderColor: '#cccccc',
    onChange: (value: any) => undefined
  }
  
  constructor(props: ICircleProps) {
    super(props)
    document.addEventListener('mouseup', this.trackLeave);
    let arcs:IArcObj[] = [];
    if (props.arcs) {
      arcs = props.arcs;
    }
    this.state = {
      arcs,
      colors: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'yellow'],
      currentAngle: 0
    }

  
  }
  public componentWillReceiveProps(nextProps: ICircleProps) {
    if (nextProps.arcs){
      this.setState({arcs: nextProps.arcs})
    }
  }
  public componentDidMount(){
    if (this.ref.current){
      this.offsets = this.ref.current.getBoundingClientRect()
    }
  }
  private trackSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = this.makeArc(event);
    if (index) {
      document.addEventListener('mousemove', (ev) => this.moveArc(ev, index))
    }
  }

  private handleSelect = (event: React.MouseEvent<HTMLDivElement>, index: number, angle: number) => {
    console.warn("select");
    this.trackLeave()
    document.addEventListener('mousemove', (ev) => this.moveArc(ev, index))
    this.setState({currentArcIndex: index, currentAngle: angle})
  }
  private trackLeave = () => {
    const { currentArcIndex } = this.state;
    if (currentArcIndex !== undefined){
      document.removeEventListener('mousemove', (ev) => this.moveArc(ev, currentArcIndex))
      this.setState({ currentArcIndex: undefined });
    }
   
  }


  private calculateAngle = (mouseX: number, mouseY: number) => {
    const { r }  = this.props as PropsWithDefaults;
    const x = mouseX - r - this.offsets.left;
    const y = - mouseY + r + this.offsets.top;
    const angle = toDeg(Math.atan(y / x)) +
      ((x < 0) ? 180 : 0) +
      ((x >= 0 && y < 0) ? 360 : 0);

    return angle;
  }


  private makeArc = (event: React.MouseEvent<HTMLDivElement>) => {    
    const angle = pipe(
      this.calculateAngle(event.clientX, event.clientY),
      this.limitAngleVariation
    )
    const newState: IArcObj[] = JSON.parse(JSON.stringify(this.state.arcs));
    const colors: string[] =  JSON.parse(JSON.stringify(this.state.colors));
    const color = colors.pop();
    if (!color) { return; }
    const index = newState.push({ angles: [angle+5, angle], color }) - 1;
    this.setState({ arcs: newState, currentArcIndex: index, currentAngle: 1, colors })
    return index;
  }

  private moveArc = (evt: any, index: number) => {
    const { currentArcIndex, currentAngle } = this.state;
    if (currentArcIndex !== index){
      return;
    }
    const event = evt.changedTouches 
      ? evt.changedTouches[0] 
      : evt;
    
    const angle = pipe(
      this.calculateAngle(event.clientX, event.clientY),
      this.limitAngleVariation
    )

    const newState: IArcObj[] = JSON.parse(JSON.stringify(this.state.arcs));
    const angles = newState[index].angles;
    const otherAngle = (currentAngle) ? 0 : 1;
    
    if (angles[otherAngle] - 5 < angle && angle < angles[otherAngle] + 5) {
      return;
    }
    newState[index].angles[currentAngle] = angle;
    this.setState({ arcs: newState });
  }
  private limitAngleVariation = (angle: number) => {
    const { initialAngle } = this. props as PropsWithDefaults;
    const nextRelativeAngle = getRelativeAngle(angle, initialAngle);
    const currentRelativeAngle = getRelativeAngle(angle, initialAngle);

    return (
      (nextRelativeAngle < currentRelativeAngle + this.limitAngleFactor) &&
      (nextRelativeAngle > currentRelativeAngle - this.limitAngleFactor)
    )
      ? angle
      : angle;
  }

  private calculateThumbPosition = (angle: number) => {
    const { r, trackWidth} = this.props as PropsWithDefaults;
    const realRad = r - trackWidth/2
    const x = Math.cos(toRad(angle)) * realRad  + r;
    const y = -Math.sin(toRad(angle)) * realRad + r;
    return { x, y }
  }



  private offsets: any;
  private limitAngleFactor = 90;
  private ref : React.RefObject<HTMLDivElement>= React.createRef();

  public generateArcs(): any {
    const { trackWidth, r } = this.props as ICircleDefaultProps;
    const ret = [];
    for (let index = 0; index < this.state.arcs.length; index++){
      const arc = this.state.arcs[index];
      ret.push(
        <Arc
          r={r}
          initialAngle={arc.angles[0]}
          angle={arc.angles[1]}
          width={trackWidth}
          color={arc.color}
        />
      );
      ret.push(
          <Thumb
            diameter={trackWidth}
            color={'#ac956a'}
            borderWidth={5}
            borderColor={'gray'}
            handleSelect={(event: any) => this.handleSelect(event, index, 0)}
            rotate={arc.angles[0]}
            position={this.calculateThumbPosition(arc.angles[0])}
          />);
      ret.push(<Thumb
            diameter={trackWidth}
            color={'#ac956a'}
            borderWidth={5}
            handleSelect={(event: any) => this.handleSelect(event, index, 1)}
            borderColor={'gray'}
            rotate={arc.angles[1]}
            position={this.calculateThumbPosition(arc.angles[1])}
          />)

    }
    return ret;
  }


  public render() {
    const { r, trackColor, trackWidth } = this.props as PropsWithDefaults;
    return (
      <div id="circular-slider"
        style={{
          width: r * 2,
          height: r * 2,
          position: 'relative'
        }}
        ref={this.ref}
      >
      <Track 
        color={trackColor}
        width={trackWidth}
        handleSelect={this.trackSelect}
      />
        {this.generateArcs()}
      </div>
    );
  }
}

interface ICircleProps {
  r?: number;
  arcs?: IArcObj[];
  initialAngle?: number;
  trackWidth?: number;
  trackColor?: string;
  arcColor?: string;
  thumbWidth?: number;
  thumbColor?: string;
  thumbBorderWidth?: number;
  thumbBorderColor?: string;
  onChange?(event: any): any;
}

interface ICircleDefaultProps {
  r: number;
  initialAngle: number;
  trackWidth: number;
  trackColor: string;
  arcColor: string;
  thumbWidth: number;
  thumbColor: string;
  thumbBorderWidth: number;
  thumbBorderColor: string;
  onChange(event: any): any;
}
interface IArc {
  arcs: IArcObj[];
  colors: string[];
  currentAngle: number;
  currentArcIndex?: number;
}
export interface IArcObj {
  angles: number[];
  title?: string;
  id?: string;
  color: string;
}
type PropsWithDefaults = ICircleProps & ICircleDefaultProps;

export default App;