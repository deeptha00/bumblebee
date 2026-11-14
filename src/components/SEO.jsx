import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bumblebeeindia.com";
const DEFAULT_IMAGE = `${SITE_URL}/bumblebee-logo.jpg`;

export default function SEO({ title, description, path = "/", image = DEFAULT_IMAGE }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Bumble Bee Corporate Solutions LLP`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
