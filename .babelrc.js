module.exports = {
  "env": {
    "production": {
      "presets": [
        [
          "env",
          {
            "targets": {
              "browsers": [
                "last 2 version"
              ]
            },
            "modules": false,
            "debug": false
          }
        ]
      ],
      "plugins": [
        "syntax-dynamic-import"
      ]
    },
    "development": {
      "presets": [
        [
          "env",
          {
            "targets": {
              "browsers": [
                "last 2 version"
              ]
            },
            "modules": false,
            "debug": true
          }
        ]
      ],
      "plugins": [
        "syntax-dynamic-import"
      ]
    }
  }
}
