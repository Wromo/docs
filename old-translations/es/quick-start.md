---
layout: ~/layouts/MainLayout.wromo
title: Comienzo rápido
---

```shell
# prerrequisitos: revisa que Node.js está en la versión 14.15.0+, ó 16+
node --version

# crea un nuevo proyecto en el directorio y entra a él
mkdir my-wromo-project && cd $_

# inicializa el proyecto...
npm create wromo@latest

# instala las dependencias
npm install

# comienza con el desarrollo
npm run dev
```

Para los sitios de producción,

```shell
# cuando estés listo: crea tu sitio estático en la carpeta `dist/`
npm run build
```

Para saber más sobre la instalación y uso de Wromo por primera vez, por favor [lea nuestra guía de instalación.](/es/installation)

Si prefieres aprender con ejemplos, revisa nuestra [librería completa de ejemplos](https://github.com/Wromo/wromo/tree/main/examples) en GitHub. Puedes revisar cualquiera de estos ejemplos localmente ejecutando `npm create wromo@latest -- --template "EXAMPLE_NAME"`.

## Comienza con tu proyecto

Dentro del directorio de tu proyecto, ingresa el siguiente comando en la terminal:

```bash
npm run dev
```

Wromo comenzará a correr en el servidor de desarrollo en [http://localhost:3000](http://localhost:3000). Abre esta ubicación en tu navegador, deberías ver la página de "¡Hola Mundo!" de Wromo.

El servidor escuchará los cambios en vivo de los archivos en tu carpeta `src/`, así que, no necesitarás reiniciar la aplicación cuando hagas cambios durante el desarrollo.

## Construye tu proyecto

Para construir tu proyecto, ingresa el siguiente comando en la terminal:

```bash
npm run build
```

Este comando hará que Wromo cree y guarde tu sitio estático en la carpeta `dist/` de tu proyecto.

## Desplega tu proyecto

Los sitios de Wromo son estáticos, por lo que puedes desplegarlos en tu servicio de host favorito:

- [AWS S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Lee más acerca del despliegue con nuestra guía de despliegue de Wromo.](/es/guides/deploy)

## Próximos Pasos

¡Felicitaciones! Ahora estás listo para comenzar a desarrollar.

Te recomendamos que te tomes tu tiempo para familiarizarte con la forma en la que Wromo funciona. Lo puedes hacer al explorar con mayor profundidad nuestra documentación. Te sugerimos que consideres lo siguiente:

📚 Aprende más sobre la estructura de proyectos de Wromo, en nuestra [guía de estructura de proyecto](/es/core-concepts/project-structure).

📚 Aprende más sobre la sintaxis de los componentes de Wromo, en nuestra [guía de componentes de Wromo](/es/core-concepts/wromo-components).

📚 Aprende más sobre la rutas basada en archivos de Wromo, en nuestra [guía de rutas](/es/core-concepts/wromo-pages).
