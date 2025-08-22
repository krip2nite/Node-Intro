import ratelimit from 'express-rate-limit'

const limiter = ratelimit({
	windowMs: 60 * 1000,
	max: 3,
	message: "Too many requests"
})


export default limiter;