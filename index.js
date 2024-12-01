import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use((req,res,next)=>{
//     if(!req.cookies){
//         res.status(401).send("error")
//     }else{
//         req.user = req?.cookies?.accessToken
//         next()
//     }
//     res.status(401).send("error")
// })

let username = "nandishbs";
let password = "nandsihbs";

app.listen(process.env.PORT || 3000, () => {
    console.log(
        "the server is started in http://localhost:" + process.env.PORT
    );
});

app.get("/",(req,res)=>{
    return res.status(200).json(["nandishbs", "nadithabs", "vanajakshibs", "shivakumarb"]);
})

app.post("/user/login", async(req,res)=>{
    if (req.body.username && req.body.password) {

        let refreshToken = await jwt.sign(
            req.body,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        console.log(refreshToken);
        const accessToken = await jwt.sign(
            { username },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        console.log(accessToken);
        if (accessToken && refreshToken) {
            return res
                .cookie("accessToken", accessToken, {
                    httpOnly: true, // Prevent JavaScript from accessing the cookie
                    secure: false,  // Set to `true` in production when using HTTPS
                    sameSite: 'none', // Ensure cross-site cookie safety (use 'lax' if needed)
                  })
                .cookie("refreshToken", refreshToken,{httpOnly:true, secure:false, sameSite:'none'})
                .status(201)
                .json( {
                    httpOnly: true, // Prevent JavaScript from accessing the cookie
                    secure: false,  // Set to `true` in production when using HTTPS
                    sameSite: 'none', // Ensure cross-site cookie safety (use 'lax' if needed)
                  });
        } else {
            return res.status(401).json({
                status: 401,
                message: "unauthorized",
                success: "no",
            });
        }
    }
})
// app.get("/", (req, res) => {
//     try {
        
//         if (req.user) {
//             if (decoded !== username) {
//                 return res.status(401);
//             } else {
//                 return res
//                 .status(200)
//                 .json(["nandishbs", "nadithabs", "vanajakshibs", "shivakumarb"]);
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// });
// app.post("/user/refresh", async (req, res) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         if(!accessToken){
//             res.status(401).json({msg:"not ok"})
//         }
//         try {
//             const decoded = jwt.verify(
//                 accessToken,
//                 process.env.JWT_ACCESS_TOKEN_SECRET
//             ).username;
//         } catch (error) {
//             error
//         }
//         if (decoded !== username) {
//             return res.status(401);
//         } else {
            
//             try {
//                 let refreshToken = await jwt.sign(
//                     req.body,
//                     process.env.JWT_REFRESH_TOKEN_SECRET,
//                     { expiresIn: "1d" }
//                 );  
//             } catch (error) {
//                 console.log(error)
//             }
//             console.log(refreshToken);
//             const accessToken = await jwt.sign(
//                 { username },
//                 process.env.JWT_ACCESS_TOKEN_SECRET,
//                 { expiresIn: "1h" }
//             );
    
//             return res
//                 .status(201)
//                 .cookie("accessToken", accessToken, {
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: "none",
//                     maxAge: 7 * 24 * 60 * 60 * 1000,
//                 })
//                 .cookie("refreshToken", refreshToken, {
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: "none",
//                     maxAge: 7 * 24 * 60 * 60 * 1000,
//                 })
//                 .json({
//                     status: 201,
//                     msg: "logout successful",
//                     success: "ok",
//                 });
//         }
//     } catch (error) {
//         console.log(error)
//     }
// });

// app.post("/user/login", async (req, res) => {
//     try {
//         if (req.body.username && req.body.password) {
//             console.log(req.body.username);
    
//             let refreshToken = await jwt.sign(
//                 req.body,
//                 process.env.JWT_REFRESH_TOKEN_SECRET,
//                 { expiresIn: "1d" }
//             );
//             console.log(refreshToken);
//             const accessToken = await jwt.sign(
//                 { username },
//                 process.env.JWT_ACCESS_TOKEN_SECRET,
//                 { expiresIn: "1h" }
//             );
//             console.log(accessToken);
//             if (accessToken && refreshToken) {
//                 return res
//                     .cookie("accessToken", accessToken)
//                     .cookie("refreshToken", refreshToken)
//                     .status(201)
//                     .json({
//                         status: 201,
//                         message: "login successful",
//                         success: "ok",
//                     });
//             } else {
//                 return res.status(401).json({
//                     status: 401,
//                     message: "unauthorized",
//                     success: "no",
//                 });
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// });

// app.post("/user/logout", async (req, res) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         if(!accessToken){
//             res.status(401).json({msg:"not ok"})
//         }
//         accessToken? console.log("access token") : console.log("no access token")

//         const decoded = jwt.verify(
//             accessToken,
//             process.env.JWT_ACCESS_TOKEN_SECRET
//         ).username;
//         if (decoded !== username) {
//             return res.status(401);
//         } else {
//             return res
//                 .status(201)
//                 .clearCookie("accessToken")
//                 .clearCookie("refreshToken")
//                 .json({
//                     status: 201,
//                     msg: "logout successful",
//                     success: "ok",
//                 });
//         }
//     } catch (error) {
//         console.log(error)
//     }
// });
