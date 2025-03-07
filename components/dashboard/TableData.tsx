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


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton"

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


export function TableData({ orders, loading }: { orders: any, loading: boolean }) {

  const [newStatus, setNewStatus] = useState('')
  console.log(newStatus)

  const updateStatus = async (orderId:number , status:string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders?id=${orderId}&newStatus=${status}`, { // Corregido aquí
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      setNewStatus('');
      window.location.reload();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if(loading){
    return (
      <div className="flex flex-col space-y-2">
        <Skeleton className="w-auto h-[70px]" />
        <Skeleton className="w-auto h-[70px]" />
        <Skeleton className="w-auto h-[70px]" />
      </div>
    )
  }

  return (
   <div className="relative overflow-hidden rounded-xl border border-cloud-light/20 bg-white/50 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent backdrop-blur-sm" />
      <div className="relative">
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
            {
              orders.map((order) => (
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
                            console.log(e)
                            setNewStatus(e);
                          }}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={statusLabels[order.estado]} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel className="text-cloud-dark">Estado</SelectLabel>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                <SelectItem value="en progreso">En progreso</SelectItem>
                                <SelectItem value="realizado">Realizado</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className="bg-white">
                        <Button type="submit" onClick={()=>{
                          updateStatus(order.id,newStatus);
                        }} className="text-white bg-cloud">Actualizar Estado</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>))
            }
          </TableBody>
        </Table>
      </div>
   </div>
  )
}