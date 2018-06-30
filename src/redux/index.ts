import { flatten } from 'lodash';
import { combineReducers, compose } from 'redux';

function getAllModules(): IReduxModule[] {
    const r = (require as any).context('./', true, /^.*entry.tsx$/);
    return r.keys()
        .reduce((acc: any, curr: any) => {
            const m = r(curr).default;
            if (m && m.moduleName) {
                acc.push({
                    ...m,
                    path: curr,
                });
            }
            return acc;
        }, [])
        .sort((a: any, b: any) => { // sort modules
            return (a.order ? a.order : 0) - (b.order ? b.order : 0);
        });
}

export const importModules: IReduxModule[] = getAllModules();

const getArrayByKey = (key: any): any[] => {
    return importModules.reduce((acc: any, m) => {
        if (m[key]) {
            acc.push(m[key]);
        }
        return acc;
    }, []);
};

export const middlewares: any[] = flatten(getArrayByKey('middlewares'));
export const enhancer: any = compose(...flatten(getArrayByKey('enhancers')));
export const reducerEnhancers: any = compose(...flatten(getArrayByKey('reducerEnhancers')));
export const reducer: any = combineReducers(getArrayByKey('reducers').reduce((acc, r) => ({ ...acc, ...r }), {}));
export const initialState: any = getArrayByKey('initialState').reduce((acc, r) => ({ ...acc, ...r }), {});
export const enhanceComponent: any = compose(...getArrayByKey('render'));
export const onStoreCreate = getArrayByKey('onStoreCreate');