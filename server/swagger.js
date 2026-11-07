
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduCenter API',
      version: '1.0.0',
      description:
        "O'quv markazi (til, IT, fanlar) boshqaruv tizimi uchun REST API. Avval /auth/login orqali token oling, so'ng \"Authorize\" tugmasi bilan tokenni kiriting.",
    },
    servers: [{ url: '/api', description: 'Joriy server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', description: "Login qilingandan so'ng olingan token" },
      },
    },
  },
  apis: ['./server/routes/*.routes.js', './server/routes/index.js'],
});
