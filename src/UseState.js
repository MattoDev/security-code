import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  // console.log(value);

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (event) => {
    setState({
      ...state,
      value: event.target.value,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

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
          onChange={(event) => {
            // setError(false);
            onWrite(event);
          }}
        />
        <button onClick={() => onCheck()}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos Confirmacion, ¿Estas seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
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
            onReset();
          }}
        >
          Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
