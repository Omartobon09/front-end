"use client";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const CreateRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useRef(null);
  const [TypeResource, setResource] = useState([]);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("data", data);
    axios
      .post("http://127.0.0.1:8000/insertar/solicitudes", {
        ...data,
        IdEstadoSolicitud: 1,
        IdRecurso: data.IdRecurso.IdRecurso,
        ObservacionesSolicitud: data.ObservacionesSolicitud,
        IdUsuario: user.IdUsuario,
        FechaSolicitud: "",
        FechaAprobacionRechazo: "",
      })
      .then((response) => {
        reset({ ObservacionesSolicitud: "" });
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.informacion,
          life: 3000,
        });
      });
  };

  const getResource = () => {
    axios
      .get("http://127.0.0.1:8000/listar/recursos")
      .then((response) => setResource(response.data.resultado));
  };

  useEffect(() => {
    getResource();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Crear solicitud</h5>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="IdRecurso"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Seleccione el recurso</label>
                    <Dropdown
                      style={{ width: "400px" }}
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={TypeResource}
                      optionLabel="NombreRecurso"
                      focusInputRef={field.ref}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                    {fieldState.error && (
                      <small className="text-red-600">Campo requerido</small>
                    )}
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="ObservacionesSolicitud"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>
                      Observaciones de la solicitud
                    </label>
                    <InputText
                      style={{ width: "400px" }}
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                    {fieldState.error && (
                      <small className="text-red-600">Campo requerido</small>
                    )}
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <Button type="submit" label="Agregar" />
      </form>
    </>
  );
};

export default CreateRequest;
