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


interface Orders {
  Pedidos: Pedido;
  Clientes: Cliente;
}

interface Pedido {
  id: number;
  cliente_id: number;
  monto: number;
  fecha_pedido: string; // Puedes usar Date si prefieres manejarlo como objeto Date
  fecha_servicio: string; // Igualmente, puedes usar Date aquí
  estado: 'pendiente' | 'en progreso' | 'realizado'; 
  servicio: 'Lavado Completo' | 'Lavado Exterior' | 'Lavado Interior';
}


interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  createdAt: string;
  updatedAt: string
}

const statusStyles = {
  pendiente: 'bg-cloud-light/20 text-cloud-dark border-cloud-light/30',
  'en progreso': 'bg-cloud text-secondary border-secondary/30',
  realizado: 'bg-primary/10 text-primary border-primary/30',
};

const statusLabels = {
  pendiente: 'Pendiente',
  'en progreso': 'En progreso',
  realizado: 'Realizado',
};

export function OrdersTable({ orders }: { orders: Orders[] }) {

  const [newStatus, setNewStatus] = useState('')
  console.log(newStatus)


  const updateStatus = async (orderId:number , status:string) => {
    try {
      const response = await fetch(`http://localhost:4321/${orderId}-${status}.json`, { // Corregido aquí
        method: 'POST',
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
            {orders.map((order) => (
              <TableRow key={order.Pedidos.id} className="border-cloud-light/20 hover:bg-cloud-light/5">
                <TableCell className="font-medium text-cloud-dark">{order.Pedidos.id}</TableCell>
                <TableCell className="font-medium text-cloud-dark">{order.Clientes.nombre + ' ' + order.Clientes.apellido}</TableCell>
                <TableCell className="text-cloud-dark">{order.Pedidos.servicio}</TableCell>
                <TableCell className="text-cloud-dark">
                  {new Date(order.Pedidos.fecha_servicio).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short'
                  })}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={`${statusStyles[order.Pedidos.estado]} border`}
                    variant="outline"
                  >
                    {statusLabels[order.Pedidos.estado]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-cloud-dark">
                  ${order.Pedidos.monto}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Pencil width={14} height={14} className='cursor-pointer'/>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white text-cloud-dark">
                      <DialogHeader className="bg-white text-cloud-dark">
                        <DialogTitle className="text-cloud-light text-[20px]">Información del pedido</DialogTitle>
                        <DialogDescription className="text-cloud-dark">
                          <p className='mt-2'><b>ID Pedido: </b>{order.Pedidos.id}</p>
                          <p><b>Nombre: </b>{order.Clientes.nombre + ' ' + order.Clientes.apellido}</p>
                          <p><b>Servicio: </b>{order.Pedidos.servicio}</p>
                          <p><b>Fecha Pedido: </b>{new Date(order.Pedidos.fecha_pedido).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short'
                          })}</p>
                          <p><b>Fecha Servicio: </b>{new Date(order.Pedidos.fecha_servicio).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short'
                          })}</p>
                          <p><b>Estado Actual: </b>{order.Pedidos.estado}</p>
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
                              <SelectValue placeholder={statusLabels[order.Pedidos.estado]} />
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
                          updateStatus(order.Pedidos.id,newStatus);
                        }} className="text-white bg-cloud">Actualizar Estado</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}