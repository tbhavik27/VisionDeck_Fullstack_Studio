import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import Home from '@/pages/Home';
import AboutPage from '@/pages/About';
import ServicesPage from '@/pages/Services';
import IndustriesPage from '@/pages/Industries';
import PortfolioPage from '@/pages/Portfolio';
import PricingPage from '@/pages/Pricing';
import ContactPage from '@/pages/Contact';
import BlogPage from '@/pages/Blog';
import BlogDetailPage from '@/pages/BlogDetail';
import CheckoutPage from '@/pages/Checkout';
import ServiceDetailPage from '@/pages/ServiceDetail';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import { PrivacyPage, TermsPage } from '@/pages/Legal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
