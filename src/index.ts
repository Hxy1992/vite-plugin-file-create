import type { Plugin, ResolvedConfig } from "vite";

const fs = require("fs");
const path = require("path");

const buildPlugin = (content: string, fileName: string): Plugin => {
	let config: ResolvedConfig;

	return {
		name: "vite-plugin-file-create:build",
		apply: "build",
		configResolved(_config) {
			config = _config;
		},
		writeBundle() {
			const filePath = path.join(config.build.outDir, fileName);
			fs.writeFile(filePath, content, (err: any) => {
				if (err) {
					console.error(err);
				}
			});
		}
	};
};

/**
 * 创建文件并保存至输出目录
 * @param content 文件内容字符串
 * @param fileName 文件名称(带后缀)
 * @returns 插件数组
 */
export const viteFileCreate = (content: string, fileName: string): Plugin[] => {
	return [buildPlugin(content, fileName)];
};
