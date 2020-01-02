import React, { Component } from 'react';
import AddTipModal from './AddTipModal.jsx';

const Search = props => {
  return ( 
  <div id="search" className="division">
    {console.log("this is the toggleandtipsbutton: ", props.toggleAddTipsButton)}
    <input type="text" placeholder="Zip Code"></input>
    <button> Enter </button>
    <input  
    type = "button" 
    value = "Add a Tip" 
    onClick = { props.toggleAddTipsButton }
    />
    {props.addTipsBoolean? <AddTipModal />: null }
  </div>

  )};

export default Search;
