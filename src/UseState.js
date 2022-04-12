import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value);
  React.useEffect(() => {
    console.log("Empezando el efecto");
    if (!!loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);
        console.log("terminando la validacion");
      }, 3000);
    }
    console.log("Terminando el efecto");
  }, [loading]);
  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el codigo de seguridad.</p>
      {error && !loading && <p>Error: el codigo es incorrecto</p>}
      {loading && <p>Cargando...</p>}
      <input
        placeholder="Codigo de seguridad"
        value={value}
        onChange={(event) => {
          // setError(false);
          setValue(event.target.value);
        }}
      />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
