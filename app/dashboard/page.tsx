import DashboardLayout from "@/components/layout/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Charts } from "@/components/dashboard/Charts";
import { data } from '@/utils/data'
import { TableData } from "@/components/dashboard/TableData";
import { DateDisplay } from '@/components/DateDisplay';
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard de Rise & Shine - Servicio de limpieza de autos',
};

async function getUserName() {
  const supabase = createServerComponentClient({ cookies })
  
  // Obtener la sesión actual
  const { data: { session } } = await supabase.auth.getSession()

  if (session?.user) {
    try {
      // Consultar la tabla profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('nombre')
        .eq('user_id', session.user.id)
        .single()

      if (error) {
        console.error('Error al obtener el nombre del usuario:', error)
        return session.user.email?.split('@')[0] || 'Usuario' // Fallback al email si hay error
      }

      return data.nombre || session.user.email?.split('@')[0] || 'Usuario'
    } catch (error) {
      console.error('Error:', error)
      return session.user.email?.split('@')[0] || 'Usuario'
    }
  }

  return 'Usuario' // Valor por defecto si no hay sesión
}

async function getData(token: string) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const [ordersRes, clientsRes] = await Promise.all([
      fetch('https://rsservices.vercel.app/api/orders', { headers }),
      fetch('https://rsservices.vercel.app/api/clientes', { headers })
    ]);

    // Verificar si la respuesta es JSON
    const ordersContentType = ordersRes.headers.get('content-type');
    const clientsContentType = clientsRes.headers.get('content-type');

    if (!ordersContentType?.includes('application/json')) {
      throw new Error('La respuesta de orders no es JSON');
    }

    if (!clientsContentType?.includes('application/json')) {
      throw new Error('La respuesta de clients no es JSON');
    }

    const orders = await ordersRes.json();
    const clients = await clientsRes.json();

    return {
      orders: Array.isArray(orders) ? orders : [orders].filter(Boolean),
      clients: Array.isArray(clients) ? clients : [clients].filter(Boolean),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { orders: [], clients: [] };
  }
}

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    console.error('No access token found');
    return null;
  }
  const token = session.access_token;

  const { orders, clients } = await getData(token);
  const userName = await getUserName();

  return (
    <DashboardLayout>
      <div
          className="min-h-screen bg-linear-to-br from-cloud-light/5 to-cloud-light/10"
        >
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-8 space-y-8">
              <header
                className="flex justify-between items-center pb-6 border-b border-cloud-light/20"
              >
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold text-cloud-dark">
                    Bienvenido {userName}!
                  </h1>
                  <p className="text-sm text-cloud-dark/60">
                    Estas son las estadisticas de tu servicio
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <DateDisplay />
                  <LogoutButton />
                </div>
              </header>

              <DashboardStats orders={orders} clients={clients} />

              <section className="pt-4">
                <Charts data={data} />
              </section>

              <section className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-cloud-dark">
                    Órdenes Recientes
                  </h2>
                  <span
                    className="text-sm text-cloud-dark/60 bg-white/40 px-3 py-1 rounded-full backdrop-blur-xs border border-cloud-light/20"
                  >
                    {orders.length} órdenes totales
                  </span>
                </div>
                <TableData orders={orders}/>
              </section>
            </div>
          </main>
        </div>
    </DashboardLayout>
  )
}