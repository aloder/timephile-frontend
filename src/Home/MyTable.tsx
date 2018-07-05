import { Cell, Column, IColumnProps, Table, TableLoadingOption } from '@blueprintjs/table';
import * as React from 'react';

class MyTable extends React.Component<IMyTableProps, IMyTableStates>{
    public constructor(props:IMyTableProps){
        super(props);
        this.state = {loading: true};
    }
    public cellRender(rowIndex: number, columnIndex: number){
        const { format, data, layout, titles } = this.props;
        const element = layout[columnIndex];
        if (typeof data == null) {
            return <div />;
        }
        if (typeof data[rowIndex] == null){
            return <div />
        }
        let value = data[rowIndex]![element];
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
        const { loading, data } = this.props;
        const length = (data) ? data.length : 100;
        const loadingOptions = (loading) ? [TableLoadingOption.CELLS] : undefined;
        return (
            <div>
                <Table
                    numRows={length}
                    loadingOptions={loadingOptions}
                    enableGhostCells={true}
                    enableFocusedCell={true}
                    >
                    {(!loading) ?this.RenderTable() : undefined}
                </Table>
            </div>
        );
    }
}

interface IMyTableProps {
    data: Array<(object | null)>;
    layout: string[];
    titles?: string[];
    format?: { [key: string]: ((obj: object) => string)};
    loading: boolean
}
interface IMyTableStates {
    loading: boolean;
}

export default MyTable;
