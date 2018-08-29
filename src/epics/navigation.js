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
		.ofType("ON_NAVIGATE_DEEPER_CLICK")
		.observeOn(asyncScheduler)
		.throttleTime(500)
		.map(a => {
			switch (a.type) {
				case "ON_NAVIGATE_DEEPER_CLICK":
					return NavigationActions.navigate({
						routeName: "TreeObserverScreen",
						params: {
							currentPath: a.newPath
						}
					});

				default:
					return undefined;
			}
		})
		.filter(a => a !== undefined)
		.do(a => navigationService.dispatch(a))
		.mergeMap(_ => Observable.empty());
};
