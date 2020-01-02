import React, { Component } from 'react';

import TipComponent from '../components/TipComponent.jsx';

class TipsContainer extends Component {
  constructor(props) {
    super(props);
    this.parseTimestamp = this.parseTimestamp.bind(this);
  }

  parseTimestamp(timestamp) {
    const arr = timestamp.split('-');
    const year = arr[0],
      month = arr[1],
      date = arr[2].split(':')[0].split('T')[0];
    const timeArray = [month, date, year];
    return timeArray;
  }

  render() {
    //console.log(this.props.zipCode)
    const DisplayError = (this.props.zipCode.length === 0) ? (<div style={{ color: 'whitesmoke', marginTop: '20px' }}>Please enter a valid ZIP code.</div>) : (
      <div className="tips-container flex flex-wrap">
        {this.props.currentTips.map(el => {
          let parsedTime = this.parseTimestamp(el.timestamp);
          return <TipComponent
            className='tip'
            key={el.id}
            id={el.id}
            header={el.header}
            blurb={el.blurb}
            timestamp={parsedTime}
            zip={el.zip}
            votes={el.votes}
            tags={el.tags}
            upvote={this.props.upvote}
            downvote={this.props.downvote}
          />
        })}
      </div>
    );
    return (<div>{DisplayError}</div>)
  }
}

export default TipsContainer;