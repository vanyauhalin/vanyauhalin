module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        modules: false,
        targets: {
          browsers: [
            "> 1%",
            "last 2 versions",
            "not dead"
          ]
        }
      }
    ]
  ]
}
