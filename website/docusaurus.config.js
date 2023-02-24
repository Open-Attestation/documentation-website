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
        name: "Open Attestation",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation.md",
            content: `---
id: open-attestation
title: Open Attestation
hide_title: true
sidebar_label: Open Attestation
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Open Attestation (CLI)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation-cli/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-cli.md",
            content: `---
id: open-attestation-cli
title: Open Attestation (CLI)
hide_title: true
sidebar_label: Open Attestation (CLI)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Open Attestation (Encryption)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-encryption/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-encryption.md",
            content: `---
id: open-attestation-encryption
title: Open Attestation (Encryption)
hide_title: true
sidebar_label: Open Attestation (Encryption)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Open Attestation (Verify)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/",
        outDir: "docs/developer-section/libraries/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-verify.md",
            content: `---
id: open-attestation-verify
title: Open Attestation (Verify)
hide_title: true
sidebar_label: Open Attestation (Verify)
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
title: React template
hide_title: true
sidebar_label: React template
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React Svelte Template",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-svelte-template/master/",
        outDir: "docs/developer-section/libraries/remote-files/decentralized-renderer/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-svelte-template.md",
            content: `---
id: decentralized-renderer-svelte-template
title: Svelte Template
hide_title: true
sidebar_label: Svelte Template
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Vue Template",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-vue-template/master/",
        outDir: "docs/developer-section/libraries/remote-files/decentralized-renderer/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-vue-template.md",
            content: `---
id: decentralized-renderer-vue-template
title: Vue Template
hide_title: true
sidebar_label: Vue Template
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
