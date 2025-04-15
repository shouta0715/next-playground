"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getData } from "@/lib/get-data";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export const InDialogData = () => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: getData,
    staleTime: Infinity,
  });

  if (!data?.success) {
    return <div>{data?.error}</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {data.data.posts.map((post) => (
              <span className="block" key={post.id}>
                {post.title}
              </span>
            ))}
          </DialogDescription>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["posts"] })
            }
          >
            更新
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
