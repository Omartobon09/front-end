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

const CreateUser = () => {
  const toast = useRef(null);
  const [typesUsers, setTypesUser] = useState([]);
  const { control, handleSubmit, reset } = useForm();
  const genders = [
    {
      name: "Masculino",
    },
    {
      name: "Femenino",
    },
  ];
  const typesDocs = [
    {
      name: "Cedula",
    },
    {
      name: "Tarjeta de identidad",
    },
    {
      name: "Pasaporte",
    },
    {
      name: "DNI",
    },
  ];
  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:8000/insertar/usuarios", {
        ...data,
        Genero: data.Genero.name,
        IdTipoUsuario: data.IdTipoUsuario.IdTipoUsuario,
        TipoDocumento: data.TipoDocumento.name,
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

  const getTypesUsers = () => {
    axios
      .get("http://127.0.0.1:8000/listar/tiposusuario")
      .then((response) => setTypesUser(response.data.resultado));
  };
  useEffect(() => {
    getTypesUsers();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Crear usuario</h5>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="Nombre"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Nombre</label>
                    <InputText
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
          <div className="field col">
            <Controller
              name="Apellido"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Apellido</label>
                    <InputText
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
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="IdTipoUsuario"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Tipo de Usuario</label>
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={typesUsers}
                      optionLabel="NombreTipoUsuario"
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
              name="TipoDocumento"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Tipo de Documento</label>
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={typesDocs}
                      optionLabel="name"
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
              name="NumeroDocumento"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Numero de documento</label>
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": fieldState.error })}
                      useGrouping={false}
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
              name="CorreoElectronico"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Correo Electronico</label>
                    <InputText
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
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="Telefono"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Telefono</label>
                    <InputText
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
          <div className="field col">
            <Controller
              name="Genero"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Genero</label>
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={genders}
                      optionLabel="name"
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
              name="Contraseña"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Contraseña</label>
                    <InputText
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
        <Button type="submit" label="Submit" />
      </form>
    </>
  );
};

export default CreateUser;
