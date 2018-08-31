import { DateInput } from '@blueprintjs/datetime';
import * as React from 'react';


class MyDateInput extends React.Component<IMyDateInputProps>{

   public render(){
       return (
            <DateInput
                className=""
                formatDate={date => date ? date.toLocaleDateString() : ""}
                parseDate={str => new Date(str)}
                value={this.props.value}
                placeholder={"M/D/YYYY"}
                onChange={(date) =>{
                    const ret = {target: { value: date, name: this.props.name }};
                    if (this.props.onChange){
                        this.props.onChange(ret)
                    }
                }}
            />
       )
   } 
}
interface IMyDateInputProps{
    name: string;
    value: Date;
    onChange(event: any): any;
}
export default MyDateInput;