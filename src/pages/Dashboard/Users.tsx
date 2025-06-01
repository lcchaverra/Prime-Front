import React, { useState, useEffect, useRef, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from 'primereact/tag';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getUsers, deleteUser as deleteUserService, saveUser } from "../../services/users.services";
import { formatDate } from "../../utils/formatDate";
import { useToast } from "../../hooks/useToast";
import { ExportReports } from "../../utils/ExportReport";
import { useDebounce } from "../../hooks/useDebounce";

// Interfaces
import { type User, type UserForm } from "../../interface/Users";
import { type ApiError } from "../../interface/Api";

const Users: React.FC = () => {
  // Estados
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [userDialog, setUserDialog] = useState<boolean>(false);
  const [user, setUser] = useState<UserForm>({ id: null, name: "", email: "", password: ""  });

  // Hooks personalizados
  const { toast, showToast } = useToast();
  const debouncedFilter = useDebounce(globalFilterValue, 500);
  
  // Referencias
  const dt = useRef<DataTable<User[]>>(null);

    // Función para manejar errores de la API de forma inteligente
  const handleApiError = (error: unknown, defaultMessage: string) => {
    if (error && typeof error === 'object' && 'message' in error) {
      const apiError = error as ApiError;
      
      // Usar directamente el mensaje del backend
      showToast("error", "Error", apiError.message);
    } else {
      // Fallback para errores no estructurados
      showToast("error", "Error", defaultMessage);
    }
  };

  // Funciones principales
  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      handleApiError(error, "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (): Promise<void> => {
    // Validaciones
    if (!user.name.trim() || !user.email.trim()) {
      showToast("warn", "Advertencia", "Nombre y email son requeridos");
      return;
    }

    if (!user.id && !user.password.trim()) {
      showToast("warn", "Advertencia", "La contraseña es requerida para nuevos usuarios");
      return;
    }

    try {
      setSaving(true);
      const result = await saveUser(user);
      
      if (result) {
        showToast("success", "Éxito", `Usuario ${user.id ? "actualizado" : "creado"} correctamente`);
        setUserDialog(false);
        resetUserForm();
        await fetchUsers();
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);

      // Manejar específicamente el error de correo duplicado
      if (error && typeof error === 'object' && 'message' in error) {
        const apiError = error as ApiError;
        showToast("error", "Error", apiError.message);
        
        // Opcional: manejar casos específicos
        if (apiError.statusCode === 400 && apiError.message.includes("correo")) {
          console.log("Error de correo duplicado detectado");
        }
      } else {
        showToast("error", "Error", "Error al guardar el usuario");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = (userId: number): void => {
    confirmDialog({
      message: "¿Estás seguro de que deseas eliminar este usuario?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const result = await deleteUserService(userId);
          if (result) {
            showToast("success", "Éxito", "Usuario eliminado correctamente");
            await fetchUsers(); 
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          handleApiError(error, "Error al eliminar el usuario");
        }
      },
      reject: () => {
        showToast("info", "Cancelado", "Eliminación cancelada");
      },
    });
  };

  // Funciones de utilidad
  const resetUserForm = (): void => {
    setUser({ id: null, name: "", email: "", password: "" });
  };

  const openNewUserDialog = (): void => {
    resetUserForm();
    setUserDialog(true);
  };

  const openEditUserDialog = (userData: User): void => {
    setUser({ id: userData.id, name: userData.name, email: userData.email, password: "" });
    setUserDialog(true);
  };

  const hideDialog = (): void => {
    setUserDialog(false);
    resetUserForm();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGlobalFilterValue(e.target.value);
  };

  // Datos filtrados usando useMemo
  const filteredUsers = useMemo(() => {
    if (!debouncedFilter.trim()) return users;
    
    return users.filter((user) =>
      user?.name?.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
      user?.email?.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [users, debouncedFilter]);

  // Effects
  useEffect(() => {
    fetchUsers();
  }, []);

  // Templates para la tabla
  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          rounded 
          outlined 
          className="mr-2" 
          onClick={() => openEditUserDialog(rowData)}
          tooltip="Editar usuario"
        />
        <Button 
          icon="pi pi-trash" 
          rounded 
          outlined 
          severity="danger" 
          onClick={() => handleDeleteUser(rowData.id)}
          tooltip="Eliminar usuario"
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData: User) => {
    return (
      <Tag 
        value={rowData.active ? 'Activo' : 'Inactivo'} 
        severity={rowData.active ? 'success' : 'warning'}
      />
    );
  };

  const dateBodyTemplate = (rowData: User) => {
    return formatDate(rowData.createdAt);
  };

  // Templates para la toolbar
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button 
          label="Nuevo Usuario" 
          icon="pi pi-plus" 
          severity="success" 
          onClick={openNewUserDialog} 
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button 
        label="Exportar" 
        icon="pi pi-upload" 
        className="p-button-help" 
        onClick={() => ExportReports(users, "Reporte de Usuarios")}
        disabled={users.length === 0}
      />
    );
  };

  // Header de la tabla
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText 
          type="search" 
          value={globalFilterValue}
          onChange={onGlobalFilterChange} 
          placeholder="Buscar usuarios..." 
        />
      </IconField>
    </div>
  );

  // Footer del diálogo
  const userDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={hideDialog}
        className="p-button-text"
        disabled={saving}
      />
      <Button
        label={saving ? "Guardando..." : "Guardar"}
        icon={saving ? "pi pi-spinner pi-spin" : "pi pi-check"}
        onClick={handleSaveUser}
        disabled={saving}
      />
    </React.Fragment>
  );

  return (
    <DashboardLayout>
      <Toast ref={toast} />
      <ConfirmDialog />
      
      <Toolbar 
        className="mb-4" 
        left={leftToolbarTemplate} 
        center={<h2 className="m-0">Administrador de Usuarios</h2>} 
        right={rightToolbarTemplate}
      />
      
      <DataTable
        value={filteredUsers}
        ref={dt}
        size="small" 
        dataKey="id" 
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        emptyMessage="No se encontraron usuarios"
        loading={loading}
      >
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Nombre" sortable />
        <Column field="email" header="Correo" sortable />
        <Column field="active" header="Estado" body={statusBodyTemplate} sortable />
        <Column field="createdAt" header="Fecha de Creación" body={dateBodyTemplate} sortable />
        <Column body={actionBodyTemplate} header="Acciones" style={{ width: '120px' }} />
      </DataTable>

      <Dialog
        visible={userDialog}
        header={user.id ? "Editar Usuario" : "Nuevo Usuario"}
        modal
        footer={userDialogFooter}
        onHide={hideDialog}
        style={{ width: "90vw", maxWidth: "500px" }}
        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
      >
        <div className="formgrid grid">
          <div className="field col-12">
            <label htmlFor="name" className="font-semibold">
              Nombre de Usuario *
            </label>
            <InputText
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
              autoFocus
              className={`w-full ${!user.name.trim() && user.name !== "" ? "p-invalid" : ""}`}
              placeholder="Ingrese el nombre del usuario"
            />
          </div>
          
          <div className="field col-12">
            <label htmlFor="email" className="font-semibold">
              Correo Electrónico *
            </label>
            <InputText
              keyfilter="email"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full"
              placeholder="correo@ejemplo.com"
            />
          </div>
          
          <div className="field col-12">
            <label htmlFor="password" className="font-semibold">
              Contraseña {!user.id && "*"}
            </label>
            <InputText
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required={!user.id}
              className="w-full"
              placeholder={user.id ? "Dejar vacío para no cambiar" : "Ingrese la contraseña"}
            />
            {user.id && (
              <small className="text-400">
                Dejar vacío si no desea cambiar la contraseña
              </small>
            )}
          </div>
        </div>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;