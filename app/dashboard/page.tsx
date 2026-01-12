import { redirect } from 'next/navigation';
import { getSession } from '@/lib/cookies';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import PrintButton from '@/components/PrintButton';
import SessionTime from '@/components/SessionTime';
import { format } from 'date-fns';

export default async function DashboardPage() {
  const session = getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  const { user, tokens, roles, permissions } = session;
  const expiresAt = tokens.expires_at ? new Date(tokens.expires_at) : null;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" href="/">Scalekit Demo</Link>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">Welcome, {user.name || 'User'}!</span>
            <Link className="nav-link" href="/dashboard">Dashboard</Link>
            <Link className="nav-link" href="/sessions">Sessions</Link>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1>Dashboard</h1>
            <p className="lead">Welcome to your authenticated dashboard!</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">User Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3"><strong>Name:</strong></div>
                  <div className="col-sm-9">{user.name || 'N/A'}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3"><strong>Email:</strong></div>
                  <div className="col-sm-9">{user.email || 'N/A'}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3"><strong>Subject:</strong></div>
                  <div className="col-sm-9">{user.sub || 'N/A'}</div>
                </div>
              </div>
            </div>

            {(roles && roles.length > 0) || (permissions && permissions.length > 0) ? (
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="mb-0">User Roles & Permissions</h5>
                </div>
                <div className="card-body">
                  {roles && roles.length > 0 && (
                    <div className="mb-3">
                      <strong>Roles:</strong>
                      {roles.map((role, idx) => (
                        <span key={idx} className="badge bg-secondary ms-1">{role}</span>
                      ))}
                    </div>
                  )}
                  {permissions && permissions.length > 0 && (
                    <div>
                      <strong>Permissions:</strong>
                      {permissions.map((permission, idx) => (
                        <span key={idx} className="badge bg-info ms-1">{permission}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <PrintButton />
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h6 className="mb-0">Session Status</h6>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2">Active</span>
                  <small className="text-muted">Authenticated via Scalekit OIDC</small>
                </div>
                <small className="text-muted d-block mt-2">
                  Session established: <SessionTime />
                </small>
                {expiresAt && (
                  <small className="text-muted d-block mt-1">
                    Token expires: {format(expiresAt, 'yyyy-MM-dd HH:mm:ss')}
                  </small>
                )}
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h6 className="mb-0">Management</h6>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Link href="/sessions" className="btn btn-outline-info btn-sm">Session Management</Link>
                  <Link href="/organization/settings" className="btn btn-outline-primary btn-sm">Organization Settings</Link>
                  <small className="text-muted mt-2">Requires: organization:settings permission</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

