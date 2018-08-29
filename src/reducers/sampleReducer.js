// @flow
import type {Actions} from "../actions";

type State = {};

const defaultState: State = {};

export default (state: State = defaultState, action: Actions): State => {
	switch (action.type) {
		default:
			return state;
	}
};
