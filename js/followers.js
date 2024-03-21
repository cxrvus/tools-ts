const fs = require('fs')

const DIR = `${__dirname}/../tmp/followers_and_following/`

const loadJson = path => JSON.parse(fs.readFileSync(DIR + path, 'utf8'))
const getValue = obj => obj.string_list_data[0].value

const followers = loadJson('followers_1.json').map(x => getValue(x))
const following = loadJson('following.json').relationships_following.map(x => getValue(x))

const notFollowingBack = following.filter(follower => !followers.includes(follower))

console.log(notFollowingBack.join('\n'))
