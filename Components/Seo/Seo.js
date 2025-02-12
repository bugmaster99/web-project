import Head from "next/head";

const Seo = (props) => {
  const { seoData } = props;
  return (
    <Head>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
    </Head>
  );
};

export default Seo;
