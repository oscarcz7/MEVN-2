import mongoose, { SchemaTypes } from 'mongoose';
const Schema = mongoose.Schema;

const contractSchema = new Schema({

    description: {
        type: String,
        required: [
            true,
            'Description required'
        ]
    },
    mount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client'
    }

})

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;