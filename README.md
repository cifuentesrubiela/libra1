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

 ## Pasos para crear la base de datos "libra" y las colecciones en MongoDB usando mongosh; donde previamente debe estar instalado MongoDB, debe estar ejecutándose el servidor de Mongo -> net start MongoDB

## Iniciar mongosh
Inicie git bash como administrador y escriba el comando:

```sh
mongosh
```

## Crear o usar la base de datos libra
En mongosh, escriba:

```sh
use libra
```

Si la base de datos no existe, se creará automáticamente al insertar datos.

## Crear las colecciones
Se pueden crear colecciones vacías usando `db.createCollection()`. Ejecute los siguientes comandos:

```sh
db.createCollection("detalleventas")
db.createCollection("productos")
db.createCollection("products")
db.createCollection("rols")
db.createCollection("usuarios")
db.createCollection("ventas")
```

**Nota:** En MongoDB, las colecciones también se crean automáticamente cuando insertas documentos.

## Verificar que las colecciones fueron creadas
Para listar las colecciones dentro de la base de datos LIBRA, use:

```sh
show collections
```

## Insertar un documento de prueba en cada colección (Opcional)
Para asegurarse de que las colecciones se están utilizando, se puede insertar un documento en cada una:

```sh
db.detalleventas.insertOne({ venta_id: 1, producto_id: 101, cantidad: 2, precio_unitario: 5000 })
db.productos.insertOne({ nombre: "Cuaderno", descripcion: "Cuaderno rayado", precio: 5000, stock: 50 })
db.products.insertOne({ name: "Notebook", description: "A ruled notebook", price: 5.00, stock: 100 })
db.rols.insertOne({ rol: "Administrador" })
db.usuarios.insertOne({ usuario: "admin", contraseña: "12345", rol: "Administrador" })
db.ventas.insertOne({ cliente: "Juan Pérez", total: 15000, fecha: new Date() })
```

## Verificar que los documentos se insertaron correctamente
Para visualizar los documentos insertados, use:

```sh
db.detalleventas.find().pretty()
db.productos.find().pretty()
db.products.find().pretty()
db.rols.find().pretty()
db.usuarios.find().pretty()
db.ventas.find().pretty()
```



