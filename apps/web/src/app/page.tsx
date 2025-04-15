import { getData } from "@/lib/get-data";
import { checkAuth } from "@/lib/check-auth";
import { InDialogData } from "@/features/in-dialog-data";

export default async function Home() {
  await checkAuth();

  const data = await getData();

  if (!data.success) {
    return <div className="text-red-500">{data.error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {data.data.posts.map((post) => (
        <div
          key={post.id}
          className="mb-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
          <p className="mt-2 text-gray-600">{post.content}</p>
        </div>
      ))}
      <InDialogData />
    </div>
  );
}
