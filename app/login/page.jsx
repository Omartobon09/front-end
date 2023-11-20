"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function Formulario() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post("http://127.0.0.1:8000/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        axios.get("http://127.0.0.1:8000/usuario").then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          switch (res.data.IdTipoUsuario) {
            case 1:
              return router.push(`/admin`);
              break;
            case 2:
              return router.push(`/students`);
              break;
            case 3:
              return router.push(`/teachers`);
            default:
              break;
          }
        });
      })
      .then((response) => {
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Correo Electronico o Contraseña Incorrectos");
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Inicio de Sesión
                      </h3>
                    </div>
                    <div className="card-body">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputUsername"
                          type="text"
                          placeholder="Nombre de usuario"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        <label htmlFor="inputUsername">
                          Correo Electronico
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <label htmlFor="inputPassword">Contraseña</label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          id="inputRememberPassword"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inputRememberPassword"
                        >
                          Recordar Contraseña
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <button className="btn btn-primary" type="submit">
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </form>
  );
}

export default Formulario;
