import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageLoader } from './components/common/PageLoader';
import { FloatingActions } from './components/common/FloatingActions';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductCategoryPage } from './pages/ProductCategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CustomCursor } from './components/common/CustomCursor';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      {/* Dynamic Luxury Page Loading Animation on every route change */}
      <PageLoader />
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111111]">
        <Header />
        <main className="flex-grow">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:category" element={<ProductCategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Floating Bottom-Right WhatsApp & Back To Top Buttons */}
        <FloatingActions />
      </div>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
