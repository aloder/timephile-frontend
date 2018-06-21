import * as React from 'react';

import { Table as BlueTable, Cell, Column, IColumnProps } from '@blueprintjs/table';

class MyTable extends React.Component<IMyTableProps>{
    public cellRender(rowIndex: number, columnIndex: number){
        const { format, data, layout, titles } = this.props;
        const element = layout[columnIndex];
        let value = data[rowIndex][element];
        if (format && titles && format[titles[columnIndex]]){
            value = format[titles[columnIndex]](value);
        } else {
            if (format && format[element]){
                value = format[element](value);
            }
        }
        return <Cell key={`cell-${rowIndex}-${columnIndex}`}>{value}</Cell>
    }
    public tableColumn(name: string, columnIndex: number){
        return <Column key={`col-${name}`} name={name} cellRenderer={(rowIndex) => this.cellRender(rowIndex, columnIndex)}/>
    }
    public RenderTable(): Array<React.ReactElement<IColumnProps>>{
        const col = []
        for (let i = 0; i < this.props.layout.length; i++) {
            let element = this.props.layout[i];
            if (this.props.titles) {
                element = this.props.titles[i];
            }
            col.push(this.tableColumn(element, i));
        }
        return col;
    }
    public render(){
        return (
            <div>
                <BlueTable numRows={this.props.data.length}>
                    {this.RenderTable()}
                </BlueTable>
            </div>
        );
    }
}

interface IMyTableProps {
    data: object[];
    layout: string[];
    titles?: string[];
    format?: { [key: string]: ((obj: object) => string)};
}

export default MyTable;
