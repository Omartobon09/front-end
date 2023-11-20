"use client";
import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Page() {
  const toast = useRef(null);
  const { control, handleSubmit } = useForm();
  const inforequest = JSON.parse(localStorage.getItem("resourceEdit"));
  const onSubmit = (data) => {
    axios
      .put("http://127.0.0.1:8000/actualizar/recursos/" + inforequest.IdRecurso, {
        ...data,
        IdEstadoRecurso: data.IdEstadoRecurso.IdEstadoRecurso,
      })
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response.data.informacion,
          life: 3000,
        });
      });
  };

  const statusrequest = [
    {
      IdEstadoRecurso: 1,
      NombreEstadoRecurso: "Disponible",
      Descripcion: "Recurso disponible para préstamo",
    },
    {
      IdEstadoRecurso: 2,
      NombreEstadoRecurso: "En Préstamo",
      Descripcion: "Recurso actualmente en préstamo",
    },
    {
      IdEstadoRecurso: 3,
      NombreEstadoRecurso: "En Mantenimiento",
      Descripcion: "Recurso en proceso de mantenimiento",
    },
    {
      IdEstadoRecurso: 4,
      NombreEstadoRecurso: "No disponible",
      Descripcion: "Recurso no está disponible en este momento",
    },
  ];

  const payload = {
    ...inforequest,
    infoIdEstadoRecurso: inforequest
    ? statusrequest.filter(
        (type) => type.IdEstadoRecurso == inforequest.IdEstadoRecurso
      )[0]
    : null,
  };

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Editar recurso</h5>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="NombreRecurso"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.NombreRecurso}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Nombre del recurso</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="DescripcionRecurso"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.DescripcionRecurso}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Descripción del recurso</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
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
              defaultValue={payload.infoIdEstadoRecurso}
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
                  </div>
                </>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="CantidadRecurso"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.CantidadRecurso}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Cantidad del recurso</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="ObservacionesRecurso"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.ObservacionesRecurso}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Observaciones</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="FechaAdquisicion"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.FechaAdquisicion}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Fecha Adquisicion</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
              )}
            />
          </div>
          <div className="field col">
            <Controller
              name="Proveedor"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.Proveedor}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Proveedor</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <Button type="submit" label="Actualizar" icon="pi pi-user-edit" />
      </form>
    </>
  );
}
