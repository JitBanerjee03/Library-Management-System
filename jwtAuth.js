const jwt=require('jsonwebtoken');
require('dotenv').config();

const jwtTokenGeneration=async(payload)=>{  //jwt middleware to generate jwt token
    const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY);

    return token;
}

const jwtTokenValidation=async(req,res,next)=>{  //jwt middleware to validate token
    try{
        const authentication=req.headers.authentication;

        if(!authentication){
            console.log("Token cannot be found!");
            res.status(401).json({message:"Token not found (Authentication required)"});
        }else{
            const token=authentication.split(' ')[1];

            const payloadDecoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);

            console.log("Required payload = ",payloadDecoded);

            req.authPayloadDecoded=payloadDecoded;

            next();
        }
    }catch(err){
        res.status(500).json({message:"Request cannot be processed due to internal error"});
    }
}

module.exports={jwtTokenGeneration,jwtTokenValidation};

