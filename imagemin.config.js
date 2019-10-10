const imagemin = require("imagemin-keep-folder");
imagemin(["src/img/**/*.{jpg,png,gif,svg}"], {
  replaceOutputDir: output => {
    return output.replace("src/img/", "./dist/img/");
  }
}).then(() => {
  console.log("Images optimized");
});
