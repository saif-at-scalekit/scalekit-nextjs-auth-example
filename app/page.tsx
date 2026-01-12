import { redirect } from 'next/navigation';
import { getSession } from '@/lib/cookies';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function Home() {
  const session = getSession();

  // If authenticated, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" href="/">Scalekit Demo</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" href="/login">Login</Link>
          </div>
        </div>
      </nav>

      <main className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center mb-5">
              <h1 className="display-4">Welcome to Scalekit Demo</h1>
              <p className="lead">A Next.js application demonstrating OIDC authentication with Scalekit</p>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <h3 className="card-title">Get Started</h3>
                <p className="card-text">Sign in with your Scalekit account to access the demo features.</p>
                <Link href="/login" className="btn btn-primary btn-lg">
                  🔐 Sign in with Scalekit
                </Link>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">🔒 Secure Authentication</h5>
                    <p className="card-text">Enterprise-grade OIDC authentication powered by Scalekit.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">👤 User Profile</h5>
                    <p className="card-text">Access user information and claims from the OIDC provider.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">🚀 Next.js</h5>
                    <p className="card-text">Built with Next.js and Scalekit OAuth2.</p>
                  </div>
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

