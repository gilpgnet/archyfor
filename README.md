# archyfor
Manejo simplificado de archivos y llaves foráneas.

https://archyfor.000webhostapp.com/

## Configuración
Para imágenes más grandes, editar el archivo de configuración de MySQL
(my.ini en WAMP Server). Por ejemplo, para permitir archivos hasta 16M:
- max_allowed_packet = 16M

Si tu servidor no soporta transacciones, comenta las líneas con
begin_transaction y commit.