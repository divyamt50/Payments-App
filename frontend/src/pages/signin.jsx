import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

export const SigninComp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async() => {
        try{
            console.log(formData);
            const response = await axios.post("http://localhost:3000/api/v1/users/signin",formData);
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
        catch(err){
            console.log(err);
        }};

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <Card className="w-[450px] p-8">

                <div className="space-y-6">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Sign In
                        </h1>

                        <p className="text-muted-foreground mt-2">
                            Enter your credentials to continue
                        </p>

                    </div>

                    <div className="flex flex-col gap-2">

                        <Label>
                            Username
                        </Label>

                        <Input
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <Label>
                            Password
                        </Label>

                        <div className="relative">

                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pr-10"
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
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                    <p className="text-sm text-center">

                        Don’t have an account?

                        <span className="underline cursor-pointer ml-1" onClick={()=>{navigate("/signup")}}>
                            Sign up
                        </span>

                    </p>

                </div>

            </Card>
            <Dialog open={success}>

                <DialogContent className="sm:max-w-md">

                    <DialogHeader>

                        <DialogTitle className="text-center text-2xl">
                            Signed In Successfully 🎉
                        </DialogTitle>
                        <DialogDescription>
                            Redirecting to dashboard page...
                        </DialogDescription>

                    </DialogHeader>

                    <div className="flex justify-center py-6">

                        <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl">
                            ✓
                        </div>

                    </div>

                    <p className="text-center text-gray-500">
                        Redirecting to Dashboard page...
                    </p>

                </DialogContent>

            </Dialog>

        </div>
    );
};