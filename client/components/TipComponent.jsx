import React, { Component } from 'react';

const TipComponent = (props) => (

  <div className="tip">

    <h2 className="header tip-piece">{props.header}</h2>
    <p className="blurb tip-piece">{props.blurb}</p>

    <div className="tags tip-piece">
      {props.tags && props.tags.map((el, i) => (
        <div className="tag" key={`${el}Tag_${i}`}>{el}</div>
      ))}
    </div>

    <div className="votes tip-piece">
      <h3 onClick={() => { props.upvote(props.id) }}><i className="fas fa-arrow-alt-circle-up"></i></h3>
      <h1>{props.votes}</h1>
      <h3 onClick={() => { props.downvote(props.id) }}><i className="fas fa-arrow-alt-circle-down"></i></h3>
    </div>

    <div className="timestamp tip-piece">{props.timestamp}</div>

  </div>
);

export default TipComponent;