import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Shield, ArrowRight, CheckCircle, Users } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const handleStartRequest = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-slate-50">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Now Serving Online Requests 24/7
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Your Barangay, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Digitalized.
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Skip the long lines. Request Clearances, Indigency, and Residency
            certificates from the comfort of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Link */}
            <button
              onClick={handleStartRequest}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/25 hover:-translate-y-1 cursor-pointer"
            >
              Start Request <ArrowRight size={20} />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition hover:-translate-y-1"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">500+</div>
              <div className="text-sm text-slate-500 font-medium">
                Daily Requests
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
              <div className="text-sm text-slate-500 font-medium">
                Turnaround Time
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">10k+</div>
              <div className="text-sm text-slate-500 font-medium">
                Residents Served
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">100%</div>
              <div className="text-sm text-slate-500 font-medium">Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              We've simplified the most common barangay transactions so you can
              focus on what matters.
            </p>
          </div>

          <div id="services" className="grid md:grid-cols-3 gap-6 scroll-mt-28">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition duration-300 group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Barangay Clearance
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Official document certifying good standing. Required for
                employment, postal ID, and banking.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Valid for
                  6 months
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Instant
                  Processing
                </li>
              </ul>
            </div>

            {/* Service 2 - Highlighted */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl shadow-slate-900/20 transform md:-translate-y-4">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Certificate of Indigency
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Proof of low-income status. Essential for scholarships, medical
                assistance, and legal aid.
              </p>

              {/* Handler */}
              <button
                onClick={handleStartRequest}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
              >
                Request Now
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-100 transition duration-300 group">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Residency
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Proof that you live in our barangay. Needed for school
                enrollment and utility installation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Digital
                  Copy Available
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Printed
                  on Security Paper
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-slate-600">
              Three simple steps to get your documents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10"></div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-slate-500">
                Register with your personal details to get access to the portal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Submit Request</h3>
              <p className="text-slate-500">
                Choose your document type and fill out the required purpose.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Pick Up</h3>
              <p className="text-slate-500">
                Wait for approval email and pick up your document at the hall.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white">
                BarangayConnect
              </span>
              <p className="text-sm mt-2 opacity-60">
                Digitalizing public service for a better tomorrow.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact Support
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm opacity-50">
            &copy; 2025 Barangay E-Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
