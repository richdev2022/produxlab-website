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

    // Set custom directories for input and output
    return {
        dir: {
            input: ".", // Eleventy will look for files in the current directory (your project root)
            output: "_site" // Eleventy will build the site into a '_site' folder
        }
    };
};