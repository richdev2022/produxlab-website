const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {
    // Copy main static assets directly to the output folder
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("javascript.js");
    eleventyConfig.addPassthroughCopy("img"); // This copies the entire img folder and its contents
    eleventyConfig.addPassthroughCopy("admin");

    // Copy legal/utility HTML pages
    eleventyConfig.addPassthroughCopy("Terms.html");
    eleventyConfig.addPassthroughCopy("Privacy.html");
    eleventyConfig.addPassthroughCopy("Refund.html");

    // Copy essential root files for search engines
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("sitemap.xml");

    // Eleventy Filters
    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addFilter("truncate", (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + "...";
    });

    // Markdown-it configuration to allow more HTML and better rendering
    let markdownIt = require("markdown-it");
    let markdownItAttrs = require("markdown-it-attrs"); // To add classes/ids/attrs to markdown
    let markdownItAnchor = require("markdown-it-anchor"); // For anchor links in headings

    let options = {
        html: true,        // Enable HTML tags in markdown
        breaks: true,      // Convert '\n' in paragraphs into <br>
        linkify: true      // Autoconvert URL-like text to links
    };
    let markdownLib = markdownIt(options)
        .use(markdownItAttrs)
        .use(markdownItAnchor);

    eleventyConfig.setLibrary("md", markdownLib);

    // Set custom directories for input and output
    return {
        dir: {
            input: ".", // Eleventy will look for files in the current directory (your project root)
            output: "_site" // Eleventy will build the site into a '_site' folder
        }
    };
};