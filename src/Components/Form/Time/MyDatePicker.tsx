import { DatePicker } from '@blueprintjs/datetime';
import * as React from 'react';


class MyDatePicker extends React.Component<IMyDatePickerProps>{

   public render(){
       const { value, showActionBar, name, onChange} = this.props;
       return (
            <DatePicker
                className="pt-fill"
                value={value}
                showActionsBar={showActionBar}
                onChange={(date) =>{
                    const ret = {target: { value: date, name }};
                    if (onChange){
                        onChange(ret)
                    }
                }}
            />
       )
   } 
}
interface IMyDatePickerProps{
    showActionBar?: boolean;
    name: string;
    value: Date;
    onChange(event: any): any;
}
export default MyDatePicker;