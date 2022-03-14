import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    plot: {
        type: String,
        required: [true, 'Plot is required'],
    },
});


export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

