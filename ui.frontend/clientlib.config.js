/* eslint-disable */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const path = require("path");

const BUILD_DIR = path.join(__dirname, "dist");
const CLIENTLIB_DIR = path.join(__dirname, "..", "ui.apps", "src", "main", "content", "jcr_root", "apps", "etisalat", "clientlibs");

const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: "xml",
  cssProcessor: ["default:none", "min:none"],
  jsProcessor: ["default:none", "min:none"],
};

// Config for `aem-clientlib-generator`
module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: [
    {
      ...libsBaseConfig,
      name: "clientlib-base",
      categories: ["etisalat.base"],
      embed: [
        "core.wcm.components.accordion.v1,core.wcm.components.tabs.v1,core.wcm.components.carousel.v1,core.wcm.components.image.v2,core.wcm.components.breadcrumb.v2,core.wcm.components.search.v1,core.wcm.components.form.text.v2,core.wcm.components.pdfviewer.v1,core.wcm.components.commons.datalayer.v1,etisalat-text-rte-plugin-color-picker",
      ],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-base",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-base",
          files: ["**/*.css"],
          flatten: false,
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-dependencies",
      categories: ["etisalat.dependencies"],
      dependencies: ["granite.csrf.standalone"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-dependencies",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-dependencies",
          files: ["**/*.css"],
          flatten: false,
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-etisalat",
      categories: ["etisalat.etisalat"],
      dependencies: ["etisalat.dependencies", "etisalat.global", "etisalat.corecomponent"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-etisalat",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-etisalat",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-global",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-corecomponent",
      categories: ["etisalat.corecomponent"],
      dependencies: ["etisalat.dependencies"],
      embed: ["etisalat.custom.grid"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-corecomponent",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-corecomponent",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-global",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-careers",
      categories: ["etisalat.careers"],
      dependencies: ["etisalat.dependencies", "etisalat.global", "etisalat.corecomponent", "etisalat.etisalat"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-careers",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-careers",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-global",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-global",
      categories: ["etisalat.global"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-global",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-global",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-global",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-hiuapp",
      categories: ["etisalat.hiuapp"],
      dependencies: ["etisalat.dependencies"],
      embed: ["etisalat.grid"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-hiuapp",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-hiuapp",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-hiuapp",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-fivemobile",
      categories: ["etisalat.fivemobile"],
      dependencies: ["etisalat.dependencies"],
      embed: ["etisalat.grid"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-fivemobile",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-fivemobile",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-fivemobile",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-gochat",
      categories: ["etisalat.gochat"],
      dependencies: ["etisalat.dependencies"],
      embed: ["etisalat.custom.grid"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-gochat",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-gochat",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-gochat",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
    {
      ...libsBaseConfig,
      name: "clientlib-ewallet",
      categories: ["etisalat.ewallet"],
      dependencies: ["etisalat.dependencies"],
      embed: ["etisalat.grid"],
      assets: {
        // Copy entrypoint scripts and stylesheets into the respective ClientLib
        // directories
        js: {
          cwd: "clientlib-ewallet",
          files: ["**/*.js"],
          flatten: false,
        },
        css: {
          cwd: "clientlib-ewallet",
          files: ["**/*.css"],
          flatten: false,
        },

        // Copy all other files into the `resources` ClientLib directory
        resources: {
          cwd: "clientlib-ewallet",
          files: ["**/*.*"],
          flatten: false,
          ignore: ["**/*.js", "**/*.css"],
        },
      },
    },
  ],
};
