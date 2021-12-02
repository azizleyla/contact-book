const initialState = {
  contacts: localStorage.getItem("contacts")
    ? JSON.parse(localStorage.getItem("contacts"))
    : [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      localStorage.setItem(
        "contacts",
        JSON.stringify([...state.contacts, action.payload]),
      );
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "DELETE_CONTACT":
      const newContact = state.contacts.filter(
        (user) => user.id !== action.payload,
      );
      localStorage.setItem("contacts", JSON.stringify(newContact));
      return {
        ...state,
        contacts: newContact,
      };
    case "CLEAR_ALL":
      return {
        contacts: [],
      };
    case "UPDATE_CONTACT":
      const updatedState = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact,
      );
      localStorage.setItem("contacts", JSON.stringify(updatedState));

      return {
        ...state,
        contacts: updatedState,
      };

    default:
      return state;
  }
};
export default contactReducer;
