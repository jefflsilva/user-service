echo "Applying Prisma migrations..."
npx prisma migrate deploy
echo "Starting User Service..."
npm run start


docker-compose down -v  # Limpa volumes, se necessário
docker-compose up --build