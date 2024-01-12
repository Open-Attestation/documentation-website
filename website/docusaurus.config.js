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
        outDir: "docs/lib-section/remote-files/",
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
        outDir: "docs/lib-section/remote-files/",
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
        outDir: "docs/lib-section/remote-files/",
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
        outDir: "docs/lib-section/remote-files/",
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
        name: "React components for decentralized renderer",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-components/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-components.md",
            content: `---
id: decentralized-renderer-react-components
title: React components for decentralized renderer
hide_title: true
sidebar_label: React components for decentralized renderer
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React template for decentralized renderer",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-template/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-template.md",
            content: `---
id: decentralized-renderer-react-template
title: React template for decentralized renderer
hide_title: true
sidebar_label: React template for decentralized renderer
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Document store",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/document-store/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "document-store.md",
            content: `---
id: document-store
title: Document store
hide_title: true
sidebar_label: Document store
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Token registry",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/token-registry/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "token-registry.md",
            content: `---
id: token-registry
title: Token registry
hide_title: true
sidebar_label: Token registry
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
              label: 'Overview',
              to: '/docs/overview-section/overview',
              activeBasePath: '/docs/overview-section',
            },

            {
              label: 'Prerequisites',
              to: '/docs/test1-section/prerequisites',
              activeBasePath: '/docs/test1-section',
            },

            {
              label: 'Issue verifiable documents with DID',
              to: '/docs/test2-section/overview-did',
              activeBasePath: '/docs/test2-section',
            },

            {
              label: 'Issue verifiable documents with Ethereum',
              to: '/docs/test3-section/overview-eth',
              activeBasePath: '/docs/test3-section',
            },
            {
              label: 'Issue transferable records with Ethereum',
              to: '/docs/test4-section/overview-tr',
              activeBasePath: '/docs/test4-section',
            },

            {
              label: 'Revoke documents',
              to: '/docs/test5-section/revoke',
              activeBasePath: '/docs/test5-section',
            },

          ],
        },
        
        { to: "docs/verify-section/verify", label: "Verify", position: "left" },

        { to: "docs/distribute-section/distribute", label: "Distribute", position: "left" },

        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Libraries',
              to: '/docs/lib-section/overview-lib',
              activeBasePath: '/docs/lib-section',
            },

            {
              label: 'Guides',
              to: '/docs/guides-section/create-issuer',
              activeBasePath: '/docs/guides-section',
            },

            {
              label: 'Frequently asked questions',
              to: '/docs/faq-section/faq01',
              activeBasePath: '/docs/faq-section',
            },
            {
              label: 'Glossary',
              to: '/docs/glossary-section/glossary',
              activeBasePath: '/docs/glossary-section/glossary',
            },

            {
              label: 'Changelog',
              to: '/docs/changelog-section/overview-changelog',
              activeBasePath: '/docs/changelog-section',
            },

            {
              label: 'Blockchain costs',
              to: '/docs/costs-section/overview-costs',
              activeBasePath: '/docs/costs-section',
            },

            {
              label: 'Limitations',
              to: '/docs/limit-section/limitations',
              activeBasePath: '/docs/limit-section',
            },
          
          ],
        },

        // Select "Edit" > "Toggle Line Comment" to show or hide these sections below.
        // ** Start of comment **

        { to: "docs/docs-section/introduction", label: "Docs", position: "left" },

        { to: "docs/integrator-section/verifiable-document/overview", label: "Integrator", position: "left" },

        {
          to: "docs/developer-section/quickstart/create-verifiable-document-issuer",
          label: "Developer",
          position: "left",
        }
        
        // ** End of comment **
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
