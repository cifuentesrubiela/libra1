# LIBRA - Sistema de Gestión

LIBRA es una aplicación desarrollada con el stack MERN (MongoDB, Express.js, React, Node.js) que permite la gestión de productos y compras mediante un sistema de roles (usuario y administrador).

## Características
- **Autenticación por roles**: Los usuarios pueden iniciar sesión como administradores o clientes.
- **Gestión de productos**: Los administradores pueden agregar, editar y eliminar productos.
- **Carrito de compras**: Los usuarios pueden añadir productos a su carrito para su posterior compra.

## NOTA

Se debe tener previamente instalado e iniciado el servicio Mongodb y se debe crear la base de datos "libra".

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/libra.git
cd libra
```

### 2. Configurar el Frontend
```bash
cd frontend
npm install   # Instalar dependencias
npm start     # Iniciar la aplicación frontend
```

### 3. Configurar el Backend
```bash
cd backend
npm install   # Instalar dependencias
node server   # Iniciar el servidor backend
```

## Tecnologías Utilizadas
- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JSON Web Token (JWT)


