export default function StatsCard({ icon: Icon, label, value, color = 'text-primary' }) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-surface border border-border shrink-0">
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted">{label}</p>
          <p className={`text-xl font-bold mt-0.5 ${color}`}>
            {value ?? '—'}
          </p>
        </div>
      </div>
    </div>
  )
}
