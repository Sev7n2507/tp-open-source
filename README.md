<style>
    #interactive-readme__search {
        background-color: #238636; 
        color: #ffffff; 
        border: none;
        padding: 0.5em 0.5em 0.5em;
        border-radius: 5px;
    }

    #interactive-readme__language {
        width:20%;
        border-radius: 4px;

    }
</style>

# The Interactive README _(tp-open-source)_

> This README is a GitHub search engine

<div id="interactive-readme">
<input type="text" id="interactive-readme__query">
<label for="interactive-readme__language">Language</label>
<select id="interactive-readme__language">
<option>Loading...</option>
</select>
<button id="interactive-readme__search">Search !</button>
<div id="interactive-readme__results"></div>
</div>
