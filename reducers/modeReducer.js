import { LIGHT_MODE, DARK_MODE } from "../constants/modeConstants";


export const modeReducer = (state = {mode:"light"},action) =>{
    switch(action.type){
        case DARK_MODE:
            return{
                ...state,
                mode:"dark"
            }
        case LIGHT_MODE:
            return {
                ...state,
                mode:"light"
            }
        default: 
            return{
                ...state,
            }            
        }    
    }
