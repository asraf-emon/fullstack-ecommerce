import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Link as LinkIcon,
  FileText,
  Send,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    resume_link: "",
    cover_letter: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Submitting your application...");

    try {
      const payload = {
        job_id: jobId,
        ...formData,
      };

      const res = await axios.post(
        "http://localhost:4000/api/v1/jobs/apply",
        payload,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.update(toastId, {
          render: "Application submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setFormData({
          full_name: "",
          email: "",
          resume_link: "",
          cover_letter: "",
        });
        setTimeout(() => navigate("/careers"), 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to submit application.";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/careers")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Careers</span>
        </button>

        <div className="bg-secondary rounded-2xl p-8 border border-border/50 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Submit Your <span className="text-primary">Application</span>
            </h2>
            <p className="text-muted-foreground">
              Please fill in the details below. Our HR team will review your
              profile and contact you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Resume Link */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Resume / CV Link (Google Drive/Dropbox)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  required
                  value={formData.resume_link}
                  onChange={(e) =>
                    setFormData({ ...formData, resume_link: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Cover Letter (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-4 w-5 h-5 text-primary/60" />
                <textarea
                  rows="5"
                  placeholder="Tell us why you are a good fit for this position..."
                  value={formData.cover_letter}
                  onChange={(e) =>
                    setFormData({ ...formData, cover_letter: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all resize-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center space-x-3 disabled:opacity-70 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
