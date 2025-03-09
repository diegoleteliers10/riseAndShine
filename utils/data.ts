export const services = [
  {
    title: "Servicio Completo",
    description:
      "Limpieza integral por fuera y por dentro. Incluye lavado exterior, aspirado y limpieza interior detallada.",
    icon: "✨",
  },
  {
    title: "Limpieza Exterior",
    description:
      "Lavado completo de carrocería, llantas y vidrios. Perfecto para mantener el brillo exterior.",
    icon: "🚿",
  },
  {
    title: "Limpieza Interior",
    description:
      "Aspirado profundo, limpieza de tapicería, tablero y todas las superficies interiores.",
    icon: "🧹",
  },
];

export const prices = [
  {
    name: "Limpieza Exterior",
    price: "$10.000",
    features: [
      "Lavado de carrocería",
      "Limpieza de llantas",
      "Limpieza de vidrios",
      "Secado a mano",
    ],
  },
  {
    name: "Limpieza Interior",
    price: "$12.000",
    features: [
      "Aspirado completo",
      "Limpieza de tapicería",
      "Limpieza de tablero",
      "Aromatización",
    ],
  },
  {
    name: "Servicio Completo",
    price: "$20.000",
    features: [
      "Limpieza exterior completa",
      "Limpieza interior completa",
      "Tratamiento de tablero",
      "Limpieza de alfombras",
    ],
  },
];

export const data = [
  {
    month: 'Enero',
    customers: 120,
    sales: 24000
  },
  {
    month: 'Febrero',
    customers: 150,
    sales: 28000
  },
  {
    month: 'Marzo',
    customers: 180,
    sales: 32000
  },
  {
    month: 'Abril',
    customers: 200,
    sales: 35000
  },
  {
    month: 'Mayo',
    customers: 220,
    sales: 38000
  },
  {
    month: 'Junio',
    customers: 250,
    sales: 42000
  },
  {
    month: 'Julio',
    customers: 280,
    sales: 45000
  },
  {
    month: 'Agosto',
    customers: 300,
    sales: 48000
  },
  {
    month: 'Septiembre',
    customers: 320,
    sales: 52000
  },
  {
    month: 'Octubre',
    customers: 350,
    sales: 55000
  },
  {
    month: 'Noviembre',
    customers: 380,
    sales: 58000
  },
  {
    month: 'Diciembre',
    customers: 400,
    sales: 62000
  }
];

export const clients = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '555-1234',
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15'
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'Gómez',
    email: 'maria.gomez@example.com',
    telefono: '555-5678',
    createdAt: '2023-02-10',
    updatedAt: '2023-02-10'
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos.lopez@example.com',
    telefono: '555-9876',
    createdAt: '2023-03-05',
    updatedAt: '2023-03-05'
  }
];

export const orders = [
  {
    id: 1,
    cliente_id: 1,
    monto: 1200,
    fecha_pedido: '2023-01-20',
    fecha_servicio: '2023-01-25',
    estado: 'realizado',
    servicio: 'Limpieza general'
  },
  {
    id: 2,
    cliente_id: 2,
    monto: 1500,
    fecha_pedido: '2023-02-15',
    fecha_servicio: '2023-02-20',
    estado: 'en-proceso',
    servicio: 'Mantenimiento preventivo'
  },
  {
    id: 3,
    cliente_id: 3,
    monto: 1800,
    fecha_pedido: '2023-03-10',
    fecha_servicio: '2023-03-15',
    estado: 'pendiente',
    servicio: 'Reparación eléctrica'
  }
];

export const order = [
  {
    Pedidos: {
      id: 1,
      cliente_id: 1,
      monto: 1200,
      fecha_pedido: '2023-01-20',
      fecha_servicio: '2023-01-25',
      estado: 'Completado',
      servicio: 'Limpieza general'
    },
    Clientes: {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      createdAt: '2023-01-15',
      updatedAt: '2023-01-15'
    }
  },
  {
    Pedidos: {
      id: 2,
      cliente_id: 2,
      monto: 1500,
      fecha_pedido: '2023-02-15',
      fecha_servicio: '2023-02-20',
      estado: 'En proceso',
      servicio: 'Mantenimiento preventivo'
    },
    Clientes: {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      email: 'maria.gomez@example.com',
      telefono: '555-5678',
      createdAt: '2023-02-10',
      updatedAt: '2023-02-10'
    }
  },
  {
    Pedidos: {
      id: 3,
      cliente_id: 3,
      monto: 1800,
      fecha_pedido: '2023-03-10',
      fecha_servicio: '2023-03-15',
      estado: 'Pendiente',
      servicio: 'Reparación eléctrica'
    },
    Clientes: {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@example.com',
      telefono: '555-9876',
      createdAt: '2023-03-05',
      updatedAt: '2023-03-05'
    }
  }
];




