// want to pull all my user reducer logic that I set up in new place
import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // we have to through all the inputs we have in fom state to see if all these states are valid
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        // we need to update input state and the overal form validity state
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    // if the overal form is valid
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    // we want to manage overall validity and values of the entire form.
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
  // we wrap it in useCallback so that is stored by react and not recreated unnecesarily
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  // our hook has to return something. since we are not interested about the state inside of the hook but in the place that we are using the hook. we have to share the handlers with the component which uses our custom hook.
  // we can return text/object/array ...
  return [formState, inputHandler, setFormData];
};
