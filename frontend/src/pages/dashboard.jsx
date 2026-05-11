import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export const DashboardComp = ({ userName, userList, handleInput }) => {
    console.log(userList);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleClick = async()=>{
        try{
            await axios.post("http://localhost:3000/api/v1/accounts/transfer",
                {
                    amount:amount,
                    to:selectedUser._id
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setOpen(false);
            fetchBalance();
            navigate('/dashboard');
        }
        catch(err){
            console.log(err);
        }
    }

    const fetchBalance = async()=>{
                const response = await axios.get("http://localhost:3000/api/v1/accounts/balance",
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
                setUserBalance(response.data.balance)
            }

    useEffect(()=>{
        try{
            fetchBalance();
        }
        catch(err){
            console.log(err);
        }
        
    }
    ,[]);
    
    return (

        <div className="p-6">

            <div className="flex justify-between items-center border-b pb-4">

                <h1 className="text-3xl font-bold">
                    Payments App
                </h1>

                <h2 className="text-xl">
                    Hello {userName}
                </h2>

            </div>

            <div className="mt-6">

                <h2 className="text-2xl font-semibold">
                    Your Balance ${userBalance}
                </h2>

            </div>

            <div className="mt-8 space-y-4">

                <h1 className="text-3xl font-bold">
                    Users
                </h1>

                <Input placeholder="Search users..." onChange={handleInput}/>

                <div className="space-y-4 py-4">

                    {
                        userList.filter((user)=>user.username!= userName).map((user) => (

                            <div
                                key={user._id}
                                className="flex justify-between items-center"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">

                                        {user.firstname[0]}
                                        {user.lastname[0]}

                                    </div>

                                    <div className="font-medium">

                                        {user.firstname} {user.lastname}

                                    </div>

                                </div>

                                <Button className="bg-green-500"
                                    onClick ={()=>{
                                        setOpen(true);
                                        setSelectedUser(user);
                                    }}
                                >
                                    Send Money
                                </Button>

                            </div>
                        ))
                    }

                </div>

            </div>

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-md p-8">

                    <DialogHeader>

                        <DialogTitle className="text-center text-4xl font-bold">
                            Send Money
                        </DialogTitle>

                    </DialogHeader>

                    {
                        selectedUser && (

                            <div className="space-y-6 mt-6">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-semibold">

                                        {selectedUser.firstname[0]}

                                    </div>

                                    <div className="text-3xl font-semibold">

                                        {selectedUser.firstname} {selectedUser.lastname}

                                    </div>

                                </div>

                                <div className="space-y-2">

                                    <p className="font-medium text-lg">
                                        Amount (in Rs)
                                    </p>

                                    <Input
                                        placeholder="Enter amount"
                                        className="h-12 text-lg"
                                        onChange={
                                            (e)=>{
                                                setAmount(e.target.value)
                                            }
                                        }
                                    />

                                </div>

                                <Button 
                                className="w-full bg-green-500 hover:bg-green-600 h-12 text-lg"
                                onClick = {handleClick}
                                >

                                    Initiate Transfer

                                </Button>

                            </div>
                        )
                    }

                </DialogContent>

            </Dialog>

        </div>
    );
};