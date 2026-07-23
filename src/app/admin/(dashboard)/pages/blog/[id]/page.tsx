"use client";

import { useParams } from "next/navigation";
import { blogHooks } from "@/hooks/useBlog";
import { BlogPostForm } from "../BlogPostForm";
import { Skeleton } from "@/components/admin/ui/Skeleton";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const { data: post, isLoading } = blogHooks.useGet(params.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!post) {
    return <p className="text-sm text-on-surface-variant">Article not found.</p>;
  }

  return <BlogPostForm post={post} />;
}
