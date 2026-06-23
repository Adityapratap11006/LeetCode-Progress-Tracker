import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSidebar } from '../context/SidebarContext'
import { cn } from '../lib/utils'
import {
  LayoutDashboard, ListTodo, BookOpen, RefreshCw, BarChart3, Settings,
  LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/problems', label: 'Problems', icon: ListTodo },
  { to: '/studylists', label: 'Study Lists', icon: BookOpen },
  { to: '/revisions', label: 'Revisions', icon: RefreshCw },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { collapsed, toggle } = useSidebar()
  const { user, logout } = useAuth()

  return (
    <aside
      style={{ width: collapsed ? 64 : 224 }}
      className="fixed left-0 top-0 bottom-0 bg-algo-900 border-r border-glass-border z-40 flex flex-col overflow-hidden transition-all duration-300"
    >
      {/* Logo */}
      <div className={cn('flex items-center h-14 border-b border-glass-border shrink-0', collapsed ? 'justify-center px-0' : 'px-4 gap-2.5')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center shadow-lg shadow-purple-bright/20 shrink-0">
          <span className="text-white font-bold text-sm">LT</span>
        </div>
        {!collapsed && (
          <span className="text-sm font-bold text-white whitespace-nowrap">
            LeetTrack
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-hidden">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg transition-all duration-200',
                collapsed ? 'justify-center h-10 w-10 mx-auto' : 'px-3 h-9',
                isActive
                  ? 'bg-purple-bright/12 text-purple-glow border border-purple-bright/20'
                  : 'text-muted hover:text-white hover:bg-glass-hover',
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && (
              <span className="text-sm whitespace-nowrap">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className={cn('border-t border-glass-border py-3', collapsed ? 'px-2' : 'px-3')}>
        <div className={cn('flex items-center gap-3 mb-2', collapsed ? 'justify-center' : '')}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          {!collapsed && (
            <span className="text-sm text-muted truncate">
              {user?.username || 'User'}
            </span>
          )}
        </div>

        <div className={cn('flex', collapsed ? 'flex-col items-center gap-1' : 'gap-1')}>
          <button
            onClick={logout}
            className={cn(
              'flex items-center gap-2 rounded-lg text-sm font-medium text-muted hover:text-danger hover:bg-danger/10 transition-all duration-200',
              collapsed ? 'justify-center h-10 w-10' : 'px-3 h-8 flex-1',
            )}
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
          </button>
          <button
            onClick={toggle}
            className={cn(
              'flex items-center gap-2 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-glass-hover transition-all duration-200',
              collapsed ? 'justify-center h-10 w-10' : 'px-3 h-8 flex-1',
            )}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
