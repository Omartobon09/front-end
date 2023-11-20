"use client";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const CreateResource = () => {
  const toast = useRef(null);
  const [statusrequest, setStatusRequest] = useState([]);
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:8000/insertar/recursos", {
        ...data,
        IdEstadoRecurso: data.IdEstadoRecurso.IdEstadoRecurso,
      })
      .then((response) => {
        reset();
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.informacion,
          life: 3000,
        });
      });
  };

  const getStatusRequest = () => {
    axios
      .get("http://127.0.0.1:8000/listar/estadosrecurso")
      .then((response) => setStatusRequest(response.data.resultado));
  };
  useEffect(() => {
    getStatusRequest();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Agregar Recurso</h5>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="NombreRecurso"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="NombreRecurso">Nombre del Recurso</label>
                  <InputText id="NombreRecurso" {...field} />
                </div>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="DescripcionRecurso"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="DescripcionRecurso">
                    Descripción del Recurso
                  </label>
                  <InputText id="DescripcionRecurso" {...field} />
                </div>
              )}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="IdEstadoRecurso"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Estado del Recurso</label>
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={statusrequest}
                      optionLabel="NombreEstadoRecurso"
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
          <div className="field col">
            <Controller
              name="CantidadRecurso"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="CantidadRecurso">Cantidad del Recurso</label>
                  <InputText id="CantidadRecurso" {...field} />
                </div>
              )}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="ObservacionesRecurso"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="ObservacionesRecurso">
                    Observaciones del Recurso
                  </label>
                  <InputText id="ObservacionesRecurso" {...field} />
                </div>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="FechaAdquisicion"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="FechaAdquisicion">Fecha de Adquisición</label>
                  <InputText id="FechaAdquisicion" {...field} />
                </div>
              )}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="Proveedor"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column">
                  <label htmlFor="Proveedor">Proveedor</label>
                  <InputText id="Proveedor" {...field} />
                </div>
              )}
            />
          </div>
        </div>
        <Button type="submit" label="Agregar Recurso" />
      </form>
    </>
  );
};

export default CreateResource;
