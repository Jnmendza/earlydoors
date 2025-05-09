"use client";
import React, { useEffect, useState } from "react";
import BlogHero from "@/components/landing/BlogHero";
import { bebasFont } from "@/lib/font";
import BlogCard from "@/components/landing/BlogCard";
import { getBlogCardPost } from "@/data/posts";
import { BlogCardPost } from "@/types/types";

const filtersTabs = ["All", "Topic1", "Topic2", "Topic3", "Topic4"];

const BlogPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("All");
  const [postData, setPostData] = useState<BlogCardPost[] | null>(null);
  console.log("DATA", postData);
  useEffect(() => {
    const getPost = async () => {
      const data = await getBlogCardPost();
      setPostData(data);
    };
    getPost();
  }, []);

  return (
    <div>
      <BlogHero />
      {/* Container */}
      <div className='max-w-5xl w-full mx-auto flex flex-col'>
        {/* Title */}
        <div className='mt-10'>
          <h2 className='text-4xl  text-edorange'>Blog</h2>
          <p className={`${bebasFont.className} text-lg mt-2`}>
            Let’s dive in...(no yellow cards, we promise).
          </p>
        </div>
        {/* Tabs */}
        <div>
          {filtersTabs.map((tab, index) => (
            <button
              key={index}
              className={`
                px-6 py-2 cursor-pointer mt-4 w-[80px] text-center
                ${bebasFont.className}
                ${
                  currentTab === tab
                    ? "bg-ednavy text-edorange"
                    : "text-ednavy hover:text-edorange hover:bg-ednavy"
                }
              `}
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Blog cards */}
        <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {postData?.map((post: BlogCardPost) => (
            <BlogCard
              key={post._id}
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
      </div>
    </div>
  );
};

export default BlogPage;
