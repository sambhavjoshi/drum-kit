import {
    ALL_CONTACT_FAIL,
    ALL_CONTACT_REQUEST,
    ALL_CONTACT_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_RESET,
    CREATE_CONTACT_FAIL,
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CLEAR_ERRORS,
    CREATE_CONTACT_RESET,
    SINGLE_CONTACT_FAIL,
    SINGLE_CONTACT_REQUEST,
    SINGLE_CONTACT_SUCCESS
} from "../constants/contactConstants";

export const newContactReducer = (state = {}, action) =>{

    switch (action.type) {
      case CREATE_CONTACT_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case CREATE_CONTACT_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };

      case CREATE_CONTACT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CREATE_CONTACT_RESET:
        return {
          ...state,
          success:false
        }  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
}


export const allContactReducer = (state = {contacts:[]}, action) => {
  switch (action.type) {
    case ALL_CONTACT_REQUEST:
      return {
        loading: true,
        contacts:[]
      };

    case ALL_CONTACT_SUCCESS:
      return {
        loading: false,
        contacts: action.payload,
      };

    case ALL_CONTACT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// delete message reducer
export const deleteContactReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CONTACT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// get single contact
export const singleContactReducer = (state = {contact:{}}, action) => {
  switch (action.type) {
    case SINGLE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contact: action.payload,
      };
    case SINGLE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};