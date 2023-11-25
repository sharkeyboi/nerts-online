import type { StorybookConfig } from "@storybook/vue3-vite";
import path from 'path'
import { loadConfigFromFile, mergeConfig } from 'vite'
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-themes",
      options: {
        postCss: true
      }
    }
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(previousConfig) {
    const {
      config
    } = await loadConfigFromFile(path.resolve(__dirname, "../vite.config.ts"));
    // ensure vite:vue isn't added twice to the plugin list
    config.plugins = config.plugins.filter((plugin) => plugin.name !== 'vite:vue')
    return mergeConfig(previousConfig, config);
  },
};
export default config;
