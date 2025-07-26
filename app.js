const express= require('express');
const { connect } = require('./config/DbConnection');
const userRoutes = require("./routes/user_routs");
const partnerRoutes = require("./routes/partner_route");
const LeadsRoute = require("./routes/Leads_route");
const AdminRoute = require("./routes/Admin_routs");
const app=express();

// DB Connection
const initializeDatabase = async () => {
    try {
        await connect();
    } catch (error) {
        console.error("Error during database initialization:", error.message);
    }
};
initializeDatabase();

// Middlewares
app.use(express.json());


// Mount routes with base paths
app.use("/api/auth", userRoutes);
app.use("/api/partner", partnerRoutes); 
app.use("/api/lead",LeadsRoute);
app.use("/api/admin",AdminRoute);


// server running code

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
    
});



