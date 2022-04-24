import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log("Empezando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: "CONFIRM",
          });
          // setError(true);
        } else {
          dispatch({
            type: "ERROR",
          });
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
          onChange={(event) => {
            // setError(false);
            dispatch({
              type: "WRITE",
              payload: event.target.value,
            });
            // onWrite(event);
          }}
        />
        <button
          onClick={() =>
            dispatch({
              type: "CHECK",
            })
          }
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos Confirmacion, ¿Estas seguro?</p>
        <button
          onClick={() => {
            dispatch({
              type: "DELETE",
            });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
          }}
        >
          No, cancelar
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
          }}
        >
          Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "paradigma",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  CONFIRM: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  DELETE: {
    ...state,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  WRITE: {
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
