import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/throttleTime";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/observeOn";

import {Observable} from "rxjs/Observable";
import {async as asyncScheduler} from "rxjs/scheduler/async";

import "rxjs/add/observable/empty";

import {NavigationActions} from "react-navigation";

export const navigation = (action$, {getState}, {navigationService}) => {
	return action$
		.ofType("NAVIGATION_SAMPLE")
		.observeOn(asyncScheduler)
		.throttleTime(500)
		.map(a => {
			switch (a.type) {
				case "NAVIGATION_SAMPLE_1":
					return NavigationActions.navigate({
						routeName: "Screen1"
					});

				default:
					return undefined;
			}
		})
		.filter(a => a !== undefined)
		.do(a => navigationService.dispatch(a))
		.mergeMap(_ => Observable.empty());
};
