/* tslint:disable */
declare module "dva-core" {
  import {
    Reducer,
    AnyAction,
    ReducersMapObject,
    Dispatch,
    MiddlewareAPI,
    StoreEnhancer,
    Store
  } from "redux";
  export type onActionFunc = (api: MiddlewareAPI<any>) => void;

  export type ReducerEnhancer = (reducer: Reducer<any>) => void;

  export interface Hooks {
    onError?: (e: Error, dispatch: Dispatch<any>) => void;
    onAction?: onActionFunc | onActionFunc[];
    onStateChange?: () => void;
    onReducer?: ReducerEnhancer;
    onEffect?: () => void;
    onHmr?: () => void;
    extraReducers?: ReducersMapObject;
    extraEnhancers?: Array<StoreEnhancer<any>>;
  }
  export type DvaOption = Hooks & {
    initialState?: Object;
  };
  export interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any;
    call: Function;
    select: Function;
    take: Function;
    cancel: Function;
    [key: string]: any;
  }
  export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
  export type EffectType = "takeEvery" | "takeLatest" | "watcher" | "throttle";
  export type EffectWithType = [Effect, { type: EffectType }];
  export type Subscription = (api: SubscriptionAPI, done: Function) => void;
  export interface SubscriptionAPI {
    dispatch: Dispatch<any>;
  }
  export interface EffectsMapObject {
    [key: string]: Effect | EffectWithType;
  }
  export interface SubscriptionsMapObject {
    [key: string]: Subscription;
  }
  export type ReducersMapObjectWithEnhancer = [
    ReducersMapObject,
    ReducerEnhancer
  ];
  export interface Model {
    namespace: string;
    state?: any;
    reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer;
    effects?: EffectsMapObject;
    subscriptions?: SubscriptionsMapObject;
  }
  export interface DvaInstance {
    /**
     * Register an object of hooks on the application.
     *
     * @param hooks
     */
    use: (hooks: Hooks) => void;

    /**
     * Register a model.
     *
     * @param model
     */
    model: (model: Model) => void;

    /**
     * Unregister a model.
     *
     * @param namespace
     */
    unmodel: (namespace: string) => void;

    /**
     * Start the application. Selector is optional. If no selector
     * arguments, it will return a function that return JSX elements.
     *
     * @param selector
     */
    start: (selector?: HTMLElement | string) => any;
    getStore: () => Store<any>;
    _store: Store<any>;
  }
  function create(dvaOption: DvaOption): DvaInstance;
}
