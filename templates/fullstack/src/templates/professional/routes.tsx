import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ContactPage } from './pages/ContactPage';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

// Simple auth page wrapper
function AuthPage({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <PageWrapper title={title}>
      <Section spacing="tight" className="pt-24">
        <Container size="narrow">
          <div className="max-w-md mx-auto">
            <h1
              className="text-3xl font-bold text-secondary-900 mb-8 text-center"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </h1>
            {children}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

// 404 Page
function NotFoundPage() {
  return (
    <PageWrapper title="Page Not Found">
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-6xl font-bold text-secondary-900 mb-4">404</h1>
            <p className="text-xl text-secondary-600 mb-8">Page not found</p>
            <a
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Go Home
            </a>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'case-studies',
        element: <CaseStudiesPage />,
      },
      {
        path: 'consultation',
        element: <ConsultationPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'login',
        element: (
          <AuthPage title="Client Portal">
            <LoginForm />
          </AuthPage>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthPage title="Create Account">
            <SignUpForm />
          </AuthPage>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
