/* Totality of props received. Usually left empty */
export interface IProps extends IDispatchProps, IValueProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
}