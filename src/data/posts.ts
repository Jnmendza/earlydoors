import { client } from "@/lib/sanity";
import { BlogCardPost } from "@/types/types";

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

export async function getFullPost(slug: string) {
  const query = `
    *[_type == 'post' && slug.current == $slug][0] {
      ...,
      "categories": categories[]-> {
          title,
          description
        },
      "slug": slug.current,
      "readTime": readTime.minutes,
      "author": author-> {
        _id,
        name,
        image,
        bio
      },
      "categories": categories[]-> {
        title,
        description
      },
      body[] {
        ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug.current
          }
        },
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`;
  return await client.fetch(query, { slug });
}
