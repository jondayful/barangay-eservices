import { useState } from "react";
import { forgotPassword } from "../services/api";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      alert(
        "Error: " + (err.response?.data?.message || "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-slate-500 mb-8">
          No worries! Enter your email and we will send you reset instructions.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6">
            ✅ Email sent! Check your inbox for the reset link.
          </div>
        )}

        <div className="mt-8">
          <Link
            to="/login"
            className="text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
