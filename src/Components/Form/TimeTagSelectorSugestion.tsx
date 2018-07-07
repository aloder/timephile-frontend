import { MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import * as React from 'react';
import { Query } from 'react-apollo';

import { ME, TIME_TAGS } from '../../graphql/query';
import { timeTags, timeTags_timeTags, timeTagsVariables } from '../../schemaTypes';
import { ValueToFormik } from './Shared';


const TagSelect = Suggest.ofType<timeTags_timeTags>();

class TimeTagSelectorSuguestion extends React.Component<any, {value?: timeTags_timeTags, filter: string }> {
    public constructor(props: any){
        super(props);
        this.state = { filter: "" }
    }
    public handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        if(this.props.onChange){
           this.props.onChange(event);
        }
    }
    public handleQueryChange(event:any){
        this.setState({filter: event.target.value});
    }
    public render(){
        return(
            <Query query={ME}>
            {({data: { me }})=>{
                if (!me){
                    return;
                }
                return (
                <Query<timeTags, timeTagsVariables> query={TIME_TAGS} variables={{ userId: me.id }}> 
                {({ loading, error, data, client })=>{
                    const filter: timeTags_timeTags[] = [];
                    if (data != null && data.timeTags != null ){
                        for (const tag of data.timeTags){
                            if(tag != null && tag.name.toLowerCase().startsWith(this.state.filter.toLowerCase())){
                                filter.push(tag);
                            }
                        }
                    }
                    return (
                            <TagSelect
                                inputValueRenderer={(tag) => tag.name}
                                items={filter}
                                inputProps={{ 
                                    onChange:(event:any) => this.handleQueryChange(event)
                                }}
                                itemRenderer={({ name, color }) => 
                                    <MenuItem 
                                        style={{
                                            backgroundColor: color,
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: 'bolder',
                                            margin: 2,
                                            textAlign: 'center'
                                        }} text={name} />}
                                onItemSelect={(tag) => {
                                    this.handleChange(ValueToFormik(tag.id, ""));
                                    this.setState({ value: tag });
                                }}
                                noResults={<MenuItem disabled={true} text="No results."/>}
                                popoverProps={{minimal: true}}
                                openOnKeyDown={true}
                            />
                    );
                }}            
                </Query>
                )

            }}
            </Query>
        );
    }
}
export default TimeTagSelectorSuguestion;