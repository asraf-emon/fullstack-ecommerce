import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, User, ArrowLeft, Tag, Loader2, Share2 } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/blogs/single/${id}`,
        );
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <button
          onClick={() => navigate("/blog")}
          className="text-primary hover:underline"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
              {blog.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                <User className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <button className="flex items-center gap-2 ml-auto hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Feature Image */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-border/30">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-auto max-h-125 object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-teal max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed italic mb-8 border-l-4 border-primary pl-6">
            {blog.excerpt}
          </p>

          <div className="text-foreground/90 leading-[1.8] text-lg space-y-6 whitespace-pre-line">
            {blog.content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Tags: {blog.category}, Technology, Software
            </span>
          </div>
          <div className="flex gap-4">
            {/* Social Share Icons can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
