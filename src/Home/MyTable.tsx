import { Cell, Column, IColumnProps, Table as BlueTable } from '@blueprintjs/table';
import * as React from 'react';

class MyTable extends React.Component<IMyTableProps>{
    public cellRender(rowIndex: number, columnIndex: number){
        console.warn(rowIndex, columnIndex)
        console.warn(this.props.data[rowIndex][this.props.layout[columnIndex]]);
        return <Cell>{this.props.data[rowIndex][this.props.layout[columnIndex]]}</Cell>
    }
    public tableColumn(name: string, columnIndex: number){
        return <Column name={name} cellRenderer={(rowIndex) => this.cellRender(rowIndex, columnIndex)}/>
    }
    public RenderTable(): Array<React.ReactElement<IColumnProps>>{
        const col = []
        for (let i = 0; i < this.props.layout.length; i++) {
            const element = this.props.layout[i];
            col.push(this.tableColumn(element, i));
        }
        return col;
    }
    public render(){
        return (
            <BlueTable numRows={this.props.data.length}>
                {this.RenderTable()}
            </BlueTable>
        );
    }
}

interface IMyTableProps {
    data: object[];
    layout: string[];
}

export default MyTable;