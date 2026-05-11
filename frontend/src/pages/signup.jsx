import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

export const SignupComp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleSubmit = async()=>{
        try{
            console.log({
            userName,
            firstName,
            lastName,
            password
        });
            if(emailError) return;

            await axios.post("http://localhost:3000/api/v1/users/signup",{
                username:userName,
                firstname:firstName,
                lastname:lastName,
                password:password
            }),
            setSuccess(true);
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        }
        catch(err){
         console.log(err);   
        }
        }
        
        

    return (
        <div className="p-10 flex justify-center items-center min-h-screen bg-gray-100">

            <Card className="w-[400px] p-6 space-y-4">

                <h1 className="text-3xl font-bold mb-4">
                    Sign Up
                </h1>

                <div className="flex flex-col gap-2">
                    <Label>Username</Label>
                    <Input 
                        placeholder="Enter username" 
                        value = {userName} 
                        onChange = {(e)=>{
                            const value = e.target.value;
                            setUserName(value);

                            if(!value.includes('@')){
                                setEmailError('Please enter a valid email')
                            }
                            else{
                                setEmailError("");
                            }
                        }}
                    />
                </div>
                
                {
                    emailError &&(
                        <p className="text-red-500 text-sm">
                            {emailError}
                        </p>
                    )
                }

                <div className="flex flex-col gap-2">
                    <Label>First Name</Label>
                    <Input placeholder="Enter first name" 
                    onChange = {(e)=>{
                        setFirstName(e.target.value);
                    }}/>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Enter last name" 
                    onChange = {(e)=>{
                        setLastName(e.target.value);
                    }}
                    />
                </div>


                <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <div className="relative">

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        onChange = {(e)=>{
                        setPassword(e.target.value);
                    }}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {
                            showPassword
                                ? <EyeOff className="h-4 w-4" />
                                : <Eye className="h-4 w-4" />
                        }
                    </Button>

                </div>
                </div>

                <Button 
                    className="w-full"
                    onClick={() => handleSubmit()}
                >
                    Sign up
                </Button>

            </Card>
            <Dialog open={success}>

                <DialogContent className="sm:max-w-md">

                    <DialogHeader>

                        <DialogTitle className="text-center text-2xl">
                            User Created Successfully 🎉
                        </DialogTitle>
                        <DialogDescription>
                            Redirecting to sign in page...
                        </DialogDescription>

                    </DialogHeader>

                    <div className="flex justify-center py-6">

                        <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl">
                            ✓
                        </div>

                    </div>

                    <p className="text-center text-gray-500">
                        Redirecting to sign in page...
                    </p>

                </DialogContent>

            </Dialog>

        </div>
    );
};