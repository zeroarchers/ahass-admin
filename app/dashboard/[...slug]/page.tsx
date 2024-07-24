const DynamicPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  return (
    <div>
      <h1 className="font-black text-4xl">{slug}</h1>
      <p className="mt-5 font-semibold text-slate-400 text-xl">
        Fitur ini belum di implementasikan.
      </p>
    </div>
  );
};

export default DynamicPage;
