require("dotenv").config();

const siteConfig = {
  title: "OpenAttestation",
  tagline: "Document Endorsement and Verification Framework",
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
          editUrl: "https://github.com/Open-Attestation/documentation-website/tree/master/website",
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
  plugins: [
    [
      "@crossid/docusaurus-remote-content",
      {
        type: "docs",
        contents: [
          {
            file: "/developer-section/libraries/remote-files/open-attestation.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/README.md",
            meta: {
              id: "open-attestation",
              title: "Open Attestation",
              hide_title: true,
              sidebar_label: "Open Attestation",
            },
          },
          {
            file: "/developer-section/libraries/remote-files/open-attestation-cli.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/open-attestation-cli/master/README.md",
            meta: {
              id: "open-attestation-cli",
              title: "Open Attestation (CLI)",
              hide_title: true,
              sidebar_label: "Open Attestation (CLI)",
            },
          },
          {
            file: "/developer-section/libraries/remote-files/open-attestation-encryption.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/oa-encryption/master/README.md",
            meta: {
              id: "open-attestation-encryption",
              title: "Open Attestation (Encryption)",
              hide_title: true,
              sidebar_label: "Open Attestation (Encryption)",
            },
          },
          {
            file: "/developer-section/libraries/remote-files/open-attestation-verify.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/README.md",
            meta: {
              id: "open-attestation-verify",
              title: "Open Attestation (Verify)",
              hide_title: true,
              sidebar_label: "Open Attestation (Verify)",
            },
          },
          {
            file:
              "/developer-section/libraries/remote-files/decentralized-renderer/decentralized-renderer-react-components.md",
            url:
              "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-components/master/README.md",
            meta: {
              id: "decentralized-renderer-react-components",
              title: "React Components",
              hide_title: true,
              sidebar_label: "React Components",
            },
          },
          {
            file:
              "/developer-section/libraries/remote-files/decentralized-renderer/decentralized-renderer-react-template.md",
            url:
              "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-template/master/README.md",
            meta: {
              id: "decentralized-renderer-react-template",
              title: "React Template",
              hide_title: true,
              sidebar_label: "React Template",
            },
          },
          {
            file:
              "/developer-section/libraries/remote-files/decentralized-renderer/decentralized-renderer-svelte-template.md",
            url:
              "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-svelte-template/master/README.md",
            meta: {
              id: "decentralized-renderer-svelte-template",
              title: "Svelte Template",
              hide_title: true,
              sidebar_label: "Svelte Template",
            },
          },
          {
            file:
              "/developer-section/libraries/remote-files/decentralized-renderer/decentralized-renderer-vue-template.md",
            url:
              "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-vue-template/master/README.md",
            meta: {
              id: "decentralized-renderer-vue-template",
              title: "Vue Template",
              hide_title: true,
              sidebar_label: "Vue Template",
            },
          },
          {
            file: "/developer-section/libraries/remote-files/document-store.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/document-store/master/README.md",
            meta: {
              id: "document-store",
              title: "Document Store",
              hide_title: true,
              sidebar_label: "Document Store",
            },
          },
          {
            file: "/developer-section/libraries/remote-files/token-registry.md",
            url: "https://raw.githubusercontent.com/Open-Attestation/token-registry/master/README.md",
            meta: {
              id: "token-registry",
              title: "Token Registry",
              hide_title: true,
              sidebar_label: "Token Registry",
            },
          },
        ],
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "OpenAttestation",
      logo: {
        alt: "OpenAttestation Logo",
        src: "img/logos/oa.svg",
        srcDark: "img/logos/oa.svg",
      },
      items: [
        { to: "docs/docs-section/introduction", label: "Docs", position: "left" },
        { to: "docs/integrator-section/verifiable-document/overview", label: "Integrator", position: "left" },
        {
          to: "docs/developer-section/quickstart/create-verifiable-document-issuer",
          label: "Developer",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
      ],
    },
    footer: {
      logo: {
        alt: "GovTech Logo",
        src: "img/logos/govtech-blue.png",
        href: "https://www.tech.gov.sg",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Government Technology Agency (Singapore)`,
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/docs-section/introduction",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Github",
              href: "https://github.com/Open-Attestation",
            },
            {
              html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
                </a>
              `,
            },
          ],
        },
      ],
    },

    algolia: {
      appId: "M0GN6T3PD5",
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || "dummykey",
      indexName: "openattestation",
      algoliaOptions: {}, // Optional, if provided by Algolia
      debug: false, // Set debug to true if you want to inspect the modal
    },
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    image: "img/logos/oa.png",
    metadatas: [{ name: "og:image", content: "img/logos/oa.png" }],
  },
};

module.exports = siteConfig;
