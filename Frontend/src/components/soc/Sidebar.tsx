import { Search, History, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "analyze", label: "Analyze Incident", icon: Search },
  { id: "history", label: "Incident History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary border border-sidebar-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-sidebar-primary" : "text-muted-foreground"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 ml-auto text-sidebar-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">API Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-severity-low" />
            <span className="text-sm text-sidebar-foreground">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
