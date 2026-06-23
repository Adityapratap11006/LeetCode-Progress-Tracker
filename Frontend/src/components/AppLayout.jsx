import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import AuroraBackground from './AuroraBackground'
import { useSidebar } from '../context/SidebarContext'

export default function AppLayout() {
  const { collapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-algo-950 relative">
      <AuroraBackground />
      <Sidebar />
      <motion.main
        animate={{ marginLeft: collapsed ? 64 : 224 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 relative z-10"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
