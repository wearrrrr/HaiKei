# HaiKei
HaiKei is an anime streaming website that uses the [consumet](https://github.com/consumet/api.consumet.org) API, and runs ontop of express and ejs, with [redis](https://redis.io/) for caching the /watch/ page

## Preview is live!
[haikei.xyz](https://haikei.xyz)

# What is this good for? 
HaiKei is a streaming website that focuses on minimial loading times and an interface that is optimized for any device

# Why don't I just use 9anime or another alternative?

"That's because please. Please don't" - tim apple

idk what are you, a cop?

The interface will get better, because currently this is extremely open beta, have fun and if you want to make a contribution don't hesistate to open a pr.

# How do I use the zoro route? 

To use the zoro route, you have to add /zoro at the end of the watchpage URL, currently this is something you have to hardcode but soon enough it will be toggleable setting with user accounts.

EX. `https://www.haikei.xyz/watch/lucky-star-episode-1/zoro`

# The zoro route gave me a 404!!!!

Due to the way that the information is scraped, sometimes it fails, try again in a couple minutes or simply use the normal route, this is unavoidable but I wish I could fix it.
