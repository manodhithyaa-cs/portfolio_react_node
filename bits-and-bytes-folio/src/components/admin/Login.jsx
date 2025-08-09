import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log("Logging in with", formData);

      await axios.post("http://localhost:5000/api/login", formData, {withCredentials: true});
      toast({
        title: "Login Successful!",
        description: "Redirecting to dashboard...",
      });
      navigate("/admin/cms");
    } catch (err) {
      toast({
        title: "Login failed",
        description: "Invalid credentials or server error.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const width = {"width": "500px"};

  return (
    <section className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md p-8 bg-card-gradient border-primary/10 animate-fadeInUp" style={width}>
        <div className="text-center mb-6">
          <Lock className="mx-auto h-10 w-10 text-primary mb-2" />
          <h2 className="text-2xl font-bold">Sign In to CMS</h2>
          <p className="text-muted-foreground mt-1">
            Enter your credentials to access your dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              required
              className="bg-background/50 border-primary/20 focus:border-primary/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              required
              className="bg-background/50 border-primary/20 focus:border-primary/40"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            variant="hero"
            className="w-full"
            disabled={loading}
          >
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Login;
