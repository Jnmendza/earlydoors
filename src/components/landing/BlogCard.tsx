import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/dateUtils";
import { urlFor } from "@/lib/sanity";
import Image from 'next/image'
import Link from "next/link";

export interface BlogCardProps {
  badge: string;
  slug: string;
  date: string;
  readTime: number;
  title: string;
  subTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  author: {
    name: string;
    _id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
  };
}

const BlogCard = ({
  badge,
  date,
  readTime,
  title,
  subTitle,
  author,
  mainImage,
  slug
}: BlogCardProps) => {
  return (
    <Link className='max-w-sm border border-edorange p-4  flex flex-col gap-4 hover:cursor-pointer hover:scale-[1.02]' href={`/blog/${slug}`}>

      {/* Image Container with Badge */}
      <div className='relative w-full h-48  overflow-hidden'>
        {/* Image - fills container but maintains aspect ratio */}
        <Image 
          src={urlFor(mainImage).url()} 
          alt={mainImage.alt} 
          fill
          className="object-cover"  // Changed from object-fill to cover
          sizes="(max-width: 768px) 100vw, 50vw"  // Optional: for performance
        />
        
        {/* Badge positioned absolutely in top-left corner */}
        <div className='absolute top-2 left-2 z-10'>
          <Badge className='text-ednavy bg-edcream'>{badge}</Badge>
        </div>
      </div>

      {/* Meta */}
      <div className='flex items-center text-ednavy text-sm gap-2'>
        <span>{formatDate(date)}</span>
        <span className='text-edorange'>•</span>
        <span>{readTime} mins read</span>
      </div>

      {/* Title + Description */}
      <h3 className='text-2xl font-bold text-ednavy leading-tight'>{title}</h3>
      <p className='text-ednavy text-sm'>{subTitle}</p>

      {/* Author */}
      <div className='flex items-center gap-3 mt-4'>
  
        <div className='relative w-8 h-8 rounded-full overflow-hidden'>
          <Image 
            src={urlFor(author.image).url()} 
            alt={author.name}
            fill  
            className='object-cover'  
            sizes='30px'  
          />
        </div>
        <span className='text-md font-bold text-ednavy'>{author.name}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
