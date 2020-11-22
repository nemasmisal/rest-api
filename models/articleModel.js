const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    imageURL: {
        type: String,
        require: true
    },
    comments: [{
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: true
        },
        comment: {
            type: String,
            require: true
        }
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at' } });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
