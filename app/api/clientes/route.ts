import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

// GET /api/clientes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const supabase = createClient()

  const token = request.headers.get('Authorization')?.split(' ')[1] // Obtener el token del encabezado

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
  const { data, error } = await supabase
    .from('clientes')
    .select(`*`)

    if (error) {
      throw error 
    }

    return NextResponse.json(data, { status: 200 })
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 400 })

  }
}