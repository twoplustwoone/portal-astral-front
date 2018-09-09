export interface IState {
  is: {
    loading: {
      admins: boolean;
    };
  };
}

const initialState: IState = {
  is: {
    loading: {
      admins: false,
    },
  },
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default reducer;