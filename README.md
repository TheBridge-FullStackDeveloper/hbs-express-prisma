![logotipo de The Bridge](https://user-images.githubusercontent.com/27650532/77754601-e8365180-702b-11ea-8bed-5bc14a43f869.png 'logotipo de The Bridge')

# 🚀 The bridge - 📘 Blog handlebars

## 📝 Descripción del Ejercicio

Este ejercicio está diseñado para enseñarte a utilizar el motor de plantillas handlebars en express.

## 📖 Instrucciones

1. 🍴 Haz fork del repositorio.
2. 📥 Clona tu fork del repositorio.
3. 🎯 Crea las consultas en express para obtener las informaciones, crear las pagina y mostrarlas en el navegador. (recuerda iniciar Prisma)
4. ✅ Ejecuta tus consultas para asegurarte de que funcionan como se espera.
5. 📤 Haz commit y push de tus cambios al repositorio.
6. 📧 Abre un Pull Request con tus soluciones para revisión.

⬇️ Realiza un seed.js para llenar tu base de datos.

# ✔️ Tareas a Realizar

## Crear la base de datos

- [ ] Crear la base de datos con una tabla con este modelo de Post

```prisma
model Post {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
}
```

## Crear las rutas

- [ ] GET - `/posts` - Crear la ruta para obtener todos los posts
- [ ] POST - `/posts` - Crear la ruta para crear un post
- [ ] GET - `/posts/:id` - Crear la ruta para obtener un post por su id
- [ ] PUT - `/posts/:id` - Crear la ruta para actualizar un post por su id
- [ ] DELETE - `/posts/:id` - Crear la ruta para eliminar un post por su id

## Crear las vistas con handlebars

- [ ] Crear la vista para mostrar todos los posts
- [ ] Crear la vista para mostrar un post
- [ ] Crear la vista para crear y actualizar un post, con un formulario
- [ ] Crear un partial de navegación para navegar entre las vistas

## Bonus

- [ ] Crear un helper para formatear la fecha de creación de un post en el formato `DD/MM/YYYY`
