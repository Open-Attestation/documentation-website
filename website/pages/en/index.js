/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <img src={`${baseUrl}img/logo.gif`} />
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl("getting-started.html")}>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom paddingTop lightBackground"
        style={{ textAlign: "center" }}
      >
        <h2>Feature Callout</h2>
        <p>
          OpenAttestation is a framework to notarise documents using the
          Ethereum blockchain.
        </p>
        <p>
          OpenAttestation is a framework to notarise documents using the
          Ethereum blockchain.
        </p>
      </div>
    );

    const WhatIs = () => (
      <div className="productShowcaseSection paddingTop paddingBottom">
        <h2>What Is OpenAttestation?</h2>
        <p>
          OpenAttestation is an open-sourced framework to notarise documents
          using the blockchain.
        </p>
        <p>
          Documents issued this way are cryptographically trustworthy and can be
          verified independently.
        </p>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              "To make your landing page more attractive, use illustrations! Check out " +
              "[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. " +
              "The illustrations you see on this page are from unDraw.",
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: "left",
            title: "Wonderful SVG Illustrations"
          }
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              "This is another description of how this project is useful",
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: "right",
            title: "Description"
          }
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              "Each new Docusaurus project has **randomly-generated** theme colors.",
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: "right",
            title: "Randomly Generated Theme Colors"
          }
        ]}
      </Block>
    );

    const Features = () => (
      <div id="feature" className=" productShowcaseSection paddingTop">
        <h2>Features</h2>
        <Block layout="fourColumn">
          {[
            {
              content: "Verified provenance of tamper-proof documents",
              image: `${baseUrl}img/undraw_certificate.svg`,
              imageAlign: "top",
              title: "Verifiable Credentials"
            },
            {
              content: "User controls what data to share",
              image: `${baseUrl}img/undraw_options.svg`,
              imageAlign: "top",
              title: "Selective Disclosure"
            },
            {
              content: "Render your document with custom templates",
              image: `${baseUrl}img/undraw_experience_design.svg`,
              imageAlign: "top",
              title: "Decentralised Rendering"
            },
            {
              content: "Issuers identified with DNS records",
              image: `${baseUrl}img/undraw_hologram.svg`,
              imageAlign: "top",
              title: "Verified Issuer's Identity"
            }
          ]}
        </Block>
      </div>
    );

    const Showcase = () => {
      if ((siteConfig.products || []).length === 0) {
        return null;
      }

      return (
        <div className="productShowcaseSection paddingTop paddingBottom">
          <h2>Products built using OpenAttestation</h2>
          <Block layout="fourColumn">
            {siteConfig.products
              .filter(product => product.pinned)
              .map((product) => ({
                title: product.title,
                image: product.image,
                imageAlt: product.title,
                imageLink: product.infoLink
              }))}
          </Block>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <hr />
          <WhatIs />
          <Features />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
