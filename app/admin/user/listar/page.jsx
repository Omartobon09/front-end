"use client";
import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
const AdminPage = () => {
  const router = useRouter();
  const toast = useRef(null);
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    axios
      .get("http://127.0.0.1:8000/listar/usuarios")
      .then((response) => setUsers(response.data.resultado));
  };
  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:8000/eliminar/usuarios/${id}`).then((rs) => {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: rs.data.informacion,
        life: 3000,
      });
      return getAllUsers();
    });
  };
  const actionsTemplate = (data) => {
    return (
      <div className="flex gap-2">
        <Button
          outlined
          icon="pi pi-trash"
          onClick={() => deleteUser(data.IdUsuario)}
        />
        <Button
          outlined
          icon="pi pi-user-edit"
          onClick={() => {
            localStorage.setItem("useredit", JSON.stringify(data));
            return router.push(`/admin/user/edit/${data.IdUsuario}`);
          }}
        />
      </div>
    );
  };
  useEffect(() => {
    getAllUsers();
  }, [null]);

  return (
    <>
      <Toast ref={toast} />
      <div>
        <h3>Lista de usuarios</h3>
        <DataTable
          showGridlines
          stripedRows
          value={users}
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="100vh"
        >
          <Column header="Acciones" body={actionsTemplate}></Column>
          <Column sortable field="IdUsuario" header="Id usuario"></Column>
          <Column field="Nombre" header="Nombre"></Column>
          <Column field="Apellido" header="Apellido"></Column>
          <Column field="IdTipoUsuario" header="Id Tipo Usuario"></Column>
          <Column field="TipoDocumento" header="Tipo de Documento"></Column>
          <Column field="NumeroDocumento" header="Numero Documento"></Column>
          <Column
            field="CorreoElectronico"
            header="Correo electronico"
          ></Column>
          <Column
            field="Telefono"
            style={{ minWidth: "200px" }}
            header="Numero de telefono"
          ></Column>
          <Column field="Genero" header="Genero"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default AdminPage;
