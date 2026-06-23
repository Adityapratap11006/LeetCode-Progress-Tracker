import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSidebar } from '../context/SidebarContext'

export default function AppLayout() {
  const { collapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-algo-950">
      <Sidebar />
      <main
        style={{ marginLeft: collapsed ? 64 : 224 }}
        className="flex-1 min-w-0 transition-all duration-300"
      >
        <Outlet />
      </main>
    </div>
  )
}
