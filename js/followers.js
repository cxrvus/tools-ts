const fs = require('fs')

const TMP = `${__dirname}/../tmp`
const DIR = `${TMP}/followers_and_following`

const getWhiteList = () => {
	const WL_PATH = `${TMP}/whitelist.txt`
	if (fs.existsSync(WL_PATH)) return fs.readFileSync(WL_PATH, 'utf-8').split('\n').filter(x => x)
	else return []
}

const loadJson = path => JSON.parse(fs.readFileSync(`${DIR}/${path}`, 'utf8'))
const getValue = obj => obj.string_list_data[0].value

const followers = loadJson('followers_1.json').map(x => getValue(x)).concat(getWhiteList())
const following = loadJson('following.json').relationships_following.map(x => getValue(x))

const notFollowingBack = following.filter(follower => !followers.includes(follower))

console.log(notFollowingBack.join('\n'))
