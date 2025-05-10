import { client } from "@/lib/sanity";

export async function getCategories() {
  const query = `
        *[_type == 'category'] {
  title
}`;
  const data = await client.fetch<{ title: string }[]>(query);
  return data.map((item) => item.title);
}
