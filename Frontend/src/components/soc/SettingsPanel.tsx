import { Settings, Server, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";

export function SettingsPanel() {
  return (
    <div className="soc-card animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full ml-2">
          Mock UI
        </span>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground text-sm">API Configuration</h3>
          </div>
          <div className="bg-secondary/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">Backend URL</p>
            <code className="text-sm text-primary font-mono">{API_BASE_URL}</code>
            <p className="text-xs text-muted-foreground mt-3">
              Configure via <code className="text-primary">VITE_API_BASE_URL</code> environment variable
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground text-sm">Notifications</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-foreground">Critical Alerts</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-foreground">Email Reports</span>
              <div className="w-10 h-6 bg-muted rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground text-sm">Security</h3>
          </div>
          <Button variant="outline" className="w-full" disabled>
            Configure API Key
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Settings panel is for demonstration only
      </p>
    </div>
  );
}
