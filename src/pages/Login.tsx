import React, { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { login } = useWedding();
   const { toast } = useToast();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const result = await login(email, password);

         if (result.error) {
            toast({
               title: "Error",
               description: result.error.message,
               variant: "destructive",
            });
         } else {
            toast({
               title: "Success",
               description: "Logged in successfully!",
            });
            navigate("/");
         }
      } catch (error) {
         toast({
            title: "Error",
            description: "An unexpected error occurred",
            variant: "destructive",
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-center text-2xl text-pink-600">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div>
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Loading..." : "Login"}
                  </Button>

                  <div className="text-center">
                     <button type="button" onClick={() => navigate("/")} className="text-gray-600 hover:underline">
                        Back to Website
                     </button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
};

export default Login;
