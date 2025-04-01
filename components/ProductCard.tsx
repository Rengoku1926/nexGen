"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, Filter } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductData } from "@/data/dashboardData"

interface ProductCardProps {
  title: string
  data: ProductData[]
}

export function ProductCard({ title, data }: ProductCardProps) {
  const [sortField, setSortField] = React.useState<keyof ProductData | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof ProductData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortField) return data
    
    return [...data].sort((a, b) => {
      if (sortField === "price" || sortField === "sales") {
        const aValue = Number(a[sortField])
        const bValue = Number(b[sortField])
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      
      const aValue = String(a[sortField])
      const bValue = String(b[sortField])
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })
  }, [data, sortField, sortDirection])

  return (
    <Card className="bg-black text-white border-gray-800 h-[25rem] w-[50rem] max-w-full">
      <CardHeader className="flex flex-row items-center justify-between py-1 px-6">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Button variant="link" className="text-white">
          Show All <ArrowUp className="ml-2 rotate-45" size={16} />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex justify-center items-center overflow-auto">
        <div className="w-full">
        <Table className="w-full rounded-2xl overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#101011]">
              <TableHead 
                className="text-gray-400 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Product
                <span className="inline-block ml-1">
                  {sortField === "name" ? (
                    sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                  ) : (
                    <div className="flex flex-col">
                      <ArrowUp size={10} className="mb-[-5px]" />
                      <ArrowDown size={10} />
                    </div>
                  )}
                </span>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer text-right"
                onClick={() => handleSort("price")}
              >
                Price
                <span className="inline-block ml-1">
                  {sortField === "price" ? (
                    sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                  ) : (
                    <div className="flex flex-col">
                      <ArrowUp size={10} className="mb-[-5px]" />
                      <ArrowDown size={10} />
                    </div>
                  )}
                </span>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer text-right"
                onClick={() => handleSort("sales")}
              >
                Sales
                <Filter size={16} className="inline-block ml-1" />
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer text-right"
                onClick={() => handleSort("status")}
              >
                Status
                <Filter size={16} className="inline-block ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((product) => (
              <TableRow key={`${product.id}-${product.sales}`} className="border-gray-800 hover:bg-gray-900">
                <TableCell className="py-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center mr-3">
                      <img src='/nexImage.png' className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-blue-400">{product.id}</div>
                      <div>{product.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={cn(
                      "font-normal",
                      product.status === "Success" ? "bg-green-500/20 text-green-500" : 
                      product.status === "Processing" ? "bg-yellow-500/20 text-yellow-500" : 
                      "bg-red-500/20 text-red-500"
                    )}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}