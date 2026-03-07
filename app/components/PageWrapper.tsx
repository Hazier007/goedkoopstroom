import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-10 px-4">
          <div className="max-w-3xl mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-10 -mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
