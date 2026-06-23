import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, LogIn, ArrowRight } from 'lucide-react'
import { login as loginApi } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import AuroraBackground from '../components/AuroraBackground'
import Particles from '../components/Particles'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('All fields are required'); return }
    setError('')
    setLoading(true)
    try {
      const data = await loginApi(form)
      login(data.token, { email: form.email })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-algo-950 px-4 relative overflow-hidden">
      <AuroraBackground />
      <Particles count={30} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-bright/25"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-muted mt-1">Sign in to AlgoForge</p>
        </div>

        <Card>
          <CardContent className="p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-sm text-danger"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input type="email" name="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" className="pl-9" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input type="password" name="password" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" className="pl-9" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-10">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-purple-glow hover:text-purple-bright transition-colors font-medium">Register</Link>
            </p>

            <div className="mt-4 pt-4 border-t border-glass-border">
              <Link to="/" className="flex items-center justify-center gap-1 text-xs text-muted hover:text-white transition-colors">
                <ArrowRight className="w-3 h-3 rotate-180" />
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
