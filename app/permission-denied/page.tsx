import { redirect } from 'next/navigation';
import { getSession } from '@/lib/cookies';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function PermissionDeniedPage() {
  const session = getSession();

  // If not authenticated, redirect to login
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" href="/">Scalekit Demo</Link>
          <div className="navbar-nav ms-auto">
            {session && (
              <>
                <span className="navbar-text me-3">Welcome, {session.user.name || 'User'}!</span>
                <Link className="nav-link" href="/dashboard">Dashboard</Link>
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container">
        <div className="access-denied-container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
          <div className="card access-denied-card" style={{ maxWidth: '500px', width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px solid #dee2e6', borderRadius: '8px' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h4 className="mb-3 text-muted">Access Denied</h4>
              <p className="text-muted mb-4">You don't have permission to access this page.</p>
              <Link href="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </main>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

