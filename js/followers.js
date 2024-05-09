const fs = require('fs')

const TMP = `${__dirname}/../tmp`
const DIR = `${TMP}/connections/followers_and_following`
const WL_PATH = `${TMP}/whitelist.txt`
const ARCHIVE = `${TMP}/archive/followers_and_following`


const tryReadFile = path => {
	if (fs.existsSync(path)) return fs.readFileSync(path, 'utf8')
	else return null
}

const getWhiteList = () => {
	return tryReadFile(WL_PATH)?.split('\n').filter(x => x) ?? []
}


const loadJson = (dir, path) => JSON.parse(tryReadFile(`${dir}/${path}`)) ?? []
const getValue = obj => obj.string_list_data[0].value

const actual_followers = loadJson(DIR, 'followers_1.json').map(x => getValue(x))
const follower_count = actual_followers.length
const followers = actual_followers.concat(getWhiteList())
const following = loadJson(DIR, 'following.json').relationships_following.map(x => getValue(x))
const following_count = following.length

const notFollowingBack = following.filter(follower => !followers.includes(follower))

const old_followers = loadJson(ARCHIVE, 'followers_1.json').map(x => getValue(x)).concat(getWhiteList())
const unfollowed = old_followers.filter(x=>!followers.includes(x))

console.log(`---- Followers: ${follower_count} | Following: ${following_count} ----`)

if (notFollowingBack.length) {
	console.log(`-- Not Following You Back (${notFollowingBack.length}) --`)
	console.log(notFollowingBack.join('\n'))
	console.log()
}
else {
	console.log('Everyone you follow is still following you back.')
}

if (unfollowed.length) {
	console.log(`-- Unfollowed You or Renamed (${unfollowed.length}) --`)
	console.log(unfollowed.join('\n'))
	console.log()
}
else {
	console.log('No one has unfollowed you since the last time you checked.')
}
