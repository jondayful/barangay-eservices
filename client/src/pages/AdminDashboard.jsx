import { useState, useEffect } from "react";
import { getAllRequests, updateRequestStatus } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Check,
  X,
  Search,
  Filter,
  FileText,
  Users,
  Activity,
  ChevronDown,
} from "lucide-react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRequests();
  }, []);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((r) => r.status === filterStatus));
    }
  }, [requests, filterStatus]);

  const fetchAllRequests = async () => {
    try {
      const { data } = await getAllRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load requests");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!confirm(`Are you sure you want to ${newStatus} this request?`)) return;
    try {
      await updateRequestStatus(id, newStatus);
      fetchAllRequests();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const stats = {
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    total: requests.length,
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* --- TOP NAVIGATION --- */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">ADMIN PORTAL</h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Barangay Management System
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />{" "}
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase">
                Pending Review
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">
                {stats.pending}
              </h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
              <Activity size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase">
                Processed Today
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">
                {stats.approved}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Check size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase">
                Total Requests
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">
                {stats.total}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users size={20} className="text-slate-400" /> Resident Requests
            </h2>

            <div className="flex gap-2">
              <select
                className="bg-white border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Resident Name</th>
                  <th className="px-6 py-4">Document Type</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No requests found matching your filter.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {req.User?.firstName} {req.User?.lastName}
                        <div className="text-xs text-slate-400 font-normal">
                          {req.User?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          {req.docType}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate"
                        title={req.purpose}
                      >
                        {req.purpose}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                          ${
                            req.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            req.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }
                        `}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {req.status === "pending" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(req.id, "approved")
                              }
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                              title="Approve Request"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req.id, "rejected")
                              }
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                              title="Reject Request"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">
                            Processed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
