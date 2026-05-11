import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SendComp = ({ receiverName }) => {

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-200">

            <Card className="w-[500px] p-10 space-y-6">

                <h1 className="text-5xl font-bold text-center">
                    Send Money
                </h1>

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">

                        {receiverName[0]}

                    </div>

                    <div className="text-3xl font-bold">

                        {receiverName}

                    </div>

                </div>

                <div className="space-y-2">

                    <p className="font-medium">
                        Amount (in Rs)
                    </p>

                    <Input placeholder="Enter amount" />

                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600">

                    Initiate Transfer

                </Button>

            </Card>

        </div>
    );
};