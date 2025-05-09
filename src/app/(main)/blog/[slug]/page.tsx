import { getFullPost } from "@/data/posts";
import { formatDate } from "@/lib/dateUtils";
import { FullBlog } from "@/types/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/sanity";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const slug = await params.slug;
  const post: FullBlog = await getFullPost(slug);
  const { title, _createdAt, readTime, mainImage, body, categories, author } =
    post;

  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div className='flex flex-col max-w-1/2 items-center text-center'>
        <h1 className='text-4xl text-edorange'>{title}</h1>
        <div className='flex text-center h-5 space-x-2 my-4'>
          <p>{readTime} min read</p>
          <Separator className='bg-edorange' orientation='vertical' />
          <p>Published {formatDate(_createdAt)}</p>
        </div>
      </div>

      <div className='relative w-full h-[60vh]'>
        <Image
          src={urlFor(mainImage).url()}
          alt={mainImage.alt}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>

      <div className='flex mt-10'>
        <div className='w-42 space-y-4 border-r-1 border-solid border-ednavy pr-4'>
          <div className='flex flex-col  gap-3'>
            <p className='text-edorange'>Author:</p>
            <div className='flex items-center space-x-2'>
              <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                <Image
                  src={urlFor(author.image).url()}
                  alt={author.name}
                  fill
                  className='object-cover'
                  sizes='30px'
                />
              </div>
              <span className='text-md font-bold text-ednavy'>
                {author.name}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-edorange'>Categories:</p>
            <div className='flex flex-col  space-x-2'>
              {categories.map((cat, index) => (
                <Badge key={index}>{cat.title}</Badge>
              ))}
            </div>
          </div>
          <Link
            href={"/blog"}
            className='flex items-center cursor-pointer hover:text-edorange transition-transform transform hover:translate-x-1 mt-6 '
          >
            <ArrowLeft size={20} />
            <p className='font-bold text-xl mr-2'>Back to blogs</p>
          </Link>
        </div>
        <article
          className=' flex flex-col justify-center ml-6
                prose prose-lg 
               prose-headings:font-bebas
               prose-p:font-oldstandard
               prose-headings:text-ednavy 
               prose-strong:text-edorange
             
               prose-img:rounded-lg
               prose-blockquote:border-l-edorange
               prose-blockquote:text-ednavy'
        >
          <PortableText value={body} />
        </article>
      </div>
    </div>
  );
};

export default PostPage;
