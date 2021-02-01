import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    /*
    contracts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Contract'
    }]*/
});

const Client = mongoose.model('Client', clientSchema );
export default Client;