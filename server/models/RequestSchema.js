const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const requestSchema = new mongoose.Schema({
    hostId:{
        type: Schema.Types.ObjectId,
        ref: "USER",
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "USER",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    from:{
        Sdate:{
            type:String,
            required:true,
        },
        Stime:{
            type:String,
            required:true
        },
    },
    to:{
        Edate:{
            type:String,
            required:true,
        },
        Etime:{
            type:String,
            required:true
        },
    },
    price:{
        total:{
            type:Number,
        },
        rate:{
            type:Number,
        },
    },
    workedHours:{
        type:Number
    },
    isComplete:{
        type:Boolean
    },
    review:{
        type: Schema.Types.ObjectId,
        ref: "RATING",
    },
    isPending:{
        type:Boolean
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    isPaymentDone:{
        type:Boolean,
        default:false
    }

});

const Request = mongoose.model("REQUEST", requestSchema);

module.exports = Request;