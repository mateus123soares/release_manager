export const projectSchema = {
  body: {
    type: 'object',
    required: ['name', 'description'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 100 },
      description: { type: 'string', minLength: 5, maxLength: 255 },
    },
    errorMessage: {
      required: {
        name: 'O campo nome é obrigatório',
        description: 'O campo descrição é obrigatório',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
      },
    },
  },
};
