"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 
import { getAllBlogsAPi } from "@services/BlogService";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);



  const getAllBlogs = async () => {
    const res = await getAllBlogsAPi() 
    setBlogs(res?.blogs);
  } 
 
  useEffect(() => { 
     getAllBlogs();
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Skincare Blogs ✨
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blogs/${blog.slug}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden">
              
              <img
                src={blog.image}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-3">
                  {blog.description}
                </p>

                <div className="mt-3 text-black font-medium">
                  Read More →
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}