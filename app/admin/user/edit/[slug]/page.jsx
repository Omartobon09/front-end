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
  const infouser = JSON.parse(localStorage.getItem("useredit"));
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
      .put("http://127.0.0.1:8000/actualizar/usuarios/" + infouser.IdUsuario, {
        ...data,
        Genero: data.Genero.name,
        IdTipoUsuario: data.IdTipoUsuario.IdTipoUsuario,
        TipoDocumento: data.TipoDocumento.name,
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
  const typeUsers = [
    {
      IdTipoUsuario: 1,
      NombreTipoUsuario: "Estudiante",
      Descripcion: "Personas que están inscritas en una institución educativa.",
    },
    {
      IdTipoUsuario: 2,
      NombreTipoUsuario: "Profesor",
      Descripcion: "Personas que enseñan en una institución educativa.",
    },
    {
      IdTipoUsuario: 3,
      NombreTipoUsuario: "Personal de Administración",
      Descripcion:
        "Personas que trabajan en labores administrativas en una institución educativa.",
    },
  ];
  const payload = {
    ...infouser,
    infoIdTipoUsuario: typeUsers.filter(
      (type) => type.IdTipoUsuario == infouser.IdTipoUsuario
    )[0],
    infoGender: genders.filter((gender) => gender.name == infouser.Genero)[0],
    infoTypeDoc: typesDocs.filter(
      (type) => type.name == infouser.TipoDocumento
    )[0],
  };
  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Editar usuario</h5>
        <div className="formgrid grid">
          <div className="field col">
            <Controller
              name="Nombre"
              control={control}
              rules={{ required: true }}
              defaultValue={payload.Nombre}
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
              defaultValue={payload.Apellido}
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
              defaultValue={payload.infoIdTipoUsuario}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-column">
                    <label htmlFor={field.name}>Tipo de Usuario</label>
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={typeUsers}
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
              defaultValue={payload.infoTypeDoc}
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
              defaultValue={payload.NumeroDocumento}
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
              defaultValue={payload.CorreoElectronico}
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
              defaultValue={payload.Telefono}
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
              defaultValue={payload.infoGender}
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
              defaultValue={infouser.Contraseña}
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
        <Button type="submit" label="Actualizar" icon={"pi pi-user-edit"} />
      </form>
    </>
  );
}
