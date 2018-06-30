import { LOCATION_CHANGE, push } from 'connected-react-router';
import { call, put, select, take } from 'redux-saga/effects';

export function* redirect(url: string) {
    yield put(push(url));
}

export function* onLocationChange(url: string, func: any, triggerOnStartUp = true) {
    let previousStore = null;
    let currentStore = yield select((s: any) => s.router.location);
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        previousStore = currentStore;
        currentStore = yield select((s: any) => s.router.location);
        if (action.payload.pathname === url && (triggerOnStartUp || previousStore !== null)) {
            yield call(func, action);
        }
    }
}