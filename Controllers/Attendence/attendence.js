const res = require("express/lib/response");
const AttendenceModel = require("./model");

const alreadyMarked = async (id) => {
    let isFound = await AttendenceModel.findOne({ studentId: id });
    if( isFound ){
        return isFound;
    }else{
        return false;
    }
}

const AddAttendence = async (req, res) =>{
    const data = req.body.data;
    let checkAttendence = await alreadyMarked(data?.studentId)
    if( checkAttendence ){
        return res.status(403).json({ msg: "Attendence already Marked", success: false })
    }else{
        let newAttendence = new AttendenceModel({
            studentId: data?.studentId
        })
        let marked  =  await newAttendence.save()
        if( marked ){
            return res.json ({ msg: "Attendence Marked Successfully", succes: true ,
                results: marked
            })
        }else{
            return res.json ({ msg: "Attendence Mark Failed", succes: false ,
                results: null
            })
        }
    }
}

const GetAttendences = async (req, res) => {
    let attendences = await AttendenceModel.find()
    .populate( "studentId" , "_id firstName lastName regNumber" );
    return res.status(200).json({ msg: "Record", 
        results: attendences , 
        success: attendences?.length > 0 ? true: false
    }) 
}

const deleteRecords = async (req, res) => {
    let records = await AttendenceModel.deleteMany();

    return res.status(200).json( { msg: "Removed Successfully", 
            success: true,
            results: records
    } );
}

module.exports = {
    AddAttendence,
    GetAttendences,
    deleteRecords
}