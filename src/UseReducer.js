import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  const onWrite = (event) =>
    dispatch({ type: actionTypes.write, payload: event.target.value });

  React.useEffect(() => {
    console.log("Empezando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        if (state.value === SECURITY_CODE) {
          onConfirm();
          // setError(true);
        } else {
          onError();
        }

        // setLoading(false);
        console.log("terminando la validacion");
      }, 3000);
    }
    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos Confirmacion, ¿Estas seguro?</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>No, cancelar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={onReset}>Resetear, volver atras</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
  write: "WRITE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
