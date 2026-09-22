const Image = require("@11ty/eleventy-img").default;
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  // 画像最適化のためのショートコード
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes) {
    if (undefined === alt) {
      throw new Error(`Missing "alt" on responsive image from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [300, 600, 900],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img",
      urlPath: "/img",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}.${format}`;
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });

  // ギャラリーアイテムのコレクションを追加
  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    const imagesDir = path.join(__dirname, "src", "images");
    const items = [];

    try {
      const files = fs.readdirSync(imagesDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"].includes(ext)) {
          const baseName = path.basename(file, ext);
          const yamlFile = path.join(imagesDir, baseName + ".yml");
          let meta = {};
          if (fs.existsSync(yamlFile)) {
            try {
              const yamlContent = fs.readFileSync(yamlFile, "utf8");
              meta = yaml.load(yamlContent);
            } catch (e) {
              console.warn(`Failed to parse YAML file ${yamlFile}: ${e}`);
            }
          }
          // 画像のパス（src/images からの相対パス）を設定
          items.push({
            image: `src/images/${file}`, // これでテンプレート에서 /images/foo.jpg を参照できる
            ...meta
          });
        }
      }
    } catch (e) {
      console.error(`Failed to read images directory: ${e}`);
    }

    return items;
  });

  // スタイルシートをコピー
  eleventyConfig.addPassthroughCopy("src/styles");

  // ソースディレクトリ
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};