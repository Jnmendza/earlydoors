import { client } from "@/lib/sanity";
import { BlogCardPost } from "@/types/types";

// export async function getBlogCardPost() {
//   const query = `
//         *[_type == 'post'] | order(_createdAt desc) {
//   _id,
//     _createdAt,
//     "author": author._ref,
//     catergories,
//     "readTime": readTime.minutes,
//     mainImage,
//     title,
//     "slug": slug.current,
//     description
// }`;
//   const data = await client.fetch(query);
//   return data;
// }

export async function getBlogCardPost() {
  const query = `
      *[_type == 'post'] | order(_createdAt desc) {
        _id,
        _createdAt,
        "author": author-> {
          _id,
          name,
          image
        },
        "categories": categories[]-> {
          title,
          description
        },
        "readTime": readTime.minutes,
        mainImage,
        title,
        "slug": slug.current,
        description
      }`;
  const data: BlogCardPost[] = await client.fetch(query);
  return data;
}
