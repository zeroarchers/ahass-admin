const DynamicPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  return (
    <>
      <h1 className="font-black text-4xl">{slug}</h1>
    </>
  );
};

export default DynamicPage;
