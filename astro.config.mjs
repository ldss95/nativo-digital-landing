import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import rehypeSlug from "rehype-slug";
import NetlifyCMS from "astro-netlify-cms";
import alpinejs from "@astrojs/alpinejs";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
	site: "https://astros.zank.studio",
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		tailwind(),
		mdx(),
		sitemap(),
		NetlifyCMS({
			config: {
				backend: {
					name: "github",
					repo: "zankhq/astros",
					branch: "main",
					base_url: "https://astros.zank.studio",
					auth_endpoint: "/api/auth",
				},
				media_folder: "public/images",
				public_folder: "/images",
				collections: [
					// Content collections
					{
						name: "posts",
						label: "Blog Posts",
						folder: "src/content/blog",
						create: true,
						delete: true,
						fields: [
							{
								name: "title",
								widget: "string",
								label: "Post Title",
							},
							{
								label: "Draft",
								name: "draft",
								widget: "boolean",
							},
							{
								label: "Author",
								name: "author",
								widget: "string",
							},
							{
								label: "Tags",
								name: "tags",
								widget: "list",
							},
							{
								label: "Image",
								name: "image",
								widget: "object",
								fields: [
									{
										label: "Source",
										name: "src",
										widget: "image",
									},
									{
										label: "Alt Text",
										name: "alt",
										widget: "string",
									},
								],
							},
							{
								label: "Snippet",
								name: "snippet",
								widget: "text",
							},
							{
								label: "Publish Date",
								name: "publishDate",
								widget: "datetime",
								format: "YYYY-MM-DD HH:mm",
							},
							{
								label: "Category",
								name: "category",
								widget: "select",
								options: ["Tutorials", "News", "Reviews", "Frameworks"],
							},
							{
								name: "body",
								widget: "markdown",
								label: "Post Body",
							},
						],
					},
				],
			},
			disableIdentityWidgetInjection: true,
		}),
		alpinejs(),
		AstroPWA({
			mode: "production",
			base: "/",
			scope: "/",
			includeAssets: ["favicon.svg"],
			registerType: "autoUpdate",
			manifest: {
				name: "Nativo Digital",
				short_name: "Astros",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				navigateFallback: "/404",
				globPatterns: ["*.js"],
			},
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\/404$/],
				suppressWarnings: true,
			},
		}),
	],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			// This adds links to headings
			[rehypeAutolinkHeadings, autolinkConfig],
		],
	},
	experimental: {
		assets: true,
		viewTransitions: true,
	},
});
