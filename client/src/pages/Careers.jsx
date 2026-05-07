import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/jobs/all",
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join Our <span className="text-primary">Creative Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore open positions and start your journey with us.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-secondary rounded-xl p-8 flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {job.category}
                  </div>
                  <span className="text-muted-foreground text-xs italic">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  {job.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>{job.job_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{job.experience || "Not Specified"}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-8 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/apply/${job.id}`}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-secondary rounded-xl">
              <p className="text-xl text-muted-foreground">
                Currently, no open positions available.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-primary hover:underline"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
