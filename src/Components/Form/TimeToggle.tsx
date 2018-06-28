import { TimePicker } from '@blueprintjs/datetime';
import * as React from 'react';


class TimeToggle extends React.Component<ITimeToggleProps, any> {
 public render(){
    return(
    <div style={{display:'flex'}}> 
        <TimePicker
            value={this.props.value}
            useAmPm={true}
            onChange={(date) =>{
                if(this.props.onChange){
                    this.props.onChange({target: { value: date, name: "timeLog.startTime" }})
                }
            }} 
            />
    </div>
    );
 }
}
export interface ITimeToggleProps{
    value: Date;
    onChange(event: any): any;
}
export default TimeToggle