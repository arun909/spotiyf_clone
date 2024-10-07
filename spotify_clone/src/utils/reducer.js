import Playlists from "../components/Playlists";
import { reducerCases } from "./Constants";

 export const initialState = {
     token: null,
     Playlists: [],
     
    };
const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN :{
            return {
                ...state,
                token: action.token,
            };
        }
        case reducerCases.SET_PLAYLISTS:{
            return {
                ...state,
                playlists: action.playlists,
            };
        }
        default: 
        return state;
    }
};

export default reducer;