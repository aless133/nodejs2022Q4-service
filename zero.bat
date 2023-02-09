docker run --hostname=1f48cb0f6823 --env=POSTGRES_DB=rest_db --env=POSTGRES_USER=rest_user --env=POSTGRES_PASSWORD=asdasdas --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1 --env=PG_SHA256=64fdf23d734afad0dfe4077daca96ac51dcd697e68ae2d3d4ca6c45cb14e21ae --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432:5432 --runtime=runc -d aless133/db-service:latest
del src\migrations\*.* /q
cmd /cnpm run migration:generate
cmd /cnpm run build
npm run start