"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, Settings, HelpCircle, Moon, LayoutDashboard, ShoppingBag, FileText, Users, BarChart2 } from "lucide-react";
import Link from "next/link";
import { User } from "@/data/navbarData";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export function AppSidebar() {
  const [productExpanded, setProductExpanded] = useState(true);
  const [activePage, setActivePage] = useState("/");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

   const currentUser = User[0];

  const generalItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Product",
      url: "/Product",
      icon: ShoppingBag,
      count: 19,
      expandable: true,
      expanded: productExpanded,
      subItems: [
        { title: "Sneakers", url: "/Product" },
        { title: "Jacket", url: "/Product" },
        { title: "T-Shirt", url: "/Product" },
        { title: "Bag", url: "/Product" },
      ]
    },
    {
      title: "Transaction",
      url: "/Transaction",
      icon: FileText,
      count: 441,
      highlighted: false
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Sales Report",
      url: "/sales-report",
      icon: BarChart2,
    },
  ];

  // Tools menu items
  const toolsItems = [
    {
      title: "Account & Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
    },
  ];

  // Function to handle navigation item click
  const handleNavClick = (url: string, expandable?: boolean) => {
    if (!expandable) {
      setActivePage(url);
    }
  };

  return (
    <Sidebar className={`bg-zinc-950 text-white h-screen flex flex-col justify-between ${collapsed ? "w-16" : "w-64"}`}>
      {/* Logo and collapse trigger section */}
      <div className="p-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold flex items-center">
            <span className="mr-1">|</span>
            <span>|</span>
            {!collapsed && <span className="ml-2">NexBoard</span>}
          </div>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded hover:bg-zinc-800"
          title="Toggle Sidebar"
        >
          <ChevronLeft size={18} className={`${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Company section */}
      {!collapsed && (
        <div className="p-4 pb-2">
          <div className="mt-4 mb-2 bg-zinc-900 rounded-md p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-xs">
                <span>KS</span>
              </Avatar>
              <div>
                <div className="text-xs text-gray-400">Company</div>
                <div className="text-sm font-medium">Kanky Store</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SidebarContent className="flex-grow">
        {/* GENERAL SECTION */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-gray-400 px-4 py-2">GENERAL</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={`${item.highlighted ? "bg-blue-50 text-blue-600" : ""}`}>
                      <Link 
                        href={item.url} 
                        className={`flex items-center justify-between px-4 py-2 rounded-md ${item.highlighted ? "bg-blue-50/10 text-blue-500" : "text-gray-300"} ${activePage === item.url ? "bg-blue-50/10 text-blue-500" : ""}`}
                        onClick={(e) => {
                          if (item.expandable) {
                            e.preventDefault();
                            setProductExpanded(!productExpanded);
                          } else {
                            handleNavClick(item.url);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} />
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                        {!collapsed && (
                          <div className="flex items-center">
                            {item.count && (
                              <span className={`text-xs ${item.highlighted ? "text-blue-500" : "text-gray-400"}`}>
                                ({item.count})
                              </span>
                            )}
                            {item.expandable && (
                              <span className="ml-2">{item.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
                            )}
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Submenu for Products */}
                  {item.expandable && item.expanded && !collapsed && (
                    <div className="ml-10 pl-2 border-l border-zinc-800">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link 
                              href={subItem.url} 
                              className={`flex items-center py-1.5 text-sm ${activePage === subItem.url ? "text-blue-500" : "text-gray-400"}`}
                              onClick={() => handleNavClick(subItem.url)}
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* TOOLS SECTION */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-gray-400 px-4 py-2 mt-4">TOOLS</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url} 
                      className={`flex items-center gap-3 px-4 py-2 ${activePage === item.url ? "text-blue-500" : "text-gray-300"}`}
                      onClick={() => handleNavClick(item.url)}
                    >
                      <item.icon size={18} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Dark Mode Toggle */}
              <SidebarMenuItem>
                <div className="flex items-center justify-between px-4 py-2 text-gray-300">
                  <div className="flex items-center gap-3">
                    <Moon size={18} />
                    {!collapsed && <span>Dark Mode</span>}
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={() => setDarkMode(!darkMode)}
                  />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Section */}
      {!collapsed && (
        <div className="p-4 mt-auto">
          <div className="bg-zinc-900 rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={`${currentUser.avatar}`} />
                  
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-400">{currentUser.role}</div>
                </div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
