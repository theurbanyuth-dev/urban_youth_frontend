"use server";

import { getHeaders } from "@lib/auth-server";
import { baseURL, handleResponse } from "@services/CommonService";
import { revalidatePath, revalidateTag } from "next/cache";

const getAllBlogsAPi = async () => {
  try {
    const response = await fetch(`${baseURL}/blogs`, {
      cache: "no-cache",
      //   next: { revalidate: 300 },
      method: "GET",
      headers: await getHeaders(),
    });
    const blogs = await handleResponse(response);

    return {
      blogs,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}; 

const getSingleBlogApi = async ({ slug }) => { 
  try {
    const response = await fetch(`${baseURL}/blogs/${slug}`, {
      cache: "no-cache",
      method: "GET",
      headers: await getHeaders(),
    });
    const blog = await handleResponse(response);

    return {
      blog,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getAllBlogsAPi, getSingleBlogApi };
