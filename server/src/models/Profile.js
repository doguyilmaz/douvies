const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	avatar: String,
	isActive: { type: Boolean, default: true },
	darkMode: { type: Boolean, default: false },
	hideFavourites: { type: Boolean, default: false },
	hideProfile: { type: Boolean, default: false },
	// movies: {
	// 	type: [mongoose.Schema.Types.ObjectId],
	// 	ref: 'movie',
	// },
	// series: {
	// 	type: [mongoose.Schema.Types.ObjectId],
	// 	ref: 'serie',
	// },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

// Reverse populate with virtuals
ProfileSchema.virtual('movies', {
	ref: 'Movie',
	localField: '_id',
	foreignField: 'user.profile',
	justOne: false,
});

// Reverse populate with virtuals
ProfileSchema.virtual('series', {
	ref: 'Serie',
	localField: '_id',
	foreignField: 'user.profile',
	justOne: false,
});

module.exports = UserSetting = mongoose.model('Profile', ProfileSchema);
