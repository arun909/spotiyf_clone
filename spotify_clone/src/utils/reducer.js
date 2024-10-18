import Playlists from "../components/Playlists";
import { reducerCases } from "./Constants";
 export const initialState = {
     token: null,
     Playlists: [],
     userinfo: null,
     selectedPlaylistId: "5GguA3kEZrVv6AtETirCQ9",  
     selectedPlaylist: null,
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
        case reducerCases.SET_USER :{
            return {
                ...state,
                userinfo: action.userinfo,
            };
        }
        case reducerCases.SET_PLAYLIST :{
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            };
        }
        default: 
        return state;
    }
};

export default reducer;