const DynamicPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  return (
    <main>
      <h1 className="font-black text-4xl">{slug}</h1>
    </main>
  );
};

export default DynamicPage;
