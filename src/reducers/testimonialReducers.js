import {
    LOAD_TESTIMONIAL_SUCCESS,
    UPDATE_TESTIMONIAL_SUCCESS,
    CREATE_TESTIMONIAL_SUCCESS,
    DELETE_TESTIMONIAL_SUCCESS
} from '../constants/ActionTypes';


export default function testimonialReducer(state = null, action) {
    switch (action.type) {
        case LOAD_TESTIMONIAL_SUCCESS:
            return action.testimonial;
        case CREATE_TESTIMONIAL_SUCCESS:
            if (state === null) {
                return [Object.assign({}, action.testimonial)]
            }
            return [...state.filter(testimonial => testimonial._id !== action.testimonial._id),
                Object.assign({}, action.testimonial)
            ];
        case UPDATE_TESTIMONIAL_SUCCESS:
            return [...state.filter(testimonial => testimonial._id !== action.testimonial._id),
                Object.assign({}, action.testimonial)
            ];
        case DELETE_TESTIMONIAL_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfCatToDelete = state.findIndex(testimonial => {
                return testimonial._id === action.testimonial._id
            })
            newState.splice(indexOfCatToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
