import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount");
  // }

  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  componentDidUpdate() {
    console.log("Actualizacion");
    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        this.setState({ loading: false });
        // setLoading(false);
        console.log("terminando la validacion");
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {this.state.error && <p>Error: el codigo es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input placeholder="Codigo de seguridad" />
        <button onClick={() => this.setState({ loading: !this.state.loading })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
