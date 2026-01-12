import { redirect } from 'next/navigation';
import { getSession } from '@/lib/cookies';
import Link from 'next/link';
import LoginButton from '@/components/LoginButton';

export default async function LoginPage() {
  const session = getSession();

  // If already authenticated, redirect to dashboard
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

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2>Sign in to Scalekit Demo</h2>
                  <p className="text-muted">Use your enterprise credentials to continue</p>
                </div>

                <div className="d-grid gap-2">
                  <LoginButton />
                </div>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    By signing in, you agree to our terms of service and privacy policy.
                  </small>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <Link href="/" className="text-decoration-none">← Back to Home</Link>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h6 className="card-title">About this Demo</h6>
                <p className="card-text small text-muted">
                  This is a demonstration of Next.js integration with Scalekit OIDC authentication.
                  Click the button above to authenticate using your configured Scalekit provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

