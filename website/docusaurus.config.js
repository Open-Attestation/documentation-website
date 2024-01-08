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
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation.md",
            content: `---
id: open-attestation
title: OpenAttestation
hide_title: true
sidebar_label: OpenAttestation
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (CLI)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation-cli/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-cli.md",
            content: `---
id: open-attestation-cli
title: OpenAttestation (CLI)
hide_title: true
sidebar_label: OpenAttestation (CLI)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (Encryption)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-encryption/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-encryption.md",
            content: `---
id: open-attestation-encryption
title: OpenAttestation (Encryption)
hide_title: true
sidebar_label: OpenAttestation (Encryption)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (Verify)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-verify.md",
            content: `---
id: open-attestation-verify
title: OpenAttestation (Verify)
hide_title: true
sidebar_label: OpenAttestation (Verify)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React Components",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-components/master/",
        outDir: "docs/developer-section/libraries/remote-files/decentralized-renderer/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-components.md",
            content: `---
id: decentralized-renderer-react-components
title: React Components
hide_title: true
sidebar_label: React Components
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React Template",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-template/master/",
        outDir: "docs/developer-section/libraries/remote-files/decentralized-renderer/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-template.md",
            content: `---
id: decentralized-renderer-react-template
title: React Template
hide_title: true
sidebar_label: React Template
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Document Store",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/document-store/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "document-store.md",
            content: `---
id: document-store
title: Document Store
hide_title: true
sidebar_label: Document Store
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Token Registry",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/token-registry/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "token-registry.md",
            content: `---
id: token-registry
title: Token Registry
hide_title: true
sidebar_label: Token Registry
---

${content}`,
          };
        },
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

        {
          type: 'dropdown',
          label: 'Issue/Revoke',
          position: 'left',
          items: [
            {
              label: 'Prerequisites',
              to: '/docs/test1-section/prerequisites',
              activeBasePath: '/docs/test1-section',
            },
            {
              label: 'Issue verifiable documents with DID',
              to: '/docs/test2-section/intro',
              activeBasePath: '/docs/test2-section',
            },
            {
              label: 'Issue verifiable documents with Ethereum',
              to: '/docs/test3-section/tutorial',
              activeBasePath: '/docs/test3-section',
            },
            // ... more items
          ],
        },

        { to: "docs/docs-section/introduction", label: "Docs", position: "left" },
        { to: "docs/integrator-section/verifiable-document/overview", label: "Integrator", position: "left" },
        {
          to: "docs/developer-section/quickstart/create-verifiable-document-issuer",
          label: "Developer",
          position: "left",
        }
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
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || "DummyKey",
      indexName: "openattestation",
      algoliaOptions: {}, // Optional, if provided by Algolia
      debug: false, // Set debug to true if you want to inspect the modal
    },
    customFields: {
      blockNativeApiKey: process.env.BLOCK_NATIVE_API_KEY || "DummyKey",
    },
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    image: "img/logos/oa.png",
    metadata: [{ name: "og:image", content: "img/logos/oa.png" }],
  },
};

module.exports = siteConfig;
