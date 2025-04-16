import React from "react";
import SupportersGroupForm from "@/components/forms/SupportersGroupForm";
import { getSupporterGroupById } from "@/data/groups";

export async function generateStaticParams() {
  // Return an array of possible id values
  // If you don't know them at build time, return an empty array
  return [];
}

export default async function EditSupportersGroupPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const group = await getSupporterGroupById(id);

  if (!group) {
    return <div>Supporters Group not found</div>;
  }

  return (
    <div className='flex flex-col mt-10 p-4 items-center h-screen'>
      <h3 className='mb-6 text-2xl text-edorange'>Edit Group</h3>
      {group && (
        <SupportersGroupForm
          groupId={id}
          initialData={{
            ...group,
            group_logo_url: group.group_logo_url ?? undefined,
            website_url: group.website_url ?? undefined,
            ig_handle: group.ig_handle ?? undefined,
          }}
        />
      )}
    </div>
  );
}
