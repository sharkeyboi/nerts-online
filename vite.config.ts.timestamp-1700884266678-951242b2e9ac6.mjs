// vite.config.ts
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/Users/ers99/Documents/nuxtnerts/nerts/node_modules/.pnpm/vite@4.5.0_@types+node@20.9.0/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///C:/Users/ers99/Documents/nuxtnerts/nerts/node_modules/.pnpm/unplugin-auto-import@0.17.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/ers99/Documents/nuxtnerts/nerts/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.8/node_modules/unplugin-vue-components/dist/vite.mjs";
import vue from "file:///C:/Users/ers99/Documents/nuxtnerts/nerts/node_modules/.pnpm/@vitejs+plugin-vue@4.4.1_vite@4.5.0_vue@3.3.8/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/ers99/Documents/nuxtnerts/nerts/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dirs: ["./composables"],
      vueTemplate: true
    }),
    Components({
      dirs: [
        "./components/"
        // Component folders that should be auto-imported
      ],
      dts: true,
      directoryAsNamespace: true
    })
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url))
      // Add any other aliases you use in your code base
      // https://nuxt.com/docs/api/configuration/nuxt-config/#alias
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlcnM5OVxcXFxEb2N1bWVudHNcXFxcbnV4dG5lcnRzXFxcXG5lcnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlcnM5OVxcXFxEb2N1bWVudHNcXFxcbnV4dG5lcnRzXFxcXG5lcnRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9lcnM5OS9Eb2N1bWVudHMvbnV4dG5lcnRzL25lcnRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVVJMLCBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXHJcbiAgICAgICAgICAgIGRpcnM6IFsnLi9jb21wb3NhYmxlcyddLFxyXG4gICAgICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICBkaXJzOiBbXHJcbiAgICAgICAgICAgICAgICAnLi9jb21wb25lbnRzLydcclxuICAgICAgICAgICAgICAgIC8vIENvbXBvbmVudCBmb2xkZXJzIHRoYXQgc2hvdWxkIGJlIGF1dG8taW1wb3J0ZWRcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgICAgICAgIC8vIEFkZCBhbnkgb3RoZXIgYWxpYXNlcyB5b3UgdXNlIGluIHlvdXIgY29kZSBiYXNlXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vbnV4dC5jb20vZG9jcy9hcGkvY29uZmlndXJhdGlvbi9udXh0LWNvbmZpZy8jYWxpYXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLEtBQUsscUJBQXFCO0FBQ3pWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sU0FBUztBQUptTCxJQUFNLDJDQUEyQztBQU1wUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDUCxTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUEsTUFDN0IsTUFBTSxDQUFDLGVBQWU7QUFBQSxNQUN0QixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsTUFBTTtBQUFBLFFBQ0Y7QUFBQTtBQUFBLE1BRUo7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLHNCQUFzQjtBQUFBLElBQzFCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUdyRDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
