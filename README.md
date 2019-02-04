# archyfor
Manejo simplificado de archivos y llaves foráneas.

Lo puedes ver funcionando en https://archyfor.000webhostapp.com/.

Para entender mejor el código, se recomienda estudiar primero los proyectos https://github.com/gilpgnet/web1, https://github.com/gilpgnet/web2, https://github.com/gilpgnet/servicio y https://github.com/gilpgnet/sincro.

## Configuración
Para imágenes más grandes, editar el archivo de configuración de MySQL
(my.ini en WAMP Server). Por ejemplo, para permitir archivos hasta 16M:
- max_allowed_packet = 16M

Si tu servidor no soporta transacciones, comenta las líneas con
begin_transaction y commit.

## Ejecución
Para poder ejecutarse el código, primero han de crearse la base de datos, el usuario y la tabla con el script del archivo
[sql/create.sql](/sql/create.sql).

Modifica el archivo [servicio/conecta.php](/servicio/conecta.php) para usar la conexión de tu servidor.
