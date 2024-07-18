const DynamicPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  return <main>{slug}</main>;
};

export default DynamicPage;
