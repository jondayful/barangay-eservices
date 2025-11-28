import { useState, useEffect } from "react";
import { createRequest } from "../services/api";
import {
  X,
  FileText,
  Calendar,
  MessageSquare,
  Send,
  Loader,
  ChevronDown,
} from "lucide-react";

export default function RequestModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    docType: "",
    purpose: "",
    pickup: "",
  });
  const [loading, setLoading] = useState(false);
  const [dateConstraints, setDateConstraints] = useState({ min: "", max: "" });

  useEffect(() => {
    if (isOpen) {
      const today = new Date();

      const minDateObj = new Date(today);
      minDateObj.setDate(today.getDate() + 1);
      const minStr = minDateObj.toISOString().split("T")[0];

      const maxDateObj = new Date(today);
      maxDateObj.setMonth(today.getMonth() + 1);
      const maxStr = maxDateObj.toISOString().split("T")[0];

      setDateConstraints({ min: minStr, max: maxStr });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRequest(formData);
      setFormData({ docType: "", purpose: "", pickup: "" });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden scale-100 transition-all border border-slate-100 relative">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} /> New Document
              Request
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Document Type Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Document Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText size={18} className="text-slate-400" />
                </div>
                <select
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition text-slate-700"
                  required
                  value={formData.docType}
                  onChange={(e) =>
                    setFormData({ ...formData, docType: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a document...
                  </option>
                  <option value="Barangay Clearance">Barangay Clearance</option>
                  <option value="Certificate of Indigency">
                    Certificate of Indigency
                  </option>
                  <option value="Certificate of Residency">
                    Certificate of Residency
                  </option>
                  <option value="Business Permit">Business Permit</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Purpose Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Purpose
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={18} className="text-slate-400" />
                </div>
                <textarea
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none text-slate-700"
                  placeholder="E.g. For employment, scholarship application..."
                  required
                  rows="3"
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Pickup Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-slate-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-slate-700"
                  value={formData.pickup}
                  min={dateConstraints.min}
                  max={dateConstraints.max}
                  onChange={(e) =>
                    setFormData({ ...formData, pickup: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 ml-1">
                Select a date between {dateConstraints.min} and{" "}
                {dateConstraints.max}. Leave blank for walk-in.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    Submit Request <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
