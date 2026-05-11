import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";

export const SignupComp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async()=>{
        axios.post("localhost:3000/api/v1/users/signup",{
            username:userName,
            firstname:firstName,
            lastname:lastName,
            password:password
        })
    }

    return (
        <div className="p-10 flex justify-center items-center min-h-screen bg-gray-100">

            <Card className="w-[400px] p-6 space-y-4">

                <h1 className="text-3xl font-bold mb-4">
                    Sign Up
                </h1>

                <div className="flex flex-col gap-2">
                    <Label>Username</Label>
                    <Input placeholder="Enter username" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>First Name</Label>
                    <Input placeholder="Enter first name" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Enter last name" />
                </div>


                <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <div className="relative">

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
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
                    onClick={() => handleSubmit}
                >
                    Sign up
                </Button>

            </Card>

        </div>
    );
};