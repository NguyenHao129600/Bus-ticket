const bearerSecurity = [{ bearerAuth: [] }];

const okResponse = {
  description: 'Successful response',
};

const createdResponse = {
  description: 'Created',
};

const errorResponses = {
  400: { description: 'Validation error' },
  401: { description: 'Authentication required' },
  403: { description: 'Forbidden' },
  404: { description: 'Not found' },
};

const operation = ({ tags, summary, security, requestBody, responses = {} }) => {
  const spec = {
    tags,
    summary,
    responses: {
      200: okResponse,
      ...responses,
      ...errorResponses,
    },
  };

  if (security) {
    spec.security = security;
  }

  if (requestBody) {
    spec.requestBody = requestBody;
  }

  return spec;
};

const jsonBody = (schema) => ({
  required: true,
  content: {
    'application/json': {
      schema,
    },
  },
});

const objectSchema = (properties, required = []) => ({
  type: 'object',
  properties,
  required,
});

const schemas = {
  LoginRequest: objectSchema({
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  }, ['email', 'password']),
  RegisterRequest: objectSchema({
    full_name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    phone_number: { type: 'string', nullable: true },
  }, ['full_name', 'email', 'password']),
  IdParam: {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'integer' },
  },
};

const crudPaths = (base, tag, { publicRead = true, authRead = false, adminWrite = true } = {}) => {
  const readSecurity = authRead ? bearerSecurity : undefined;
  const writeSecurity = adminWrite ? bearerSecurity : undefined;

  return {
    [base]: {
      get: operation({
        tags: [tag],
        summary: `List ${tag}`,
        security: readSecurity,
      }),
      post: operation({
        tags: [tag],
        summary: `Create ${tag}`,
        security: writeSecurity,
        requestBody: jsonBody({ type: 'object' }),
        responses: { 201: createdResponse },
      }),
    },
    [`${base}/{id}`]: {
      get: operation({
        tags: [tag],
        summary: `Get ${tag} by id`,
        security: publicRead || !authRead ? readSecurity : bearerSecurity,
      }),
      put: operation({
        tags: [tag],
        summary: `Update ${tag}`,
        security: writeSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      delete: operation({
        tags: [tag],
        summary: `Delete ${tag}`,
        security: writeSecurity,
      }),
      parameters: [schemas.IdParam],
    },
  };
};

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Bus Ticket API',
    version: '1.0.0',
    description: 'RESTful API for bus ticket booking',
  },
  servers: [
    {
      url: '/api',
      description: 'Current server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas,
  },
  tags: [
    { name: 'Auth' },
    { name: 'Users' },
    { name: 'Operators' },
    { name: 'Operator Staffs' },
    { name: 'Stations' },
    { name: 'Routes' },
    { name: 'Buses' },
    { name: 'Reviews' },
    { name: 'Bus Trips' },
    { name: 'Trip Seats' },
    { name: 'Trip Events' },
    { name: 'Bookings' },
    { name: 'Booking Items' },
    { name: 'Passengers' },
    { name: 'Tickets' },
  ],
  paths: {
    '/auth/register': {
      post: operation({
        tags: ['Auth'],
        summary: 'Register customer account',
        requestBody: jsonBody({ $ref: '#/components/schemas/RegisterRequest' }),
        responses: { 201: createdResponse },
      }),
    },
    '/auth/login': {
      post: operation({
        tags: ['Auth'],
        summary: 'Login and receive JWT',
        requestBody: jsonBody({ $ref: '#/components/schemas/LoginRequest' }),
      }),
    },
    '/auth/me': {
      get: operation({
        tags: ['Auth'],
        summary: 'Get current user profile',
        security: bearerSecurity,
      }),
    },
    ...crudPaths('/users', 'Users', { publicRead: false, authRead: true }),
    ...crudPaths('/operators', 'Operators'),
    ...crudPaths('/operator-staffs', 'Operator Staffs', { publicRead: false, authRead: true }),
    ...crudPaths('/stations', 'Stations'),
    '/stations/provinces': {
      get: operation({
        tags: ['Stations'],
        summary: 'List station provinces',
      }),
    },
    ...crudPaths('/routes', 'Routes'),
    ...crudPaths('/buses', 'Buses'),
    '/buses/{id}/seats': {
      get: operation({
        tags: ['Buses'],
        summary: 'List bus seats',
      }),
      post: operation({
        tags: ['Buses'],
        summary: 'Create bus seat',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
        responses: { 201: createdResponse },
      }),
      parameters: [schemas.IdParam],
    },
    '/buses/{id}/seats/bulk': {
      post: operation({
        tags: ['Buses'],
        summary: 'Bulk create bus seats',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      parameters: [schemas.IdParam],
    },
    '/buses/{id}/seats/{seat_id}': {
      put: operation({
        tags: ['Buses'],
        summary: 'Update bus seat',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      delete: operation({
        tags: ['Buses'],
        summary: 'Delete bus seat',
        security: bearerSecurity,
      }),
      parameters: [
        schemas.IdParam,
        { name: 'seat_id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
    },
    ...crudPaths('/reviews', 'Reviews', { adminWrite: false }),
    '/reviews/operator/{operator_id}/stats': {
      get: operation({
        tags: ['Reviews'],
        summary: 'Get operator review stats',
      }),
      parameters: [
        { name: 'operator_id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
    },
    ...crudPaths('/bus-trips', 'Bus Trips'),
    '/bus-trips/{id}/status': {
      patch: operation({
        tags: ['Bus Trips'],
        summary: 'Update trip status',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      parameters: [schemas.IdParam],
    },
    '/trip-seats': {
      get: operation({
        tags: ['Trip Seats'],
        summary: 'List trip seats',
      }),
    },
    '/trip-seats/{id}': {
      get: operation({
        tags: ['Trip Seats'],
        summary: 'Get trip seat by id',
      }),
      parameters: [schemas.IdParam],
    },
    '/trip-seats/lock': {
      post: operation({
        tags: ['Trip Seats'],
        summary: 'Lock trip seat',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
    },
    '/trip-seats/release': {
      post: operation({
        tags: ['Trip Seats'],
        summary: 'Release trip seat lock',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
    },
    '/trip-seats/{id}/status': {
      patch: operation({
        tags: ['Trip Seats'],
        summary: 'Update trip seat status',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      parameters: [schemas.IdParam],
    },
    ...crudPaths('/trip-events', 'Trip Events'),
    ...crudPaths('/bookings', 'Bookings', { publicRead: false, authRead: true }),
    '/bookings/{id}/status': {
      patch: operation({
        tags: ['Bookings'],
        summary: 'Update booking status',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
      }),
      parameters: [schemas.IdParam],
    },
    '/booking-items': {
      get: operation({
        tags: ['Booking Items'],
        summary: 'List booking items',
        security: bearerSecurity,
      }),
    },
    '/booking-items/{id}': {
      get: operation({
        tags: ['Booking Items'],
        summary: 'Get booking item by id',
        security: bearerSecurity,
      }),
      delete: operation({
        tags: ['Booking Items'],
        summary: 'Delete booking item',
        security: bearerSecurity,
      }),
      parameters: [schemas.IdParam],
    },
    ...crudPaths('/passengers', 'Passengers', { publicRead: false, authRead: true, adminWrite: false }),
    '/tickets': {
      get: operation({
        tags: ['Tickets'],
        summary: 'List tickets',
        security: bearerSecurity,
      }),
      post: operation({
        tags: ['Tickets'],
        summary: 'Create ticket',
        security: bearerSecurity,
        requestBody: jsonBody({ type: 'object' }),
        responses: { 201: createdResponse },
      }),
    },
    '/tickets/{id}': {
      get: operation({
        tags: ['Tickets'],
        summary: 'Get ticket by id',
        security: bearerSecurity,
      }),
      parameters: [schemas.IdParam],
    },
    '/tickets/code/{code}': {
      get: operation({
        tags: ['Tickets'],
        summary: 'Get ticket by code',
        security: bearerSecurity,
      }),
      parameters: [
        { name: 'code', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    '/tickets/{code}/check-in': {
      patch: operation({
        tags: ['Tickets'],
        summary: 'Check in ticket',
        security: bearerSecurity,
      }),
      parameters: [
        { name: 'code', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    '/tickets/{code}/cancel': {
      patch: operation({
        tags: ['Tickets'],
        summary: 'Cancel ticket',
        security: bearerSecurity,
      }),
      parameters: [
        { name: 'code', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};

export default swagger;
