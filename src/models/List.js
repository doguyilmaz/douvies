const mongoose = require('mongoose');
const { privacyOptions, orderTypeOptions, listModels } = require('../utils/constants');

const ListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'List name is required.'],
			maxlength: [20, 'List name cannot be longer than 20 characters.'],
		},
		slug: String,
		count: Number,
		contents: {
			type: [mongoose.Schema.Types.ObjectId],
			required: true,
			refPath: 'contentModel',
		},
		contentModel: {
			type: String,
			enum: Object.values(listModels),
			default: listModels.MOVIE,
		},
		privacy: {
			type: String,
			enum: Object.values(privacyOptions),
			default: privacyOptions.PUBLIC,
		},
		orderType: {
			type: String,
			enum: Object.values(orderTypeOptions),
			default: orderTypeOptions.NEWEST,
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		// id: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// // Reverse populate with virtuals
// ListSchema.virtual('movies', {
// 	ref: 'Movie',
// 	localField: '_id',
// 	foreignField: 'lists',
// 	justOne: false,
// });

// // Reverse populate with virtuals
// ListSchema.virtual('series', {
// 	ref: 'Serie',
// 	localField: '_id',
// 	foreignField: 'lists',
// 	justOne: false,
// });

module.exports = mongoose.model('List', ListSchema);
