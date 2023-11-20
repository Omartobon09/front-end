"use client";
import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from 'next/navigation';

const RecursosPage = () => {
  const router = useRouter();
  const toast = useRef(null);
  const [recursos, setRecursos] = useState([]);

  const getAllRecursos = () => {
    axios
      .get("http://127.0.0.1:8000/listar/recursos")
      .then((response) => setRecursos(response.data.resultado));
  };

  const deleteRecurso = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/eliminar/recursos/${id}`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: response.data.informacion,
          life: 3000,
        });
        return getAllRecursos();
      });
  };

  const actionsTemplate = (data) => {
    return (
      <div className="flex gap-2">
        <Button
          outlined
          icon="pi pi-trash"
          onClick={() => deleteRecurso(data.IdRecurso)}
        />
        <Button
          outlined
          icon="pi pi-pencil"
          onClick={() => {
            localStorage.setItem('resourceEdit', JSON.stringify(data));
            return router.push(`/admin/appeal/edit/${data.IdRecurso}`);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    getAllRecursos();
  }, [null]);

  return (
    <>
      <Toast ref={toast} />
      <div>
        <h3>Lista de Recursos</h3>
        <DataTable
          showGridlines
          stripedRows
          value={recursos}
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="100vh"
        >
          <Column header="Acciones" body={actionsTemplate}></Column>
          <Column sortable field="IdRecurso" header="Id Recurso"></Column>
          <Column field="NombreRecurso" header="Nombre Recurso"></Column>
          <Column field="DescripcionRecurso" header="Descripción Recurso"></Column>
          <Column field="IdEstadoRecurso" header="Id Estado Recurso"></Column>
          <Column field="CantidadRecurso" header="Cantidad Recurso"></Column>
          <Column field="ObservacionesRecurso" header="Observaciones Recurso"></Column>
          <Column field="FechaAdquisicion" header="Fecha Adquisición"></Column>
          <Column field="Proveedor" header="Proveedor"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default RecursosPage;
