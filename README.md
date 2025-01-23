Event Manager
Event Manager es una aplicación web que permite a los usuarios registrarse, iniciar sesión y gestionar eventos. Los usuarios pueden crear, editar, eliminar y listar eventos, así como filtrarlos por fecha o ubicación. La aplicación utiliza React en el frontend y Node.js con Express y MongoDB en el backend. Además, se implementa autenticación basada en JWT (JSON Web Tokens) para gestionar las sesiones de los usuarios.

Características Principales
Autenticación de Usuarios:

Registro de nuevos usuarios.

Inicio de sesión con correo electrónico y contraseña.

Uso de JWT para la gestión de sesiones.

Gestión de Eventos:

Crear nuevos eventos.

Editar eventos existentes.

Eliminar eventos.

Listar todos los eventos.

Filtrar eventos por fecha o ubicación.

Tecnologías Utilizadas:

Frontend: React, Axios, SweetAlert2.

Backend: Node.js, Express, MongoDB, Mongoose, JWT.

Base de Datos: MongoDB.

Requisitos Previos
Antes de iniciar el proyecto, asegúrate de tener instalado lo siguiente:

Node.js: Descargar Node.js.

MongoDB: Descargar MongoDB.

Git: Descargar Git.

Instalación y Configuración
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

1. Clonar el Repositorio
Clona el repositorio desde GitHub:

bash
Copy
git clone https://github.com/tu-usuario/event-manager.git
cd event-manager
2. Configurar el Backend
Navega a la carpeta del backend:

bash
Copy
cd backend
Instala las dependencias:

bash
Copy
npm install
Crea un archivo .env en la raíz del backend y configura las variables de entorno:

env
Copy
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-manager
JWT_SECRET=tu_clave_secreta_jwt
Inicia el servidor de backend:

bash
Copy
npm start
El backend estará disponible en http://localhost:5000.

3. Configurar el Frontend
Navega a la carpeta del frontend:

bash
Copy
cd ../frontend
Instala las dependencias:

bash
Copy
npm install
Inicia la aplicación de React:

bash
Copy
npm start
El frontend estará disponible en http://localhost:3000.

Estructura del Proyecto
Backend
models/: Contiene los modelos de MongoDB (usuarios y eventos).

routes/: Define las rutas de la API (autenticación y eventos).

middleware/: Contiene el middleware de autenticación.

config/: Configuración de la base de datos.

server.js: Punto de entrada del backend.

Frontend
src/components/: Contiene los componentes de React (Navbar, EventList, EventForm).

src/pages/: Define las páginas de la aplicación (Login, Register, Events).

src/api.js: Configuración de Axios para las solicitudes HTTP.

App.js: Punto de entrada del frontend.

Uso de la Aplicación
Registro:

Ve a http://localhost:3000/register.

Completa el formulario de registro con tu correo electrónico y contraseña.

Inicio de Sesión:

Ve a http://localhost:3000/login.

Ingresa tus credenciales para iniciar sesión.

Gestión de Eventos:

Una vez autenticado, serás redirigido a la página de eventos (http://localhost:3000/events).

Desde aquí, puedes crear, editar, eliminar y listar eventos.

También puedes filtrar eventos por fecha o ubicación.

Ejemplos de Solicitudes HTTP
Autenticación
Registro:

bash
Copy
POST /api/auth/register
Body: { "email": "usuario@example.com", "password": "contraseña" }
Inicio de Sesión:

bash
Copy
POST /api/auth/login
Body: { "email": "usuario@example.com", "password": "contraseña" }
Eventos
Crear Evento:

bash
Copy
POST /api/events
Body: { "title": "Evento 1", "description": "Descripción del evento", "date": "2023-10-01", "location": "Ubicación" }
Listar Eventos:

bash
Copy
GET /api/events
Filtrar Eventos por Fecha:

bash
Copy
GET /api/events?date=2023-10-01
Filtrar Eventos por Ubicación:

bash
Copy
GET /api/events?location=Ubicación
Eliminar Evento:

bash
Copy
DELETE /api/events/:id
Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

Realiza tus cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').

Haz push a la rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.

Licencia
Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

Nombre: [Tu Nombre]

Email: [tu-email@example.com]

GitHub: tu-usuario

¡Gracias por usar Event Manager! 😊
