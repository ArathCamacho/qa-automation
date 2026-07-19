## QA Automation

## Instalación

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)

### Pasos

1. Clona el repositorio:
   git clone https://github.com/ArathCamacho/qa-automation.git
   cd saucedemo-tests
2. Instala las dependencias:
   npm install
3. Instala los navegadores que usa Playwright:
   npx playwright install

## Ejecución de las pruebas

Correr los test:
npx playwright test
npx playwright show-report
Correr un solo archivo
npx playwright test tests/login.spec.ts

## Evidencia en caso de fallo

El proyecto está configurado (`playwright.config.ts`) para generar automáticamente:

- Screenshot cuando un test falla (`screenshot: 'only-on-failure'`)
- Video cuando un test falla (`video: 'retain-on-failure'`)
- Trace (registro paso a paso) en reintentos fallidos (`trace: 'on-first-retry'`)

## Escenarios cubiertos

Inicio de sesión exitoso
Inicio de sesión con credenciales incorrectas
Agregar un producto al carrito
Completar una compra
Agregar dos productos, eliminar uno y validar el carrito

---

## Análisis manual

### Casos de prueba adicionales

1. Ver detalle de producto: Para verificar al hacer click en la imagen o el nombre del producto se abra correctamente su página de descripción individual
2. Ordenar productos por precio: verificar que las opciones de "Price (low to high)" y "Price (high to low)" acomodan los productos correctamente
3. Botón "Continue Shopping": para verificar que desde el carrito, este botón regresa al inventario sin perder los productos que ya se habían agregado
4. Contador del carrito para verificar que si se agregan productos y luego se eliminan el ícono del carrito deja de mostrar el número de datos actuales y se actualiza al momento.
5. Persistencia del carrito al recargar la página: verificar que si se agrega un producto y se recarga la página el producto sigue en el carrito o se borra la cache

### Escenarios negativos

1. Login con usuario bloqueado: verificar que el sistema muestre el mensaje de error correspondiente y no permite el acceso con esta cuenta.
2. Login con campos vacíos: verificar que al intentar iniciar sesión sin escribir usuario y/o contraseña, aparece el mensaje de error correspondiente.
3. Acceso directo a la URL del checkout sin login: verificar que si se pega la URL de inventario o checkout directamente en el navegador sin haber iniciado
   sesión antes, el sistema redirige al login en vez de permitir el acceso, ejemplo: https://www.saucedemo.com/inventory-item.html?id=4

### Riesgos o defectos encontrados

1. Responsividad en vista móvil: al simular la vista de celular, las cards de los productos se ven desproporcionadamente alargadas, afectando la experiencia de compra en dispositivos móviles
2. Usuario problem_user:con esta cuenta, las imágenes de los productos se muestran incorrectas para todos los artículos

### Pruebas que ejecutaría antes de liberar a producción

Antes de subir a producción revisaría esto:

- Flujo crítico completo: (login, agregar producto al carrito, checkout, confirmación de compra), ya que es el camino que genera valor de negocio directo,
  si esto falla, ningún usuario puede comprar.
- Pruebas negativas de login como usuario bloqueado, campos vacíos, credenciales incorrectas, porque el login es el punto de entrada a toda la aplicación y un
  fallo aquí bloquea el acceso a todo lo demás.
- Validar el carrito porque un error aquí puede causar que el cliente pague por productos equivocados o no pueda completar su pedido.
- Pruebas cross-browser ya que la aplicación debe comportarse igual sin importar el navegador del usuario final.
