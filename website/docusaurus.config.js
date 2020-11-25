const siteConfig = {
  title: "OpenAttestation",
  tagline: "Document Notarisation Framework",
  url: "https://openattestation.com",
  baseUrl: "/",
  projectName: "website",
  organizationName: "Open-Attestation",
  favicon: "img/favicon.svg",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // Docs folder path relative to website dir.
          path: "./docs",
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve("./sidebars.json"),
          editUrl: "https://github.com/Open-Attestation/documentation-website/tree/master/website"
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")]
        }
      }
    ]
  ],

  themeConfig: {
    navbar: {
      title: "OpenAttestation",
      logo: {
        alt: "OpenAttestation Logo",
        src: "img/logo.gif",
        srcDark: "img/logo.gif"
      },
      items: [{ to: "docs/getting-started", label: "Docs", position: "left" }]
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Government Technology Agency (Singapore)`,
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started"
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "Project Chat",
              href: "https://spectrum.chat/openattestation"
            }
          ]
        },
        {
          title: "More",
          items: [
            {
              label: "Github",
              href: "https://github.com/Open-Attestation"
            },
            {
              html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
                </a>
              `
            }
          ]
        }
      ]
    },

    algolia: {
      apiKey: "1c7e0f08161cfc504494cff933eb8a37",
      indexName: "openattestation",
      algoliaOptions: {} // Optional, if provided by Algolia
    },
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl")
    },
    image: "img/undraw_tweetstorm.svg",
    metadatas: [{ name: "og:image", content: "img/undraw_online.svg" }],
    sidebarCollapsible: true
  }
};

module.exports = siteConfig;
