import 'regenerator-runtime/runtime'
import { Octokit } from '@octokit/core'
import YAML from 'yaml'

(() => {

  const octokit = new Octokit({
    auth: prompt("Entrez votre token GitHub")
  })

  document.getElementById('interactive-readme').classList.add('active')

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
    .then((searchLanguages) => searchLanguages.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))
    .then((searchLanguages) => {
      const languageSelector = document.getElementById('interactive-readme__language')
      const languageOptions = searchLanguages.map((language) => {
        const option = document.createElement('option')
        option.text = language
        return option
      })
      languageSelector.append(...languageOptions)
      languageSelector.firstElementChild.remove()
    })
    .then(() => {
      document.getElementById('interactive-readme__search')
        .addEventListener('click', async () => {
          const response = await octokit.request('GET /search/repositories', {
            q: `language:"${document.getElementById('interactive-readme__language').value}"`
          })
          let results = response.data.items
          results = results.slice(0, results.length > 10 ? 10 : results.length)
          console.log(results[0])
          results = results.map((result) => `
            <div class="interactive-readme__result">
            <img src="${result.owner.avatar_url}" alt="${result.owner.login}">
            <div class="interactive-readme__result__fullname">${result.full_name}</div>
            <a href="${result.html_url}">Go to repo</a>
            </div>
            `)
          document.getElementById("interactive-readme__results").innerHTML = results.join('<hr>')
        })
    })
    .catch((error) => {
      document.getElementById('interactive-readme').innerHTML = `Error: ${error.toString()}`
    })
})()
