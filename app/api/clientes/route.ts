import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

// GET /api/clientes
export async function GET(request: Request) {
  const supabase = createClient()
  try {
    console.log(supabase)

  const { data, error } = await supabase
    .from('clientes')
    .select(`*`)

    if (error) {
      throw error 
    }

    return NextResponse.json(data, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })

  }
}