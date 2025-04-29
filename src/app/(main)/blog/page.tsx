"use client";
import React, { useState } from "react";
import BlogHero from "@/components/BlogHero";
import { bebasFont } from "@/lib/font";
import BlogCard, { BlogCardProps } from "@/components/BlogCard";

const filtersTabs = ["All", "Topic1", "Topic2", "Topic3", "Topic4"];
const cardText: BlogCardProps = {
  tab: "Matchday Guides",
  date: "30 Jan 2025",
  readTime: "10",
  title: "Top 5 Formations in Football",
  subTitle:
    "Explore the latest in football management when it comes to point of attack.",
  author: {
    name: "Footy McFoot",
    avatar: "",
  },
};

const BlogPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("All");

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
        <div className='mt-8'>
          <BlogCard
            tab={cardText.tab}
            date={cardText.date}
            readTime={cardText.readTime}
            title={cardText.title}
            subTitle={cardText.subTitle}
            author={cardText.author}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
