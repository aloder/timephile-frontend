import * as Moment from 'moment';
import * as React from 'react';

import { Cell, Column } from '@blueprintjs/table';

import { IUserProps } from '../AuthRequired';
import MyTable from './MyTable';
import { Query } from 'react-apollo';
import { TIME_LOGS } from '../graphql/query';
import TimeEntry from '../TimeEntry/TimeEntry';
import TimeTag from '../TimeTag/TimeEntry';

class Home extends React.Component<IUserProps>{
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
        return (
            <Query query={TIME_LOGS} variables={{ userId: this.props.me.id }} fetchPolicy="cache-and-network">
                {({loading, error, data, client}) => {
                    if (loading) {
                        return (<div />);
                    }
                    if (error) {
                        return (`error ${error}`);
                    }
                    const format: { [key: string] : (obj: any) => string } = {};
                    /* tslint:disable:no-string-literal */
                    format['startTime'] = (date: any) => formatTime(date, "h:mm a");
                    format['endTime'] = (date: any) => formatTime(date, "h:mm a"); 
                    format['Date'] = (date: any) => formatTime(date, "l");
                    return (
                        <div>
                            <MyTable 
                                titles={['Title', 'Text', 'Date','Start', 'End']}
                                data={data.timeLogs} 
                                format={format}
                                layout={['title', 'text', 'startTime', 'startTime', 'endTime']}
                            />
                            <TimeEntry me={this.props.me} />
                            <TimeTag me={this.props.me} />
                        </div>
                    );
                }}
                
            </Query>
        );
    }
}

const formatTime = (date: any, formatStr: string, notValidRet: string = "") =>{
    const m = Moment(date);
    if(m.isValid()){
        return m.format(formatStr)
    }
    return notValidRet;
}
export default Home;
