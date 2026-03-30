import { useAuth } from '../hooks/useAuth.js'

function DashboardPage() {
  const { user } = useAuth()

  return (
    <main className='page-shell'>
      <section className='auth-card'>
        <h1>Dashboard</h1>
        <p className='page-copy'>You are authenticated and ready for the next slice.</p>

        <dl className='user-summary'>
          <div>
            <dt>Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

export default DashboardPage
