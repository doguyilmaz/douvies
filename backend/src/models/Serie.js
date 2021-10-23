const mongoose = require('mongoose');
const slugify = require('slugify');
const { genres, definitions } = require('../utils/constants');

const SerieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required.'],
			unique: true,
			trim: true,
			maxlength: [50, 'Title cannot be longer than 50 characters.'],
		},
		slug: String,
		description: {
			type: String,
			required: [true, 'Description is required.'],
			maxlength: [500, 'Description cannot be longer than 500 characters'],
		},
		director: { type: String, trim: true },
		apiId: {
			type: String,
			required: [true, 'Api ID is required.'],
		},
		imdbId: {
			type: String,
			required: [true, 'IMDB ID is required.'],
			unique: true,
		},
		imdbUrl: {
			type: String,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				'Please use a valid URL with HTTP or HTTPS',
			],
		},
		posterURL: {
			type: String,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				'Please use a valid URL with HTTP or HTTPS',
			],
		},
		imdbRate: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating must can not be more than 10'],
		},
		imdbVotes: Number,
		genres: {
			type: [String],
			enum: [...genres],
		},
		yearFrom: { type: Date, required: true },
		yearTo: { type: Date, default: null },
		language: String,
		releaseDate: Date,
		year: Number,
		runtime: String,
		averageRating: Number,
		personalRate: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating must can not be more than 10'],
		},
		personalComments: {
			type: String,
			maxlength: [100, 'Comment cannot be longer than 100 characters'],
		},
		personalPref: {
			type: [String],
			required: [true, 'Movie definition is required.'],
			enum: [...definitions],
		},
		isWatched: {
			type: Boolean,
			default: true,
		},
		isFinished: {
			type: Boolean,
			default: false,
		},
		isFinalled: {
			type: Boolean,
			required: [true, 'Did serie ended or finalled?'],
		},
		lists: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'List',
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

// Create serie slug from the title
SerieSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

module.exports = User = mongoose.model('Serie', SerieSchema);
