export const environment = () => ({
  production: false,
  database_url: process.env.DATABASE_USER_URL,
  jwt_token_secret: process.env.SECRET_JWT_ACCESS_KEY,
});
