import { Cell, Column } from '@blueprintjs/table';
import * as React from 'react';
import { Query } from 'react-apollo';

import { IUserProps } from '../AuthRequired';
import { TIME_LOGS } from '../graphql/query';
import MyTable from './MyTable';

class Home extends React.Component<IUserProps>{
    public cellRender(rowIndex: number, columnIndex: number){
        return <Cell>{this}</Cell>
    }
    public tableColumn(name: string, columnIndex: number){
        return <Column name={name} cellRenderer={(rowIndex) => this.cellRender(rowIndex, columnIndex)}/>
    }
    public render(){
        console.warn(this.props);
        if (!this.props.me) {
            return;
        }
        return (
            <Query query={TIME_LOGS} variables={{ userId: this.props.me.id }}>
                {({loading, error, data, client}) => {
                    if (loading) {
                        return (<div />);
                    }
                    if (error) {
                        return (`error ${error}`);
                    }
                    console.warn(data);
                    return (
                        <MyTable data={data.timeLogs} layout={['title', 'text', 'startTime', 'endTime']} />
                    );
                }}
                
            </Query>
        );
    }
}
export default Home;