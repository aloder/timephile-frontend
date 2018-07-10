import { TimePicker } from '@blueprintjs/datetime';
import * as React from 'react';


class TimeToggle extends React.Component<ITimeToggleProps, any> {
 public render(){
     const { value, name, onChange } = this.props
    return(
    <div style={{display:'flex'}}> 
        <TimePicker
            value={value}
            useAmPm={true}
            onChange={(date) =>{
                if(onChange){
                    onChange({target: { value: date, name }})
                }
            }} 
            />
    </div>
    );
 }
}
export interface ITimeToggleProps{
    value: Date;
    name: string;
    onChange(event: any): any;
}
export default TimeToggle