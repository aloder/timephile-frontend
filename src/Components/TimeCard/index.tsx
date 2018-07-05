import { Card, Intent, Tag } from '@blueprintjs/core';
import * as Moment from 'moment';
import * as React from 'react';
import { timeLogs_timeLogs_tags } from '../../schemaTypes';
import { ITimeCardProps } from './shared';


class TimeCard extends React.Component<ITimeCardProps>{
  public constructor(props: ITimeCardProps){
    super(props);
  }

  public render(){
    const {id, title, text, date, startTime, endTime, totalTime, tags} = this.props;
    let timeHeader = null;
    if(startTime == null || endTime == null){
      timeHeader = (<h4 style={{display: 'inline'}}>{totalTime} Minutes</h4>);
    } else {
      timeHeader =(
        <h3 style={{display: 'inline'}}>
          {Moment(startTime).format('LT')} - {Moment(endTime).format('LT')}
         </h3>);
    }
    const tagBubbles:Array<React.ReactElement<React.StatelessComponent>> = []
    if (tags != null){
      for(const tag of tags){
        tagBubbles.push(TagBubble(tag!));
      }
    }
    return(
      <Card id={id}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          {timeHeader}
          <span>{tagBubbles}</span>
        </div>
        <h4>{title}</h4>
        <p>{text}</p>
        <p>{Moment(date).format('l')}</p>
      </Card>
    )
  }
}

const TagBubble = (tag:timeLogs_timeLogs_tags) => (
  <Tag intent={Intent.PRIMARY} key={tag.id}> {tag.name}</Tag>
)
export default TimeCard;