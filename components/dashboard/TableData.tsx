'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from "react";
import { toast } from "sonner"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const statusStyles = {
  pendiente: 'bg-cloud-light/20 text-cloud-dark border-cloud-light/30',
  'en-progreso': 'bg-cloud text-secondary border-secondary/30',
  realizado: 'bg-primary/10 text-primary border-primary/30',
};

const statusLabels = {
  pendiente: 'Pendiente',
  'en-progreso': 'En progreso',
  realizado: 'Realizado',
};

interface Order {
  id: number;
  cliente: {
    nombre: string;
  };
  servicio: string;
  fecha_servicio: string;
  fecha_pedido: string;
  estado: 'pendiente' | 'en-progreso' | 'realizado';
  monto: number;
}

const ITEMS_PER_PAGE = 10;

export function TableData({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newStatus, setNewStatus] = useState('');
  const { replace } = useRouter();


  const pathname = usePathname();
  const searchTerm = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // Filtrar solo si existe un término de búsqueda
  const filteredOrders = searchTerm
    ? orders.filter((order) =>
        order.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.servicio.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders;

  // Sort orders in descending order by ID
  const sortedOrders = filteredOrders.sort((a, b) => b.id - a.id);

  // Calcular paginación con los resultados (filtrados o todos)
  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = sortedOrders.slice(startIndex, endIndex);

  // Handle page changes
  const createPageUrl = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return pathname;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Mantener la función de búsqueda como está
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
      // Resetear a la página 1 cuando se realiza una búsqueda
      params.set('page', '1');
    } else {
      params.delete('search');
      params.set('page', '1');
    }
    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const updateStatus = async (orderId:number , status:string) => {
    // Validar si el nuevo estado está vacío
    if (!status || status.trim() === '') {
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-600">Error al actualizar estado</p>
            <p className="text-sm text-red-400">No se ha proporcionado un nuevo estado.</p>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'bottom-right',
      });
      return;
    }

    try {
      const response = await fetch(`https://www.riseandshine.cl/api/orders?id=${orderId}&newStatus=${status}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      setNewStatus('');
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg border border-cloud-light/20">
          <CheckCircle className="w-5 h-5 text-cloud-dark" />
          <div>
            <p className="font-medium text-cloud-dark">Estado de pedido actualizado</p>
            <p className="text-sm text-cloud-dark/70">El estado del pedido <b>{orderId}</b> ha sido actualizado a <b>{status}</b>.</p>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'bottom-right'
      });
      router.refresh()
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="flex flex-col h-[580px] md:h-[595px] lg:h-[580px]">
      <div className="relative overflow-hidden rounded-xl border border-cloud-light/20 bg-white/50 shadow-sm transition-all duration-300 hover:shadow-lg flex-grow">
        <Table>
          <TableHeader>
            <TableRow className="border-cloud-light/20 hover:bg-cloud-light/5">
              <TableHead className="text-cloud-dark/60 font-medium">ID</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium">Cliente</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium">Servicio</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium">Fecha</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium">Estado</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium text-right">Monto</TableHead>
              <TableHead className="text-cloud-dark/60 font-medium text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id} className="border-cloud-light/20 hover:bg-cloud-light/5">
                  <TableCell className="font-medium text-cloud-dark">{order.id}</TableCell>
                  <TableCell className="font-medium text-cloud-dark">{order.cliente.nombre}</TableCell>
                  <TableCell className="text-cloud-dark">{order.servicio}</TableCell>
                  <TableCell className="text-cloud-dark">
                    {new Date(order.fecha_servicio).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${statusStyles[order.estado]} border`}
                      variant="outline"
                    >
                      {statusLabels[order.estado]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-cloud-dark">
                    ${order.monto}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Pencil width={14} height={14} className='cursor-pointer'/>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-white text-cloud-dark">
                        <DialogHeader className="bg-white text-cloud-dark">
                          <DialogTitle className="text-cloud-light text-[20px]">Información del pedido</DialogTitle>
                          <DialogDescription className="text-cloud-dark space-y-2 flex flex-col">
                            <span className='mt-2'><b>ID Pedido: </b>{order.id}</span>
                            <span><b>Nombre: </b>{order.cliente.nombre}</span>
                            <span><b>Servicio: </b>{order.servicio}</span>
                            <span><b>Fecha Pedido: </b>{new Date(order.fecha_pedido).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short'
                            })}</span>
                            <span><b>Fecha Servicio: </b>{new Date(order.fecha_servicio).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short'
                            })}</span>
                            <span><b>Estado Actual: </b>{order.estado}</span>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex gap-4 items-center justify-center">
                            <Label htmlFor="name" className="text-left text-cloud-dark">
                              Nuevo Estado
                            </Label>

                            <Select onValueChange={(e)=>{
                              setNewStatus(e);
                            }}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={statusLabels[order.estado]} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel className="text-cloud-dark">Estado</SelectLabel>
                                  <SelectItem value="pendiente">Pendiente</SelectItem>
                                  <SelectItem value="en-progreso">En progreso</SelectItem>
                                  <SelectItem value="realizado">Realizado</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter className="bg-white">
                          <Button type="submit" onClick={()=>{
                            updateStatus(order.id,newStatus);
                          }} className="text-white bg-cloud hover:bg-cloud-dark">Actualizar Estado</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-cloud-light/20 relative top-[-73px]">
        <div className="flex items-center gap-4">
          <span className="text-sm text-cloud-dark md:flex md:items-baseline hidden">
            Página {currentPage} de {totalPages} <p className="inline-block text-[12px] text-cloud-dark/50 lg:ml-2">{currentOrders.length} resultados encontrados</p>
          </span>
          
          {/* mobile */}
          <span className="text-sm text-cloud-dark flex md:hidden">
            {currentPage}/{totalPages}
          </span>
        </div>
        
        <div className="relative md:right-6">
          <input
            type="text"
            placeholder="Buscar por cliente o servicio..."
            defaultValue={searchParams.get('search') || ''}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[150px] md:w-[400px] lg:w-[500px] px-4 py-2.5 pl-10 text-sm border-2 rounded-lg border-cloud-light/30 focus:outline-none focus:border-cloud-dark/40 transition-colors duration-200"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-cloud-dark/40" />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={currentPage === 1}
            className={`px-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
          >
            <Link 
              replace 
              scroll={false}
              href={currentPage === 1 ? '#' : createPageUrl(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={currentPage === totalPages}
            className={`px-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
          >
            <Link 
              replace 
              scroll={false}
              href={currentPage === totalPages ? '#' : createPageUrl(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}