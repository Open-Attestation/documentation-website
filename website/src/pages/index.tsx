import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const products = [
  {
    title: "OpenCerts",
    imageUrl: "img/products/opencerts.png",
    infoLink: "https://opencerts.io",
  },
  {
    title: "OpenAttestation Gallery",
    imageUrl: "img/products/oa-gallery.png",
    infoLink: "https://gallery.openattestation.com",
  },
  {
    title: "Identity Wallet",
    imageUrl: "img/products/identity-wallet.png",
    infoLink: "/docs/appendix/identity-wallet",
  },
  {
    title: "TradeTrust",
    imageUrl: "img/products/tradetrust.png",
    infoLink: "https://tradetrust.io",
  },
];

const features = [
  {
    title: "Verifiable Credentials",
    imageUrl: `img/undraw_certificate.svg`,
    description: "Verified provenance of tamper-proof documents",
  },
  {
    title: "Selective Disclosure",
    imageUrl: `img/undraw_options.svg`,
    description: "User controls what data to share",
  },
  {
    imageUrl: `img/undraw_experience_design.svg`,
    description: "Render your document with custom templates",
    title: "Decentralised Rendering",
  },
  {
    title: "Verified Issuer's Identity",
    imageUrl: `img/undraw_hologram.svg`,
    description: "Issuers identified with DNS records",
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col col--3">
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
function Product({ title, imageUrl, infoLink }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <a href={infoLink} className={clsx("col col--6", styles.product)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.productImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
    </a>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="OpenAttestation is an open source framework for verifiable document and transferable records."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner, styles.layout)}>
        <div className="container">
          <img src={useBaseUrl("img/logos/oa.svg")} alt="OpenAttestation logo" style={{ maxWidth: "240px" }} />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--outline button--secondary button--lg", styles.getStarted)}
              to={useBaseUrl("docs/getting-started")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.layout}>
        <section>
          <div className="productShowcaseSection paddingTop paddingBottom">
            <h2>What Is OpenAttestation?</h2>
            <p>OpenAttestation is an open-sourced framework to endorse and verify documents using the blockchain.</p>
            <p>Documents issued this way are cryptographically trustworthy and can be verified independently.</p>
          </div>
        </section>
        {features && features.length > 0 && (
          <section>
            <h2>Features</h2>
            <div className="container">
              <div className="row">
                {features.map((props, index) => (
                  <Feature key={index} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section>
          <div>
            <h2>Products built using OpenAttestation</h2>
            <div className="container">
              <div className="row">
                {products.map((product, index) => (
                  <Product key={index} {...product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
