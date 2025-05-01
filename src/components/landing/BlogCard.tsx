import { Badge } from "../ui/badge";

export interface BlogCardProps {
  tab: string;
  date: string;
  readTime: string;
  title: string;
  subTitle: string;
  author: {
    name: string;
    avatar: string;
  };
}

const BlogCard = ({
  tab,
  date,
  readTime,
  title,
  subTitle,
  author,
}: BlogCardProps) => {
  return (
    <div className='max-w-sm border border-edorange p-4  flex flex-col gap-4'>
      {/* Tag */}

      {/* Image Placeholder */}
      <div className='w-full h-48 bg-gray-300 p-2'>
        <Badge className='text-ednavy bg-edcream'>{tab}</Badge>
      </div>

      {/* Meta */}
      <div className='flex items-center text-ednavy text-sm gap-2'>
        <span>{date}</span>
        <span className='text-edorange'>•</span>
        <span>{readTime} mins read</span>
      </div>

      {/* Title + Description */}
      <h3 className='text-2xl font-bold text-ednavy leading-tight'>{title}</h3>
      <p className='text-ednavy text-sm'>{subTitle}</p>

      {/* Author */}
      <div className='flex items-center gap-3 mt-4'>
        <div className='w-5 h-5 bg-gray-300 rounded-full' />
        <span className='text-sm font-bold text-ednavy'>{author.name}</span>
      </div>
    </div>
  );
};

export default BlogCard;
