const bcrypt = require('bcrypt');
const dbPool = require('./dbPool');

const addUserPayment = async (req, res)=>{
    try{
        if (!dbPool){
            return res.status(500).json({error: 'Database connection is not established'})
        }
        const {fullName, cardNumber, expirationDate, securityCode, country, state, 
            city, addressLine1, addressLine2, postalCode, billingCycle, termsAccepted, planId}= req.body
        if (fullName === ""|| cardNumber==="" || expirationDate=== "" || securityCode==="" || country=== ""||
            state === ""|| city==="" || addressLine1=== "" || addressLine2==="" || postalCode=== "" || billingCycle===''
            || termsAccepted==="" || planId===""){
                console.log('fill all details')
            return res.status(400).json({message: "All the details should be provided"})
        }else{
            if (termsAccepted === false){
                terms=0
            }else{
                terms=1
            }
            const insertQuery = 'INSERT INTO user_payment_details (full_name, card_number, expiry_date, security_code, country, state, city, address_line_1, address_line_2, postal_code, billing_cycle, terms_accepted, plan_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            await dbPool.query(insertQuery, [fullName, cardNumber, expirationDate, securityCode, 
                country, state, city, addressLine1, addressLine2, postalCode, billingCycle, terms, planId])
            res.status(200).json({ message: 'User payment details added successfully' });
        }
    }catch (error){
                console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUserPayment = async (req, res)=>{
    try{
        if (!dbPool){
            return res.status(500).json({error: 'Database connection is not established'})
        }
        const deleteSQL= `Delete from user_payment_details where idElite_payment_premium_form= 2`
        await dbPool.query(deleteSQL)
        res.status(200).json({message: "user details deleted Successfully"})
    }catch(e){
        console.error('Error fetching users:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports= {
    addUserPayment,
    deleteUserPayment

}