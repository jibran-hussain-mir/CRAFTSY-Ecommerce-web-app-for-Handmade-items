const reducer = (state, action) => {
  switch (action.type) {
    case "SINGLE_PRODUCT_API_DATA":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };
    case "SINGLE_PRODUCT_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
