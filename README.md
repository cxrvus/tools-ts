# Cxrvus Tools

## followers.js

- download followers and following from Instagram > *Download your Information*
	- time: *All Time*
	- format: *JSON*
- create a new `tmp` folder
- move the `connections` folder to `tmp` 
- optional:
  - add a `whitelist.txt` file to `tmp`:
    - linebreak-separated user names to be ignored
  - add an `archive` folder to `tmp`:
    - when comparing two follower states, rename your old `connections` folder to `archive`
    - this will be compared to the new state (`connections`)
- finally to execute the tool, run `node js/followers.js`

## transcriber.py

*description pending…*
