import { Card } from '@blueprintjs/core';
import { Cell, Column } from '@blueprintjs/table';
import * as Moment from 'moment';
import * as React from 'react';
import { Query } from 'react-apollo';

import { IUserProps } from '../AuthRequired';
import CircularSlider, { IArcObj } from '../Components/CircleSlider';
import MyDatePicker from '../Components/Form/MyDatePicker';
import { TIME_LOGS_RANGE } from '../graphql/query';
import TimeEntry from '../TimeEntry/TimeEntry';
import TimeTag from '../TimeTag/TimeTag';
import MyTable from './MyTable';

class Home extends React.Component<IUserProps, IIndexState>{
    public constructor(props: any){
        super(props);
        this.state = {selectedDate: new Date(Moment().format('L'))}
    }
    public onChange(event: any){
        const { value } = event.target;
        if (!value) {
            return;
        }
        this.setState({
            selectedDate: new Date(Moment(value).format('L'))
        })
    }
    public cellRender(rowIndex: number, columnIndex: number){
        return <Cell>{this}</Cell>
    }
    public tableColumn(name: string, columnIndex: number){
        return <Column name={name} cellRenderer={(rowIndex) => this.cellRender(rowIndex, columnIndex)}/>
    }
    public render(){
        if (!this.props.me) {
            return;
        }
        const { selectedDate } = this.state;
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 1);
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection:'column'}}>
                    <Card className='pt-fill'>
                        <h3>Select Date</h3>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <MyDatePicker
                            showActionBar={true} 
                            value={selectedDate} 
                            name="selectedDate" 
                            onChange={(event) => this.onChange(event)} />
                        </div>
                    </Card>
                    <TimeEntry me={this.props.me} />
                    <TimeTag me={this.props.me} />
                </div>
                <div style={{flexGrow: 1, paddingLeft: 5, height: '100%', overflow:'auto'}}>
                    <Query query={TIME_LOGS_RANGE} 
                        variables={{ userId: this.props.me.id, startDate: selectedDate, endDate }} 
                        fetchPolicy="cache-and-network">
                        {({loading, error, data, client}) => {
                            if (error) {
                                return (`error ${error}`);
                            }
                            const format: { [key: string] : (obj: any) => string } = {};
                            /* tslint:disable:no-string-literal */
                            format['startTime'] = (date: any) => formatTime(date, "h:mm a");
                            format['endTime'] = (date: any) => formatTime(date, "h:mm a"); 
                            format['Date'] = (date: any) => formatTime(date, "l");
                            format['tags'] = (tags: any) => {
                                let str = '';
                                if (!tags){
                                    return str;
                                }
                                for (const tag of tags) {
                                    str += tag.name;
                                }
                                return str;
                            };
                            const arcs: IArcObj[] = [];
                            const convertTimeToAngle = (date: Date): number => {
                                const c = new Date(date);
                                const time = c.getMinutes() + c.getHours() * 60;
                                return (Math.abs(time/(24*60)-1) * 360 - 90) %360 ;
                            }
                            if(data && data.timeLogsRange) {
                                for(const r of data.timeLogsRange){
                                    const a1 = convertTimeToAngle(r.startTime);
                                    const a2 = convertTimeToAngle(r.endTime);
                                    console.warn(a1, a2)
                                    arcs.push({ angles: [a1, a2], color: "blue" })
                                }
                            }
                            return (
                                <div>
                                    <Card>
                                        <CircularSlider arcs={arcs}/>
                                    </Card>
                                    <MyTable 
                                        loading={loading}
                                        titles={['Title', 'Text', 'Date','Start', 'End', 'Tags']}
                                        data={data.timeLogsRange} 
                                        format={format}
                                        layout={['title', 'text', 'startTime', 'startTime', 'endTime', 'tags']}
                                    />
                                </div>
                            );
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}
interface IIndexState {
    selectedDate: Date;
}
const formatTime = (date: any, formatStr: string, notValidRet: string = "") =>{
    const m = Moment(date);
    if(m.isValid()){
        return m.format(formatStr)
    }
    return notValidRet;
}
export default Home;
