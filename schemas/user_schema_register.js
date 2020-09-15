module.exports = {
    type: 'object',
    required: ['username', 'password', 'name', 'lastname', 'phone_number', 'delivery_address'],
    properties: {
        username: { type: 'string', pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" },
        password: { type: 'string' },
        name: { type: 'string' },
        lastname: { type: 'string' },
        phone_number: { type: 'string' },
        delivery_address: { type: 'string' }
    }
};
