import * as types from '../constants/actionTypes';

const initialState = {
  zipCode: '',
  currentTips: [
    {
      id: 1,
      header: 'Test Tip',
      blurb: 'This is a test tip',
      timestamp: 'Dec 2019',
      zip: '90039',
      votes: 10,
      tags: ['Food', 'Nature']
    },
    {
      id: 2,
      header: 'BAD BOY',
      blurb: 'There\'s a BAD BOY in VENICE!!! WATCH OUT!',
      timestamp: 'Dec 2019',
      zip: '90039',
      votes: 2,
      tags: ['Sketchy', 'Free']
    },
    {
      id: 3,
      header: 'PARTY TIME',
      blurb: 'There\'s a PARTY in VENICE!!! COME HERE!',
      timestamp: 'Dec 2019',
      zip: '90291',
      votes: 9,
      tags: ['Food', 'Free', 'Meetup']
    },
  ],
  tag: '',
  tempTips: [],
  toggleAddTipsButton: false,
  inputHeader: '',
  inputBlurb: '',
  inputLocation: '',
  tagList: [],
  toggleTagsDropdown: false,
};

const tipsReducer = (state = initialState, action) => {

  let zipCode;
  let currentTips;

  switch (action.type) {
    //////////
    case types.GET_ZIP_CODE:
      if (action.payload) {
        zipCode = action.payload;

        return {
          ...state,
          zipCode,
        };
      }
      else return state;
    //////////
    case types.GET_LOCAL_TIPS:
      if (state.zipCode) {

        //ADD DATABASE FETCHING LOGIC HERE
        //HERE, ALL TIPS COINCIDING WITH USER-CHOSEN ZIP CODE
        //SHOULD FILL AN ARRAY TO BE DISPLAYED IN TipsContainer.jsx
        fetch(`/tips/findTips/${state.zipCode}`)
          .then(response => response.json())
          .then(data => {
            console.log('Response from fetch request to findTips');
            console.log(data.tips);
            currentTips = data.tips;

            return {
              ...state,
              currentTips,
            };
          })
          .catch(err => {
            console.log('Error in fetch to findTips', err);

            return;
          });
      }
      else return state;

    //////////
    case types.UPVOTE:

      currentTips = [...state.currentTips]
      for (let i = 0; i < currentTips.length; i++) {
        if (currentTips[i].id === action.payload) {
          currentTips[i].votes++;
          console.log('UPVOTED', currentTips[i].header);
          //ADD DATABASE UPVOTE PUT-LOGIC HERE
          //POTENTIALLY UPDATE STATE TO AVOID A SECOND /GET REQUEST??
          fetch(`/tips/updateVotes/${currentTips[i].id}`, {
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            body: {
              votes: JSON.stringify({
                votes: currentTips[i].votes
              })
            }
          })
            .then(data => console.log(data.rows[0]))
            .catch(err => console.log(err));
        }
      }
      return {
        ...state,
        currentTips,
      };

    //////////
    case types.DOWNVOTE:

      currentTips = [...state.currentTips]
      for (let i = 0; i < currentTips.length; i++) {
        if (currentTips[i].id === action.payload) {
          currentTips[i].votes--;
          console.log('DOWNVOTED', currentTips[i].header);
          //ADD DATABASE UPVOTE PUT-LOGIC HERE
          //POTENTIALLY UPDATE STATE TO AVOID A SECOND /GET REQUEST??
          fetch(`/tips/updateVotes/${currentTips[i].id}`, {
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            body: {
              votes: JSON.stringify({
                votes: currentTips[i].votes
              })
            }
          })
            .then(data => console.log(data.rows[0]))
            .catch(err => console.log(err));
        }
      }
      return {
        ...state,
        currentTips,
      };

//////////
    case types.TOGGLE_ADD_TIPS_BUTTON:
      return { 
        ...state,
        toggleAddTipsButton: !state.toggleAddTipsButton,
      };
      

////////// FOR DEVELOPMENT ONLY
case types.GET_DUMMY_TIPS:
  if(!state.zipCode) {
    currentTips = [
      {
        id: 1,
        header: 'Test Tip',
        blurb: 'This is a test tip',
        timestamp: 'Dec 2019',
        zip: '90039',
        votes: 10,
        tags:['Food', 'Nature']
      },
      {
        id: 2,
        header: 'BAD BOY',
        blurb: 'There\'s a BAD BOY in VENICE!!! WATCH OUT!',
        timestamp: 'Dec 2019',
        zip: '90039',
        votes: 2,
        tags:['Sketchy', 'Free']
      },
    ]
    return {
      ...state,
      currentTips,
    };
  }
  else return state;
//////////

case types.INPUT_HEADER:
  return {
    ...state,
    inputHeader: action.payload,
  }
//////////

case types.INPUT_BLURB:
  return { 
    ...state,
    inputBlurb: action.payload,
  }

//////////

case types.INPUT_LOCATION:
  return { 
    ...state,
    inputLocation: action.payload,
  }

//////////
case types.TOGGLE_TAGS_DROPDOWN:
  return { 
    ...state,
    toggleTagsDropdown: !state.toggleTagsDropdown,
  }
    ////////// FOR DEVELOPMENT ONLY
    // case types.GET_DUMMY_TIPS:
    //   if(!state.zipCode) {
    //     currentTips = [
    //       {
    //         id: 1,
    //         header: 'Test Tip',
    //         blurb: 'This is a test tip',
    //         timestamp: 'Dec 2019',
    //         zip: '90039',
    //         votes: 10,
    //         tags:['Food', 'Nature']
    //       },
    //       {
    //         id: 2,
    //         header: 'BAD BOY',
    //         blurb: 'There\'s a BAD BOY in VENICE!!! WATCH OUT!',
    //         timestamp: 'Dec 2019',
    //         zip: '90039',
    //         votes: 2,
    //         tags:['Sketchy', 'Free']
    //       },
    //     ]
    //     return {
    //       ...state,
    //       currentTips,
    //     };
    //   }
    //   else return state;
    //////////
    default: {
      return state;
    }
  }
}

export default tipsReducer;