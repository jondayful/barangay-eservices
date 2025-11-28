import { useState, useEffect } from "react";
import { getRequests } from "../services/api";
import RequestModal from "../components/RequestModal";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'completed'

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await getRequests();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    completed: requests.filter(
      (r) => r.status === "approved" || r.status === "rejected"
    ).length,
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    if (filter === "pending") return req.status === "pending";
    if (filter === "completed")
      return req.status === "approved" || req.status === "rejected";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* --- HEADER SECTION --- */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Welcome back,{" "}
                <span className="text-blue-600">{user?.firstName}</span>!
              </h1>
              <p className="text-slate-500 mt-1">
                Here is what's happening with your documents.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
            >
              <Plus size={20} /> New Request
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {stats.total}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Total Requests
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {stats.pending}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Pending Review
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {stats.completed}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Completed
              </div>
            </div>
          </div>
        </div>

        {/* --- FILTERS & TITLE --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock size={20} className="text-slate-400" /> Recent Activity
          </h2>

          <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                filter === "all"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                filter === "pending"
                  ? "bg-yellow-50 text-yellow-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                filter === "completed"
                  ? "bg-green-50 text-green-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* --- REQUESTS LIST --- */}
        {loading ? (
          <div className="text-center py-20">
            <Loader className="animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-slate-500">Loading your requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">
              No requests found
            </h3>
            <p className="text-slate-500 mb-6">
              You haven't submitted any document requests yet.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Create your first request
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : ""
                      }
                      ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }
                    `}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    {req.docType}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
                    {req.purpose || "No purpose specified"}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 text-xs text-slate-400 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Show pickup if available */}
                    {req.pickup && (
                      <span className="text-blue-500 font-medium">
                        Pickup: {req.pickup}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Integration */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchRequests}
      />
    </div>
  );
}
