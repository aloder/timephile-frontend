import * as React from 'react';
import CircularSlider from '../CircleSlider';
class SliderPage extends React.Component {
    public render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
                <CircularSlider
                    r={400}
                    trackWidth={50}
                />
            </div>
        )
    }
}
export default SliderPage;