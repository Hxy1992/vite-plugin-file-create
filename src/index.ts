import type { Plugin, ResolvedConfig } from "vite";

const fs = require("fs");
const path = require("path");

function saveFile (outDir: string, content: string, fileName: string) {
	const filePath = path.join(outDir, fileName);
	fs.writeFile(filePath, content, (err: any) => {
		if (err) {
			console.error(err);
		}
	});
}

const buildPlugin = (content: string | { content: string; fileName: string }[], fileName?: string): Plugin => {
	let config: ResolvedConfig;

	return {
		name: "vite-plugin-file-create:build",
		apply: "build",
		configResolved(_config) {
			config = _config;
		},
		writeBundle() {
			if (content && Array.isArray(content)) {
				content.forEach(t => {
					saveFile(config.build.outDir, t.content, t.fileName)
				})
			} else if (typeof content === "string" && typeof fileName === "string") {
				saveFile(config.build.outDir, content, fileName)
			} else {
				console.error("vite-plugin-file-create: 参数错误，文件保存失败！");
			}
		}
	};
};

/**
 * 创建文件并保存至输出目录
 * @param content 文件内容字符串 / 文件数组
 * @param fileName 文件名称(带后缀)
 * @returns 插件数组
 */
export const viteFileCreate = (content: string | { content: string; fileName: string }[], fileName?: string): Plugin[] => {
	return [buildPlugin(content, fileName)];
};
