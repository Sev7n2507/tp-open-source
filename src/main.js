import YAML from 'yaml'

(() => {
  fetch('https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml')
    .then((response) => response.text())
    .then((responseText) => YAML.parse(responseText))
    .then((responseYaml) =>
      Object.keys(responseYaml)
        .filter((key) => responseYaml[key].type === 'programming')
        .reduce((languages, key) => {
          if (!languages.includes(key)) languages.push(key)
          return languages
        }, []))
    .then((searchLanguages) => searchLanguages.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())))
    .then((searchLanguages) => {
      const languageSelector = document.getElementById("interactive-readme__language")
      const languageOptions = searchLanguages.map((language) => {
        const option = document.createElement('option')
        option.text = language
        return option
      })
      languageSelector.append(...languageOptions)
      languageSelector.firstElementChild.remove()
    })
    .catch((error) => {
      document.getElementById('interactive-readme').innerHTML = `Error: ${error.toString()}`
    })
})()
