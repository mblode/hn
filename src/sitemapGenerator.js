require("babel-register")({
    presets: ["es2015", "react"]
});

const axios = require('axios');
const router = require("./sitemapRoutes").default;
const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
    try {
        const posts = await axios.get(`https://api.hackerwebapp.com/news?page=1`);
        let postMap = [];

        for (var i = 0; i < posts.data.length; i++) {
            postMap.push({ id: posts.data[i].id });
        }

        const paramsConfig = {
            "/item/:id": postMap
        };

        return (
            new Sitemap(router)
                .applyParams(paramsConfig)
                .build("https://hn.matthewblode.com")
                .save("./public/sitemap.xml")
        );
    } catch (e) {
        console.log(e);
    }
}

generateSitemap();
