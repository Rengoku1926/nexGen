"use client"
import { useState, useMemo, useEffect } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ordersData, OrderStatus, Order } from '@/data/ordersData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function OrderTable() {
  const [selectedTab, setSelectedTab] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const itemsPerPage = 8;
  
  // Filter orders based on selected tab
  const filteredOrders = useMemo(() => {
    let filtered = [...ordersData];
    
    // Filter by tab
    if (selectedTab !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === selectedTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.productId.toLowerCase().includes(query) ||
        order.productName.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedTab, searchQuery, ordersData]);
  
  // Count orders by status
  const orderCounts = useMemo(() => {
    const all = ordersData.length;
    const shipping = ordersData.filter(order => order.orderStatus === 'Shipping').length;
    const completed = ordersData.filter(order => order.orderStatus === 'Completed').length;
    const cancelled = ordersData.filter(order => order.orderStatus === 'Cancelled').length;
    
    return { all, shipping, completed, cancelled };
  }, [ordersData]);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);
  
  // Handle checkbox selection
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
    setSelectAll(!selectAll);
  };
useEffect(() => {
  setSelectAll(false);
  setSelectedOrders([]);
}, [currentPage]);

  
  // status badge class
  const getStatusBadgeClass = (status: OrderStatus | 'Cancelled') => {
    switch(status) {
      case 'Shipping':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };
  
  // payment status badge class
  const getPaymentBadgeClass = (status: string) => {
    return status === 'Paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };
  
  return (
    <div className="w-full bg-black text-white p-4">
      {/* Header with search, filter and export buttons */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <div className="relative w-full sm:w-96">
          <Input
            type="text"
            placeholder="Search for id, name product"
            className="w-full pl-10 bg-black border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          
          <Button variant="outline" className="border-gray-700">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Order
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="all" 
        className="w-full mb-4"
        onValueChange={(value) => setSelectedTab(value as 'all' | OrderStatus)}
      >
        <TabsList className="w-full bg-gray-900">
          <TabsTrigger value="all" className="flex-1">
            All Orders ({orderCounts.all})
          </TabsTrigger>
          <TabsTrigger value="Shipping" className="flex-1">
            Shipping ({orderCounts.shipping})
          </TabsTrigger>
          <TabsTrigger value="Completed" className="flex-1">
            Completed ({orderCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="Cancelled" className="flex-1">
            Cancel ({orderCounts.cancelled})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-900">
            <TableRow className="border-b border-gray-800">
              <TableHead className="w-12 p-4">
                <Checkbox 
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="p-4">Product</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Price</TableHead>
              <TableHead className="p-4">Date</TableHead>
              <TableHead className="p-4">Payment</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow 
                key={order.id} 
                className="border-b border-gray-800 hover:bg-gray-900"
              >
                <TableCell className="p-4">
                  <Checkbox 
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden flex items-center justify-center">
                      <img 
                        src={`${order.productImage}`} 
                        alt={`${order.productName} thumbnail`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-blue-500">{order.productId}</div>
                      <div>{order.productName} ({order.productColor})</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-4">{order.customer}</TableCell>
                <TableCell className="p-4">${order.price.toFixed(2)}</TableCell>
                <TableCell className="p-4">{order.date}</TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadgeClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus === 'Cancelled' ? 'Canceled' : order.orderStatus}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-800">
                      <Eye size={18} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-800">
                      <Pencil size={18} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          1 - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} Pages
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}