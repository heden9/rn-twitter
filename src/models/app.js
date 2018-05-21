export default {
    namespace: 'app',
    state: {
        theme: {

        }
    },
    reducers: {
        save(state) { return state + 1 },
    },
    effects: {
        *fetch(action, { call, put }) {

        },
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({type: 'add'});
        },
    },
}