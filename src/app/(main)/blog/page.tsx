"use client";
import React, { useEffect, useState } from "react";
import BlogHero from "@/components/landing/BlogHero";
import { bebasFont } from "@/lib/font";
import BlogCard from "@/components/landing/BlogCard";
import { getBlogCardPost } from "@/data/posts";
import { BlogCardPost } from "@/types/types";
import { getCategories } from "@/data/categories";

const BlogPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("All");
  const [postData, setPostData] = useState<BlogCardPost[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const filteredCategories = ["All", ...categories];
  const filteredPosts =
    postData?.filter((post) => {
      // If "All" is selected, return all posts
      if (currentTab === "All") return true;

      // Otherwise filter posts that have at least one category matching currentTab
      return post.categories?.some((category) => category.title === currentTab);
    }) || [];
  useEffect(() => {
    const getPost = async () => {
      const data = await getBlogCardPost();
      setPostData(data);
    };
    const getCats = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    getPost();
    getCats();
  }, []);

  return (
    <div>
      <BlogHero />
      {/* Container */}
      <div className='max-w-5xl w-full mx-auto flex flex-col px-4 md:px-0'>
        {/* Title */}
        <div className='mt-10'>
          <h2 className='text-4xl  text-edorange'>Blog</h2>
          <p className={`${bebasFont.className} text-lg mt-2`}>
            Let’s dive in...(no yellow cards, we promise).
          </p>
        </div>
        {/* Tabs */}
        <div className='flex space-x-2 mt-4'>
          {filteredCategories.map((title, index) => (
            <button
              key={index}
              className={`
                px-6 py-2 cursor-pointer mt-4  text-center
                ${bebasFont.className}
                ${
                  currentTab === title
                    ? "bg-ednavy text-edorange"
                    : "text-ednavy hover:text-edorange hover:bg-ednavy"
                }
              `}
              onClick={() => {
                setCurrentTab(title);
              }}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Blog cards */}
        {filteredPosts.length !== 0 ? (
          <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
            {filteredPosts?.map((post: BlogCardPost) => (
              <BlogCard
                key={post._id}
                slug={post.slug}
                badge={post.categories[0].title}
                date={post._createdAt}
                readTime={post.readTime}
                title={post.title}
                subTitle={post.description}
                author={post.author}
                mainImage={post.mainImage}
              />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center h-[32vw] text-center w-full'>
            <p className='w-full'>There are no blog post at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
